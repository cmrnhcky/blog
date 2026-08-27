# cmrnhcky.com — reference

Everything needed to run the site, change it, or rebuild it from nothing.

**Companion docs:** [`PUBLISHING.md`](PUBLISHING.md) — how to add content.
[`DESIGN-AUDIT.md`](DESIGN-AUDIT.md) — why the design is the way it is.
This file is infrastructure and how-to-change-things.

---

## 1. The stack, in one screen

| | |
|---|---|
| **Framework** | Astro 6 — static site generator, no client framework |
| **Language** | `.astro` templates, TypeScript for logic, Markdown for content |
| **Styling** | One hand-written CSS file. No Tailwind, no preprocessor, no build step beyond Astro |
| **Content** | Markdown files + one JSON file. No database, no CMS |
| **JavaScript shipped** | Nav toggle, scroll fades, quote drift. A few KB, all inline |
| **Host** | Netlify, auto-deploying from GitHub |
| **Output** | 16 static HTML pages |

**The consequence worth understanding:** every page is a flat file baked at build time. There's no
server, so nothing can be "down" except the CDN, and there's no admin login to lose. The tradeoff is
that anything dynamic must happen in the browser or not at all.

---

## 2. Where everything lives

| Thing | Where | Notes |
|---|---|---|
| **Code** | `github.com/cmrnhcky/blog` (private) | Branch `main` is what deploys |
| **Local repo** | `~/Documents/Claude/Projects/CMRNHCKY` | |
| **Host** | Netlify project `cmrnhcky` | `app.netlify.com/projects/cmrnhcky` |
| **Netlify site ID** | `752c5a17-7caa-4a47-a98b-b2a30425cbe0` | In `.netlify/state.json` |
| **Domain registrar** | Squarespace | Bought there, not just DNS |
| **Nameservers** | Google Cloud DNS (`ns-cloud-d1–d4.googledomains.com`) | Leftover from Squarespace's Google Domains acquisition. Squarespace's DNS panel still manages records through them. |
| **Analytics** | GA4 `G-9MZJ6LMRC1` | Hardcoded in `src/layouts/Base.astro` |
| **Email capture** | Netlify Forms, form name `notes-signup` | Submissions under Forms in the Netlify dashboard |
| **SSL** | Let's Encrypt, auto-renewing | Netlify manages it |

**Current live DNS** (verified working):

```
A      @      75.2.60.5
CNAME  www    cmrnhcky.netlify.app
```

---

## 3. Setting up from zero

On a new machine, or after nuking the folder:

```bash
git clone https://github.com/cmrnhcky/blog.git CMRNHCKY
cd CMRNHCKY
npm install
npm run dev
```

Open **http://localhost:4321**.

Needs Node 18+. Currently running Node 24.16.0, npm 11.13.0.

`npm install` is only needed after cloning or when `package.json` changes. Day to day it's just
`npm run dev`.

### The four commands

| Command | Does |
|---|---|
| `npm run dev` | Live-reloading local server on :4321 |
| `npm run build` | Builds to `dist/`. **The safety net — run before every push.** |
| `npm run preview` | Serves the built `dist/` to check the real output |
| `npm run astro -- --help` | Astro CLI |
| `npm run music:import -- "<playlist url>"` | Adds a YouTube playlist's songs to the library |

---

## 4. How deploying works

```
edit → git push to main → Netlify detects → npm run build → live (~1 min)
```

There is no deploy button and no manual step. Pushing to `main` is publishing.

**Pushing to any other branch does nothing publicly** — which makes branches the safe way to work
on anything large.

```bash
git checkout -b some-experiment     # safe to break things
# … work …
git checkout main && git merge some-experiment && git push    # now it's live
```

Watch a build: **app.netlify.com/projects/cmrnhcky → Deploys**. A failed build leaves the previous
version live — Netlify never publishes a broken build.

### Rolling back

Netlify dashboard → Deploys → pick the last good one → **Publish deploy**. Instant, no git needed.

Or in git:

```bash
git revert HEAD    # undo the last commit as a new commit
git push
```

---

## 5. Repo map

```
src/
  content/            ← YOUR WRITING (see PUBLISHING.md)
    saying/           articles
    living/           the feed
  data/
    quotes.json       the quote database
    QUOTES.md         how to add to it
    music.json        the song library (built by npm run music:import)
    playlists.json    pre-made YouTube playlists
  lib/                logic, no markup
    taxonomy.ts       topics + forms. THE rename point.
    music.ts          occasions + the playlist-building helpers
    issues.ts         issue numbers, derived from dates
    quotes.ts         quote validation, placement rules, pooling
    dates.ts          the one date formatter (UTC — see §9)
  layouts/
    Base.astro        <head>, nav, footer, analytics. Every page.
  components/
    QuoteRail.astro         marginalia
    QuoteInterstitial.astro full-bleed quote
    QuoteDrift.astro        the drifting line
    EmailCapture.astro      the signup band
  pages/              ← ROUTES. File path = URL.
    index.astro             /
    archive.astro           /archive
    living.astro            /living
    listening.astro         /listening  — playlists + the generator
    now.astro               /now        — derived from Living
    cameron.astro           /cameron
    [section]/index.astro   /drink, /fitness, /endorsements … (9 pages)
    [section]/[slug].astro  /drink/the-13-whiskey
    404.astro, thank-you.astro, rss.xml.js
  styles/
    global.css        the entire design system
public/               served as-is at the site root
  images/             your photos
  og-default.png      the social sharing card
  _redirects          Netlify redirects
astro.config.mjs      site URL, sitemap, redirects
```

