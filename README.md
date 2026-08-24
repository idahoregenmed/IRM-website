# Idaho Regenerative Medicine — Homepage Prototype

A static, single-page homepage prototype for **Idaho Regenerative Medicine**, a naturopathic regenerative-medicine clinic in Boise / the Treasure Valley.

## Files

```
idaho-regenerative-medicine/
├── index.html       # Markup, sections, inline SVG logo & icons
├── styles.css       # Design system, layout, responsive, motion
├── script.js        # Sticky nav, progress bar, mobile menu, reveals, active section
└── README.md        # This file
```

No build step. No backend. No external secrets. Open `index.html` directly in a browser, or deploy the directory as static files.

## Design decisions

**Art direction:** Warm clinical / longevity. Parchment & cream surfaces with deep evergreen and teal anchors, accented by a restrained gold and a single terracotta highlight. Mineral neutrals provide rest. The look is editorial-premium but grounded — not "wellness pastel," not hospital-cool.

**Tone:** Hopeful, premium, patient-empowering, clinically credible. The copy avoids guaranteed outcomes; therapies are framed as tools that *support* the body's repair pathways. A disclaimer in the Therapies section makes the educational framing explicit.

**Typography:**
- Display / editorial: **Fraunces** (Fontshare) — a contemporary serif with optical sizing that carries warmth and clinical seriousness without feeling stuffy.
- Body / UI: **Satoshi** (Fontshare) — a clean grotesk with personality, paired at 400/500/600.
- Eyebrows / metadata: **DM Mono** for typographic contrast and "field-guide" feel.

**Color tokens** (see `:root` in `styles.css`):
- `--parchment` / `--cream` — surfaces
- `--evergreen` / `--evergreen-2/3` — primary deep
- `--teal` / `--teal-2` — secondary accent
- `--gold` / `--gold-deep` — accent
- `--terracotta` — highlight (used sparingly in italic display words)
- `--sage` / `--mineral` / `--bone` — quiet neutrals

**Logo:** Custom inline SVG mark — two converging waves (regeneration / signal) with a gold seed at the apex. Rendered in `currentColor` so it adapts to dark surfaces (footer, philosophy book cover). A simplified version is set as the SVG favicon via inline data URI.

## Sections

1. **Hero** — Headline ("Rebuild health, movement, and resilience — from the inside out."), lede, primary CTA (Book a Consultation), secondary CTA (Explore Our Approach), trust badges, and a sidebar "framework panel" summarizing the four-stage approach with an inline SVG signal-line motif.
2. **You're Not Broken** — Two-column editorial passage. "Symptoms as signal, not failure" plus three pillar callouts (signal, terrain, repair).
3. **Our Approach** — Four-step framework cards: Listen & Map, Restore the Terrain, Regenerate Tissue, Optimize Longevity. Each step uses its own accent color via a CSS custom property.
4. **What We Help With** — 9-card grid: chronic pain, arthritis, sports injuries, autoimmune patterns, hormonal imbalance, metabolic dysfunction, stress & nervous system, weight & body composition, and a feature card for longevity & healthspan (inverted dark variant for visual rhythm).
5. **Regenerative Therapies** — Dark evergreen section with editorial 2-column list of PRP, stem cell therapies, peptides, exosomes, prolotherapy, IV/nutrient therapy. Each is presented educationally with a category tag and prose. A boxed disclaimer reinforces no-guarantee framing.
6. **Philosophy / Medicine Reimagined** — Editorial sidebar with a custom CSS-built book mockup (no image asset) tied to the user's *Medicine Reimagined* book, alongside a longer-form philosophy passage with a pull quote and four pillars (Communication, Terrain, Repair, Resilience).
7. **CTA Footer** — Dark conversion section: "The next step is a conversation, not a commitment." with primary gold CTA, secondary ghost CTA, and three info blocks (location, hours, contact).
8. **Footer** — Brand block, navigation, contact, fineprint with educational/medical disclaimer.

## Prototype interactions

- **Sticky translucent nav** with backdrop-blur and a "scrolled" state
- **Scroll progress bar** (gold → terracotta → teal gradient) at the top of the viewport
- **Active-section highlighting** in both the top nav and a desktop floating side rail
- **Floating side rail** (≥1240px) — minimal mono labels that expand on hover/active, with an animated gold underline marker
- **Smooth scroll** to anchors (CSS), respecting `prefers-reduced-motion`
- **Mobile menu** with animated hamburger → close
- **Reveal-on-scroll** for section heads, cards, steps, and panels (disabled under `prefers-reduced-motion`)
- **Hover/focus states** on every CTA, card, step, and therapy row
- **Marquee strip** of regenerative-medicine modalities under the hero (paused implicitly by `prefers-reduced-motion`)
- **Visible focus outlines** on all interactive elements

## Responsive

- **≥1240px** — full grid with floating side rail
- **1024–1239px** — desktop without rail
- **≤1024px** — nav collapses to mobile menu, hero stacks, 4-step grid → 2 columns, philosophy stacks
- **≤720px** — single-column everywhere; therapies, steps, cards all stack

## Editing

To make follow-up edits:

- **Copy/content** — edit `index.html`. Sections are identified by `id` (`#approach`, `#help`, `#therapies`, `#philosophy`, `#book`).
- **Color/type** — change CSS custom properties in `:root` at the top of `styles.css`. Step accents are set inline via `style="--accent: ..."` on each `.step`.
- **Add a section** — duplicate any `<section class="section">` block and add an `id`. To include it in the floating rail, add an `<li>` with `data-rail="<id>"` to the `.rail` `<ol>` and add the id to `sectionIds` in `script.js`.
- **Logo** — the inline SVG lives twice (header + footer). Both use `currentColor` for the strokes and `var(--gold)` for the seed.
- **Disclaimers** — `.disclaimer` and `.footer__fineprint` carry the educational framing; keep these intact.

## Deploy

Static files only. Drop the directory on any static host (S3, Netlify, Vercel, GitHub Pages), or use the Perplexity `deploy_website` flow with `entry_point: index.html`.
