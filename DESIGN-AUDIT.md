# cmrnhcky.com — Design System Audit & Esquire Direction

> Audit of the shipped site (live 2026-08-26) against the stated ambition: *Esquire-grade
> sophistication, entertainment over information, adjacent to Hickey Avenue but not identical.*
> Supersedes `cameronhickey-site-reference.md` (and its two byte-identical copies `_1`, `_2`)
> and `CLAUDE_CODE_BRIEF.md`, both of which describe a site that no longer exists.
> **2026-08-26, updated 2026-08-27 after pass 2. Parts I–III are the original analysis;
> Part V is the build log. Part IV's three questions are all answered and folded in.**

---

## Summary

**Components reviewed:** 14 · **Issues found:** 21 · **Score: 58/100**

The site is well-built and genuinely shipped. The problem is not craft — it's that **the visual
system it's built on is aimed at a different brand than the one described.** Right now the site
reads *warm American craft* — cream paper, hand-lettering, grain, folk texture. That is a
brewery-and-farmhouse aesthetic. Esquire is the opposite register: cold, high-contrast,
photograph-forward, ruthlessly typographic, black-and-paper with one accent. Both are legitimate.
They are not compatible, and the site currently pays for both.

Three findings carry the rest:

1. **Rock Salt is the wrong font in the wrong place, and it's welding the two brands together at
   the surface instead of at the philosophy.**
2. **The IA is topic-first (five pillars) while the stated method is "write, then categorize."**
   Format-first is the fix and it is also, exactly, the Esquire method.
3. **The accent color fails contrast on every light surface it's used on** — links in body copy
   sit at 2.45:1.

---

## Part I — The critiques you need to make

### 1. Adjacency is currently at the wrong layer

Today the two brands share **typography and texture** and diverge in **content**. That's backwards.

| | Should be shared | Should diverge |
|---|---|---|
| Philosophy (value by design, discernment) | ✅ shared | |
| Editorial voice (dry, plain, earned punchline) | ✅ shared | |
| Grain texture (`feTurbulence` noise) | ✅ shared — this is enough | |
| Typeface | | ❌ currently shared |
| Palette | | ❌ currently near-shared |
| Layout logic | | ❌ currently shared |

The test: **someone should be able to tell it's the same person from the writing, and not from
the CSS.** Right now it's the reverse. Rock Salt on both sites means the personal site reads as an
agency side-project — which is precisely the thing that disqualifies it from working as a
lead magnet. A lead magnet works only when it doesn't look like marketing.

**Recommendation:** Rock Salt becomes exclusive to Hickey Avenue. The connective tissue moves to
grain + a shared gold. That's a quieter thread and a stronger one.

### 2. Rock Salt is also failing on its own terms

It's currently used at `0.62rem` (pillar names), `0.75rem` (footer logo), and `0.8rem` (nav logo).
Handwriting rendered at 10–13px doesn't read as personality; it reads as a font that failed to
load. And handwriting fonts are the single strongest "small local business" signal in the entire
typographic vocabulary — the opposite of imbued sophistication.

### 3. The site says "value by design"; you're now saying "art for art's sake." Those fight.

"Value by design / don't waste your money / the $13 whiskey that drinks like $40" is a **utility**
frame — it's a consumer-advice publication. "Entertainment over info, art for art's sake" is an
**editorial** frame. You can't lead with both.

**Recommendation — keep both, but rank them:** discernment is the *subject*, entertainment is the
*treatment*. You render verdicts, and the pleasure is in the rendering. That is literally Esquire's
Endorsement column. It also protects the agency thread: a man with verdicts is someone you hire.

### 4. Oscar Wilde is over-leveraged to the point of undermining the claim

The homepage carries three quotes; all three are Wilde. `quotes.json` is effectively a Wilde file.
The stated logic is *"curating quotes is a display of taste."* Curating **one author** is a display
of having read one author. Taste is demonstrated by **range** — the surprise of the pairing is the
whole trick. Wilde next to a boxing trainer next to a bond investor is taste. Wilde next to Wilde
next to Wilde is a favorite book.

