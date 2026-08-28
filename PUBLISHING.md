# Publishing — the whole process

Everything you can add to cmrnhcky.com, with copy-paste templates.
No CMS, no admin panel: **publishing is adding a file and pushing it.**

---

## 0. The loop, every time

```bash
cd ~/Documents/Claude/Projects/CMRNHCKY
npm run dev
```

Open **http://localhost:4321**. Leave it running — it reloads as you save.

Add or edit your file, check it in the browser, then:

```bash
npm run build
```

If that prints `Complete!` you're safe. **If it prints an error, nothing is broken yet** — the site
you can't build is the site that doesn't deploy. Fix it and run it again.

Then ship it:

```bash
git add -A
git commit -m "Add: the $9 gin"
git push
```

Netlify rebuilds automatically. Live in about a minute at **https://cmrnhcky.com**.

> **One-time, before any of this works:** the redesign lives on the `redesign-esquire` branch and
> Netlify only deploys `main`. Until you merge, pushing changes nothing publicly.
> ```bash
> git checkout main && git merge redesign-esquire && git push && git checkout redesign-esquire
> ```
> After that merge, work directly on `main` and the loop above is all there is.

---

## 1. Quotes — the ambient layer

**The spreadsheet is the master.** `quotes-database.csv`, in the project root, is the source of
truth. `src/data/quotes.json` is derived from it and should never be opened by hand — one missing
comma and the site stops building.

### Your loop, every time

**1. Open "quotes database" in Google Sheets. Add a row.** One quote per row, column A:

```
"Quote text." - Author | Work | Year
```

Only the quote is required. Trailing empty pipes are fine — `- Oscar Wilde |` reads the same as
`- Oscar Wilde`. **A row with no author becomes a phrase**: your own line, printed with no
attribution. That is a feature, not an unfinished row.

**2. File → Download → Comma-separated values (.csv).**

**3. Move it into the project folder, replacing the old one.** Keep the name starting with
`quotes` — the importer picks up the newest `quotes*.csv` on its own, so there is no path to type.

**4. Sync:**

```bash
npm run quotes:import
```

**5. Build and ship:**

```bash
npm run build
```

```bash
git add -A && git commit -m "quotes" && git push
```

### Preview first when the change is big

```bash
npm run quotes:import -- --dry
```

Writes nothing. Prints every new quote, who it thinks said it, and which slot it fits.

### Removing a quote

Deleting a row from the sheet does **not** delete it from the site. The importer lists what is in
the library but no longer in the sheet, and keeps it. This is deliberate: a short download or a
wrong export would otherwise wipe the library in one keystroke.

When the list is genuinely what you meant to remove:

```bash
npm run quotes:import -- --prune
```

### What the sheet does NOT hold

`verified`, `note` and `tags` are editorial and live only in `quotes.json`. A sync matches on the
quote text and carries them across, so re-importing never costs you a verification or a
disputed-attribution note.

**One consequence worth knowing:** the text *is* the identity. Fix a typo in the sheet and it reads
as a new quote — the old wording shows up as an orphan in the report. Prune it and you are done.

### What to record — keep it to text and author

Source and year are optional. Here is exactly where each field appears on the site:

| Field | Where it renders |
|---|---|
| `text` | everywhere |
| `author` | everywhere |
| `source` | the margins, and the full-bleed band |
| `year` | the full-bleed band only |

`year` earns its keep in one slot out of three. For a proverb or a saying with no clean date, leave
it out. The line still runs everywhere it is short enough to fit.

For proverbs, put the tradition in the author column — `- Irish Proverb`. There is no person to
misattribute, so it counts as sound attribution.

### `verified` — not your field

A quotation must be `verified` to appear in the **full-bleed interstitial band**. Unverified ones
still run in the drifting line and the margins, so nothing is lost by leaving it alone.

The importer sets `verified: false` on everything new, deliberately. It is flipped only when
someone has actually found the source. A misattributed quote on a site about discernment is the one
error a reader remembers — and a good quarter of what circulates online is misattributed. The
library carries several flagged as disputed, each with a private `note` saying why. Notes never
render.

### What the importer cleans up for you

Curly quotes, `―` from Goodreads, en dashes, wrapping quote marks, `(1475-1564)` lifespans, a
trailing period on the year, a dash with no space after it, an attribution that drifted into
column E, and the `<...>` format legend at the top of the sheet. None of that is your job.

### Where they show up — decided by length, automatically

| Words | Appears in |
|---|---|
| ≤ 9 | the drifting line, bottom of screen |
| ≤ 24 | the margins beside articles |
| ≤ 34 | full-bleed interstitials (verified only) |
| 35+ | nothing — too long to be wallpaper. Use it inside a piece instead. |

**You don't set this.** Just write the line.

### If it breaks anyway

If `quotes.json` ever gets hand-edited and stops parsing, the importer refuses to run rather than
making it worse:

```bash
git checkout src/data/quotes.json
```

That restores the last version that worked. Then re-run the import.

### Aim for ~40, and spread the authors

Around forty is where the layer reads as ambient rather than repetitive. The importer prints author
concentration every run and warns past a third — one author dominating reads as one book read once,
not as taste.

