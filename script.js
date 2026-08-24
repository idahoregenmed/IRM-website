/* Idaho Regenerative Medicine ✦ interactions */
(function () {
  'use strict';

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* year */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* make the virtual appointments micro-label route to the relevant scheduling option */
  $$('.brand__virtual').forEach(label => {
    label.setAttribute('role', 'link');
    label.setAttribute('tabindex', '0');
    label.setAttribute('aria-label', 'View virtual appointment scheduling options');

    const goToVirtualScheduling = event => {
      event.preventDefault();
      event.stopPropagation();
      window.location.href = './scheduling.html#telehealth';
    };

    label.addEventListener('click', goToVirtualScheduling);
    label.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') goToVirtualScheduling(event);
    });
  });

  const conditionMenuItems = [
    { title: 'What We Help With', url: './conditions.html' },
    { title: 'Persistent Pain Patterns', url: './persistent-pain-patterns.html' },
    { title: 'Joint Degeneration', url: './joint-degeneration.html' },
    { title: 'Tendon & Ligament Injuries', url: './tendon-ligament-injuries.html' },
    { title: 'Autoimmune & Inflammatory Patterns', url: './autoimmune-inflammatory-patterns.html' },
    { title: 'Hormone & Energy Shifts', url: './hormone-energy-shifts.html' },
    { title: 'Metabolic Dysfunction & Weight Resistance', url: './metabolic-dysfunction-weight-resistance.html' },
    { title: 'Stress & Nervous System Dysregulation', url: './stress-nervous-system-dysregulation.html' },
    { title: 'Recovery & Performance', url: './recovery-performance.html' },
    { title: 'Longevity & Healthspan', url: './longevity-healthspan.html' }
  ];

  let currentFile = window.location.pathname.split('/').pop() || 'index.html';
  if (currentFile && !currentFile.includes('.')) currentFile += '.html';
  const conditionFiles = conditionMenuItems.map(item => item.url.replace('./', ''));

  const buildConditionLink = item => {
    const link = document.createElement('a');
    link.href = item.url;
    link.textContent = item.title;
    if (item.url.replace('./', '') === currentFile) link.classList.add('is-active');
    return link;
  };

  const enhanceConditionMenus = () => {
    const desktopConditionLink = $('.nav__links > a[href="./conditions.html"]');
    if (desktopConditionLink && !desktopConditionLink.closest('.nav__item')) {
      const item = document.createElement('div');
      item.className = 'nav__item nav__item--conditions';

      const trigger = document.createElement('a');
      trigger.className = 'nav__trigger';
      if (conditionFiles.includes(currentFile)) trigger.classList.add('is-active');
      trigger.href = './conditions.html';
      trigger.textContent = 'What We Help With';

      const dropdown = document.createElement('div');
      dropdown.className = 'nav__dropdown nav__dropdown--conditions';
      dropdown.setAttribute('aria-label', 'What we help with submenu');
      conditionMenuItems.forEach(menuItem => dropdown.append(buildConditionLink(menuItem)));

      item.append(trigger, dropdown);
      desktopConditionLink.replaceWith(item);
    }

    const mobileConditionLink = $('.mobile > a[href="./conditions.html"]');
    if (mobileConditionLink && !document.getElementById('mobileConditions')) {
      const accordion = document.createElement('div');
      accordion.className = 'mobile__accordion';
      accordion.innerHTML = `
        <button class="mobile__toggle" type="button" aria-expanded="false" aria-controls="mobileConditions" data-mobile-toggle>What We Help With<span aria-hidden="true"></span></button>
        <div class="mobile__panel mobile__panel--conditions" id="mobileConditions" hidden></div>
      `;
      const panel = accordion.querySelector('#mobileConditions');
      conditionMenuItems.forEach(menuItem => panel.append(buildConditionLink(menuItem)));
      mobileConditionLink.replaceWith(accordion);
    }
  };
  enhanceConditionMenus();

  const assessmentMenuItems = [
    { title: 'New Patients', url: './new-patients.html' },
    { title: 'Before Your Visit', url: './before-your-visit.html' },
    { title: 'Assessment Overview', url: './assessment.html' },
    { title: 'Get to Know You Consult', url: './get-to-know-you-consult.html' },
    { title: 'Virtual Appointments', url: './virtual-appointments.html' },
    { title: 'Scheduling', url: './scheduling.html' }
  ];
  const assessmentFiles = assessmentMenuItems.map(item => item.url.replace('./', ''));

  const buildNavLink = item => {
    const link = document.createElement('a');
    link.href = item.url;
    link.textContent = item.title;
    if (item.url.replace('./', '') === currentFile) link.classList.add('is-active');
    return link;
  };

  const enhanceAssessmentMenus = () => {
    const desktopDropdown = $('.nav__dropdown[aria-label="Assessment submenu"]');
    if (desktopDropdown && !desktopDropdown.querySelector('[href="./new-patients.html"]')) {
      desktopDropdown.innerHTML = '';
      assessmentMenuItems.forEach(item => desktopDropdown.append(buildNavLink(item)));
    }

    const desktopTrigger = $('.nav__item .nav__trigger[href="./assessment.html"]');
    if (desktopTrigger && assessmentFiles.includes(currentFile)) {
      desktopTrigger.classList.add('is-active');
    }

    const mobileAssessmentLink = $('.mobile > a[href="./assessment.html"]');
    if (mobileAssessmentLink && !document.getElementById('mobileAssessment')) {
      const accordion = document.createElement('div');
      accordion.className = 'mobile__accordion';
      accordion.innerHTML = `
        <button class="mobile__toggle" type="button" aria-expanded="false" aria-controls="mobileAssessment" data-mobile-toggle>Assessment<span aria-hidden="true"></span></button>
        <div class="mobile__panel mobile__panel--assessment" id="mobileAssessment" hidden></div>
      `;
      const panel = accordion.querySelector('#mobileAssessment');
      assessmentMenuItems.forEach(item => panel.append(buildNavLink(item)));
      mobileAssessmentLink.replaceWith(accordion);
    }
  };
  enhanceAssessmentMenus();

  const therapySubMenuItems = [
    { title: 'Stem Cell Therapies', url: './stem-cell-therapies.html' },
    { title: 'Platelet-Rich Plasma', url: './platelet-rich-plasma.html' },
    { title: 'Prolotherapy', url: './prolotherapy.html' },
    { title: 'Prolozone', url: './prolozone.html' },
    { title: 'Exosomes', url: './exosomes.html' },
    { title: 'Neural Therapy', url: './neural-therapy.html' },
    { title: 'Shockwave Therapy', url: './shockwave-therapy.html' }
  ];

  const enhanceTherapiesMenus = () => {
    const therapiesGrid = $('.nav__dropdown[aria-label="Therapies submenu"] .nav__dropdown-grid');
    if (therapiesGrid && !therapiesGrid.querySelector('[href="./stem-cell-therapies.html"]')) {
      const biologicsLink = therapiesGrid.querySelector('[href="./biologics.html"]');
      therapySubMenuItems.forEach(item => {
        const link = buildNavLink(item);
        link.classList.add('nav__dropdown-sub');
        if (biologicsLink && item.url.includes('stem-cell')) {
          biologicsLink.insertAdjacentElement('afterend', link);
        } else {
          therapiesGrid.append(link);
        }
      });
      const indexLink = document.createElement('a');
      indexLink.href = './therapies.html#therapy-index';
      indexLink.textContent = 'Browse all therapies →';
      indexLink.className = 'nav__dropdown-more';
      therapiesGrid.append(indexLink);
    }

    const mobileTherapiesPanel = document.getElementById('mobileTherapies');
    if (mobileTherapiesPanel && !mobileTherapiesPanel.querySelector('[href="./stem-cell-therapies.html"]')) {
      therapySubMenuItems.forEach(item => mobileTherapiesPanel.append(buildNavLink(item)));
      const indexLink = document.createElement('a');
      indexLink.href = './therapies.html#therapy-index';
      indexLink.textContent = 'Browse all therapies';
      mobileTherapiesPanel.append(indexLink);
    }
  };
  enhanceTherapiesMenus();

  const enhanceFooterStartHere = () => {
    $$('.footer__grid').forEach(grid => {
      if (grid.querySelector('.footer__start-here')) return;
      const exploreCol = grid.querySelector('.footer__links');
      if (!exploreCol || !exploreCol.closest('div')?.querySelector('h4')) return;

      const startHere = document.createElement('div');
      startHere.className = 'footer__start-here';
      startHere.innerHTML = `
        <h4>Start here</h4>
        <ul class="footer__links">
          <li><a href="./new-patients.html">New Patients</a></li>
          <li><a href="./before-your-visit.html">Before Your Visit</a></li>
          <li><a href="./regenerative-medicine-boise.html">Boise &amp; Treasure Valley</a></li>
          <li><a href="./virtual-appointments.html">Virtual Appointments</a></li>
        </ul>
      `;
      const exploreDiv = exploreCol.closest('div');
      if (exploreDiv) exploreDiv.before(startHere);
    });
  };
  enhanceFooterStartHere();

  const breadcrumbMap = {
    'index.html': [{ name: 'Home', url: 'https://idahoregenmed.com/' }],
    'new-patients.html': [{ name: 'Home', url: 'https://idahoregenmed.com/' }, { name: 'New Patients', url: 'https://idahoregenmed.com/new-patients' }],
    'before-your-visit.html': [{ name: 'Home', url: 'https://idahoregenmed.com/' }, { name: 'Before Your Visit', url: 'https://idahoregenmed.com/before-your-visit' }],
    'get-to-know-you-consult.html': [{ name: 'Home', url: 'https://idahoregenmed.com/' }, { name: 'Assessment', url: 'https://idahoregenmed.com/assessment' }, { name: 'Get to Know You Consult', url: 'https://idahoregenmed.com/get-to-know-you-consult' }],
    'virtual-appointments.html': [{ name: 'Home', url: 'https://idahoregenmed.com/' }, { name: 'Virtual Appointments', url: 'https://idahoregenmed.com/virtual-appointments' }],
    'regenerative-medicine-boise.html': [{ name: 'Home', url: 'https://idahoregenmed.com/' }, { name: 'Regenerative Medicine in Boise', url: 'https://idahoregenmed.com/regenerative-medicine-boise' }],
    'stem-cell-therapies.html': [{ name: 'Home', url: 'https://idahoregenmed.com/' }, { name: 'Therapies', url: 'https://idahoregenmed.com/therapies' }, { name: 'Stem Cell Therapies', url: 'https://idahoregenmed.com/stem-cell-therapies' }],
    'platelet-rich-plasma.html': [{ name: 'Home', url: 'https://idahoregenmed.com/' }, { name: 'Therapies', url: 'https://idahoregenmed.com/therapies' }, { name: 'Platelet-Rich Plasma', url: 'https://idahoregenmed.com/platelet-rich-plasma' }],
    'prolotherapy.html': [{ name: 'Home', url: 'https://idahoregenmed.com/' }, { name: 'Therapies', url: 'https://idahoregenmed.com/therapies' }, { name: 'Prolotherapy', url: 'https://idahoregenmed.com/prolotherapy' }],
    'prolozone.html': [{ name: 'Home', url: 'https://idahoregenmed.com/' }, { name: 'Therapies', url: 'https://idahoregenmed.com/therapies' }, { name: 'Prolozone', url: 'https://idahoregenmed.com/prolozone' }],
    'exosomes.html': [{ name: 'Home', url: 'https://idahoregenmed.com/' }, { name: 'Therapies', url: 'https://idahoregenmed.com/therapies' }, { name: 'Exosomes', url: 'https://idahoregenmed.com/exosomes' }],
    'neural-therapy.html': [{ name: 'Home', url: 'https://idahoregenmed.com/' }, { name: 'Therapies', url: 'https://idahoregenmed.com/therapies' }, { name: 'Neural Therapy', url: 'https://idahoregenmed.com/neural-therapy' }],
    'shockwave-therapy.html': [{ name: 'Home', url: 'https://idahoregenmed.com/' }, { name: 'Therapies', url: 'https://idahoregenmed.com/therapies' }, { name: 'Shockwave Therapy', url: 'https://idahoregenmed.com/shockwave-therapy' }],
    'therapies.html': [{ name: 'Home', url: 'https://idahoregenmed.com/' }, { name: 'Therapies', url: 'https://idahoregenmed.com/therapies' }],
    'assessment.html': [{ name: 'Home', url: 'https://idahoregenmed.com/' }, { name: 'Assessment', url: 'https://idahoregenmed.com/assessment' }],
    'scheduling.html': [{ name: 'Home', url: 'https://idahoregenmed.com/' }, { name: 'Scheduling', url: 'https://idahoregenmed.com/scheduling' }]
  };

  const injectBreadcrumbSchema = () => {
    const crumbs = breadcrumbMap[currentFile];
    if (!crumbs || document.querySelector('script[data-breadcrumb-schema]')) return;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.dataset.breadcrumbSchema = 'auto';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map((crumb, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: crumb.name,
        item: crumb.url
      }))
    });
    document.head.append(script);
  };
  injectBreadcrumbSchema();

  const conditionTherapyConnections = {
    'persistent-pain-patterns.html': [
      { title: 'Regenerative Orthopedics', url: './regenerative-orthopedics.html', note: 'For pain patterns involving joints, tendons, ligaments, fascia, nerves, or old injuries.' },
      { title: 'Total Nervous System Reset™', url: './total-nervous-system-reset.html', note: 'When pain is amplified by guarding, stress physiology, scars, or nervous system overdrive.' },
      { title: 'Perineural Therapy', url: './perineural-therapy.html', note: 'For burning, radiating, sharp, electric, tingling, or recurring nerve-like pain.' },
      { title: 'Shockwave Therapy', url: './shockwave-therapy.html', note: 'For stubborn tendon, fascia, circulation, and slow-healing musculoskeletal patterns.' }
    ],
    'joint-degeneration.html': [
      { title: 'Regenerative Orthopedics', url: './regenerative-orthopedics.html', note: 'The parent pathway for joint instability, arthritis patterns, tissue damage, and ultrasound-guided care.' },
      { title: 'Prolotherapy', url: './prolotherapy.html', note: 'A stability-focused injection approach for ligament laxity and joint support.' },
      { title: 'Platelet Rich Plasma', url: './platelet-rich-plasma.html', note: 'A biologic repair-signaling option often discussed for joint and soft tissue concerns.' },
      { title: 'Intra-articular Injections', url: './intra-articular-injections.html', note: 'When the joint space itself is part of the pain or repair conversation.' }
    ],
    'tendon-ligament-injuries.html': [
      { title: 'Prolotherapy', url: './prolotherapy.html', note: 'The grandfather of regenerative injection therapy for stability and ligament support.' },
      { title: 'Prolozone', url: './prolozone.html', note: 'Adds ozone to the prolotherapy concept when oxygen-focused tissue signaling may fit.' },
      { title: 'Platelet Rich Plasma', url: './platelet-rich-plasma.html', note: 'Uses concentrated platelet signaling for tendon, ligament, and soft tissue repair conversations.' },
      { title: 'Rehabilitation', url: './rehabilitation.html', note: 'Supports the fascia, neuromuscular system, strength, and movement pattern around the injury.' }
    ],
    'autoimmune-inflammatory-patterns.html': [
      { title: 'Assessment', url: './assessment.html', note: 'Helps clarify terrain drivers such as gut health, toxins, nutrients, immune patterns, Lyme, or co-infections.' },
      { title: 'IV Therapy', url: './iv-nutrient-therapy.html', note: 'May support nutrient repletion, antioxidants, hydration, and cellular recovery capacity.' },
      { title: 'Ozone Therapy', url: './ozone-therapy.html', note: 'An oxygen-focused therapy family considered when redox balance, circulation, or inflammatory load are part of the picture.' },
      { title: 'Peptide Therapy', url: './peptide-therapy.html', note: 'May be discussed for repair signaling, immune modulation, recovery, and resilience when appropriate.' }
    ],
    'hormone-energy-shifts.html': [
      { title: 'Hormone Optimization', url: './hormone-optimization.html', note: 'For men’s and women’s hormones, thyroid context, energy, mood, sleep, recovery, and vitality.' },
      { title: 'Metabolic Optimization', url: './metabolic-health.html', note: 'When energy, weight resistance, insulin signaling, body composition, and hormones overlap.' },
      { title: 'Peptide Therapy', url: './peptide-therapy.html', note: 'May support hormone rhythm, recovery, performance, metabolism, and tissue repair in the right context.' },
      { title: 'Vitality Reserve™', url: './vitality-reserve.html', note: 'A long-term continuity rhythm for preserving progress and refining care over time.' }
    ],
    'metabolic-dysfunction-weight-resistance.html': [
      { title: 'Metabolic Optimization', url: './metabolic-health.html', note: 'The primary pathway for weight resistance, insulin signaling, body composition, and long-term metabolic resilience.' },
      { title: 'Hormone Optimization', url: './hormone-optimization.html', note: 'Because thyroid, sex hormones, stress physiology, and sleep can shape metabolic response.' },
      { title: 'Peptide Therapy', url: './peptide-therapy.html', note: 'May support metabolic signaling, recovery, muscle preservation, and long-term momentum.' },
      { title: 'Rehabilitation', url: './rehabilitation.html', note: 'Supports muscle, movement, nutrition, and holding metabolic gains over time.' }
    ],
    'stress-nervous-system-dysregulation.html': [
      { title: 'Total Nervous System Reset™', url: './total-nervous-system-reset.html', note: 'The parent pathway for overdrive, interference fields, autonomic tone, and regulation support.' },
      { title: 'Neural Therapy', url: './neural-therapy.html', note: 'For scars, old injuries, interference fields, and recurring patterns that may keep the body guarded.' },
      { title: 'Autonomic Response Testing', url: './autonomic-response-testing.html', note: 'Helps prioritize where to begin when the system feels overloaded or pulled in too many directions.' },
      { title: 'Perineural Therapy', url: './perineural-therapy.html', note: 'For nerve-like pain patterns that may be part of a larger nervous system story.' }
    ],
    'recovery-performance.html': [
      { title: 'Rehabilitation', url: './rehabilitation.html', note: 'Connects fascia, neuromuscular control, movement, nutrition, and strength for durable recovery.' },
      { title: 'Peptide Therapy', url: './peptide-therapy.html', note: 'May support repair, performance, recovery, sleep, tissue quality, and resilience.' },
      { title: 'IV Therapy', url: './iv-nutrient-therapy.html', note: 'May support nutrient status, hydration, cellular energy, antioxidants, and procedure recovery.' },
      { title: 'Shockwave Therapy', url: './shockwave-therapy.html', note: 'A mechanical signal for stubborn tendon, fascia, and slow-repair patterns.' }
    ],
    'longevity-healthspan.html': [
      { title: 'Vitality Reserve™', url: './vitality-reserve.html', note: 'A continuity care container for long-term regenerative health rhythm and progress preservation.' },
      { title: 'Assessment', url: './assessment.html', note: 'Creates a map for metabolic health, hormones, nutrients, inflammation, cardiovascular risk, and cellular resilience.' },
      { title: 'Peptide Therapy', url: './peptide-therapy.html', note: 'May support repair signaling, resilience, healthy aging, recovery, skin, hair, and performance goals.' },
      { title: 'Hormone Optimization', url: './hormone-optimization.html', note: 'Supports vitality, cognition, muscle, bone, recovery, mood, and long-term capacity.' }
    ]
  };

  const therapyPatternConnections = {
    'regenerative-orthopedics.html': ['persistent-pain-patterns.html', 'joint-degeneration.html', 'tendon-ligament-injuries.html', 'recovery-performance.html'],
    'prolotherapy.html': ['joint-degeneration.html', 'tendon-ligament-injuries.html', 'persistent-pain-patterns.html'],
    'prolozone.html': ['tendon-ligament-injuries.html', 'joint-degeneration.html', 'persistent-pain-patterns.html'],
    'platelet-rich-plasma.html': ['joint-degeneration.html', 'tendon-ligament-injuries.html', 'recovery-performance.html'],
    'biologics.html': ['joint-degeneration.html', 'tendon-ligament-injuries.html', 'recovery-performance.html', 'longevity-healthspan.html'],
    'stem-cell-therapies.html': ['joint-degeneration.html', 'tendon-ligament-injuries.html', 'persistent-pain-patterns.html'],
    'exosomes.html': ['joint-degeneration.html', 'autoimmune-inflammatory-patterns.html', 'recovery-performance.html', 'longevity-healthspan.html'],
    'intra-articular-injections.html': ['joint-degeneration.html', 'persistent-pain-patterns.html'],
    'intra-osseous-injections.html': ['joint-degeneration.html', 'persistent-pain-patterns.html'],
    'shockwave-therapy.html': ['tendon-ligament-injuries.html', 'persistent-pain-patterns.html', 'recovery-performance.html'],
    'emsculpt-neo-rehabilitation.html': ['recovery-performance.html', 'metabolic-dysfunction-weight-resistance.html', 'joint-degeneration.html'],
    'rehabilitation.html': ['recovery-performance.html', 'tendon-ligament-injuries.html', 'metabolic-dysfunction-weight-resistance.html', 'joint-degeneration.html'],
    'hormone-optimization.html': ['hormone-energy-shifts.html', 'metabolic-dysfunction-weight-resistance.html', 'longevity-healthspan.html', 'recovery-performance.html'],
    'metabolic-health.html': ['metabolic-dysfunction-weight-resistance.html', 'hormone-energy-shifts.html', 'longevity-healthspan.html'],
    'iv-nutrient-therapy.html': ['autoimmune-inflammatory-patterns.html', 'recovery-performance.html', 'longevity-healthspan.html', 'hormone-energy-shifts.html'],
    'ozone-therapy.html': ['autoimmune-inflammatory-patterns.html', 'persistent-pain-patterns.html', 'recovery-performance.html'],
    'eboo.html': ['autoimmune-inflammatory-patterns.html', 'recovery-performance.html', 'longevity-healthspan.html'],
    'total-nervous-system-reset.html': ['stress-nervous-system-dysregulation.html', 'persistent-pain-patterns.html', 'hormone-energy-shifts.html'],
    'neural-therapy.html': ['stress-nervous-system-dysregulation.html', 'persistent-pain-patterns.html'],
    'autonomic-response-testing.html': ['stress-nervous-system-dysregulation.html', 'autoimmune-inflammatory-patterns.html', 'hormone-energy-shifts.html'],
    'perineural-therapy.html': ['persistent-pain-patterns.html', 'stress-nervous-system-dysregulation.html'],
    'nerve-hydrodissection.html': ['persistent-pain-patterns.html', 'tendon-ligament-injuries.html'],
    'peptide-therapy.html': ['recovery-performance.html', 'metabolic-dysfunction-weight-resistance.html', 'hormone-energy-shifts.html', 'longevity-healthspan.html'],
    'regenerative-aesthetics.html': ['longevity-healthspan.html', 'hormone-energy-shifts.html', 'recovery-performance.html']
  };

  const conditionByFile = new Map(conditionMenuItems.slice(1).map(item => [item.url.replace('./', ''), item]));

  const makeCrosslinkSection = ({ eyebrow, heading, lead, items, mode = 'cards' }) => {
    const section = document.createElement('section');
    section.className = 'page-section page-section--crosslinks';
    const cards = items.map(item => {
      const note = item.note ? `<p>${item.note}</p>` : '';
      return `<a class="crosslink-card" href="${item.url}"><span class="crosslink-card__label">${item.label || 'Connected path'}</span><h3>${item.title}</h3>${note}<span class="crosslink-card__cta">Explore</span></a>`;
    }).join('');
    section.innerHTML = `
      <div class="container">
        <header class="section__head section__head--center">
          <p class="eyebrow">${eyebrow}</p>
          <h2 class="h2">${heading}</h2>
          <p class="prose section__lead">${lead}</p>
        </header>
        <div class="crosslink-grid crosslink-grid--${mode}">${cards}</div>
      </div>
    `;
    return section;
  };

  const insertBeforeCta = section => {
    const main = $('main');
    const cta = $('.section--cta', main);
    if (main && cta) main.insertBefore(section, cta);
  };

  if (conditionTherapyConnections[currentFile] && !$('[data-condition-crosslinks]')) {
    const section = makeCrosslinkSection({
      eyebrow: 'Commonly connected therapies',
      heading: 'From the pattern to the possible care paths.',
      lead: 'These connections help you understand how IRM may think through the pattern. They are educational starting points, not a promise that every therapy is right for every person.',
      items: conditionTherapyConnections[currentFile].map(item => ({ ...item, label: 'Therapy path' }))
    });
    section.dataset.conditionCrosslinks = 'true';
    insertBeforeCta(section);
  }

  if (therapyPatternConnections[currentFile] && !$('[data-therapy-crosslinks]')) {
    const patterns = therapyPatternConnections[currentFile]
      .map(file => conditionByFile.get(file))
      .filter(Boolean)
      .map(item => ({ ...item, label: 'Pattern' }));
    const section = makeCrosslinkSection({
      eyebrow: 'Common patterns this may support',
      heading: 'Where this therapy may fit in the larger story.',
      lead: 'Therapies at IRM are not isolated menu items. They are considered in context with symptoms, assessment, tissue health, terrain, goals, and the sequence that makes sense for the person.',
      items: patterns,
      mode: 'patterns'
    });
    section.dataset.therapyCrosslinks = 'true';
    insertBeforeCta(section);
  }

  /* site search */
  const searchPages = [
    { title: 'Home', url: './index.html', keywords: 'home idaho regenerative medicine IRM Boise Garden City virtual appointments' },
    { title: 'Approach', url: './approach.html', keywords: 'listen map restore terrain regenerate tissue optimize longevity philosophy' },
    { title: 'What We Help With', url: './conditions.html', keywords: 'pain fatigue inflammation hormones weight recovery symptoms normal labs' },
    { title: 'Persistent Pain Patterns', url: './persistent-pain-patterns.html', keywords: 'persistent pain patterns pain pain inflammation fatigue weight resistance hormones nervous system recovery longevity joints tendons ligaments healthspan what we treat' },
    { title: 'Joint Degeneration', url: './joint-degeneration.html', keywords: 'joint degeneration joints pain inflammation fatigue weight resistance hormones nervous system recovery longevity joints tendons ligaments healthspan what we treat' },
    { title: 'Tendon and Ligament Injuries', url: './tendon-ligament-injuries.html', keywords: 'tendon & ligament injuries movement pain inflammation fatigue weight resistance hormones nervous system recovery longevity joints tendons ligaments healthspan what we treat' },
    { title: 'Autoimmune and Inflammatory Patterns', url: './autoimmune-inflammatory-patterns.html', keywords: 'autoimmune & inflammatory patterns immune pain inflammation fatigue weight resistance hormones nervous system recovery longevity joints tendons ligaments healthspan what we treat' },
    { title: 'Hormone and Energy Shifts', url: './hormone-energy-shifts.html', keywords: 'hormone & energy shifts hormones pain inflammation fatigue weight resistance hormones nervous system recovery longevity joints tendons ligaments healthspan what we treat' },
    { title: 'Metabolic Dysfunction and Weight Resistance', url: './metabolic-dysfunction-weight-resistance.html', keywords: 'metabolic dysfunction & weight resistance metabolic pain inflammation fatigue weight resistance hormones nervous system recovery longevity joints tendons ligaments healthspan what we treat' },
    { title: 'Stress and Nervous System Dysregulation', url: './stress-nervous-system-dysregulation.html', keywords: 'stress & nervous system dysregulation nervous system pain inflammation fatigue weight resistance hormones nervous system recovery longevity joints tendons ligaments healthspan what we treat' },
    { title: 'Recovery and Performance', url: './recovery-performance.html', keywords: 'recovery & performance performance pain inflammation fatigue weight resistance hormones nervous system recovery longevity joints tendons ligaments healthspan what we treat' },
    { title: 'Longevity and Healthspan', url: './longevity-healthspan.html', keywords: 'longevity & healthspan healthspan pain inflammation fatigue weight resistance hormones nervous system recovery longevity joints tendons ligaments healthspan what we treat' },
    { title: 'Assessment', url: './assessment.html', keywords: 'assessment testing live blood analysis ultrasound labs imaging environmental toxins lyme gut genetics' },
    { title: 'Get to Know You Consult', url: './get-to-know-you-consult.html', keywords: 'consult consultation meet the doc new patient story goals first step' },
    { title: 'Scheduling', url: './scheduling.html', keywords: 'book now schedule appointment new patient established telehealth IV assessment lab review' },
    { title: 'Therapies Overview', url: './therapies.html', keywords: 'therapies regenerative medicine biologics hormones metabolic IV ozone nervous system rehabilitation peptides aesthetics' },
    { title: 'Regenerative Orthopedics', url: './regenerative-orthopedics.html', keywords: 'orthopedics pain joint instability ligament laxity prolotherapy PRP shockwave knee back hip shoulder ultrasound guided injections' },
    { title: 'Biologics', url: './biologics.html', keywords: 'biologics stem cells bone marrow adipose umbilical exosomes secretomes adisomes growth factors PRP PRF' },
    { title: 'Hormone Optimization', url: './hormone-optimization.html', keywords: 'hormones estrogen progesterone testosterone men women intimacy sexual health vitality' },
    { title: 'Metabolic Optimization', url: './metabolic-health.html', keywords: 'metabolic optimization weight loss insulin resistance GLP hormones metabolism body composition' },
    { title: 'IV Therapy', url: './iv-nutrient-therapy.html', keywords: 'IV therapy nutrients hydration vitamins minerals infusions ozone EBOO' },
    { title: 'Ozone Therapy', url: './ozone-therapy.html', keywords: 'ozone prolozone major auto heme hemealumen intra articular intra osseous oxygen' },
    { title: 'Total Nervous System Reset™', url: './total-nervous-system-reset.html', keywords: 'total nervous system reset neural therapy autonomic response testing stellate ganglion interference fields' },
    { title: 'Rehabilitation', url: './rehabilitation.html', keywords: 'rehabilitation shockwave emsculpt neo exercise physical therapy nutrition peptides recovery fascia neuromuscular' },
    { title: 'Peptide Therapy', url: './peptide-therapy.html', keywords: 'peptides recovery hormones metabolic aesthetics orthopedics performance repair' },
    { title: 'Regenerative Aesthetics', url: './regenerative-aesthetics.html', keywords: 'aesthetics skin hair facial biologics rejuvenation collagen exosomes PRP' },
    { title: 'Prolotherapy', url: './prolotherapy.html', keywords: 'prolotherapy dextrose ligament laxity joint instability cartilage disc repair' },
    { title: 'Prolozone', url: './prolozone.html', keywords: 'prolozone ozone prolotherapy oxygen ligament joint pain injections' },
    { title: 'Platelet Rich Plasma', url: './platelet-rich-plasma.html', keywords: 'PRP platelet rich plasma platelets growth factors injection tissue repair' },
    { title: 'Stem Cell Therapies', url: './stem-cell-therapies.html', keywords: 'stem cell therapies stem cells bone marrow adipose umbilical biologics' },
    { title: 'Exosomes', url: './exosomes.html', keywords: 'exosomes secretomes adisomes extracellular vesicles cell signaling biologics' },
    { title: 'Neural Therapy', url: './neural-therapy.html', keywords: 'neural therapy nervous system scars interference fields autonomic reset' },
    { title: 'Perineural Therapy', url: './perineural-therapy.html', keywords: 'perineural therapy nerve pain irritated nerves burning radiating pain' },
    { title: 'Nerve Hydrodissection', url: './nerve-hydrodissection.html', keywords: 'nerve hydrodissection nerve entrapment ultrasound guided irritated nerve fascia' },
    { title: 'Autonomic Response Testing', url: './autonomic-response-testing.html', keywords: 'autonomic response testing ART interference fields nervous system assessment' },
    { title: 'Resources', url: './resources.html', keywords: 'resources scheduling story book philosophy education referral partners blog' },
    { title: 'Connect with the Experts', url: './connect-with-the-experts.html', keywords: 'about bio Dr Sara Jo Walton team experts medical director founder IRM' },
    { title: 'Vitality Reserve™', url: './vitality-reserve.html', keywords: 'Vitality Reserve membership reserve continuity care long term regenerative health resilience longevity programs Foundation Reserve Transformation Reserve Optimization Reserve' },
    { title: 'The Story Behind IRM', url: './story-behind-irm.html', keywords: 'story behind IRM Dr Walton personal story naturopathic regenerative medicine' },
    { title: 'Book & Philosophy', url: './book.html', keywords: 'Medicine is Broken You are Not book philosophy waitlist coming soon' },
    { title: 'Regenerative Medicine in Boise', url: './regenerative-medicine-boise.html', keywords: 'Boise Garden City Meridian Eagle Nampa Treasure Valley Idaho location clinic near me regenerative medicine' },
    { title: 'New Patients', url: './new-patients.html', keywords: 'new patient first visit getting started consult referral cash pay HSA FSA' },
    { title: 'Before Your Visit', url: './before-your-visit.html', keywords: 'FAQ before visit questions referral insurance payment first visit virtual what to bring hours location cash pay HSA FSA' },
    { title: 'Virtual Appointments', url: './virtual-appointments.html', keywords: 'virtual telehealth remote online video consult Idaho telemedicine' },
    { title: 'Privacy Policy', url: './privacy-policy.html', keywords: 'privacy policy HIPAA data protection cookies legal' },
  ];

  const scoreSearchResult = (page, query) => {
    const q = query.trim().toLowerCase();
    if (!q) return 0;
    const haystack = `${page.title} ${page.keywords}`.toLowerCase();
    const words = q.split(/\s+/).filter(Boolean);
    return words.reduce((score, word) => {
      if (page.title.toLowerCase().includes(word)) score += 8;
      if (haystack.includes(word)) score += 3;
      return score;
    }, 0);
  };

  const makeSearchResults = (query) => searchPages
    .map(page => ({ ...page, score: scoreSearchResult(page, query) }))
    .filter(page => page.score > 0)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, 6);

  const renderSearchResults = (resultsEl, query) => {
    const results = makeSearchResults(query);
    resultsEl.innerHTML = '';
    if (!query.trim()) {
      resultsEl.innerHTML = '<p class="site-search__hint">Search therapies, assessment, scheduling, or resources.</p>';
      return;
    }
    if (!results.length) {
      resultsEl.innerHTML = '<p class="site-search__hint">No exact match. Try “hormones,” “orthopedics,” “assessment,” or “book.”</p>';
      return;
    }
    results.forEach(result => {
      const link = document.createElement('a');
      link.href = result.url;
      link.textContent = result.title;
      resultsEl.append(link);
    });
  };

  const bindSearchForm = (form) => {
    const input = form.querySelector('input[type="search"]');
    const resultsEl = form.querySelector('[data-search-results]');
    if (!input || !resultsEl) return;

    renderSearchResults(resultsEl, '');
    input.addEventListener('input', () => renderSearchResults(resultsEl, input.value));
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const first = makeSearchResults(input.value)[0];
      if (first) window.location.href = first.url;
    });
  };

  $$('footer .footer__grid > div:first-child').forEach((footerIntro, index) => {
    if (footerIntro.querySelector('.footer-search')) return;

    const footerSearch = document.createElement('form');
    footerSearch.className = 'footer-search';
    footerSearch.setAttribute('role', 'search');
    footerSearch.innerHTML = `
      <label class="footer-search__label" for="footerSiteSearchInput${index}">Search the site</label>
      <div class="footer-search__field">
        <input id="footerSiteSearchInput${index}" type="search" placeholder="Search therapies, scheduling, resources" autocomplete="off" />
        <button class="footer-search__button" type="submit" aria-label="Search">
          <span aria-hidden="true"></span>
        </button>
      </div>
      <div class="site-search__results footer-search__results" data-search-results></div>
    `;
    footerIntro.append(footerSearch);
    bindSearchForm(footerSearch);
  });

  const navCta = $('.nav__cta');
  if (navCta) {
    const desktopSearch = document.createElement('div');
    desktopSearch.className = 'site-search';
    desktopSearch.innerHTML = `
      <button class="site-search__toggle" type="button" aria-expanded="false" aria-label="Search the site">
        <span aria-hidden="true"></span>
      </button>
      <form class="site-search__panel" role="search" hidden>
        <label class="sr-only" for="siteSearchInput">Search the site</label>
        <input id="siteSearchInput" type="search" placeholder="Search the site" autocomplete="off" />
        <div class="site-search__results" data-search-results></div>
      </form>
    `;
    navCta.prepend(desktopSearch);

    const toggle = desktopSearch.querySelector('.site-search__toggle');
    const panel = desktopSearch.querySelector('.site-search__panel');
    const input = desktopSearch.querySelector('input');
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      if (open) {
        panel.setAttribute('hidden', '');
      } else {
        panel.removeAttribute('hidden');
        requestAnimationFrame(() => input.focus());
      }
    });
    const closeDesktopSearch = () => {
      toggle.setAttribute('aria-expanded', 'false');
      panel.setAttribute('hidden', '');
    };
    $$('.nav__item').forEach(item => {
      item.addEventListener('mouseenter', closeDesktopSearch);
      item.addEventListener('focusin', closeDesktopSearch);
    });
    document.addEventListener('click', (event) => {
      if (!desktopSearch.contains(event.target)) {
        closeDesktopSearch();
      }
    });
    bindSearchForm(desktopSearch.querySelector('form'));
  }

  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenu) {
    const mobileSearch = document.createElement('form');
    mobileSearch.className = 'mobile-search';
    mobileSearch.setAttribute('role', 'search');
    mobileSearch.innerHTML = `
      <label class="sr-only" for="mobileSiteSearchInput">Search the site</label>
      <input id="mobileSiteSearchInput" type="search" placeholder="Search therapies, scheduling, resources" autocomplete="off" />
      <div class="site-search__results mobile-search__results" data-search-results></div>
    `;
    mobileMenu.prepend(mobileSearch);
    bindSearchForm(mobileSearch);
  }

  const navInner = $('.nav__inner');
  const existingMenuBtn = document.getElementById('menuBtn');
  if (navInner && existingMenuBtn && mobileMenu) {
    const mobileSearchShortcut = document.createElement('button');
    mobileSearchShortcut.className = 'mobile-search-shortcut';
    mobileSearchShortcut.type = 'button';
    mobileSearchShortcut.setAttribute('aria-label', 'Search the site');
    mobileSearchShortcut.innerHTML = '<span aria-hidden="true"></span>';
    navInner.insertBefore(mobileSearchShortcut, existingMenuBtn);

    mobileSearchShortcut.addEventListener('click', () => {
      const menuBtn = document.getElementById('menuBtn');
      if (!menuBtn) return;
      const open = menuBtn.getAttribute('aria-expanded') === 'true';
      if (!open) menuBtn.click();
      requestAnimationFrame(() => {
        const input = mobileMenu.querySelector('.mobile-search input[type="search"]');
        if (input) input.focus();
      });
    });
  }

  /* scrolled nav + progress */
  const nav = document.getElementById('nav');
  const bar = document.getElementById('progressBar');

  const onScroll = () => {
    const y = window.scrollY || document.documentElement.scrollTop;
    if (nav) nav.classList.toggle('is-scrolled', y > 12);

    const doc = document.documentElement;
    const max = (doc.scrollHeight - doc.clientHeight) || 1;
    const pct = Math.min(100, Math.max(0, (y / max) * 100));
    if (bar) bar.style.width = pct + '%';
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* mobile menu */
  const menuBtn = document.getElementById('menuBtn');
  const mobile = document.getElementById('mobileMenu');
  if (menuBtn && mobile) {
    menuBtn.addEventListener('click', () => {
      const open = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', String(!open));
      menuBtn.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
      if (open) {
        mobile.classList.remove('is-open');
        mobile.setAttribute('hidden', '');
      } else {
        mobile.removeAttribute('hidden');
        // force reflow then animate
        requestAnimationFrame(() => mobile.classList.add('is-open'));
      }
    });
    $$('a', mobile).forEach(a => a.addEventListener('click', () => {
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.setAttribute('aria-label', 'Open menu');
      mobile.classList.remove('is-open');
      mobile.setAttribute('hidden', '');
    }));

    $$('[data-mobile-toggle]', mobile).forEach(toggle => {
      const panel = document.getElementById(toggle.getAttribute('aria-controls'));
      if (!panel) return;

      toggle.addEventListener('click', () => {
        const open = toggle.getAttribute('aria-expanded') === 'true';

        $$('[data-mobile-toggle]', mobile).forEach(other => {
          if (other === toggle) return;
          const otherPanel = document.getElementById(other.getAttribute('aria-controls'));
          other.setAttribute('aria-expanded', 'false');
          if (otherPanel) otherPanel.setAttribute('hidden', '');
        });

        toggle.setAttribute('aria-expanded', String(!open));
        if (open) {
          panel.setAttribute('hidden', '');
        } else {
          panel.removeAttribute('hidden');
        }
      });
    });
  }

  /* consistent gold press state for button-like controls */
  const pressableControls = $$('.btn, .filter-tab, .nav__menu, .mobile__toggle, .site-search__toggle, .mobile-search-shortcut, .footer-search__button');
  pressableControls.forEach(control => {
    let pressTimer;
    const release = () => control.classList.remove('is-pressing');
    const scheduleRelease = () => {
      window.clearTimeout(pressTimer);
      pressTimer = window.setTimeout(release, 500);
    };

    control.addEventListener('pointerdown', () => {
      window.clearTimeout(pressTimer);
      control.classList.add('is-pressing');
    });
    control.addEventListener('pointerup', scheduleRelease);
    control.addEventListener('pointerleave', scheduleRelease);
    control.addEventListener('pointercancel', scheduleRelease);
    control.addEventListener('blur', scheduleRelease);
  });

  /* therapy category filters */
  $$('[data-filter-tabs]').forEach(filterTabs => {
    const scope = filterTabs.closest('section') || document;
    const buttons = $$('[data-filter]', filterTabs);
    const cards = $$('[data-filter-card]', scope);
    const cardContainer = cards[0] ? cards[0].parentElement : null;

    const applyFilter = (filter = 'all') => {
      buttons.forEach(button => {
        const active = (button.dataset.filter || 'all') === filter;
        button.classList.toggle('is-active', active);
        button.setAttribute('aria-pressed', String(active));
      });

      if (cardContainer) cardContainer.classList.toggle('is-filtered', filter !== 'all');

      let visibleIndex = 0;
      cards.forEach(card => {
        const tags = (card.dataset.tags || '').split(/\s+/);
        const show = filter === 'all' || tags.includes(filter);
        card.hidden = !show;
        card.classList.remove('is-filter-odd', 'is-filter-even');
        if (show) {
          visibleIndex += 1;
          card.classList.add(visibleIndex % 2 ? 'is-filter-odd' : 'is-filter-even');
        }
      });
    };

    buttons.forEach(button => {
      button.addEventListener('click', () => {
        applyFilter(button.dataset.filter || 'all');
      });
    });
  });

  /* active section highlighting (nav + rail) */
  const sectionIds = ['top', 'not-broken', 'guide', 'approach', 'help', 'next-step', 'assessment', 'therapies', 'reviews', 'philosophy', 'book'];
  const sections = sectionIds
    .map(id => document.getElementById(id))
    .filter(Boolean);

  const navLinks = $$('.nav__links a[data-link]');
  const railLinks = $$('.rail a[data-rail]');

  const setActive = (id) => {
    navLinks.forEach(a => {
      const target = a.getAttribute('href').replace('#', '');
      a.classList.toggle('is-active', target === id);
    });
    railLinks.forEach(a => {
      a.classList.toggle('is-active', a.dataset.rail === id);
    });
  };

  if ('IntersectionObserver' in window && sections.length) {
    const io = new IntersectionObserver((entries) => {
      // pick the entry with largest intersection ratio that is intersecting
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible && visible.target && visible.target.id) {
        setActive(visible.target.id);
      }
    }, {
      rootMargin: '-40% 0px -50% 0px',
      threshold: [0, 0.2, 0.5, 0.8, 1]
    });
    sections.forEach(s => io.observe(s));
  }

  /* reveal-on-scroll ✦ cards/steps subtly lift and fade in as they enter view.
     Only applied if motion is allowed AND IntersectionObserver is supported. */
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const revealEls = $$('.step, .card, .therapy, .therapy-card, .faq, .hero__panel');
    revealEls.forEach(el => el.classList.add('reveal'));
    const ro = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          e.target.style.transitionDelay = (i % 4) * 50 + 'ms';
          e.target.classList.add('is-in');
          ro.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px 10% 0px', threshold: 0.01 });
    revealEls.forEach(el => ro.observe(el));
  }

  /* SEO: auto-generate FAQPage JSON-LD from .faq-list content when not already present */
  const hasFaqSchema = () => $$('script[type="application/ld+json"]').some(s => {
    try {
      const data = JSON.parse(s.textContent);
      return data['@type'] === 'FAQPage';
    } catch { return false; }
  });

  const injectFaqSchema = () => {
    if (hasFaqSchema()) return;
    const faqs = $$('.faq-list .faq, .faq-list article.faq');
    if (!faqs.length) return;
    const mainEntity = faqs.map(faq => {
      const q = $('h3', faq) || $('h2', faq);
      const a = $('p', faq);
      if (!q || !a) return null;
      return {
        '@type': 'Question',
        name: q.textContent.trim(),
        acceptedAnswer: { '@type': 'Answer', text: a.textContent.trim() }
      };
    }).filter(Boolean);
    if (!mainEntity.length) return;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.dataset.faqSchema = 'auto';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity
    });
    document.head.append(script);
  };
  injectFaqSchema();

  /* SEO: privacy policy link in footer */
  $$('.footer__bottom').forEach(bottom => {
    if (bottom.querySelector('a[href*="privacy-policy"]')) return;
    const copyright = bottom.querySelector('p:first-child');
    if (!copyright) return;
    const sep = document.createTextNode(' · ');
    const link = document.createElement('a');
    link.href = './privacy-policy.html';
    link.textContent = 'Privacy Policy';
    copyright.append(sep, link);
  });

  /* SEO: clinic name disambiguation (distinct from similarly named local clinics) */
  $$('footer.footer').forEach(footer => {
    if (footer.querySelector('.footer__disambiguation')) return;
    const note = document.createElement('p');
    note.className = 'footer__disambiguation';
    note.textContent = 'Idaho Regenerative Medicine is an independent clinic and is not affiliated with or associated with the Idaho Center for Regenerative Medicine or other similarly named clinics in the Treasure Valley.';
    footer.append(note);
  });
})();