**Recommendation:** Wilde stays as the *motto* (one line, one placement, the manifesto slot). The
quote wall needs ≥12 authors and at most two Wildes. Ration him.

### 5. Five topical pillars are a promise you're about to break

`Pours / Miles / Bets / Kids / Essentials` is a taxonomy committed to *up front*. Your stated
method is "write to write and categorize when finished." Those are incompatible: the pillars grid
on the homepage is a public contract that five specific subjects will keep producing. The first
piece that doesn't fit — and with an entertainment mandate, most won't — either gets mis-filed or
doesn't get written.

**This is the most important structural critique in the document.** See Part III.

### 6. Three competing taxonomies exist in the codebase right now

| Source | Names |
|---|---|
| `src/content.config.ts` (the enum that actually validates) | Pours · Miles · Bets · Kids · Essentials |
| `cameronhickey-site-reference.md` | The Pour · The Mile · The Bet · The Boy · The Ledger |
| Section / route names | Living · Saying · Guessing · Cameron |

Three vocabularies for one site. The gerunds (Living/Saying/Guessing) are the best of the three —
they're distinctive and they're verbs, which suits a publication about doing things. The
`The [Noun]` set is dead; delete it with the stale reference docs.

### 7. "Lead magnet" is unfunded

Nothing on the site converts, and nothing is instrumented to show whether it influences anything.
One email field with no offer behind it, and the only Hickey Avenue link is a 0.68rem footnote at
30% opacity.

**Recommendation: stop calling it a lead magnet and call it what it actually is — a credibility
asset.** It works *after* contact, not before: a prospect Googles you between the call and the
proposal, finds a man with a publication, and the price objection gets quieter. That's real and
it's worth building. But it means the KPI is not signups.

Then fund it with the one page that does convert: **the colophon.** "How this site is built" is
the highest-leverage page for the agency on the entire domain, it's still unbuilt, and it sells
nothing explicitly. Builders and business owners both read colophons. Build it.

### 8. The rotating hero is the least sophisticated element on the site

Five iPhone photos (`IMG_2324.JPG`, `IMG_6720.jpeg` …) on a 40-second Ken Burns crossfade. Esquire
is photograph-forward and has never once run a slideshow — a rotating hero is a 2014 move, it
tanks LCP, and the filenames give away that the images weren't art-directed.

**Recommendation:** one photograph, full bleed, chosen deliberately, with a caption set in
letterspaced small caps. *Or* — equally Esquire and free — no photograph at all: a full-bleed
typographic cover with the issue number, the date, and the standfirst. Given the current photo
library, take the typographic option now and upgrade when there are real images.

### 9. Named-entity collision — verify before you invest in name SEO

There is a reasonably prominent Cameron Hickey in journalism/misinformation research. Confirm the
current SERP for "Cameron Hickey" before you commit budget or backlinks to ranking your own name.
This does not change the brand; it changes whether name-search is a viable acquisition channel or
a lost cause you should stop counting on. **Verify, don't assume.**

### 10. Removing Guessing is right — and it costs you one of the three "originality core" items

`TASKS.md:65` has the removal queued. Correct call: a betting ledger is a dashboard artifact, it's
the least sophisticated thing on the site, and "honest wins and losses" is a trust play for an
audience you don't have yet. It also drags an entire semantic color layer (`--loss`, `.badge--win`,
`.badge--push`, `.ledger-stats`) that nothing else uses.

But the old reference doc's "originality trio" was *now page + betting ledger + Oscar said.* Remove
Guessing and you need a third. **Take the third from the formats list in Part III — "Better Than"
is the strongest candidate and it's the one you named yourself.**

---

## Part II — The design system audit

### Token coverage

| Category | Defined | Problems found |
|---|---|---|
| Colors | 16 real + **11 legacy aliases** | 3 hardcoded hex outside the token layer |
| Typography | 3 families, **0 scale** | 25 distinct `font-size` values; 6 unrelated `clamp()` curves |
| Spacing | 6 steps (pure doubling) | Gaps at 1.5/3rem force inline improvisation |
| Borders / radius | 2 rule colors, no radius token | `border-radius: 0` set inline to defeat UA styles |
| Shadows | none | — |
| Motion | none | 5 durations hardcoded (0.2/0.25/0.3/0.35/0.55s) |