**The rule:** a file in `src/pages/` becomes a URL. Nothing else does.

---

## 6. How to change things

### A colour, font, or spacing

All of it is tokens at the top of `src/styles/global.css`, in `:root`. Change the value, everything
using it updates.

```css
--gold-ink:  #80612d;   /* the accent on light backgrounds */
--gold-lit:  #b8956a;   /* the accent on dark backgrounds */
--paper:     #faf7f2;   /* the page */
--ink-deep:  #0f0f0e;   /* dark sections */
--font-display: 'Bodoni Moda', …   /* headlines */
--font-body:    'Spectral', …      /* reading text */
--font-label:   'Archivo Narrow', … /* anything in caps */
```

**Two accents, not one, and it matters.** `--gold-lit` is unreadable on paper (2.6:1 contrast) and
`--gold-ink` is muddy on dark. Use the one that matches the surface. Every colour in that block has
its measured contrast ratio in a comment — if you change one, check it stays above 4.5:1 for text.

**Changing a font** also needs the Google Fonts `<link>` updated in `src/layouts/Base.astro`.

### Rename a topic or form

One file: `src/lib/taxonomy.ts`. Change the `name`, leave the key alone.

```ts
drink: { name: 'Drink', blurb: 'Beer, whiskey, gin. Value over prestige.' },
//       ^^^^^ change this
// ^^^^ never change this — it's in your files and your URLs
```

Changing the **key** means editing every post that uses it and breaking those URLs. Changing the
**name** is free. This is why it's built this way — these names changed three times before launch.

### Add a topic or form

1. Add an entry to `TOPICS` or `FORMS` in `src/lib/taxonomy.ts`
2. **Check the slug doesn't collide with an existing page** — `living`, `cameron`, `archive`,
   `thank-you`, `404`, `rss.xml`. A topic called `living` would fight `/living`.
3. `npm run build` — the new page generates automatically

Nothing else. The nav, the homepage grid, and the archive chips all read from that file.

### Remove a topic

Delete the entry, then reassign any post using it or the build fails naming the file. That failure
is the feature — it won't let you orphan content.

### Add a new page

Create `src/pages/whatever.astro`:

```astro
---
import Base from '../layouts/Base.astro';
---
<Base title="Whatever" description="For search results and social.">
  <section class="section--lg">
    <div class="container">
      <header class="page-head">
        <h1 class="page-title">Whatever.</h1>
        <p class="page-sub">The standfirst.</p>
      </header>
      <div class="prose">
        <p>Body copy.</p>
      </div>
    </div>
  </section>
</Base>
```

That's `/whatever`. Add it to the nav in `src/layouts/Base.astro` if it should be findable.

### Change the nav

`src/layouts/Base.astro`, the `.nav-overlay` block. Three groups: topics (auto from taxonomy),
rooms (hand-listed), forms (auto from taxonomy). The burger is the only nav at every width.

**To bring back a desktop nav bar**, that's a design decision reversed in CSS — the markup for it
was removed, so ask before assuming it's a one-liner.

### Change the cover

`src/pages/index.astro`, the `.cover` section. Styles under `═══ THE COVER` in `global.css`.
The issue number comes from `currentIssue()` and needs no maintenance.

### Change how quotes behave

`src/lib/quotes.ts`:

- `BANDS` — the word counts deciding where a quote can appear
- `NEEDS_VERIFICATION` — which placements demand a verified attribution
- `pool()` — how many are sent to each page

Timing of the drifting line is in `src/components/QuoteDrift.astro`: `HOLD` (7s on screen) and
`SILENCE` (4.2s gap). The silence is deliberate — a ticker never stops and thoughts do.

### Music — occasions, playlists, the generator

