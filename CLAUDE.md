# cmrnhcky.com

Cameron Hickey's personal-brand site. Astro 6, static output, no client framework.
Deployed by Netlify from `main`.

## The one hard rule

**`site/` is the only folder that ever deploys. Everything inside it is public.**

It is build output — `astro build` writes it and wipes it on every run. Never hand-write a file
there, and never point a deploy at the project root.

```
CMRNHCKY/
├── CLAUDE.md          ← this file · never deploys
├── HANDOFF.md         ← session notes · never deploys
├── README.md          ← repo landing page · never deploys
├── _docs/             ← decisions, references, how-tos · never deploys
│   └── mockups/       ← every variant rendered for a decision, rejected ones included
├── _src/              ← originals, masters, retired assets, scratch · never deploys
├── _refs/             ← scrape / client reference material · GITIGNORED · never deploys
├── src/               ← Astro source: pages, layouts, content, data, styles
├── public/            ← copied verbatim into site/ — SO IT IS ALSO PUBLIC
├── tools/             ← importers and the post scaffolder
├── astro.config.mjs   ← outDir: './site'
├── netlify.toml       ← publish = "site"
└── site/              ← ★ BUILD OUTPUT · THE ONLY THING EVER DEPLOYED · gitignored
```

New internal file → project root, `_docs/`, or `_src/`. **Never `site/`, never `public/`.**

### `public/` counts as the publish root

Astro copies `public/` into `site/` byte for byte, dotfiles included. A `.DS_Store` or a README
dropped in there is live on cmrnhcky.com — both of those were, until 2026-08-28. Only files that
are genuinely meant to be served belong in `public/`: `_redirects`, favicons, `og-default.png`,
and images referenced by posts.

### Why this is a hard rule

It has already gone wrong in production on a sibling site: the repo *root* was published, so
`.git/config`, `.git/index`, `.git/packed-refs` and `.git/logs/HEAD` all returned 200 — everything
`git-dumper` needs to reconstruct full history, alongside every internal doc, including one marked
DO NOT PUBLISH. A `_redirects` block was tried first and rejected as insufficient: blocking
`/_docs/*` is meaningless while `.git` still serves every doc out of history.

**The folder split is the mechanism. `_redirects` is only a net.**

Before any deploy:

```bash
find site \( -name "*.md" -o -name ".env*" -o -name ".DS_Store" -o -name "shot_*" -o -name "*.py" -o -name "_docs" -o -name "_src" -o -name "_refs" \) -print
```

Any output is a failure. `_redirects`, `robots.txt`, `sitemap-*.xml` and favicons are expected.

## Build and preview

| Command | Does |
|---|---|
| `npm run dev` | Dev server on :4321. What you work against |
| `npm run build` | Writes `site/`. Run before every push — the schema fails loudly here |
| `npm run preview` | Serves the built `site/`, the real output |
| `npm run quotes:import` | `_src/quotes-database.csv` → `src/data/quotes.json` |
| `npm run music:import -- "<url>"` | Playlist → `src/data/music.json` |
| `npm run post` | Scaffolds a new entry |

Preview target is always the dev server or `site/index.html` — never a loose `.html` elsewhere.

## Brand

Personal, first-person, opinionated. Esquire-adjacent: Bodoni display, Spectral body, Archivo
Narrow furniture. Mobile-first, **375px is the primary viewport**. No build step beyond Astro, by
choice.

Taxonomy is two axes and lives in `src/lib/taxonomy.ts`, which is the only place the names exist:
**topic** (required — drink, fitness, money, style, fatherhood, sundries) is how the site is
navigated; **form** (optional — endorsements, greater-than, lists) is the franchise inside it.
Renaming is a one-line edit.

## Constraints

- **This is the personal brand, not the agency.** No Hickey Avenue LLC content, and never
  "Hickey Co." — that name has no legal existence and belongs in no public copy anywhere.
- `draft: true` is honoured by every consumer — pages, RSS, and issue numbering. That is what makes
  the four `template-*.md` files in `src/content/saying/` safe to keep in the content folder.
- `src/data/quotes.json` is **derived**. Edit the spreadsheet, run the importer. Hand-editing it
  broke the build once already.
- Redirects live in `public/_redirects` only, never in `astro.config.mjs` — see the comment there.
- Standing stop rule: **no new features until ten articles exist.** Bugs and content routing are
  fair game; new rooms are not.

## Where things are written down

| Doc | Holds |
|---|---|
| `_docs/PUBLISHING.md` | How to add every kind of content. The operating manual |
| `_docs/IDEAS.md` | What to write about — the recycling pipeline and standing ideas |
| `_docs/REFERENCE.md` | How the site is put together |
| `_docs/DESIGN-AUDIT.md` | Why the design is the way it is |
| `HANDOFF.md` | What the last session left unfinished |
