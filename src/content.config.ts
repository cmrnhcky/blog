import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro:content';
import { topicSlugs, formSlugs } from './lib/taxonomy';

/* Two axes — see src/lib/taxonomy.ts.
   `topic` is required and is the navigation. `form` is optional and is
   the franchise; a post without one is its own escape hatch. */
const saying = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/saying' }),
  schema: z.object({
    title:    z.string(),
    date:     z.coerce.date(),
    topic:    z.enum(topicSlugs),
    form:     z.enum(formSlugs).optional(),
    excerpt:  z.string(),
    draft:    z.boolean().default(false),
    featured: z.boolean().default(false),
    tags:     z.array(z.string()).default([]),
    ritual:   z.string().optional(),
    /* Optional lead image. Path is relative to public/ — see _docs/PUBLISHING.md.
       Doubles as the article's social preview when set. */
    image:        z.string().optional(),
    imageAlt:     z.string().optional(),
    imageCaption: z.string().optional(),
  }),
});

/* The feed. Chronological, no title, no taxonomy — deliberately. */
const living = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/living' }),
  schema: z.object({
    date:     z.coerce.date(),
    activity: z.enum(['running', 'drinking', 'parenting', 'betting', 'watching', 'listening', 'reading', 'working', 'other']),
    type:     z.enum(['image', 'youtube', 'spotify', 'note']),
    src:      z.string().optional(),
    alt:      z.string().optional(),
    caption:  z.string().optional(),
    youtube:  z.string().optional(),
    /* Paste any Spotify share URL — playlist, album or track. */
    spotify:  z.string().optional(),
  }),
});

export const collections = { saying, living };
