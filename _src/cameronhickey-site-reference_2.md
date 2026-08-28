# Cameron Hickey — Personal Site: Brand & Build Reference

> Foundational reference for building cameronhickey.com — the personal hub and publication.
> This is a starting point to iterate from, not a finished spec. Treat every section as a v0 to argue with.
> Modeled on the Hickey Avenue brand doc so the two live in the same mental model.
> **Last updated: June 2026.**

---

## Guiding Principle

> **"Be yourself; everyone else is already taken."** — Oscar Wilde

This is the motto. It is the thesis of the whole project and the bridge between the personal brand and the agency:

*We can't help clients see what makes them distinct if we haven't first done the work of discovering it for ourselves.* The site is not vanity — it is the method, practiced in public. Originality isn't a style choice here; it's the entire point. Every decision below should be measured against one question: **does this make the site more unmistakably Cameron, or more like everyone else?**

---

## Project Snapshot

- **What it is:** A personal publication and home base — an owned hub that all rented social platforms point back to.
- **Not:** A portfolio, a resume site, or a sales page for the agency.
- **Domain:** cameronhickey.com (owned)
- **Platform:** Astro, deployed on Netlify
- **Content model:** Markdown content collections (publish by dropping a `.md` file)
- **Relationship to Hickey Avenue:** Subtly linked. One degree of separation. Same surname, same philosophy, different job.
- **Cadence:** Whenever inspired. The architecture must make sporadic publishing still feel like a coherent body of work.
- **Primary jobs, in ranked order:**
  1. Showcase taste / personality
  2. Build a content audience
  3. Feed leads to the agency (quietly)
  4. Sharpen digital skills (the quiet compounder)

---

## The Strategic Spine

**The site is a publication about discernment.**

The tastes look scattered — running, beer, whiskey, gambling, fatherhood, the outdoors, money. They are not. The throughline is the same instinct that runs the agency: **value by design, not by default.** Cameron notices what is worth it.

- A $13 whiskey that drinks like $40.
- A free match that beats a paid sports package.
- A morning with Oscar that no money can buy.

The site is not a list of hobbies. It is *a man who knows what is worth his time, money, and attention.* That is magnetic — and it is exactly the quality someone hiring a marketing agency wants to see before they ever read a pitch.

**Name on the door.** cameronhickey.com is literally Cameron's name on the door, one degree from Hickey Avenue. The personal brand proves the philosophy; the agency sells it. They reinforce, they do not compete.

---

## Hub & Spoke — The Architecture of Attention

```
                 cameronhickey.com
                  (owned · the hub)
                         ▲
        ┌────────┬───────┴───────┬────────┐
     YouTube     X            Instagram  LinkedIn
                  (rented · the spokes)
```

- **Own the hub, rent the spokes.** Algorithms shift, accounts vanish, platforms die. The site is the one asset nobody can take.
- **Every bio points home.** YouTube about, X bio, IG link, LinkedIn — all route to cameronhickey.com. The site is the destination, not another stop.
- **The hub captures what social cannot.** An email signup converts a rented follower into an owned subscriber. This is the single most valuable thing the hub does.
- **The flywheel:** social drives people home → the hub deepens the relationship (long-form writing + email) → email pulls them back to new content → a fraction become agency leads.

---

## Voice & Tone

**Tone:** Dry, witty, confident, unpretentious. The same voice as the YouTube bio — descriptors delivered like a drumbeat, humor in the contrast, never trying too hard.

**Reference voice (the bio):**
> First generation father. Outdoor enthusiast. Recreational runner. Occasional drinker. Perennial gambler.
> A cocktail of the above — free poured with fun.

**What it sounds like:**
- Plain English over jargon. Always.
- Self-aware, never self-important.
- Quote-driven, not tagline-driven. Let other people's words carry weight; add the dry observation underneath.
- Accountable. Name on the door. Stands on business.

**What it never sounds like:**
- Corporate, polished, influencer-glossy.
- Apologetic or over-explained.
- Aspirational lifestyle bait.