---

## 2. Articles — the writing

**File:** `src/content/saying/whatever-you-want.md`

The filename becomes the URL: `evan-williams.md` → `cmrnhcky.com/drink/evan-williams`.
Lowercase, hyphens, no spaces.

```markdown
---
title: "The $9 Gin That Embarrasses The $40"
date: 2026-08-27
topic: "drink"
form: "endorsements"
excerpt: "One sentence that runs under the headline. Make it earn the click."
tags: ["gin", "value"]
draft: false
---

Your first paragraph gets a drop cap automatically. Write it like it matters.

## A subheading if you want one

Normal paragraphs. **Bold** and *italic* work.

> A pull quote, if the piece has one.

- Lists
- work
- fine
```

| Field | Required | Notes |
|---|---|---|
| `title` | **yes** | In quotes. Fine to include `$`, `—`, etc. |
| `date` | **yes** | `YYYY-MM-DD`, no quotes |
| `topic` | **yes** | One of the six — see the table below |
| `form` | no | One of the three, or omit entirely |
| `excerpt` | **yes** | Shows as the standfirst and in listings |
| `tags` | no | Free. Lowercase. |
| `draft` | no | `true` hides it everywhere. Defaults `false`. |
| `featured` | no | Not currently used for anything |
| `ritual` | no | The stamp line above the body |
| `image` / `imageAlt` / `imageCaption` | no | Lead image — see §4 |

### Topics — pick exactly one (required)

| Use | For |
|---|---|
| `drink` | beer, whiskey, gin |
| `fitness` | running, training, health |
| `money` | value, the math of a bet |
| `style` | wear this, not that |
| `fatherhood` | Oscar |
| `sundries` | music, football, everything else |

### Forms — optional

| Use | When the piece is |
|---|---|
| `endorsements` | one thing, why it's worth it, ending on a verdict |
| `greater-than` | this vs that, argued to a conclusion |
| `lists` | ranked or numbered, no explanation owed |

Omit `form` when it's none of those. Most pieces won't have one, and that's the design — a post
without a form is just a post.

> **Renaming any of these** is one line in `src/lib/taxonomy.ts`. The slugs in your files never
> change, so a rename never touches your writing.

### The ritual stamp

```yaml
ritual: "Coffee: strong. Miles: 4. Current bet: Villa -1.5."
```

Renders as a bordered line above the body. Same three measures every time is the point — it becomes
yours, and regulars start looking for it. **Still undecided which three.** Pick and stop revisiting.

---

## 3. Living — the feed

**File:** `src/content/living/2026-08-27-something.md`
Date-prefixed filenames keep the folder sorted. No title, no excerpt — it's a feed.

`activity` is always required, and is one of:
`running` · `drinking` · `parenting` · `betting` · `watching` · `listening` · `reading` · `working` · `other`

### A note

```markdown
---
date: 2026-08-27
activity: parenting
type: note
caption: "Age 4 years, 5 months."
---

He asked why the moon follows the car. I did not have an answer.
```

### A photo

```markdown
---
date: 2026-08-27
activity: running
type: image
src: "/images/living/cady-way-sunrise.jpg"
alt: "Empty trail at first light, palms either side."
caption: "5 miles. The good kind of empty."
---
```

`alt` describes the picture for screen readers and when the image fails. `caption` is the wry line
under it — never describe what's already visible.

### A YouTube video

```markdown
---
date: 2026-08-27
activity: watching
type: youtube
youtube: "https://youtu.be/dQw4w9WgXcQ"
caption: "Morning Pour, episode 4."
---
```

Paste any YouTube URL — full, short, or `/shorts/`. The ID is extracted for you.

### A playlist in the feed

```markdown
---
date: 2026-08-27
activity: listening
type: youtube
youtube: "https://www.youtube.com/playlist?list=PL4dRW-_ydEe9R4JuobNG-7-jfTkbQQMfm"
caption: "What August sounded like."
---
```

For the **Listening room** rather than a one-off feed entry, see §5.

---

## 4A. Music — the Listening room

Two separate things live at `/listening`, and they use different files.

### Pre-made playlists — `src/data/playlists.json`

Your own YouTube / YouTube Music playlists, embedded whole.

```json
[
  {
    "id": "PL4dRW-_ydEe9R4JuobNG-7-jfTkbQQMfm",
    "title": "On Repeat",
    "blurb": "What has actually been playing."
  }
]
```

The `id` is the part after `list=` in the URL. Works with playlists made in either YouTube or
YouTube Music — they share IDs.

> **The playlist must be Public or Unlisted.** Private ones show an error box. YouTube's
> auto-generated mixes (IDs starting `RD`) and Liked Songs (`LM`) will not embed at all — those
> aren't real playlists as far as the embed is concerned.

### The song library — `src/data/music.json`

This feeds the generator. **Don't type it by hand** — import it:

```bash
npm run music:import -- "https://www.youtube.com/playlist?list=PL4dRW-_ydEe9R4JuobNG-7-jfTkbQQMfm"
```

