#!/usr/bin/env node
/* ────────────────────────────────────────────────────────────────
   Plain text → quotes.json.

     npm run quotes:import -- inbox.txt

   Write quotes in a normal text file, one per line:

       The truth is rarely pure and never simple. — Oscar Wilde
       We are all in the gutter... — Oscar Wilde | Lady Windermere's Fan | 1892
       Price is nothing. Value is everything.

   A line with an em dash or " -- " splits into text and author.
   A line without one becomes a phrase — your own voice, no attribution.
   Optional " | source | year " after the author.
   Blank lines and lines starting with # are ignored.

   This exists so bulk entry never means hand-writing JSON. Escaping,
   commas and curly quotes are handled here rather than by you at
   midnight with forty quotes to go.
   ──────────────────────────────────────────────────────────────── */

import { readFile, writeFile } from 'node:fs/promises';

const LIBRARY = new URL('../src/data/quotes.json', import.meta.url);
const file = process.argv[2];

if (!file) {
  console.error('Usage: npm run quotes:import -- <file.txt>');
  process.exit(1);
}

/* Curly quotes and dashes come along with anything pasted from Notes,
   a browser, or Word. Normalise rather than making it the user's job. */
const tidy = (s) =>
  s.replace(/[“”]/g, '"')
   .replace(/[‘’]/g, "'")
   .trim();

const raw = await readFile(file, 'utf8');
const lines = raw.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('#'));

let library = [];
try { library = JSON.parse(await readFile(LIBRARY, 'utf8')); } catch { /* first run */ }
const seen = new Set(library.map(q => tidy(q.text).toLowerCase()));

let added = 0, dupes = 0;
for (const line of lines) {
  /* Em dash, en dash, or a double hyphen — whichever got typed. */
  const split = line.split(/\s+[—–]\s+|\s+--\s+/);
  let text = tidy(split[0]);
  const rest = split[1];

  if (!text) continue;
  /* Strip wrapping quote marks; the site adds its own. */
  text = text.replace(/^["']|["']$/g, '').trim();

  if (seen.has(text.toLowerCase())) { dupes++; continue; }

  const entry = { text };
  if (rest) {
    const [author, source, year] = rest.split('|').map(s => tidy(s));
    if (author) entry.author = author;
    if (source) entry.source = source;
    if (year && /^\d{3,4}$/.test(year)) entry.year = Number(year);
    entry.verified = false;   // your call, after you find the source
  }
  entry.tags = [];

  library.push(entry);
  seen.add(text.toLowerCase());
  added++;
  const words = text.split(/\s+/).length;
  const where = words <= 9 ? 'drifts' : words <= 24 ? 'margins' : words <= 34 ? 'interstitial' : 'TOO LONG';
  console.log(`  + ${entry.author ? `[${entry.author}] ` : '[phrase] '}${text.slice(0, 52)}${text.length > 52 ? '…' : ''}  (${words}w, ${where})`);
}

await writeFile(LIBRARY, JSON.stringify(library, null, 2) + '\n');

const phrases = library.filter(q => !q.author).length;
const unverified = library.filter(q => q.author && !q.verified).length;
console.log(`\n${added} added${dupes ? `, ${dupes} already present` : ''}. Library now ${library.length}.`);
console.log(`  ${phrases} phrases, ${library.length - phrases} quotations (${unverified} unverified).`);
if (library.length < 40) console.log(`  ${40 - library.length} more to go before the layer reads as wallpaper.`);