**Signature moves:**
- The deadpan sign-off ("the baby is sober").
- The earned pause before a punchline.
- Honesty as a feature — the catches, the losing bets, the bad mornings.

---

## Visual System (v0 — iterate freely)

**Mood:** Warm, textured, street-style. Looser and more personal than hickeyave.com. Scripty. Quote-forward. Think hand-painted signage and pub lettering, not corporate clean.

**Typography direction:**
- **Script / headline moments:** Rock Salt (carried over from Hickey Avenue — this is the connective tissue between the two sites). Use it heavier here than on the agency site.
- **Editorial body / long-form:** A warm serif for readable writing — candidates: Cormorant (already in the HA stack), or a workhorse like Spectral / Newsreader for longer reading comfort.
- **UI / labels / nav:** A clean sans — Syne (HA stack) keeps continuity, or something more neutral if the script is doing the heavy lifting.
- *Principle:* Rock Salt for personality, serif for substance, sans for plumbing.

**Color direction (warm/textured):**
- Lean warmer than the agency's Atlantic green. Suggested base: paper/cream background, deep ink text, one warm accent (oxblood, rust, or the HA gold `#b8956a`) to tie back subtly.
- Carry the **grain texture** from hickeyave.com (the inlined feTurbulence SVG noise) — it is the strongest shared visual signal between the two sites.
- *Mark as open:* exact palette to be set during Phase 1 build.

**Layout principle:** Quote-forward. Large script pull-quotes as design elements, not just text. Whitespace and texture over density. The page should feel like a well-kept notebook, not a dashboard.

---

## Site Architecture

Start lean. Add rooms only when there is something to put in them.

