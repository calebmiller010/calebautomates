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
});