**Dead alias layer.** `--navy`, `--navy-mid`, `--color-accent`, `--color-ink`, `--color-muted`,
`--color-gold`, `--color-rule`, `--display`, `--serif`, `--script`, `--sans` — eleven aliases over
nine real tokens. `--navy` is now actively misleading: it resolves to `#0d1209`, a green-black.
Delete the layer; it's a migration scaffold that outlived the migration.

**Hardcoded values that should be tokens:**

| Location | Value | Should be |
|---|---|---|
| `.badge--loss` | `#8b3030` | `var(--loss)` — the token exists and is unused |
| `.badge--win` | `#3d7a52` | needs a `--win` token |
| `.email-capture__btn:hover` | `#0d5040` | needs `--atlantic-lift` |

### Contrast failures (measured, WCAG AA 4.5:1 for body text)

| Pair | Ratio | Verdict |
|---|---|---|
| `--gold #b8956a` on `--paper` | **2.45:1** | ❌ fails badly — **this is the link color** |
| `--gold` on `--paper-mid` | **2.28:1** | ❌ fails — section labels, quote attributions |
| `--ink-muted #8a7a68` on `--paper` | **3.66:1** | ❌ fails — post excerpts, pillar descriptions |
| `--ink-muted` on `--paper-mid` | **3.40:1** | ❌ fails |
| `.badge--win #3d7a52` on `--paper-mid` | 4.19:1 | ⚠️ marginal |
| `--gold` on `--ink-deep` | 6.81:1 | ✅ passes |
| `--ink-soft` on `--paper` | 9.05:1 | ✅ |
| `--atlantic` on `--paper` | 10.76:1 | ✅ |

The pattern is clean and the fix follows from it: **gold works on dark and fails on light.** One
gold cannot serve both surfaces. Split it into a surface-paired pair — and the darker light-surface
gold is *also* the more Esquire choice, because Esquire's accent is never a soft tan.

### Other system findings

- **`html { font-size: 18px }`** overrides the user's browser root size. Anyone who has enlarged
  their default text gets it silently discarded. Use `100%` and scale with `rem`.
- **Syne is set as the body font.** `p { font-family: var(--font-sans) }` — Syne is a display
  geometric with quirky letterforms; at 1rem/1.75 across long paragraphs it is genuinely tiring.
  `.prose p` correctly overrides to Spectral, so *article bodies* are fine and *everything else on
  every page* is not. The header comment in `global.css` says Spectral is the body font. The CSS
  disagrees with its own documentation.
- **Inline styles are the biggest system leak.** 66 `style=` attributes across 8 page files —
  16 in `index.astro` alone, where the entire "Living / Guessing / Cameron" grid is built from
  inline declarations rather than a component. Every one of those is a token the system doesn't
  know about.
- **No `prefers-color-scheme` handling.** Acceptable for a committed single-look editorial site —
  but it should be a stated decision in the system, not an omission.
- **No `prefers-reduced-motion` coverage for `.fade-up`** (the hero block is covered; the
  scroll-triggered fades are not).
- **Type scale has no ratio.** Six `clamp()` curves with unrelated slopes means components resize
  at different rates and the hierarchy visibly reorders itself between 375px and 1440px.

---

## Part III — The Esquire method (the improvements worth making)

### 1. Formats, not topics — the single biggest change

Esquire's durability doesn't come from covering subjects. It comes from **departments**: recurring
*forms* that repeat regardless of subject. *What I've Learned. The Endorsement. Things a Man Should
Know.* The form is the franchise; the topic is whatever showed up that month.

Look at what you actually described wanting to publish: **music playlists · quotes · top beers ·
reasons why this is better than that.** Those are not four topics. **Those are four formats.**
You already think in formats. The site doesn't.

