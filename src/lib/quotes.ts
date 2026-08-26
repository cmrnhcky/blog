import { z } from 'astro:content';
import raw from '../data/quotes.json';

/* ────────────────────────────────────────────────────────────────
   The quote layer.

   Cameron types { text, author?, tags? }. Everything else is
   derived here, so bulk-loading stays frictionless and the rules
   live in one place instead of in his head.
   ──────────────────────────────────────────────────────────────── */

const QuoteInput = z.object({
  text:     z.string().min(1),
  author:   z.string().optional(),
  source:   z.string().optional(),
  year:     z.number().int().optional(),
  tags:     z.array(z.string()).default([]),
  verified: z.boolean().default(false),
  note:     z.string().optional(),   // private; never rendered
});

export type Placement = 'drift' | 'masthead' | 'rail' | 'interstitial';

export interface Quote {
  id: string;
  text: string;
  author?: string;
  source?: string;
  year?: number;
  tags: string[];
  verified: boolean;
  kind: 'quotation' | 'phrase';
  words: number;
  placements: Placement[];
}

/* Length bands. A six-word line can drift past the eye; a thirty-word
   one cannot. Rather than ask for a placement field on every row, the
   text decides where it is physically able to live. */
const BANDS: Record<Placement, number> = {
  drift:        9,
  masthead:     20,
  rail:         24,
  interstitial: 34,
};

/* Prominent slots demand a verified attribution — see src/data/QUOTES.md.
   An unattributed phrase has nothing to misattribute, so it is exempt. */
const NEEDS_VERIFICATION: Placement[] = ['masthead', 'interstitial'];

function slug(text: string, i: number): string {
  const base = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40);
  return `${i}-${base}`;
}

function build(): Quote[] {
  return raw.map((row, i) => {
    const parsed = QuoteInput.safeParse(row);
    if (!parsed.success) {
      throw new Error(
        `quotes.json row ${i} is malformed — ${parsed.error.issues.map(x => `${x.path.join('.')}: ${x.message}`).join('; ')}\n` +
        `  text: ${JSON.stringify((row as any)?.text ?? '(missing)')}\n` +
        `  See src/data/QUOTES.md for the expected shape.`
      );
    }
    const q = parsed.data;
    const words = q.text.trim().split(/\s+/).length;
    const kind: Quote['kind'] = q.author ? 'quotation' : 'phrase';

    const placements = (Object.keys(BANDS) as Placement[]).filter(p => {
      if (words > BANDS[p]) return false;
      if (NEEDS_VERIFICATION.includes(p) && kind === 'quotation' && !q.verified) return false;
      return true;
    });

    return { id: slug(q.text, i), ...q, kind, words, placements };
  });
}

export const quotes: Quote[] = build();

/* ── Deterministic selection ───────────────────────────────────────
   Astro is static: Math.random() at build time bakes one fixed set
   into the HTML forever. So the server picks a *pool* — stable per
   page, different between pages — and the client does the choosing
   at runtime. That is what makes the layer feel alive on a site that
   is, mechanically, a pile of flat files. */

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

export function pool(placement: Placement, seed: string, count = 12): Quote[] {
  const eligible = quotes.filter(q => q.placements.includes(placement));
  if (eligible.length <= count) return eligible;
  const start = hash(seed + placement) % eligible.length;
  return Array.from({ length: count }, (_, i) => eligible[(start + i) % eligible.length]);
}

/* One quote, fixed at build time. For slots that must not move. */
export function one(placement: Placement, seed: string): Quote | undefined {
  return pool(placement, seed, 1)[0];
}

/* Health check — surfaced by the colophon, and worth reading before a bulk load. */
export function census() {
  const unverified = quotes.filter(q => q.kind === 'quotation' && !q.verified);
  const byAuthor = new Map<string, number>();
  for (const q of quotes) if (q.author) byAuthor.set(q.author, (byAuthor.get(q.author) ?? 0) + 1);
  const top = [...byAuthor.entries()].sort((a, b) => b[1] - a[1]);
  return {
    total: quotes.length,
    phrases: quotes.filter(q => q.kind === 'phrase').length,
    quotations: quotes.filter(q => q.kind === 'quotation').length,
    authors: byAuthor.size,
    unverified: unverified.length,
    /* Concentration: if one author is more than a third of the wall, it stops
       reading as taste and starts reading as one book, read once. */
    topAuthor: top[0]?.[0],
    topAuthorShare: top.length ? top[0][1] / quotes.length : 0,
    byPlacement: Object.fromEntries(
      (Object.keys(BANDS) as Placement[]).map(p => [p, quotes.filter(q => q.placements.includes(p)).length])
    ),
  };
}
