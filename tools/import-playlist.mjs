#!/usr/bin/env node
/* ────────────────────────────────────────────────────────────────
   Import a YouTube / YouTube Music playlist into the song library.

     npm run music:import -- "https://music.youtube.com/playlist?list=PL..."

   Pulls the video IDs off the playlist page and the title/artist for
   each from YouTube's oEmbed endpoint. No API key, no OAuth, no
   account — both endpoints are public.

   Adds only songs not already in the library, and never touches the
   `moods` on ones already there, so re-running after adding tracks to
   a playlist is safe and keeps your tagging.
   ──────────────────────────────────────────────────────────────── */

import { readFile, writeFile } from 'node:fs/promises';

const LIBRARY = new URL('../src/data/music.json', import.meta.url);

const listId = (input) => {
  const m = input.match(/[?&]list=([A-Za-z0-9_-]+)/);
  return m ? m[1] : input.trim();
};

async function videoIds(list) {
  const res = await fetch(`https://www.youtube.com/playlist?list=${list}`, {
    headers: { 'Accept-Language': 'en-US', 'User-Agent': 'Mozilla/5.0' },
  });
  if (!res.ok) throw new Error(`playlist page returned ${res.status} — is the playlist public or unlisted?`);
  const html = await res.text();
  const ids = [...html.matchAll(/"videoId":"([A-Za-z0-9_-]{11})"/g)].map(m => m[1]);
  return [...new Set(ids)];
}

async function meta(id) {
  const res = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`);
  if (!res.ok) return null;                       // private, deleted or region-locked
  const j = await res.json();
  return {
    id,
    title: j.title,
    /* YouTube Music's auto-generated artist channels are "Artist - Topic". */
    artist: (j.author_name || '').replace(/ - Topic$/, ''),
  };
}

const url = process.argv[2];
if (!url) {
  console.error('Usage: npm run music:import -- "<youtube playlist url>"');
  process.exit(1);
}

const list = listId(url);
console.log(`Reading playlist ${list} …`);

const ids = await videoIds(list);
if (!ids.length) throw new Error('no videos found — check the playlist is public or unlisted');
console.log(`  ${ids.length} videos`);

let library = [];
try { library = JSON.parse(await readFile(LIBRARY, 'utf8')); } catch { /* first run */ }
const known = new Set(library.map(s => s.id));

let added = 0, skipped = 0, failed = 0;
for (const id of ids) {
  if (known.has(id)) { skipped++; continue; }
  const m = await meta(id);
  if (!m) { failed++; console.log(`  ✗ ${id} — unavailable`); continue; }
  library.push({ ...m, moods: [] });
  added++;
  console.log(`  + ${m.artist} — ${m.title}`);
}

library.sort((a, b) => (a.artist + a.title).localeCompare(b.artist + b.title));
await writeFile(LIBRARY, JSON.stringify(library, null, 2) + '\n');

console.log(`\n${added} added, ${skipped} already known${failed ? `, ${failed} unavailable` : ''}.`);
const untagged = library.filter(s => !s.moods?.length).length;
if (untagged) console.log(`${untagged} of ${library.length} still need moods — edit src/data/music.json.`);
