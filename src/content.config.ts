import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

const saying = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/saying' }),
  schema: z.object({
    title:    z.string(),
    date:     z.coerce.date(),
    pillar:   z.enum(['Pours', 'Miles', 'Bets', 'Kids', 'Essentials']),
    excerpt:  z.string(),
    draft:    z.boolean().default(false),
    featured: z.boolean().default(false),
    tags:     z.array(z.string()).default([]),
    ritual:   z.string().optional(),
  }),
});

const guessing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guessing' }),
  schema: z.object({
    date:      z.coerce.date(),
    event:     z.string(),
    category:  z.enum(['sports', 'markets', 'prediction', 'other']),
    stake:     z.number().optional(),
    odds:      z.number().optional(),
    result:    z.enum(['W', 'L', 'P', 'pending']),
    payout:    z.number().optional(),
    reasoning: z.string(),
  }),
});

const living = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/living' }),
  schema: z.object({
    date:     z.coerce.date(),
    activity: z.enum(['running', 'drinking', 'parenting', 'betting', 'watching', 'listening', 'reading', 'working', 'other']),
    type:     z.enum(['image', 'youtube', 'note']),
    src:      z.string().optional(),
    alt:      z.string().optional(),
    caption:  z.string().optional(),
    youtube:  z.string().optional(),
  }),
});

export const collections = { saying, guessing, living };
