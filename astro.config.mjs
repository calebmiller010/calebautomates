import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://calebautomates.com',
  integrations: [
    // applyBaseStyles:false — we own the reset/tokens in src/styles/global.css; don't let
    // the integration inject its own base sheet.
    tailwind({ applyBaseStyles: false }),
    mdx(),
  ],
  // NOTE: @astrojs/sitemap 3.7.3 crashes this Astro 4.16 build (reduce-of-undefined in its
  // build:done hook), so we ship a static public/sitemap.xml instead. If pages are added,
  // update that file (or revisit the integration on an Astro upgrade).
});
