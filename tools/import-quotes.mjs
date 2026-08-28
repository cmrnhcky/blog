#!/usr/bin/env node
/* ────────────────────────────────────────────────────────────────
   Text or spreadsheet → quotes.json.

     npm run quotes:import -- inbox.txt
     npm run quotes:import -- inbox.txt --dry     (preview, writes nothing)
     npm run quotes:import -- "~/Downloads/Sheet1.csv"

   NEVER edit src/data/quotes.json by hand. One missed comma or
   bracket and the whole site stops building. This script is the
   only thing that should write that file.

   Accepted shapes — all of these work, mixed freely in one file:

       Text — Author
       Text — Author | Source | Year
       Text                          (no author = your own phrase)
       "Text"
       ― Author                      (attribution on its own line,
                                      Goodreads / copy-paste style)
       - Author, Source
       - Author 1961

   .csv is parsed as a spreadsheet: cells are joined back into one
   line, so an attribution that drifted into column E still lands.
   Curly quotes, em/en dashes, horizontal bars, wrapping quote marks
   and (1475-1564) lifespans are all cleaned up here rather than by
   you at midnight with forty quotes to go.
   ──────────────────────────────────────────────────────────────── */

import { readFile, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';

const LIBRARY = new URL('../src/data/quotes.json', import.meta.url);
const arg = process.argv[2];

if (!arg) {
  console.error('Usage: npm run quotes:import -- <file.txt|file.csv>');
  process.exit(1);
}
const dry = process.argv.includes('--dry');
const file = arg.startsWith('~') ? arg.replace('~', homedir()) : arg;

/* ── Cleanup ─────────────────────────────────────────────────────
   Everything pasted from Notes, a browser, Word or Google Sheets
   arrives with typographic characters. Normalise once, here. */
const tidy = (s) =>
  s.replace(/[“”]/g, '"')      // curly double quotes
   .replace(/[‘’]/g, "'")      // curly single quotes
   .replace(/―|—|–|‒/g, '—')  // any long dash -> em dash
   .replace(/\s+/g, ' ')
   .trim();

/* Minimal RFC-4180 CSV reader — enough for a Sheets export. */
function parseCsv(text) {
  const rows = [];
  let row = [], cell = '', quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') quoted = false;
      else cell += c;
    } else if (c === '"') quoted = true;
    else if (c === ',') { row.push(cell); cell = ''; }
    else if (c === '\n') { row.push(cell); rows.push(row); row = []; cell = ''; }
    else if (c !== '\r') cell += c;
  }
  row.push(cell); rows.push(row);
  /* Rejoin the row: a stray attribution in column E is still part of
     the same thought, and empty padding cells carry no meaning. */
  return rows.map(r => r.map(c => c.trim()).filter(Boolean).join(' '));
}

const rawText = await readFile(file, 'utf8');
const logical = (file.toLowerCase().endsWith('.csv') ? parseCsv(rawText) : rawText.split('\n'))
  .map(l => tidy(l))
  .filter(l => l && !l.startsWith('#'));

/* A line that is only an attribution belongs to the line above it. */
const isAttribution = (l) => /^[—-]\s*\S/.test(l) && l.length < 120;

/* "Paulo Coelho, The Alchemist" / "JFK 1961" / "Michelangelo (1475-1564)" */
function splitAttribution(s) {
  let rest = tidy(s).replace(/^[—-]\s*/, '');
  const out = {};

  if (rest.includes('|')) {
    const [author, source, year] = rest.split('|').map(x => tidy(x));
    if (author) out.author = author;
    if (source) out.source = source;
    if (/^\d{3,4}$/.test(year || '')) out.year = Number(year);
    return out;
  }

  rest = rest.replace(/\s*\(\s*\d{3,4}\s*[—-]\s*\d{3,4}\s*\)\s*$/, '');  // lifespan
  const year = rest.match(/,?\s(\d{3,4})$/);
  if (year) { out.year = Number(year[1]); rest = rest.slice(0, year.index).trim(); }

  const comma = rest.match(/^([^,]+),\s*(.+)$/);
  if (comma) { out.author = tidy(comma[1]); out.source = tidy(comma[2]); }
  else if (rest) out.author = rest;
  return out;
}

let library = [];
try { library = JSON.parse(await readFile(LIBRARY, 'utf8')); }
catch (e) {
  if (!/ENOENT/.test(e.message)) {
    console.error(`\nquotes.json is not valid JSON, so nothing was imported.`);
    console.error(`  ${e.message}`);
    console.error(`\n  Fix: git checkout src/data/quotes.json  (discards hand edits, keeps the last good version)\n`);
    process.exit(1);
  }
}
const key = (t) => tidy(t).toLowerCase().replace(/[^a-z0-9 ]/g, '');
const seen = new Set(library.map(q => key(q.text)));

/* ── Parse ───────────────────────────────────────────────────────
   Walk the lines carrying one pending quote, so an attribution on
   the following line can still attach to it. */
const staged = [];
let pending = null;
const flush = () => { if (pending) staged.push(pending); pending = null; };

for (const line of logical) {
  if (isAttribution(line) && pending) {
    Object.assign(pending, splitAttribution(line));
    flush();
    continue;
  }
  flush();

  /* Inline attribution: an em dash with spaces, " -- ", or a closing
     quote mark followed straight by a hyphen. */
  /* An em dash with a space before it, " -- ", or a closing quote mark
     followed by a dash. The space *after* the dash is optional — half
     of what gets pasted omits it. */
  const m = line.match(/^(.*?)(?:\s+—\s*|\s+--\s+|["']\s*[-—]\s*)(.+)$/);
  let text = m ? m[1] : line;
  text = tidy(text).replace(/^["']+|["']+$/g, '').trim();
  if (!text) continue;

  pending = { text };
  if (m) Object.assign(pending, splitAttribution(m[2]));
}
flush();

/* ── Write ───────────────────────────────────────────────────────── */
let added = 0, dupes = 0;
for (const q of staged) {
  if (seen.has(key(q.text))) { dupes++; continue; }
  seen.add(key(q.text));

  const entry = { text: q.text };
  if (q.author) entry.author = q.author;
  if (q.source) entry.source = q.source;
  if (q.year)   entry.year   = q.year;
  entry.tags = [];
  if (q.author) entry.verified = false;   // your call, once you find the source

  library.push(entry);
  added++;

  const words = entry.text.split(/\s+/).length;
  const where = words <= 9 ? 'drifts' : words <= 20 ? 'masthead' : words <= 24 ? 'margins'
              : words <= 34 ? 'interstitial' : 'TOO LONG — will not appear';
  const who = entry.author ? `[${entry.author}]` : '[phrase]';
  console.log(`  + ${who.padEnd(22)} ${entry.text.slice(0, 46)}${entry.text.length > 46 ? '…' : ''}  (${words}w, ${where})`);
}

if (dry) console.log('\n  --dry: nothing written.');
else await writeFile(LIBRARY, JSON.stringify(library, null, 2) + '\n');

const phrases = library.filter(q => !q.author).length;
const unverified = library.filter(q => q.author && !q.verified).length;
const long = library.filter(q => q.text.split(/\s+/).length > 34).length;

console.log(`\n${added} added${dupes ? `, ${dupes} already present` : ''}. Library now ${library.length}.`);
console.log(`  ${phrases} phrases, ${library.length - phrases} quotations (${unverified} unverified).`);
if (long) console.log(`  ${long} over 34 words — too long for any slot. Trim or drop them.`);
if (library.length < 40) console.log(`  ${40 - library.length} more before the layer reads as wallpaper.`);
console.log(`\nCheck it: npm run build`);
