#!/usr/bin/env node
/* ────────────────────────────────────────────────────────────────
   quotes database.csv  →  src/data/quotes.json

     npm run quotes:import              (sync from the sheet)
     npm run quotes:import -- --dry     (preview, writes nothing)
     npm run quotes:import -- --prune   (also delete removed rows)

   THE SPREADSHEET IS THE MASTER. `src/data/quotes.json` is derived
   from it and should never be opened by hand — one missing comma
   and the site stops building.

   Cameron's process: open "quotes database" in Google Sheets, add a
   row, File → Download → CSV, drop it in this folder replacing the
   old one, run the command. No filename to type: the newest
   quotes*.csv in the project root is picked up automatically.

   ── The row format ──────────────────────────────────────────────

       "Quote text." - Author | Work | Year

   Only the text is required. Everything after it is optional, and
   trailing empty pipes are fine — "- Oscar Wilde |" reads the same
   as "- Oscar Wilde". A row with no author becomes a PHRASE: your
   own line, printed without attribution. That is a feature, not a
   row someone forgot to finish.

   Curly quotes, em/en dashes, Goodreads bars, wrapping quote marks,
   (1475-1564) lifespans, trailing periods on the year and a stray
   attribution that drifted into column E are all handled here.

   ── What is preserved ───────────────────────────────────────────

   `verified`, `note` and `tags` live only in quotes.json — they are
   editorial, not something to maintain in a spreadsheet. A sync
   matches on quote text and carries them across, so re-importing
   never costs you a verification or a disputed-attribution note.

   Change a quote's WORDING in the sheet and it reads as a new
   quote, because the text is the identity. The old one becomes an
   orphan, reported at the end.

   ── Why deleting needs --prune ──────────────────────────────────

   A sync will not remove anything unless you ask. A short download,
   a wrong file or a bad export would otherwise wipe the library in
   one keystroke. Orphans are listed every run; pass --prune when
   the list is genuinely what you meant to remove.
   ──────────────────────────────────────────────────────────────── */

import { readFile, writeFile, readdir, stat } from 'node:fs/promises';
import { homedir } from 'node:os';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT    = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const LIBRARY = resolve(ROOT, 'src/data/quotes.json');

const argv  = process.argv.slice(2);
const dry   = argv.includes('--dry');
const prune = argv.includes('--prune');
const given = argv.find(a => !a.startsWith('--'));

/* ── Find the sheet ──────────────────────────────────────────── */
async function resolveSheet() {
  if (given) return given.startsWith('~') ? given.replace('~', homedir()) : given;
  const files = (await readdir(ROOT)).filter(f => /^quotes.*\.csv$/i.test(f));
  if (!files.length) {
    console.error(`No quotes*.csv in ${ROOT}.`);
    console.error(`Download the sheet as CSV and drop it here, or pass a path.`);
    process.exit(1);
  }
  const withTime = await Promise.all(
    files.map(async f => ({ f, t: (await stat(resolve(ROOT, f))).mtimeMs }))
  );
  return resolve(ROOT, withTime.sort((a, b) => b.t - a.t)[0].f);
}

/* ── Cleanup ─────────────────────────────────────────────────── */
const tidy = s => s
  .replace(/[“”]/g, '"')
  .replace(/[‘’]/g, "'")
  .replace(/[―—–‒]/g, '—')
  .replace(/\s+/g, ' ')
  .trim();

/* Minimal RFC-4180 reader — enough for a Sheets export. Empty
   padding cells carry no meaning, so a row collapses to one line;
   that is what rescues an attribution typed into column E. */
function parseCsv(text) {
  const rows = []; let row = [], cell = '', quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') quoted = false;
      else cell += c;
    }
    else if (c === '"') quoted = true;
    else if (c === ',') { row.push(cell); cell = ''; }
    else if (c === '\n') { row.push(cell); rows.push(row); row = []; cell = ''; }
    else if (c !== '\r') cell += c;
  }
  row.push(cell); rows.push(row);
  return rows.map(r => r.map(c => c.trim()).filter(Boolean).join(' '));
}

/* ── Splitting text from attribution ─────────────────────────────
   Tried in order of how reliable each marker is. Within a pattern
   the LAST match wins: the attribution is at the end of the line,
   so a dash used as punctuation earlier in the quote is ignored. */