**Homepage (lead with #4 — a statement — but surface everything):**
Stacking order, top to bottom:
1. **Manifesto moment** — a short statement / living quote in script. The first thing a visitor feels. (Lead element.)
2. **Name + one line** — who this is, in a breath.
3. **Latest content** — most recent writing + most recent video, pulled in automatically.
4. **The pillars** — quick visual entry into the five content areas.
5. **Email capture** — single field, low-key. "Occasional notes. No spam."
6. **Footer** — social links + one quiet line linking to Hickey Avenue.

**Pages — Phase 1 (ship first):**
- **Home** — the hub (above)
- **Writing** — the whenever-inspired journal. Markdown collection. The heart of the taste showcase.
- **About** — the real story: first generation father, enterprise background, why he builds. This page quietly does the agency's work.

**Pages — added later:**
- **Watch** — YouTube hub. Morning Pour, Most Valuable Pour, Matchday — embedded and organized into a body of work.
- **Now** — a `/now` page: current obsessions, reading, running, drinking, betting, Oscar. Updated whenever. *(Priority personal touch.)*
- **The Ledger (live)** — the open betting record, wins and losses. *(Priority personal touch.)*
- **Oscar Said** — the timestamped toddler-quote log. *(Priority personal touch.)*
- **Quotes** — the quote wall; the lines he lives by, Wilde first. Can carry its own SEO and shareability.
- **The Value List** — gear/tools/drinks worth re-buying. The natural affiliate surface.
- **Map** — favorite trails, bars, free Orlando family spots.
- **Colophon** — how the site is built. The quiet agency flex.

---

## Content Pillars

Tag every piece of writing to one of five named pillars. This makes sporadic publishing read as a coherent body of work, and makes drafting easier — pick a pillar, write the thing.

| Pillar | Covers |
|---|---|
| **The Pour** | Drinks with discernment — beer, whiskey, gin. The MVP rating system. Value over prestige. |
| **The Mile** | Running, the outdoors, scenic routes. Discipline and the places it takes you. |
| **The Bet** | Gambling with a bankroll brain — value plays, honest wins and losses, the math of risk. |
| **The Boy** | Fatherhood, Oscar, the Morning Pour. The first-generation-father mission, in writing. |
| **The Ledger** | Money, value, "don't waste your money." The frugal-but-not-cheap philosophy. |

**The MVP rating system (carried across all "Pour" content and product reviews):**
- ★☆☆☆☆ — Won't finish *(crossover: "Don't Waste Your Money")*
- ★★☆☆☆ — Won't drink/buy again
- ★★★☆☆ — Would buy on sale
- ★★★★☆ — Would buy at full price
- ★★★★★ — Would gift *(the MVP)*

---

## Personal Touches — The Originality Layer

The five pillars are the skeleton. These are the soft tissue — the things that make the site unmistakably Cameron and impossible to clone. Sprinkled throughout, they turn "a nicely built site" into "I can't stop reading this." Every one of them is a small act of self-discovery practiced in public — the motto, made literal.

**Priority tier (build these first — the originality core):**

1. **The `/now` page.** Not a blog, not an about — "here's what I'm into *right now*." Currently reading, running, drinking, current bet on the board, what Oscar's obsessed with this week. Updated whenever. Highest personality-per-effort ratio on the whole site. Keeps the site feeling alive even between published pieces. Almost nobody does this well.

2. **The open betting ledger.** A running, honest record of the gambling — wins *and* losses. Every tipster on earth shows only winners; a man who shows his losses is the only one worth trusting. The transparency is rare enough to be a brand in itself. Ties directly to "The Bet" pillar and the value-by-design spine.

3. **The "Oscar said" log.** A small, ongoing, timestamped collection of the things a four-year-old says. No commentary needed. The warmest, most shareable, most human thing on the site — and a gift to Oscar in twenty years. Ties to "The Boy."

**Texture tier (sprinkle throughout):**

4. **The quote wall.** A dedicated, designed page of the lines Cameron lives by, in Rock Salt, with one featured quote rotating on the homepage. Wilde leads. Curating quotes *is* a display of taste — what a man pins to his wall says more than what he writes.

5. **The value list (gear/tools).** Not an affiliate dump. "The cheap running shoe I'd buy again. The $14 whiskey I keep restocking. The one app that actually saved me money." Discernment made tangible — and the most natural, least gross affiliate-revenue surface available.

6. **The map / favorite spots.** The trails actually run, the bar with the right pour, free family spots around Orlando. A literal geography of taste. Ties outdoor + value + dad pillars together and is genuinely useful to locals.

7. **A signature recurring ritual.** Something that repeats until it becomes *his* — e.g. every post stamped with the morning's coffee rating, the day's mileage, or the score of whatever match was on. A small consistent texture regulars start looking for.

**Depth tier (the thinking-person signals):**

8. **"Changed my mind."** Things he used to believe and doesn't anymore. Intellectual honesty as content. Signals a thinking person, not a brand performing certainty — catnip for the audience that respects him most.

9. **The colophon / "how this site is built."** A genuinely interesting page about *how* the site is made — Astro, the choices, the texture, the grain. The subtle agency flex: builders love reading these, and it silently proves the Hickey Avenue capability without one sales word. This is where the personal site does the most quiet work for the business.

**The originality test:** if you only ship three of these, ship **the `/now` page, the open betting ledger, and the "Oscar said" log.** Current, honest, and warm — a combination almost no personal site has at once. That trio *is* the originality.

---

## Quotes (a core design + content element)

Quotes are not filler here — they are a structural feature of the brand. Oscar Wilde alone could carry a page (a quiet nod to Oscar, too). Build a small data file of quotes the site can pull from for headers, pull-quotes, and the manifesto slot.

Seed structure (`/src/data/quotes.json` or a markdown collection):
- `text` — the quote
- `author` — attribution
- `pillar` — optional tag (which content area it speaks to)
- `featured` — boolean for homepage rotation

*To do: Cameron supplies the starting list of lines he lives by. Wilde first.*

---

## Email Capture — Recommendation

**Yes — start collecting day one, but quietly.**

- No popup. No interstitial. No "join my newsletter!" guilt.
- A single field at the bottom of the homepage and the end of each piece: *"Occasional notes. No spam."*
- **Start with Netlify Forms** — zero new infrastructure, already in use on hickeyave.com.
- **Migrate to a real sender** (Kit or Buttondown) when there is actually something to send.
- Rationale: even with no newsletter yet, the list is the only audience that is fully owned. Starting now means it compounds.

---

## Tech Stack & Structure

- **Framework:** Astro (static-first, markdown-native, fast, SEO-strong)
- **Hosting:** Netlify (continuous deploy from git; reuse the existing workflow)
- **Content:** Astro content collections — `src/content/writing/*.md` with frontmatter (`title`, `date`, `pillar`, `excerpt`, `draft`)
- **Forms:** Netlify Forms (Phase 1) → ESP later
- **Analytics:** GA4 (mirror the agency setup)
- **No CMS, no database.** Publish = commit a markdown file.

Suggested frontmatter for a writing piece:
```yaml
---
title: ""
date: 2026-00-00
pillar: "The Pour"   # The Pour | The Mile | The Bet | The Boy | The Ledger
excerpt: ""
draft: true
---
```

---

## Build Phases

**Phase 1 — Claim the hub.** Single landing page: manifesto moment, name + line, social links, email field. Repoint every social bio to cameronhickey.com the same day. *(Skills: Astro basics, Netlify deploy.)*

**Phase 2 — Add the voice.** Writing collection + About page. Publish 3 short pieces, one from any pillar. The site now showcases taste, not just links. *(Skills: content collections, markdown, layouts.)*

**Phase 3 — Pull the content in.** Watch hub with YouTube embeds, the Now page, pillar tags + filtering. The site becomes the home base everything routes through. *(Skills: components, dynamic routing, embeds.)*

**Phase 4 — Sharpen & measure.** SEO polish, analytics, RSS, newsletter automation, performance/Core Web Vitals. Every upgrade here is a skill that directly upgrades what Hickey Avenue sells. *(Skills: SEO, GA4, deliverability, performance.)*

---

## Workflow (how this gets made)

- **Writing:** Mix. Cameron drafts → Claude refines. Some pieces fully Cameron.
- **Code:** Claude builds, Cameron directs and edits.
- **Iteration:** This document is the reference. Decisions get made against it, then written back into it.

---

## Open Decisions / To Confirm

- [ ] Exact color palette (warm base + single accent) — set during Phase 1.
- [ ] Final font pairing (Rock Salt + which serif + which sans).
- [ ] Manifesto / homepage lead statement — the actual words.
- [ ] Starting list of quotes (Wilde + others) for the quote wall.
- [ ] One-line "who you are" for the homepage.
- [ ] How visible the Hickey Avenue link is in practice (footer-only vs. a soft "what I do" mention on About).
- [ ] Which signature recurring ritual to commit to (coffee rating / daily mileage / match score stamp).
- [ ] Betting ledger format — how much detail to show (stake, odds, outcome, reasoning?).
- [ ] Confirmed: motto / working tagline is **"Be yourself; everyone else is already taken."**

---

## Instructions for AI Tools

- **Guiding principle above all:** "Be yourself; everyone else is already taken." Measure every choice against whether it makes the site more unmistakably Cameron or more like everyone else. When in doubt, choose the more distinctive option.
- This is a personal publication built around **discernment / value by design** — not a hobby blog, not a portfolio, not an agency funnel.
- Voice is dry, witty, confident, plain-English. Match the YouTube bio voice. Never corporate, never aspirational-influencer.
- Quotes are a structural feature, not filler. Lead with them.
- The link to Hickey Avenue stays **subtle** — a quiet footnote, never a pitch.
- Preserve the connective visual tissue to hickeyave.com: Rock Salt script + grain texture. Everything else can diverge warmer and looser.
- When drafting copy: lead with specificity and personality. Earn the punchline. Honesty is a feature.
- Publishing is "whenever inspired" — the structure (named pillars, content collections) carries coherence so cadence doesn't have to.
