// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://cmrnhcky.com',
  integrations: [sitemap()],
  redirects: {
    '/now':            '/living',
    '/oscar':          '/living',
    '/ledger':         '/guessing',
    '/writing':        '/saying',
    '/writing/[slug]': '/saying/[slug]',
    '/about':          '/cameron',
  },
});