const SEPARATORS = [
  /["']\s*[-—]\s*/g,   // closing quote then a dash — the house format
  /\s+—\s*/g,          // em dash, space after optional
  /\s+--\s+/g,
  /\s+-\s+/g,          // bare hyphen, spaces both sides
  /["']\s+(?=[^"']*\|)/g,  // closing quote, no dash, but pipes follow
];

function splitLine(line) {
  for (const re of SEPARATORS) {
    const hits = [...line.matchAll(re)];
    /* A tail longer than this is another sentence, not a byline. */
    const hit = [...hits].reverse().find(m => line.length - (m.index + m[0].length) <= 110);
    if (hit) return [line.slice(0, hit.index + (re.source.startsWith('["\']') ? 1 : 0)),
                     line.slice(hit.index + hit[0].length)];
  }
  return [line, null];
}

const cleanText = s =>
  tidy(s).replace(/^["']+/, '').replace(/["']+\.?$/, '').trim();

function splitAttribution(s) {
  let rest = tidy(s).replace(/^[—-]\s*/, '');
  const out = {};

  if (rest.includes('|')) {
    const [author, source, year] = rest.split('|').map(x => tidy(x).replace(/\.$/, ''));
    if (author) out.author = author;
    if (source) out.source = source;
    if (/^\d{3,4}$/.test(year || '')) out.year = Number(year);
    return out;
  }

  rest = rest.replace(/\s*\(\s*\d{3,4}\s*[—-]\s*\d{3,4}\s*\)\s*$/, '').replace(/\.$/, '');
  const year = rest.match(/,?\s(\d{3,4})$/);
  if (year) { out.year = Number(year[1]); rest = rest.slice(0, year.index).trim(); }
  const comma = rest.match(/^([^,]+),\s*(.+)$/);
  if (comma) { out.author = tidy(comma[1]); out.source = tidy(comma[2]); }
  else if (rest) out.author = rest;
  return out;
}

/* ── Read ────────────────────────────────────────────────────── */
const sheet = await resolveSheet();
const rawText = await readFile(sheet, 'utf8');

const lines = (/\.csv$/i.test(sheet) ? parseCsv(rawText) : rawText.split('\n'))
  .map(tidy)
  .filter(l =>
    l &&
    !l.startsWith('#') &&
    !/^<.*>$/.test(l));          // the format legend at the top of the sheet

const staged = [];
for (const line of lines) {
  const [textPart, attribution] = splitLine(line);
  const text = cleanText(textPart);
  if (!text) continue;
  staged.push({ text, ...(attribution ? splitAttribution(attribution) : {}) });
}

let existing = [];
try { existing = JSON.parse(await readFile(LIBRARY, 'utf8')); }
catch (e) {
  if (!/ENOENT/.test(e.message)) {
    console.error(`\nquotes.json is not valid JSON, so nothing was imported.`);
    console.error(`  ${e.message}`);
    console.error(`\n  Fix: git checkout src/data/quotes.json\n`);
    process.exit(1);
  }
}

/* Identity is the words, ignoring punctuation and case — so "Just
   win, baby" and "Just win, baby!" are the same quote. */
const key = t => tidy(t).toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ').trim();
const prior = new Map(existing.map(q => [key(q.text), q]));

/* ── Merge ───────────────────────────────────────────────────── */
const next = [], seen = new Set();
let added = 0, kept = 0, dupes = 0;

for (const s of staged) {
  const k = key(s.text);
  if (seen.has(k)) { dupes++; continue; }
  seen.add(k);
  const p = prior.get(k);

  const e = { text: s.text };
  if (s.author)                 e.author = s.author;
  else if (p?.author)           e.author = p.author;
  if (s.source ?? p?.source)    e.source = s.source ?? p.source;
  if (s.year   ?? p?.year)      e.year   = s.year   ?? p.year;
  e.tags = p?.tags ?? [];
  if (e.author) e.verified = p?.verified ?? false;
  if (p?.note)  e.note = p.note;

  next.push(e);
  if (p) kept++;
  else {
    added++;
    const w = e.text.split(/\s+/).length;
    const where = w <= 9 ? 'drifts' : w <= 24 ? 'margins' : w <= 34 ? 'interstitial'
                : 'TOO LONG — will not appear';
    console.log(`  + ${(e.author ? `[${e.author}]` : '[phrase]').padEnd(24)}` +
                `${e.text.slice(0, 44)}${e.text.length > 44 ? '…' : ''}  (${w}w, ${where})`);
  }
}

const orphans = existing.filter(q => !seen.has(key(q.text)));
const output  = prune ? next : [...next, ...orphans];

if (dry) console.log('\n  --dry: nothing written.');
else await writeFile(LIBRARY, JSON.stringify(output, null, 2) + '\n');

/* ── Report ──────────────────────────────────────────────────── */
console.log(`\nSheet: ${sheet.replace(ROOT + '/', '')}`);
console.log(`${added} new, ${kept} unchanged${dupes ? `, ${dupes} duplicate rows in the sheet` : ''}.`);

if (orphans.length) {
  console.log(`\n${orphans.length} in the library but NOT in the sheet:`);
  for (const q of orphans) {
    console.log(`  ${prune ? '−' : '·'} ${(q.author ? `[${q.author}]` : '[phrase]').padEnd(24)}${q.text.slice(0, 44)}`);
  }
  console.log(prune
    ? `  Removed.`
    : `  Kept. Re-add them to the sheet, or run --prune to delete them for good.`);
}

const phrases    = output.filter(q => !q.author).length;
const unverified = output.filter(q => q.author && !q.verified).length;
const long       = output.filter(q => q.text.split(/\s+/).length > 34).length;
const by = {}; for (const q of output) if (q.author) by[q.author] = (by[q.author] ?? 0) + 1;
const top = Object.entries(by).sort((a, b) => b[1] - a[1])[0];

console.log(`\nLibrary: ${output.length} — ${phrases} phrases, ${output.length - phrases} quotations (${unverified} unverified).`);
if (top) {
  const share = Math.round((top[1] / output.length) * 100);
  console.log(`  ${Object.keys(by).length} authors, most-quoted ${top[0]} at ${share}%${share > 33 ? '  ← too concentrated' : ''}`);
}
if (long) console.log(`  ${long} over 34 words — too long for any slot. Trim or drop them.`);
if (output.length < 40) console.log(`  ${40 - output.length} more before the layer reads as wallpaper.`);
console.log(`\nCheck it: npm run build`);