Format-first solves the "write to write and categorize when finished" problem structurally instead
of tolerating it — because you don't categorize by *what it's about*, you categorize by *what shape
it came out in*, and the shape is knowable the moment it's finished.

**Proposed departments:**

| Department | Form | Example |
|---|---|---|
| **The Endorsement** | One thing. Why it's worth it. ~300 words, ends on a verdict. | The $13 whiskey |
| **Better Than** | A vs B, argued to a conclusion. Your own phrasing. | Cans > bottles |
| **The List** | Ranked, numbered, no explanation owed. | Ten beers · a playlist |
| **Overheard** | Verbatim, timestamped, uncommented. | Oscar said |
| **Changed My Mind** | Something believed, then abandoned. | — |
| **The Long One** | The feature. Drop cap, standfirst, byline. Rare by design. | — |

Then keep `Pours / Miles / Bets / Kids / Essentials` as **tags applied after the fact**, not as
navigation. Frontmatter becomes `department` (required, enum) + `tags` (free, post-hoc). The
homepage grid stops being five subject doors and becomes the current issue.

### 2. Issues — the fix for sporadic cadence

A publication that goes quiet looks abandoned. A publication with **issues** does not: an issue is
finished, not stalled. Group posts retroactively by month, number them (`No. 04 — August 2026`),
stamp the number in the masthead, and generate the archive from dates you already have. Zero
editorial burden, and it converts a thin stream into a body of work — which is exactly the job the
old reference doc assigned to pillars and pillars can't do.

### 3. The cheap sophistication moves (all free, all high-yield)

- **Standfirst / deck.** One italic serif sentence under every headline. This one thing does more
  for "editorial" than any font choice.
- **Dateline byline.** `BY CAMERON HICKEY · ST. PETERSBURG, FLA.` in letterspaced small caps.
- **Drop cap** on the first paragraph of long pieces only. Rarity is what makes it work.
- **Captions on everything**, set small, wry, and *never* describing what's visible in the image.
- **The dinkus** — a repeated ornament between sections instead of a plain `<hr>`. Yours should be
  three gold dots or a single em-rule with a centered mark. Costs one CSS rule; reads as a magazine
  instantly.
- **Folios.** Page-bottom issue/date stamps.
- **Pull quotes set large and ragged**, breaking the measure, not indented inside it.

### 4. Typography — the actual recommendation

Kill Rock Salt and Syne here. Three faces, all Google Fonts, all loading today:

| Role | Face | Why |
|---|---|---|
| **Display** | **Bodoni Moda** | A true Didone with a variable optical size axis. This *is* the Esquire letterform — high stroke contrast, hairline serifs, cold and expensive. The optical-size axis means it stays elegant at 14px and gets sharper at 96px. |
| **Body** | **Spectral** *(keep)* | Already in the stack, already correct. Warm, readable, holds long measure. It's the one type decision on the site that's already right. |
| **Labels / nav / captions** | **Archivo Narrow** | Condensed grotesk in letterspaced caps is the magazine label voice. Archivo Narrow at `0.7rem / 0.18em` is the whole trick. |

Rule: **Bodoni for headlines and nothing else. Archivo Narrow for anything in caps. Spectral for
everything a human actually reads.** Three faces, three jobs, no overlap — versus today's Rock Salt
doing decoration while Syne does a job it's unsuited for.

### 5. Palette — harden the contrast, split the gold

Esquire's palette is paper, ink, and one accent. No mid-tones, because mid-tones are what make a
page look soft, and soft is the enemy of the register you're going for.