That reads the playlist, pulls every video ID, and looks up the title and artist for each. No API
key, no login. Run it on as many playlists as you like — it skips songs already in the library and
**never touches tagging you've already done**, so re-running after adding tracks is safe.

Then the one manual step: **tag each song with occasions.**

```json
{
  "id": "1pnv-7wTQok",
  "title": "won't stop",
  "artist": "Gunna",
  "moods": ["the-drive", "matchday"]
}
```

A song can carry as many occasions as fit, or none — untagged songs never reach the generator.
While running `npm run dev` a red bar shows how many are still untagged. It never appears on the
live site.

| Slug | Shows as |
|---|---|
| `before-five` | Before Five |
| `the-miles` | The Miles |
| `the-pour` | The Pour |
| `matchday` | Matchday |
| `the-drive` | The Drive |
| `after-hours` | After Hours |

Rename any of these in `src/lib/music.ts` — the slugs in `music.json` stay as they are.

**The generator needs volume.** Below about ten songs per occasion the same tracks keep coming
back. Import a few playlists before worrying about perfect tagging.

### How the generator actually works

The visitor picks an occasion, the browser shuffles your tagged songs for it, and hands YouTube an
anonymous playlist built from those video IDs. Nothing is stored, no account is involved, and each
visit shuffles fresh. `/listening?m=the-miles` opens straight into that playlist, so the links are
shareable, and "Open in YouTube" hands the same queue to YouTube proper so someone can save it.

---

## 4B. Now — `/now`

**There is no file for this page.** It shows the most recent Living entry for each activity —
reading, listening, watching, running, drinking, Oscar, working — using that entry's `caption`.

To change what `/now` says, **post to Living.** That's the whole mechanism, and it's why the page
can't go stale.

An activity with no entries is simply left off. If something shows an embarrassing "4 months ago",
that's the page working.

---

## 5. Images

### Where they go

```
public/images/articles/…    lead images for writing
public/images/living/…      feed photos
```

Reference them by the path **after** `public`:

```
public/images/living/oscar-lear.jpg   →   src: "/images/living/oscar-lear.jpg"
```

Leading slash. No `public` in the path. This trips everyone up once.

### Resize first — nothing here is compressed for you

`sips` is built into macOS. No install.

```bash
sips -Z 1600 ~/Desktop/photo.jpg --out public/images/articles/evan-williams.jpg
```

`-Z 1600` caps the long edge at 1600px and keeps the proportions.

**iPhone photos are usually HEIC and won't display in a browser.** Convert and resize in one go:

```bash
sips -s format jpeg -Z 1600 ~/Desktop/IMG_4821.HEIC --out public/images/living/trail.jpg
```

| | Long edge | Target size |
|---|---|---|
| Article lead | 1600px | under 400KB |
| Living photo | 1400px | under 300KB |

Check what you've got: `ls -lh public/images/living/`

A 4MB photo works but makes the page slow on a phone — which is where nearly everyone reads this.

### Article lead image

```yaml
image: "/images/articles/evan-williams.jpg"
imageAlt: "A bottle of Evan Williams Black Label on a kitchen counter."
imageCaption: "Thirteen dollars. Photographed like it cost forty."
```

Sits between the dateline and the body. **It also becomes the article's social preview** — when
someone shares that link, this is the picture. Worth adding for anything you expect to be shared.

---

## 6. Sharing previews

`public/og-default.png` is the card that shows when the site is shared anywhere without its own
image. It was previously an SVG, which every platform silently rejects — so shares showed no image
at all. It's a PNG now, and it works.

Any article with an `image` uses that instead. To change the default, replace the file — keep it
**1200×630**.

Test a link after deploying by pasting it into any chat app, or:
`https://www.opengraph.xyz/`

---

## 7. When something goes wrong

`npm run build` fails and names the file. Common causes:

| Message mentions | Cause |
|---|---|
| `Invalid enum value` | A `topic`, `form` or `activity` that isn't on the lists above. Check spelling — they're all lowercase. |
| `Required` | A missing required field. Articles need `title`, `date`, `topic`, `excerpt`. |
| `quotes.json row N` | Bad JSON. Fix: `git checkout src/data/quotes.json`, then load via `npm run quotes:import` — never by hand |
| `Expected date` | Date needs to be `2026-08-27` with no quotes |

Two rules that save you:

1. **Frontmatter is between the two `---` lines**, at the very top, no blank line above the first one.
2. **Never commit without `npm run build` passing.** It is the whole safety net.

If you break something already pushed:

```bash
git log --oneline -5      # find the last good commit
git revert HEAD           # undo the most recent one
git push
```

---

## 8. What's still worth adding

- **Import your playlists and tag them.** `npm run music:import`, then fill in `moods`. The
  generator is the most interactive thing on the site and it does nothing until the library is
  tagged.
- **Load ~40 quotes.** The single biggest visible improvement available. Start with lines you
  already know; verify sources as you go.
- **Decide the ritual stamp** — three measures, same every time.
- **One good photograph.** The cover is typographic because the photo library was camera roll. One
  deliberate, well-lit shot changes that.
- **Write.** One article and six feed entries is a beautifully built empty magazine. Everything
  above is plumbing; the site gets good when there's volume behind it.
