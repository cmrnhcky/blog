# cameronhickey.com — Claude Code Build Brief (v2)
## Phase 1: The Hub

> Hand this to Claude Code. Every decision is made. No ambiguity. Execute.
> Cross-reference: cameronhickey-site-reference.md for full brand context.
> **v2 changes folded in:** single styling model, Rock Salt demoted to short moments, real social URLs, safe meta description, calmer dark/light rhythm, personal favicon, 404 page, GA4 wired with placeholder ID, hero restraint.

---

## What We Are Building

A personal publication hub for Cameron Hickey. Phase 1 is a single-page Astro site — the home base every social platform links back to. It must feel warm, textured, scripty, and unmistakably human. The guiding principle: **"Be yourself; everyone else is already taken."**

This is not a portfolio. Not an agency page. Not a blog template. It is a statement of taste.

---

## Tech Stack — RESOLVED (one model only)

- **Framework:** Astro, latest stable. Scaffold a **minimal** template, TypeScript strict. Do not hard-code `npm create` flags — adapt to the installed Astro version's prompts/flags.
- **Styling:** **Plain CSS with custom properties, in a single `global.css`.** No Tailwind. The aesthetic (grain texture, Rock Salt, quote-forward layout, warm palette) is custom CSS that utility classes fight against. One styling model, no reconciliation mid-build.
  - *Note: this overrides the Tailwind-CDN default in the generic CLAUDE.md. That CLAUDE.md is for screenshot-recreation tasks; this is a from-scratch brand build. Follow this brief.*
- **Fonts:** Google Fonts — Rock Salt, Spectral, Syne. Preconnect + single stylesheet link.
- **Forms:** Netlify Forms (HTML attribute, no JS).
- **Hosting:** Netlify, static output (Astro default).
- **Analytics:** GA4 wired in `<head>` with placeholder ID `G-XXXXXXXXXX` and a clear `TODO`. It loads; just swap the ID on deploy so launch-week data isn't lost.
- **No CMS. No database. No JS frameworks. No Tailwind.**

---

## Project Structure

```
cameronhickey/
├── public/
│   └── favicon.svg          (personal "CH" mark — NOT the agency monogram)
├── src/
│   ├── layouts/
│   │   └── Base.astro       (head, fonts, GA4, grain overlay, meta)
│   ├── pages/
│   │   ├── index.astro      (the entire Phase 1 site)
│   │   └── 404.astro        (simple, on-brand, one Wilde line)
│   └── styles/
│       └── global.css       (CSS variables, grain texture, type scale, resets)
├── astro.config.mjs
├── package.json
└── CLAUDE.md                (copy this brief in)
```

---

## Design System

### Fonts — ROLE-RESTRICTED (important)
```css
--font-script: 'Rock Salt', cursive;          /* SHORT moments ONLY — see rule below */
--font-serif:  'Spectral', Georgia, serif;    /* body, long-form, AND long quotes */
--font-sans:   'Syne', system-ui, sans-serif; /* nav, labels, UI, buttons */
```

**Rock Salt rule — read carefully.** Rock Salt is a heavy, wide, irregular handwriting face. It is beautiful for 1–5 words and illegible/oversized for full sentences. **Use Rock Salt ONLY for:**
- "Cameron Hickey" (name)
- The counter-line "Price is nothing. Value is everything."
- Pillar names (The Pour, The Mile, etc.)
- Short section flourishes ("Occasional notes.")

**Never set a full sentence or multi-line quote in Rock Salt.** Long quotes go in **Spectral italic** — elegant and readable at length. This is also what the reference doc specifies.

### Color Palette
```css
/* Dark surfaces (hero, footer) */
--ink-deep:  #0d1209;   /* near-black, green undertone */
--ink-mid:   #1a2e1a;   /* dark section background */
--gold:      #b8956a;   /* accent — quote marks, Rock Salt moments, links */
--sea-dim:   rgba(232,244,240,0.72);
--sea:       #e8f4f0;

/* Light surfaces (the warm middle) */
--paper:     #f5f0e8;   /* warm cream — primary content background */
--paper-mid: #ede8df;   /* card backgrounds */
--ink:       #1a1208;   /* warm near-black body text */
--ink-soft:  #4a3f30;
--ink-muted: #8a7a68;
--rule:      #d4c9b8;

/* Connective tissue to hickeyave.com — use sparingly */
--atlantic:  #0a3d2e;
```