```css
:root {
  /* Surfaces — two, not four. Hard contrast, no mush. */
  --paper:      #faf7f2;   /* cleaner + brighter than #f5f0e8 — lets ink go truly black */
  --paper-mid:  #efe9df;   /* inset panels only; never a text surface for muted copy */
  --ink-deep:   #0f0f0e;   /* near-neutral black. The warm green-black reads brewery. */
  --ink-mid:    #1c1c1a;

  /* Text */
  --ink:        #14120e;   /* 16:1 on paper */
  --ink-soft:   #4a3f30;   /* 9.0:1  — body */
  --ink-muted:  #6f6152;   /* 5.3:1  — was #8a7a68 at 3.66:1. FIXED. */

  /* Accent — surface-paired. One gold cannot serve both. */
  --gold-ink:   #80612d;   /* on light: links, labels, rules.  5.05:1 ✅ */
  --gold-lit:   #b8956a;   /* on dark:  the HA thread, unchanged. 6.81:1 ✅ */
  --oxblood:    #6e1f28;   /* 9.8:1 — the second accent. Use it once per page, maximum. */

  /* Thread back to Hickey Avenue: the grain stays, and only the grain. */
}
```

`--gold-lit #b8956a` is untouched, so the Hickey Avenue thread survives exactly where it already
works (dark hero, dark footer, dark email bookend). `--gold-ink` is the same hue driven dark enough
to be legible on paper — and it reads as *bronze foil* rather than *tan*, which is the more
expensive impression anyway.

### 6. Type scale — one ratio, ten steps

Replace 25 ad-hoc sizes and 6 unrelated `clamp()` curves with a single 1.25 (major third) scale on
a fluid base:

```css
:root {
  --step--2: clamp(0.69rem, 0.67rem + 0.10vw, 0.75rem);
  --step--1: clamp(0.83rem, 0.80rem + 0.15vw, 0.94rem);
  --step-0:  clamp(1.00rem, 0.96rem + 0.20vw, 1.13rem);   /* body */
  --step-1:  clamp(1.20rem, 1.14rem + 0.30vw, 1.41rem);
  --step-2:  clamp(1.44rem, 1.35rem + 0.45vw, 1.76rem);
  --step-3:  clamp(1.73rem, 1.59rem + 0.68vw, 2.20rem);
  --step-4:  clamp(2.07rem, 1.88rem + 1.00vw, 2.75rem);
  --step-5:  clamp(2.49rem, 2.20rem + 1.45vw, 3.43rem);   /* feature headline */
  --step-6:  clamp(2.99rem, 2.58rem + 2.05vw, 4.29rem);   /* cover */
}
```

Every component pulls a step. Nothing invents a size. Hierarchy then holds its order at every
viewport, which it currently does not.

### 7. Add the missing scales

```css
:root {
  --space-2xs: 0.25rem;  --space-xs: 0.5rem;  --space-sm: 0.75rem;
  --space-md:  1rem;     --space-lg: 1.5rem;  --space-xl: 2rem;
  --space-2xl: 3rem;     --space-3xl: 4rem;   --space-4xl: 6rem;  --space-5xl: 8rem;

  --dur-fast: 0.15s;  --dur-base: 0.25s;  --dur-slow: 0.4s;
  --ease: cubic-bezier(0.2, 0, 0.2, 1);

  --measure: 34rem;      /* ~66ch at body size — the reading column */
  --measure-wide: 68rem; /* the grid */
}
```

The missing 1.5rem and 3rem steps are exactly the gaps the 66 inline styles are filling.

---

## Part IV — Questions that need answers before the rebuild

Ranked. The first three are blocking; the rest can be answered during the build.

1. **Is the masthead "Cameron Hickey" or "cmrnhcky"?** The domain, every handle, and the nav logo
   say the vowelless handle. The "name on the door" argument says the full name. A vowelless
   username on the masthead is a 2016 internet signal, not a sophisticated one — but the domain is
   bought and the handles are established. **Recommendation: masthead reads `CAMERON HICKEY`, the
   domain stays `cmrnhcky.com`.** Magazines have titles and URLs and nobody expects them to match.
   *Blocking — it gates the entire cover design.*

2. **Photographs: art-directed or none?** An Esquire aesthetic laid over iPhone camera-roll shots
   fails harder than no photography at all. Two honest options: commit to one deliberate photograph
   per piece, or go text-and-rules and let typography carry it. *Blocking — it gates the hero.*

