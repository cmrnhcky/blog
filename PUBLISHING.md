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

**File:** `src/data/quotes.json`

One array. Add objects to it. That's the whole database.

### Minimum

```json
{ "text": "The truth is rarely pure and never simple.", "author": "Oscar Wilde" }
```

### Your own lines — leave `author` out

No author makes it a **phrase**. Phrases set without an attribution line, in your voice, not
someone else's. This is where "reasons why this is better than that" one-liners go.

```json
{ "text": "Price is nothing. Value is everything.", "tags": ["money"] }
```

### Full shape

```json
{
  "text": "We are all in the gutter, but some of us are looking at the stars.",
  "author": "Oscar Wilde",
  "source": "Lady Windermere's Fan, Act III",
  "year": 1892,
  "tags": ["hope"],
  "verified": true,
  "note": "Private. Never rendered. Your working notes."
}
```

| Field | Required | What it does |
|---|---|---|
| `text` | **yes** | The line. Don't include surrounding quote marks — they're added. |
| `author` | no | Present → quotation. Absent → phrase, no attribution shown. |
| `source` | no | Play, book, album, interview |
| `year` | no | Number, no quotes: `1892` |
| `tags` | no | Free strings, lowercase |
| `verified` | no | Defaults `false`. See below. |
| `note` | no | Private, never rendered |

### `verified` — the one that matters

A quotation must be `"verified": true` to appear in a **prominent** slot (the big full-bleed
interstitials). Unverified ones still appear in the margins, where the stakes are lower.

This exists because a misattributed quote on a site about discernment is the one error a reader
remembers. The seed data has a live example: **"Be yourself; everyone else is already taken"** is
credited to Wilde everywhere and appears nowhere in his work. It's your motto and it ships
`verified: false`.

To verify: find the actual source, record it, flip the flag. If you can't find one — that's your
answer. Run it as a phrase with no author, or cut it.

### Where they show up — decided by length, automatically

| Words | Appears in |
|---|---|
| ≤ 9 | the drifting line, bottom of screen |
| ≤ 20 | the masthead slot |
| ≤ 24 | the margins beside articles |
| ≤ 34 | full-bleed interstitials |
| 35+ | nothing — too long to be wallpaper. Use it inside a piece instead. |

**You don't set this.** Just write the line.

### JSON rules that will bite you

- Comma **between** every object, **none after the last one**
- Straight double quotes `"` only — not curly `"` `"`. If you paste from Notes or a browser, retype the quotes.
- An apostrophe inside text is fine: `"It is not a discovery."`
- A double quote inside text must be escaped: `"He said \"no\" twice."`

**Check before you commit:**

```bash
python3 -c "import json;d=json.load(open('src/data/quotes.json'));print(len(d),'quotes OK')"
```

A malformed row also fails `npm run build` and names the row index.

### Aim for ~40, and spread the authors

Three quotes isn't wallpaper, it's a repeat. Around forty is where the layer starts feeling
ambient. Spread them — one author dominating reads as one book read once, not as taste.

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

### A playlist  ← for the music

```markdown
---
date: 2026-08-27
activity: listening
type: spotify
spotify: "https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M"
caption: "What August sounded like."
---
```

In Spotify: **⋯ → Share → Copy link**. Paste it whole. Playlists, albums and single tracks all work.

---

## 4. Images

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

## 5. Sharing previews

`public/og-default.png` is the card that shows when the site is shared anywhere without its own
image. It was previously an SVG, which every platform silently rejects — so shares showed no image
at all. It's a PNG now, and it works.

Any article with an `image` uses that instead. To change the default, replace the file — keep it
**1200×630**.

Test a link after deploying by pasting it into any chat app, or:
`https://www.opengraph.xyz/`

---

## 6. When something goes wrong

`npm run build` fails and names the file. Common causes:

| Message mentions | Cause |
|---|---|
| `Invalid enum value` | A `topic`, `form` or `activity` that isn't on the lists above. Check spelling — they're all lowercase. |
| `Required` | A missing required field. Articles need `title`, `date`, `topic`, `excerpt`. |
| `quotes.json row N` | Bad JSON — usually a curly quote, or a missing/extra comma |
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

## 7. What's still worth adding

- **Load ~40 quotes.** The single biggest visible improvement available. Start with lines you
  already know; verify sources as you go.
- **Decide the ritual stamp** — three measures, same every time.
- **One good photograph.** The cover is typographic because the photo library was camera roll. One
  deliberate, well-lit shot changes that.
- **Write.** One article and six feed entries is a beautifully built empty magazine. Everything
  above is plumbing; the site gets good when there's volume behind it.
