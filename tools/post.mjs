#!/usr/bin/env node
/* ────────────────────────────────────────────────────────────────
   A Living entry in about twenty seconds.

     npm run post

   Exists to make routing the content you already posted elsewhere
   cheap enough that you actually do it.
   ──────────────────────────────────────────────────────────────── */

import { writeFile } from 'node:fs/promises';
import { createInterface } from 'node:readline/promises';

const ACTIVITIES = ['running','drinking','parenting','betting','watching','listening','reading','working','other'];

const rl = createInterface({ input: process.stdin, output: process.stdout });
const ask = async (q, fallback = '') => (await rl.question(q)).trim() || fallback;

console.log('\nA Living entry. Enter to accept the default in brackets.\n');

let activity = '';
while (!ACTIVITIES.includes(activity)) {
  activity = (await ask(`activity (${ACTIVITIES.join('/')}): `)).toLowerCase();
  if (!ACTIVITIES.includes(activity)) console.log('  ↳ not one of those.');
}

const caption = await ask('caption (the one line that shows): ');
const kind    = (await ask('anything attached? (n)one / (i)mage / (y)outube [n]: ', 'n')).toLowerCase()[0];

let type = 'note', extra = '';
if (kind === 'i') {
  type = 'image';
  const src = await ask('  image path (e.g. /images/living/trail.jpg): ');
  const alt = await ask('  alt text (what is in the picture): ');
  extra = `src: "${src}"\nalt: "${alt}"\n`;
} else if (kind === 'y') {
  type = 'youtube';
  extra = `youtube: "${await ask('  youtube url: ')}"\n`;
}

const body = await ask('body (optional, one line — leave blank for none): ');
const date = new Date().toISOString().slice(0, 10);

const slug = (caption || activity).toLowerCase()
  .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40) || activity;
const path = `src/content/living/${date}-${slug}.md`;

await writeFile(path, `---
date: ${date}
activity: ${activity}
type: ${type}
${extra}caption: "${caption.replace(/"/g, '\\"')}"
---
${body ? `\n${body}\n` : ''}`);

rl.close();
console.log(`\n  ${path}\n\nCheck it: npm run dev → /living`);
console.log(`Ship it:  git add -A && git commit -m "Living: ${caption.slice(0,40)}" && git push\n`);
