# The quote layer — how to load it

`quotes.json` is the whole database. One array, one object per line of text.

## What you type

```json
{ "text": "…", "author": "Name", "tags": ["value", "beer"] }
```

That's it. `author` and `tags` are both optional.

## What the system derives — don't type these

| Derived | Rule |
|---|---|
| **kind** | `author` present → *quotation*. Absent → *phrase*. Phrases set without an attribution line, slightly larger, in the house voice. Your own expressions go in as phrases. |
| **where it can appear** | By length. ≤9 words can drift · ≤20 can take the masthead · ≤24 can sit in the margin · ≤34 can hold an interstitial. Longer than 34 words and it's a pull-quote inside a piece, not wallpaper. |
| **when it appears** | Client-side, per visit. Nothing is baked into the page. |

## `verified` — the one field that protects the whole idea

Optional, defaults to `false`. A quote must be `"verified": true` to take a **prominent** slot —
the masthead or a full-bleed interstitial. Unverified lines are still allowed in the margin and the
drift layer, where the stakes are lower.

This exists because the site's entire claim is discernment, and a misattributed quote on a site
about discernment is the worst available failure — it's the one error a reader will remember. The
seed data already contains a live example: **"Be yourself; everyone else is already taken"** is
universally credited to Wilde and appears nowhere in his work. It is currently your motto. It ships
as `verified: false` until you decide what to do with it.

To verify: find the actual source — the play, the book, the letter, the interview — and record it.

```json
{ "text": "…", "author": "Oscar Wilde", "source": "Lady Windermere's Fan, Act III", "year": 1892, "verified": true }
```

If you can't find a source, that's the answer: run it as a phrase with no attribution, or cut it.

## Optional fields

| Field | Use |
|---|---|
| `source` | The play, book, album, match, interview |
| `year` | Integer |
| `tags` | Free strings. Used to tie a quote to what it sits beside. |
| `note` | Private. Never rendered. For your own working notes. |

## Bad input fails the build

`src/lib/quotes.ts` validates the file with zod on every build. A malformed row breaks
`npm run build` with the row index rather than shipping silently. That is intentional.