`src/lib/music.ts` holds the occasion names (rename freely — slugs in `music.json` don't move) and
the two URL builders. The generator itself is the inline script at the bottom of
`src/pages/listening.astro`.

It leans on two undocumented-but-stable YouTube behaviours, worth knowing if either ever breaks:

- `/embed/<id>?playlist=<id>,<id>` builds an **anonymous playlist** from arbitrary video IDs. This
  is the entire reason the generator can exist without a backend.
- `/watch_videos?video_ids=…` 303-redirects to a real temporary playlist, which is the
  "Open in YouTube" handoff.

Neither needs an API key. If YouTube retires them, the fallback is the Data API with a key, which
means a build step and a quota.

### Adding /watching or /reading

`/listening` is deliberately built as the first of a set. A sibling room follows the same shape:
a data file, a `lib/` module for its taxonomy, a page, and a nav entry in the rooms group.

### Redirects

Two files, **keep them in sync**:

- `astro.config.mjs` — makes redirect pages in the build
- `public/_redirects` — Netlify's own, handles wildcards and works for paths Astro doesn't know

```
/old-url  /new-url  301
```

### Analytics

GA4 ID is hardcoded in `src/layouts/Base.astro` (`G-9MZJ6LMRC1`). It loads on every page.

### Email signups

Netlify Forms, no configuration. The form is `src/components/EmailCapture.astro`; the name
`notes-signup` must match the hidden `form-name` field or submissions vanish silently. Read them in
the Netlify dashboard → Forms. Export as CSV when moving to a real sender.

---

## 7. The design system, briefly

Full reasoning in `DESIGN-AUDIT.md`. The rules that keep it coherent:

1. **Never hardcode a colour, size, or spacing.** Use a token. There are zero raw values in the
   markup and it should stay that way.
2. **Three typefaces, three jobs.** Bodoni Moda for headlines, Spectral for reading, Archivo Narrow
   for caps. No overlaps.
3. **375px is the primary viewport.** Check it there first, always.
4. **Type sizes come from the scale** — `--step--2` through `--step-6`. Don't invent one.
5. **Tap targets ≥44px on mobile.**
6. **Rock Salt belongs to Hickey Avenue, not here.** The only shared visual DNA is the grain
   texture. That separation is deliberate — see `DESIGN-AUDIT.md` Part I.

---

## 8. Troubleshooting

| Symptom | Cause / fix |
|---|---|
| Build fails, names a content file | Frontmatter problem. See `PUBLISHING.md` §6. |
| Build fails, `quotes.json row N` | Bad JSON — usually a curly quote or comma |
| Change not live after pushing | Check Netlify → Deploys. A red build means the old version is still up. |
| Change not showing locally | Restart `npm run dev`. Content collection changes sometimes need it. |
| Image doesn't display | Path must start `/images/…` with no `public`. And browsers can't show HEIC — convert it. |
| Fonts look wrong | Google Fonts blocked or offline. They're the only external request the site makes. |
| Form submissions missing | `form-name` hidden field must match the form's `name` |
| Site totally down | Netlify status, then DNS: `dig +short cmrnhcky.com` should return `75.2.60.5` and nothing else |

### The DNS trap, documented because it already bit once

Squarespace's default parking config left a **second, stale A record** (`162.241.253.243`) on the
apex alongside the correct one. DNS answered with both IPs, which silently broke SSL certificate
issuance — Let's Encrypt's validation hit the wrong IP part of the time — even though the DNS
*looked* right at a glance.

If certificate provisioning ever stalls for no obvious reason, check this first:

```bash
dig +short cmrnhcky.com A
```

**Exactly one line — `75.2.60.5`.** More than one means find and delete the extra.

---

## 9. Traps specific to this codebase

**Dates are UTC everywhere, deliberately.** Frontmatter dates parse as UTC midnight; formatting them
in local time shifts them backwards a day west of Greenwich. This was live: a June 1 post displayed
as May 31 and filed into a nonexistent May issue. All formatting goes through `src/lib/dates.ts`.
**Never call `toLocaleDateString` directly** — use `formatDate()`.

**`og:image` must be raster.** It was an SVG, and every platform silently rejects those, so shares
showed no image for months. If you replace `og-default.png`, keep it PNG or JPG at 1200×630.

**`.site-nav` is a stacking context.** It's `position: fixed; z-index: 100`, so any `z-index` inside
it is scoped to it. The burger was unclickable while the menu was open because of this. If you add
anything that must float above the overlay, raise `.site-nav` itself.

**Nothing in `public/` is optimised.** Images ship at whatever size you commit. Resize first.

**The taxonomy validates.** A typo in a `topic` fails the build rather than shipping a broken page.
That's intentional — don't work around it.

---

## 10. Rebuilding from nothing

If the laptop dies and the repo is gone locally: everything is on GitHub. `git clone`,
`npm install`, done. Netlify keeps deploying regardless.

If the **Netlify project** is deleted: create a new site from the same GitHub repo, build command
`npm run build`, publish directory `dist`, then re-point DNS (§2) and re-add the custom domain. The
certificate reissues automatically once DNS is clean.

If the **domain** lapses: it's at Squarespace. Everything else survives — only the domain needs
recovering.

**What has no backup:** Netlify Forms submissions. Export the email list periodically.

---

## 11. Maintenance

| When | Do |
|---|---|
| Every push | `npm run build` first |
| Monthly | Export email signups from Netlify → Forms |
| Occasionally | `npm outdated`, then `npm update` and build to check |
| If certs stall | §8, the DNS trap |
| Yearly | Domain renewal at Squarespace |

Astro major versions occasionally change content-collection APIs. Read the upgrade guide, do it on a
branch, and check the build before merging — never upgrade straight on `main`.