3. **Formats or pillars?** Part III recommends formats with pillars demoted to post-hoc tags. This
   changes `content.config.ts`, the homepage, and every existing post's frontmatter. Cheap now (9
   posts), expensive at 60. *Blocking — decide before the next piece is written.*

4. **Does the agency link stay a footnote?** Recommendation: footnote stays, plus one honest
   sentence in the colophon and one on `/cameron`. Never on the homepage.

5. **What's the one recurring ritual?** Open since June, still unanswered, and it's the cheapest
   sophistication multiplier on the list. Every piece stamped with one constant — the morning's
   coffee, the day's mileage, the match score. Pick one this week and stop revisiting it.

6. **Is the frequency floor zero?** If yes, adopt issues (Part III.2) and stop apologising for
   cadence. If no, name the number.

7. **Does the content streak feed this site or compete with it?** 17 posts/week across four
   surfaces is already running. If the departments in Part III are *also* the shapes the streak
   posts take, the site becomes the archive of work already being done and costs nothing extra.
   If not, this is a second content operation. **It should be the former.**

8. **Wilde: motto only, or the house author?** Recommendation: motto only.

---

## Part V — Build log & what's left

### Shipped — 2026-08-26 (branch `redesign-esquire`)

| Done | What changed |
|---|---|
| **Contrast** | `--gold #b8956a` → split into `--gold-ink #80612d` (light, 5.4:1) and `--gold-lit #b8956a` (dark, 6.9:1). `--ink-muted` `#8a7a68` → `#6f6152` (3.66:1 → 5.6:1). Every pair in the token block now carries its measured ratio as a comment. |
| **Dead tokens** | All 11 legacy aliases deleted. `--loss` wired to `.badge--loss`; `--win` and `--atlantic-lift` added for the two remaining hardcoded hex. |
| **Type stack** | Rock Salt and Syne removed. **Bodoni Moda** (display) · **Spectral** (body) · **Archivo Narrow** (labels). Rock Salt is now Hickey Avenue's alone — the shared DNA is the grain, and only the grain. |
| **Body copy** | Was set in Syne, a display geometric, contradicting the file's own header comment. Now Spectral throughout, and the header comment now matches the CSS. |
| **Type scale** | 25 ad-hoc sizes across 6 unrelated `clamp()` curves → one 1.25 scale, `--step--2` … `--step-6`. Zero raw `rem` font-sizes remain in CSS or markup. |
| **Space / motion** | 10-step space scale with the missing 1.5rem and 3rem; `--dur-*` and `--ease`. |
| **Root font size** | `html { font-size: 18px }` → `100%`. The site no longer discards the reader's browser setting. |
| **Editorial furniture** | Dinkus, standfirst, dateline byline, drop cap, folio, quote watermark, kicker — all built. The article template now runs kicker → Bodoni headline → italic standfirst → dateline → drop cap → rail → folio. |
| **Inline styles** | 66 → 36, and the two pages that matter (home, article) are at zero. Extracted `.page-head/.page-title/.page-sub`, `.doors/.door`, `.more-link`, `.article-head/.kicker/.article-title`, `.meta`, `.folio`. |
| **Nav** | Was light-on-light on every page without a hero — effectively invisible until scrolled. Now inverts only over the hero, via an `overHero` prop. |
| **Mobile** | Hero had **zero horizontal padding** below 640px (a later media block overrode an earlier one) — text ran off both edges at 375px. Fixed. Every tap target now clears 44px. No text below 12px anywhere. Zero horizontal overflow on any page. |

### The quote layer — shipped

Cameron's brief: *quotes, phrases, expressions, littered throughout like wallpaper, scrolling like
our ticker, coming and going as thoughts do.*

**The ticker is the one part of that not built, deliberately.** A marquee is a stock-price device:
continuous, mechanical, signalling urgency and data — the opposite register. It also never stops,
and thoughts do. hickeyave.com already tried the horizontal ticker variant and dropped it as *"too
much motion"* (`site/index.html:2791`) — same conclusion, reached from the other direction.

What got built instead, three placements over one data file:

