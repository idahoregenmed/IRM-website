// POST /api/lead  -  receives the /consult form and upserts a contact in HighLevel (no captcha).
// Required Vercel env vars:  HL_PRIVATE_TOKEN (HighLevel Private Integration token, scopes contacts.write)
//                            HL_LOCATION_ID   (azxfAHIOnplqH5ubnxBM)
// Optional:                  HL_WEBHOOK_URL   (if set, the lead is POSTed there instead of using the API)

const HL_BASE = process.env.HL_API_BASE || 'https://services.leadconnectorhq.com';
const ALLOWED_ORIGINS = ['https://idahoregenmed.com', 'https://www.idahoregenmed.com'];
const hits = new Map(); // best-effort per-instance rate limit

const clean = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const json = (res, code, body) => { res.statusCode = code; res.setHeader('Content-Type', 'application/json'); res.setHeader('Cache-Control', 'no-store'); res.end(JSON.stringify(body)); };

function toE164(raw) {
  const d = String(raw || '').replace(/\D/g, '');
  if (d.length === 10) return '+1' + d;
  if (d.length === 11 && d[0] === '1') return '+' + d;
  return null;
}

async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  let s = ''; for await (const c of req) { s += c; if (s.length > 20000) break; }
  try { return JSON.parse(s || '{}'); } catch { return {}; }
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') return json(res, 405, { ok: false, error: 'method' });
  const origin = req.headers.origin || '';
  if (origin && !ALLOWED_ORIGINS.includes(origin) && !/(\.vercel\.app|^localhost|^127\.0\.0\.1)$/.test(new URL(origin).hostname)) return json(res, 403, { ok: false, error: 'origin' });

  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'x';
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter(t => now - t < 10 * 60 * 1000);
  if (recent.length >= 5) return json(res, 429, { ok: false, error: 'rate' });
  hits.set(ip, recent.concat(now));

  const b = await readBody(req);
  // Spam traps: hidden honeypot filled, or submitted faster than a human could. Pretend success.
  if (clean(b.website, 100) || (Number(b.elapsed) || 0) < 2500) return json(res, 200, { ok: true });

  const firstName = clean(b.firstName, 80), lastName = clean(b.lastName, 80);
  const email = clean(b.email, 200).toLowerCase();
  const phone = toE164(b.phone);
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return json(res, 422, { ok: false, error: 'email' });
  if (!phone) return json(res, 422, { ok: false, error: 'phone' });
  const consent = b.consent === true || b.consent === 'true';

  const u = b.utm && typeof b.utm === 'object' ? b.utm : {};
  const utm = {}; ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid'].forEach(k => { const v = clean(u[k], 150); if (v) utm[k] = v; });
  const when = new Date().toISOString();
  const consentText = 'By submitting, you agree to be contacted by Idaho Regenerative Medicine by text or email about your request. Message and data rates may apply. Reply STOP to opt out.';
  const note = [
    'Source: idahoregenmed.com/consult (native form) - Skier Ad Consultation',
    'Submitted: ' + when,
    'Text/email consent box checked: ' + (consent ? 'YES' : 'NO'),
    'Consent text shown: "' + consentText + '"',
    'Page: ' + clean(b.page, 300),
    'Referrer: ' + clean(b.referrer, 300),
    'UTM: ' + (Object.keys(utm).length ? Object.entries(utm).map(([k, v]) => k + '=' + v).join(', ') : '(none)'),
    'IP: ' + ip
  ].join('\n');

  const tags = ['consult-landing-page', 'skier-ad'];
  if (utm.utm_source) tags.push('src:' + utm.utm_source);
  if (utm.utm_medium) tags.push('medium:' + utm.utm_medium);
  if (utm.utm_campaign) tags.push('campaign:' + utm.utm_campaign);
  tags.push(consent ? 'sms-consent' : 'no-sms-consent');

  try {
    if (process.env.HL_WEBHOOK_URL) {
      const r = await fetch(process.env.HL_WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, phone, consent, tags, source: 'Landing page /consult', ...utm, note, submitted_at: when }) });
      if (!r.ok) throw new Error('webhook ' + r.status);
      return json(res, 200, { ok: true });
    }
    const token = process.env.HL_PRIVATE_TOKEN, locationId = process.env.HL_LOCATION_ID;
    if (!token || !locationId) return json(res, 503, { ok: false, error: 'not_configured' });
    const H = { Authorization: 'Bearer ' + token, Version: '2021-07-28', 'Content-Type': 'application/json', Accept: 'application/json' };
    const body = { locationId, firstName, lastName, email, phone, tags, source: 'Landing page /consult', country: 'US' };
    if (!consent) body.dndSettings = { SMS: { status: 'active', message: 'No text consent given on web form', code: 'web_form_no_consent' } };
    const r = await fetch(HL_BASE + '/contacts/upsert', { method: 'POST', headers: H, body: JSON.stringify(body) });
    const data = await r.json().catch(() => ({}));
    if (!r.ok) { console.error('HL upsert failed', r.status, JSON.stringify(data).slice(0, 300)); return json(res, 502, { ok: false, error: 'upstream' }); }
    const id = data.contact && data.contact.id;
    if (id) { // record consent + attribution on the contact; failure here must not fail the lead
      try { await fetch(HL_BASE + '/contacts/' + id + '/notes', { method: 'POST', headers: H, body: JSON.stringify({ body: note }) }); } catch (e) { console.error('note failed'); }
    }
    return json(res, 200, { ok: true });
  } catch (e) {
    console.error('lead error', e && e.message);
    return json(res, 502, { ok: false, error: 'upstream' });
  }
};
