# Ideas — where the writing comes from

You are already producing roughly seventeen posts a week across four surfaces. The site has one
article. **That gap is not a writing problem, it is a routing problem** — and everything below is
built around closing it rather than adding a new demand on your week.

---

## 1. The recycling pipeline

Three tiers. Content moves up, never down. Nothing gets written twice.

```
        a post you already made
                  ↓
        LIVING  — one line, no title, 30 seconds
                  ↓
        ARTICLE — 250-500 words, one of three forms
```

**Tier 1 — the streak post.** Already happening. Don't change it.

**Tier 2 — Living.** Anything you posted anywhere should land here the same day. A photo, a
sentence, a song. `npm run post` walks you through it in under a minute. This is also what feeds
`/now`, so the "currently" page maintains itself as a side effect.

**Tier 3 — the article.** Promoted from tier 2, not written from nothing.

### What earns promotion

A Living entry becomes an article when one of these is true:

| Signal | Form it becomes |
|---|---|
| You recommended something and someone asked why | **Endorsement** |
| You argued with someone about it | **Greater Than** |
| You have four or more of the same kind of thing | **List** |
| You wrote more than two sentences in the caption | plain, no form |

That last one is the most reliable. **If a caption ran long, it was an article.** Look back through
a week of posts for the ones where you kept typing.

---

## 2. The three forms are idea generators, not just containers

This is the part most people miss. Each form is a *question you can ask of anything*, which means
the taxonomy itself produces ideas.

Take any object, place, habit or purchase in your life and run it through:

- **Endorsement** — *is this worth it?* → one thing, a price, a verdict
- **Greater Than** — *what is this better than?* → two things, one wins
- **List** — *how many of these do I have opinions about?* → rank them

A single subject yields three different pieces. A bourbon is an endorsement. Bourbon over rye is a
Greater Than. Seven bottles under $25 is a list. **Same twenty minutes of thinking, three articles.**

When you are stuck, do not look for a new subject. Take a subject you have already written about
and apply a different form.

---

## 3. Sources — where to actually look

### Your own camera roll
The highest-yield source on this list and the one you already have. Every photo from the last month
is a Living entry. Some are articles.

### Instagram
Make a **saved-posts collection called "write about this."** Saving takes one tap and turns
scrolling into capture. Your own grid is the second source: anything you posted that got a real
reply is a subject someone already told you they cared about.

Reels you rewatch are Greater Than material — you rewatch things you disagree with.

### YouTube
**Watch Later and Liked videos are an idea list you have been building without noticing.** Scroll
your liked videos back three months and read them as topic suggestions.

Your playlists feed the Listening room directly — that is `npm run music:import`, not writing.

### Substack
The single best source for **Greater Than**, because someone else has already made the argument and
you only have to disagree well. A piece that starts "▶ WRITER makes the case for X, and it is the
best version of that case. It is still wrong, and here is where" is half-written before you begin.

Read your inbox with one question: *what did I want to argue with?*

### Group chats and texts
**You are already writing Greater Thans, in messages, for free.** Any argument you have had twice
is an article. Search your own messages for "actually" and "no but" and see what comes up.

### Letterboxd / Goodreads / Strava
If you use them, they are structured lists of things you already rated. A list form is one export
away.

### Reddit
Niche subs for your topics — value bourbon, running shoes, whatever your football club is. Not for
ideas to copy, for **the questions people actually ask.** A thread with 200 comments is 200 people
telling you what they want read.

---

## 4. Capture — the habit that makes all of this work

Ideas die between having them and being at a laptop. Two ways to stop that:

**Add a row to a notes file the second you have it.** Same idea as `_src/quotes-database.csv` — one
place, no formatting, no decisions. You already trust that pattern.

**Use the mobile block for first drafts, by voice.** 2:30–3:30 is the standing slot and articles are
exactly the work it suits — long-form, exploratory, thinking out loud. Talk a 400-word draft in six
minutes, clean it up at the desk. This is faster than typing and it sounds more like you, which is
the entire product.

---

## 5. The standing list

Thirty-six starts, mapped to topic and form. **These are prompts, not assignments** — the facts and
opinions have to be yours. Cross them off, replace them, ignore them.

### Drink
| Idea | Form |
|---|---|
| The best beer in a gas station cooler | endorsement |
| Well drink > craft cocktail | greater-than |
| Seven bottles under $25, ranked | lists |
| The case for drinking the same thing every time | plain |
| Bourbon > rye, and it is not close | greater-than |
| What a bar gets right before you order anything | plain |

### Fitness
| Idea | Form |
|---|---|
| The cheapest thing that improved your running most | endorsement |
| Running outside > the treadmill, in Florida, in August | greater-than |
| Five routes, ranked | lists |
| What the 4:40 alarm actually costs | plain |
| Slow miles > fast miles | greater-than |
| The gear you stopped using and why | lists |

### Money
| Idea | Form |
|---|---|
| The purchase that returned the most per dollar | endorsement |
| Buying used > buying new | greater-than |
| Seven things worth paying full price for | lists |
| The math of a good bet, explained without numbers | plain |
| Price is a signal, not an answer | plain |
| Subscriptions, ranked by whether you would re-buy today | lists |

### Style
| Idea | Form |
|---|---|
| One item worth more than everything around it | endorsement |
| A $400 suit that fits > a $2,000 suit that doesn't | greater-than |
| Five things to stop wearing | lists |
| Dressing for Florida without giving up | plain |
| Fewer, better > more, cheaper — and where that breaks | greater-than |
| What you actually reach for, counted honestly | lists |

### Fatherhood
| Idea | Form |
|---|---|
| The one baby purchase that was worth it | endorsement |
| Mornings with him > mornings alone | greater-than |
| Things nobody tells you, ranked by how late you found out | lists |
| First generation, figuring it out | plain |
| What you want him to think you did for a living | plain |
| The hour before the house wakes up | plain |

### Sundries
| Idea | Form |
|---|---|
| The album you have played most this year | endorsement |
| Watching alone > watching at a bar | greater-than |
| Seven songs for the first four miles | lists |
| Why matchday starts an hour early | plain |
| New Music Friday, ranked, every week | lists |
| The best thing you watched and told nobody about | endorsement |

---

## 6. The only rule that matters right now

**Volume over polish until there are ten articles.**

You have one. The site's design is finished and its rooms are empty, which makes the emptiness
louder rather than quieter. A rough 300-word list published beats a perfect essay unpublished, and
the archive does not remember which was which.

Four templates are waiting in `src/content/saying/` — `template-endorsement.md`,
`template-greater-than.md`, `template-list.md`, `template-plain.md`. They are `draft: true`, so they
are invisible on the site. Copy one, rename it, write, flip the flag.