| Component | Behaviour | Where |
|---|---|---|
| **`QuoteRail`** | Marginalia — notes hung in the outer margin, alternating sides, arriving on scroll. The motion belongs to the reader, not the text. Folds full-width below 1180px. | The workhorse. Homepage + every article. |
| **`QuoteInterstitial`** | One quote, full-bleed, between sections. Stops the page. Verified attributions only. | Punctuation — once or twice per page. |
| **`QuoteDrift`** | The ambient layer. One short phrase fades in, holds 7s, fades out, then **4.2 seconds of silence** before the next. The silence is the effect. On mobile it drops to a single centred line above the safe area, no attribution, no pointer events, hidden when the menu is open. | Sitewide, mid-scroll only. |
| **`.quote-watermark`** | The literal wallpaper — a line set enormous at 4.5% opacity behind a section. Static; it is texture, not an event. | A CSS utility, use sparingly. |

**Data model.** You type `{ text, author?, tags? }` and nothing else. Everything else derives:

- **kind** — `author` present → quotation; absent → *phrase*. Your own expressions go in as phrases and set without an attribution line.
- **placement** — by length. ≤9 words can drift · ≤20 can take the masthead · ≤24 the margin · ≤34 an interstitial.
- **`verified`** — defaults false. A quotation must be verified to take a *prominent* slot. This is the mechanism that protects the whole idea: a misattributed quote on a site about discernment is the one error a reader will remember.

Astro is static, so a build-time `Math.random()` would bake one fixed set into the HTML forever.
The server picks a **pool** (stable per build, different per page); the client does the choosing per
visit. That is what makes the layer feel alive on what is mechanically a pile of flat files.

Malformed rows fail `npm run build` with the row index, by design. See `src/data/QUOTES.md`.

> **Live finding from the seed data:** *"Be yourself; everyone else is already taken"* — the site's
> motto — is universally credited to Wilde and appears nowhere in his work, letters, or recorded
> conversation. It ships `verified: false`, which bars it from the masthead and interstitials but
> keeps it in the margin. Your call: source it, run it unattributed as a phrase, or retire it.

### Shipped — 2026-08-27, pass 2 (branch `redesign-esquire`)

**The taxonomy correction.** Part III recommended forms-only — departments, no subjects. That was
wrong, and Cameron caught it: Esquire is navigated by *topic* (Style, Grooming, Fitness & Health,
Food & Drink). Part III described the print magazine's departments and mistook them for the whole
model. Esquire runs both at different layers — **topics are how you browse, forms are the
franchises inside them.** "Wear this not that" is a form applied to the style topic.

Two things also make the topic axis stronger here than Part III assessed: Cameron's topics are
*broad* (money, style, sundries) where the old pillars were narrow (Pours, Miles, Bets), and broad
topics don't go stale for a whenever-inspired publisher. And the two forms he rejected — Overheard,
Changed My Mind — are exactly the two that wait for material rather than being generative.

| Axis | Values |
|---|---|
| **Topic** (required — the nav) | Drink · Fitness · Money · Style · Fatherhood · Sundries |
| **Form** (optional — the franchise) | Endorsements · Greater Than · Lists |

Form is optional, so a post without one is its own escape hatch — no catch-all department, one
decision per post. Names live only in `src/lib/taxonomy.ts`; frontmatter and URLs store slugs, so a
rename is one line with zero content churn. They have already changed three times.

| Done | What changed |
|---|---|
| **Routing** | `/saying` retired as a layer. Articles at `/[topic]/[slug]`. One `[section]` template serves all nine topic/form pages — `getStaticPaths` returns exactly nine slugs, so it is not a catch-all and cannot swallow `/living`, `/cameron` or `/archive`. |
| **`/archive`** | Replaces the old `/saying` index, grouped by issue. Also replaces the old `?pillar=` filter, which hid posts client-side by mutating inline styles — invisible to search and unlinkable. |
| **Issues** | Derived from content dates in `src/lib/issues.ts`, never a hand-maintained file. An issue is *finished*, not stalled — this is what makes sporadic publishing read as a body of work. |
| **The cover** | Typographic, full-bleed, no photograph. The five-photo Ken Burns crossfade is gone with `public/hero/`. |
| **Nav** | Burger-primary at every width; the full-screen overlay is the only nav, in three groups — topics, rooms, forms. Six topics never fit a top bar at 375px. |
| **Guessing** | Removed; content deleted. Took the `--win`/`--loss` tokens, `.badge--*`, `.ledger-*` and 22 inline styles with it. |
| **Inline styles** | **66 → 0.** Extracted `.message-page` (404 and thank-you were the same layout twice), `EmailCapture` (duplicated verbatim in two files), `.filter-chip`, `.issue-group`, `.fact-row`, `.empty-note`. |

