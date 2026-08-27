// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://cmrnhcky.com',
  integrations: [sitemap()],

  /* Redirects live in public/_redirects, NOT here.
     Astro's `redirects` option generates a static meta-refresh page at each
     old path. Those return HTTP 200, so they shadow Netlify's _redirects
     rules entirely — a soft redirect search engines may index as a second
     copy of the page. Netlify's own rules only apply where no static file
     exists, so the two cannot coexist. _redirects gives real 301s. */
});
