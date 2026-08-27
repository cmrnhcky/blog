// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://cmrnhcky.com',
  integrations: [sitemap()],
  redirects: {
    // Pass 2 moved articles from /saying/[slug] to /[topic]/[slug] and
    // retired /saying as a layer. Done at one day old and one published
    // article, so this table stays short.
    '/saying/the-13-whiskey': '/drink/the-13-whiskey',
    '/saying':                '/archive',
    '/writing':               '/archive',
    '/ledger':                '/archive',
    '/guessing':              '/archive',
    '/oscar':                 '/living',
    '/about':                 '/cameron',
  },
});
