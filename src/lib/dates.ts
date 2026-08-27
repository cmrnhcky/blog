/* ────────────────────────────────────────────────────────────────
   One date formatter, and it works in UTC.

   Frontmatter carries plain dates ("2026-06-01") with no time, which
   z.coerce.date() parses as UTC midnight. Formatting those in local
   time shifts them backwards anywhere west of Greenwich — in Florida
   (UTC-4) every date on the site rendered one day early: the whiskey
   post, dated June 1, displayed as May 31, and its issue grouped
   under May. Format in UTC and the date means what was typed.
   ──────────────────────────────────────────────────────────────── */

export const formatDate = (date: Date): string =>
  date.toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC',
  });