### Grain Texture (the shared signal with hickeyave.com)
```css
--grain-dark:  url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.06 0'/></filter><rect width='220' height='220' filter='url(%23n)'/></svg>");
--grain-light: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.04 0'/></filter><rect width='220' height='220' filter='url(%23n)'/></svg>");
```
Apply `--grain-dark` on dark sections, `--grain-light` subtly on the warm middle for continuity.

---

## Section Rhythm — REWORKED (calmer, editorial)

Old version alternated dark/light/dark/light/dark — a zebra effect. New rhythm: **two dark bookends, one continuous warm middle.**

```
1. HERO              → DARK  (grain-dark)
2. PILLARS           → WARM  (paper)
3. QUOTE WALL        → WARM  (paper-mid, slightly inset — NOT dark)
4. NOW               → WARM  (paper)
5. EMAIL CAPTURE     → DARK  (grain-dark)  ← begins the closing bookend
6. FOOTER            → DARK  (ink-deep)
```

The warm middle reads as one continuous editorial space (pillars → quotes → now), bookended by dark drama at top (the manifesto) and bottom (email + footer). Differentiate sections 2–4 with spacing, rules, and inset backgrounds rather than full color flips.

---

## Page Build — section by section

### 1. NAV
- Fixed; transparent over hero, solid (`--ink-deep` with slight blur) on scroll.
- Left: "Cameron Hickey" in Rock Salt (small), links to `#top`.
- Right (Syne, label style): Writing · Watch · Now · About. These are Phase-2 destinations — for Phase 1 they anchor-scroll to the relevant section or carry `<!-- TODO: route in Phase 2 -->`.
- Mobile < 768px: burger → fullscreen `--ink-deep` overlay.
- `aria-label="Main navigation"`. No CTA button.

---

### 2. HERO — DARK, grain. RESTRAINT IS THE POINT.

**The manifesto owns the first screen. Let it breathe — do not crowd it.**

Full viewport height. Content max-width ~720px, vertically centered, left-aligned.

```
[Syne label, gold, uppercase, letter-spaced]
OSCAR WILDE · 1892

[Spectral italic, large — clamp(1.6rem, 3.2vw, 2.6rem) — sea, line-height 1.4]
"A cynic is a man who knows the price
of everything and the value of nothing."

[thin gold rule, ~2.5rem wide]

[Rock Salt — SHORT, this is the high-impact moment — clamp(1.3rem, 2.4vw, 2rem), gold]
Price is nothing. Value is everything.
```

> Note: the long Wilde quote is **Spectral italic**, not Rock Salt. The Rock Salt punch is reserved for the short counter-line. This is the corrected hierarchy.

**Cameron's identity is the SECOND beat — push it lower so the manifesto stands alone on first paint.** Place name + bio + socials near the bottom of the hero (or just into scroll):

```
[Rock Salt, ~1.8rem, sea]
Cameron Hickey

[Syne label, muted sea]
Father, founder and drinker amongst other nouns.

[social icon row — real URLs below]
```

Scroll cue: small gold "↓" bottom-center, gentle loop.

**Real social URLs (no placeholders):**
- LinkedIn — https://www.linkedin.com/in/cmrnhcky/
- YouTube — https://www.youtube.com/@cmrnhcky
- Instagram — https://instagram.com/cmrnhcky
- X / Twitter — https://twitter.com/cmrnhcky

---

### 3. PILLARS — WARM (paper)

Label: "FIVE WAYS IN." (Syne, gold).

