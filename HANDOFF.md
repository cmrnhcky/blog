# Handoff — 2026-08-28

Written at the end of a quotes session, for whoever picks up the music work next.

## Do not deploy

**Netlify credits are out.** Six commits are sitting on local `main`, unpushed:

```
<new>    Reorganise onto the site/-only-deploys layout
63c8e7b  Add four article templates and IDEAS.md
387a019  Handoff note for the music session
dce68e8  Rename the master sheet to quotes-database.csv
4275a65  Quotes: make the spreadsheet the master source
```

Keep committing locally. Do not `git push` — that is what triggers a Netlify build. One push
ships all of them when credits are back.

### Read this before that first push

The build output moved from `dist/` to `site/`, and `netlify.toml` at the project root now pins
`publish = "site"`. That file **overrides** the publish directory set in the Netlify UI, which
still says `dist`. So the first build after the push is the one that proves it. If it fails with
"publish directory does not exist," the toml was not picked up — check that Netlify's *base
directory* is the repo root and not a subfolder.

While you are in those settings: the UI also holds four stale redirects
(`/ledger → /guessing`, `/writing → /saying`, and two others) pointing at pages that no longer
exist. `public/_redirects` has the correct rules and is processed first, so nothing is broken —
but the UI copies are dead weight and should be deleted.

## The folder moved

The project is now at `~/Desktop/Claude/Projects/CMRNHCKY`. It was under `~/Documents/` and moved
mid-session on 2026-08-28. Anything holding the old path — shell aliases, the Netlify CLI link in
`.netlify/state.json` — will need repointing.

## Layout: `site/` is the only thing that deploys

Done 2026-08-28. Docs went to `_docs/`, masters and retired assets to `_src/`, and the build now
writes `site/` instead of `dist/`. The rule and the reasoning are in `CLAUDE.md`; read it before
adding any file to `public/`, which is copied into the publish root byte for byte.

Three internal files were live on cmrnhcky.com before this and are not any more:
`/images/README.md`, `/og-default.svg` and `/.DS_Store`.

## Where quotes landed (done, no action needed)

`_src/quotes-database.csv` is now the **master source**; `src/data/quotes.json` is
derived from it and must never be hand-edited — that broke the build once already.

`npm run quotes:import` syncs from the newest `quotes*.csv` in `_src/` (the project root is
scanned too, as a fallback). It carries `verified`,
`note` and `tags` across on quote text, reports rows that vanished from the sheet rather than
deleting them, and needs `--prune` to actually remove. `--dry` previews.

Library is at **45 quotes, 32 authors, Wilde at 13%** — past the ~40 threshold. Full process in
`_docs/PUBLISHING.md` § 1.

## Music — the actual state

Two features exist. **One of them works.**

### Pre-made playlists — working

`src/data/playlists.json` holds one entry, "On Repeat"
(`PL4dRW-_ydEe9R4JuobNG-7-jfTkbQQMfm`). It embeds on `/listening` under "Already made."
Adding another is one object: `{ id, title, blurb }`.

### The generator — built, and dead

`/listening` offers six occasions, and **every one of them returns "Nothing filed under X yet."**

```
15 songs in src/data/music.json
 0 of them tagged
```

The generator filters the library by occasion slug. With `moods: []` on every song there is
nothing to filter, so the whole feature is inert. This is the single thing standing between the
music section and working.

The six occasions live in `src/lib/music.ts` — `before-five`, `the-miles`, `the-pour`,
`matchday`, `the-drive`, `after-hours`. Renaming them is a one-line edit; slugs are what the
songs reference.

**Tagging is Cameron's taste, not the assistant's.** A previous session tagged the 15 temporarily
only to prove the generator worked end to end, then reverted it. Do not tag songs for him. Ask,
or have him tag in bulk.

The current 15 are all recent hip-hop / UK / electronic — Bad Bunny, Central Cee, Fred again..,
Jim Legxacy, Playboi Carti, Travis Scott, Sammy Virji. Note this skews against occasions like
`the-pour` and `after-hours`, which may want a second playlist imported rather than creative
tagging of what is there.

### Adding songs

```bash
npm run music:import -- "https://music.youtube.com/playlist?list=PL..."
```

Scrapes video IDs off the playlist page, gets title/artist from oEmbed. No API key. Skips songs
already present and never touches existing `moods`, so re-running after adding tracks is safe.

His handle is `@cmrnhcky`. It is New Music Friday, so a fresh playlist import is the natural
starting move.

## The stop rule still holds

Set in an earlier session and not yet satisfied:

> **No new features until ten articles exist.** Bugs and content-routing help are fair game; new
> rooms are not.

Current count: **one article**, plus Living entries. `/watching` and `/reading` were designed as
siblings to `/listening` and are explicitly deferred under this rule. Tagging the existing songs
and importing a playlist are content work, not new rooms — those are fine. Building a new page
is not.

The honest read from the last assessment: the site has far more infrastructure than content, and
the sophistication makes the emptiness louder, not quieter. Anything that isn't words on the page
or songs in the library should be argued for, not assumed.