**Three bugs found and fixed, all pre-existing:**

1. **Every date on the site rendered a day early.** Frontmatter carries plain dates, which
   `z.coerce.date()` parses as UTC midnight; formatting in local time shifts them backwards west of
   Greenwich. In Florida the whiskey post dated `2026-06-01` displayed as *May 31, 2026* and grouped
   into a phantom May issue — which is why the cover first showed No. 3 with two months of content.
   All formatting now goes through `src/lib/dates.ts`; issue grouping uses `getUTC*`.
2. **The nav overlay could not be closed on a phone.** `.site-nav` is `position: fixed` with
   `z-index: 100`, making it a stacking context — so `.nav-burger`'s `z-index: 110` was scoped
   inside it and rendered *below* the overlay's 105. Latent before; critical once the burger became
   the only nav.
3. **Standalone link targets.** The footer social links were 17px tall on desktop (the "X" link was
   8px wide). Mobile padding had been scoped to `max-width: 640px` only.

### Verified — pass 2

`npm run build` clean · 16 pages · all nine `[section]` pages generate · `/living`, `/cameron`,
`/archive`, `/404`, `/thank-you` unaffected · every internal link resolves (14 checked, zero
broken) · zero inline styles in `src/` · zero dead token references · zero horizontal overflow at
375px · no text under 12px · every tap target ≥44px on mobile and ≥24px on desktop · nav overlay
fits 521px in an 812px viewport without scrolling · marginalia rail hangs clear at 1265px ·
console clean.

### Still open

| # | Action | Blocked on |
|---|---|---|
| 1 | **Load the quote database** — the layer stays near-invisible at 3 quotes; it wants ~40 | You |
| 2 | Decide the motto: source *"Be yourself…"*, run it unattributed, or retire it | You |
| 3 | The recurring ritual — open since June. The cheapest sophistication multiplier left | You |
| 4 | Colophon page — the one page that does the agency's work | — |
| 5 | Surface `census()` on the colophon so the quote wall audits its own author concentration | After 1 |
| 6 | Delete `cameronhickey-site-reference{,_1,_2}.md` + `CLAUDE_CODE_BRIEF.md` | — |
| 7 | Merge `redesign-esquire` → `main` | You |

---

## Housekeeping findings

- `cameronhickey-site-reference.md` exists in **three byte-identical copies** (`_1`, `_2`) totalling
  51KB, all describing `cameronhickey.com` — a domain this project doesn't use — with the dead
  `The Pour / The Mile / The Bet` taxonomy. Delete all three.
- `CLAUDE_CODE_BRIEF.md` (16KB) specs a single-page Phase 1 that was passed months ago.
- `README.md` is still the unmodified Astro minimal-starter template.
- **Automation candidate** *(working rule 7)*: `census()` in `src/lib/quotes.ts` already computes
  author concentration and unverified count. Surfaced on the colophon, the quote wall audits itself
  — if one author passes a third of the file, that is the Wilde problem returning.
- **Automation candidate**: issues, department indexes and RSS categories all now derive from
  frontmatter. Nothing about the archive is hand-maintained, and nothing new should be.

## The standing risk

The site is a well-built empty magazine: **one article, six Living entries, three quotes.** Pass 1
and pass 2 built the rooms; neither filled them. Esquire's authority is volume plus consistency, and
sophistication makes emptiness louder, not quieter. The next move is content, not CSS.
