import { getCollection } from 'astro:content';

/* ────────────────────────────────────────────────────────────────
   Issues.

   A publication that goes quiet looks abandoned. A publication with
   issues does not — an issue is *finished*, not stalled. That is the
   whole reason this exists: it converts a thin, sporadic stream into
   a body of work without asking Cameron to publish on a schedule.

   Derived from dates already in the content. Never a hand-maintained
   file — a list you have to remember to update is a list that goes
   stale, and a stale issue number is worse than none.
   ──────────────────────────────────────────────────────────────── */

export interface Issue {
  no: number;
  /** "AUGUST 2026" */
  label: string;
  /** Sort key, "2026-08" */
  key: string;
  year: number;
  month: number;
}

const MONTHS = [
  'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
  'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER',
];

const keyOf = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;

/** The month an entry belongs to. Exported so callers group the same way. */
export const issueKeyFor = (date: Date): string => keyOf(date);

/** Every month that has published something, oldest first, numbered from 1. */
export async function allIssues(): Promise<Issue[]> {
  const [posts, living] = await Promise.all([
    getCollection('saying', ({ data }) => !data.draft),
    getCollection('living'),
  ]);

  const keys = new Set<string>();
  for (const e of [...posts, ...living]) keys.add(keyOf(e.data.date));

  return [...keys]
    .sort()
    .map((key, i) => {
      const [year, month] = key.split('-').map(Number);
      return { no: i + 1, key, year, month, label: `${MONTHS[month - 1]} ${year}` };
    });
}

/** The newest issue — what the cover and the folio carry. */
export async function currentIssue(): Promise<Issue | undefined> {
  const issues = await allIssues();
  return issues.at(-1);
}

/** The issue a given entry belongs to, for an article's folio. */
export async function issueFor(date: Date): Promise<Issue | undefined> {
  const key = keyOf(date);
  return (await allIssues()).find(i => i.key === key);
}