Five cards, 2-col desktop / 1-col < 640px. Each:
- Pillar name — **Rock Salt** (short, so it's allowed), atlantic green.
- One line — Spectral italic.
- "→" link, `href="#"` with `<!-- TODO: Phase 2 route -->`.

| Pillar | Line |
|---|---|
| The Pour | Drinks with discernment. Beer, whiskey, gin. Value over prestige. |
| The Mile | Running, the outdoors, scenic routes. Discipline and where it leads. |
| The Bet | Gambling with a bankroll brain. Value plays, honest wins and losses. |
| The Boy | Fatherhood, Oscar, the morning. First generation, figuring it out. |
| The Ledger | Money, value, don't waste it. The frugal-but-not-cheap philosophy. |

Cards on `--paper-mid`, border `--rule`. Hover: lift 2px, border → gold.

---

### 4. QUOTE WALL — WARM (paper-mid, inset)

Label: "LINES WORTH KEEPING." (Syne, gold).

Three quotes, staggered sizes/indents. **All in Spectral** (long-form = serif, per the rule) — vary size and weight, not font, for rhythm. Gold quotation marks as oversized decorative elements.

```
Large, Spectral italic, ink:
"To live is the rarest thing in the world. Most people exist, that is all."

Medium, Spectral, ink-soft, indented:
"We are all in the gutter, but some of us are looking at the stars."

Small, Spectral italic, ink-muted:
"Be yourself; everyone else is already taken."
```

Each attributed "— Oscar Wilde" (Syne, tiny, muted). Bottom link: "See all the lines →" `href="#"` `<!-- TODO: /quotes in Phase 2 -->`.

---

### 5. NOW — WARM (paper)

Label: "RIGHT NOW." (Syne, gold).

Four tiles, 2x2 → 1-col < 640px. **No emoji** — use a small inline SVG line-icon OR just the Syne label, keeping craft consistent.

```
RUNNING    — Spectral: "Currently training for —"
DRINKING   — Spectral: "Last MVP: —"
BETTING    — Spectral: "On the board: —"
WATCHING   — Spectral: "Matchday: —"
```

Tiles on `--paper-mid`. Footnote, Spectral italic, muted: *"Updated whenever. Not a schedule."*

(Static preview in Phase 1; becomes dynamic in Phase 3.)

---

### 6. EMAIL CAPTURE — DARK, grain (opens the closing bookend)

```
[Rock Salt, medium, sea]
Occasional notes.

[Spectral, muted sea]
No schedule. No spam. Just the things worth sharing.
```

```html
<form name="notes-signup" method="POST" data-netlify="true">
  <input type="hidden" name="form-name" value="notes-signup" />
  <label class="sr-only" for="email">Email address</label>
  <input id="email" type="email" name="email" placeholder="your@email.com" required />
  <button type="submit">I'm in</button>
</form>
```

Field: full width, paper background, ink text. Button: atlantic green, sea text, Syne uppercase, sharp corners.

---

### 7. FOOTER — DARK (ink-deep)

- Left: "Cameron Hickey" — Rock Salt, small, gold.
- Center: `© 2026 Cameron Hickey` / `Florida, USA` (Syne, muted). *Drop "everywhere else too" — it echoes the agency's "operating globally"; keep them distinct.*
- Right: social icons (real URLs above).
- Very bottom, centered, tiny Syne, muted — the ONLY agency mention:
  `Digital infrastructure for growing business → hickeyave.com`

---

### 8. 404 PAGE — src/pages/404.astro

Dark, minimal, centered. One Wilde line in Spectral italic — e.g. *"To expect the unexpected shows a thoroughly modern intellect."* — and a Rock Salt "Cameron Hickey" link home. Cheap, on-brand, delightful.

---

## Type Scale
```css
.script-lg { font-family: var(--font-script); font-size: clamp(1.6rem, 3vw, 2.4rem); line-height: 1.3; }
.script-md { font-family: var(--font-script); font-size: clamp(1.3rem, 2.4vw, 2rem);  line-height: 1.3; }
.script-sm { font-family: var(--font-script); font-size: 1rem; }

.serif-quote { font-family: var(--font-serif); font-style: italic; font-size: clamp(1.6rem, 3.2vw, 2.6rem); line-height: 1.4; }
.serif-body  { font-family: var(--font-serif); font-size: 1.05rem; line-height: 1.85; }

.label { font-family: var(--font-sans); font-size: 0.68rem; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; }
```

---

## Motion (restrained)
- Hero: staggered fade-up on load — label → quote → rule → counter-line → (lower) name/bio/socials. `animation-delay` ~0.15s steps. The lower identity block can fade in slightly later to reinforce the "second beat."
- Pillars + Now tiles: fade-up on scroll (IntersectionObserver).
- Quote wall: **no animation** — let them sit heavy.
- Email button: background shift on hover, no bounce.
- Nav: opacity/solid transition on scroll.
- Respect `prefers-reduced-motion` — disable transforms if set.

---

## Responsive
- Mobile-first. Nav → burger < 768px. Pillars 2→1 col < 640px. Now 2x2→1 col < 640px. Section padding `1.5rem` mobile → `4rem` desktop. Hero type scales via `clamp()`.

---

## Accessibility
- `alt` on meaningful images, `aria-hidden` on decorative (grain, scroll cue).
- Form input labelled (`.sr-only` label shown above).
- Visible focus states on all interactive elements.
- Body text meets WCAG AA contrast on both dark and warm surfaces.
- `prefers-reduced-motion` honored.

---

## SEO + Head (Base.astro)
```html
<title>Cameron Hickey</title>
<meta name="description" content="The personal site of Cameron Hickey — founder of Hickey Avenue. Notes on value over price: running, whiskey, fatherhood, and the math of a good bet." />
<meta property="og:title" content="Cameron Hickey" />
<meta property="og:description" content="Price is nothing. Value is everything." />
<meta property="og:url" content="https://cameronhickey.com" />
<meta property="og:type" content="website" />
<link rel="canonical" href="https://cameronhickey.com/" />

<!-- GA4 — TODO: replace G-XXXXXXXXXX with real Measurement ID before/at deploy -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```
> Meta description corrected: keeps the voice but reads safely out of context (search snippets, link previews) — "drinker" with no tonal cushion was a risk naked in SERPs. The site itself keeps "Father, founder and drinker amongst other nouns."

---

## Favicon
A personal **"CH"** mark — NOT the Hickey Avenue "HA" monogram. This is the distinct personal property; borrowing the agency mark muddies the "subtly linked, separate identity" line. Simple SVG: warm dark background, gold or cream "CH". Match the site's palette, not the agency's.

---

## What Is NOT Built in Phase 1
Do not scaffold or stub: `/writing`, `/about`, `/watch`, `/now` (standalone), `/quotes`, `/ledger`, RSS, sitemap. Nav links and "→" links carry `<!-- TODO: Phase 2 -->`. The homepage Now section is a static preview only.

---

## Definition of Done — Phase 1
- [ ] `npm run build` exits clean, zero errors
- [ ] Renders correctly at 375 / 768 / 1280px
- [ ] Single styling model — plain CSS + variables, no Tailwind present
- [ ] Rock Salt used ONLY for short moments; long quote is Spectral italic
- [ ] Section rhythm: dark hero → warm middle (pillars/quotes/now) → dark email+footer
- [ ] Real social URLs in place (no `#` placeholders for socials)
- [ ] GA4 snippet present with `G-XXXXXXXXXX` placeholder + TODO
- [ ] Netlify Forms attribute present; submission works on deploy
- [ ] `404.astro` present and on-brand
- [ ] Personal "CH" favicon (not agency "HA")
- [ ] Hickey Avenue mentioned once, footer only
- [ ] Meta description is the safe-out-of-context version
- [ ] `prefers-reduced-motion` honored; no console errors
- [ ] Grain visible on dark sections; Rock Salt loads

---

## First Steps in Claude Code
1. Scaffold a minimal Astro project (TypeScript strict). Let the agent use the correct flags for the installed version — do not hard-code stale ones.
2. `cd` in, `npm install`, `npm run dev`.
3. Build order: `global.css` (variables, grain, type scale) → `Base.astro` (head, fonts, GA4, meta) → `index.astro` section by section, top to bottom → `404.astro`.
4. Verify against Definition of Done.

> Reference doc (cameronhickey-site-reference.md) holds full brand context. Decision rule when anything is unclear: **more Cameron, less everyone else.**
