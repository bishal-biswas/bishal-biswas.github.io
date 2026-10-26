// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
    site: 'https://bishal-biswas.github.io',
    // /admin is a static Decap page in public/, so it never reaches the sitemap;
    // the filter is insurance in case it ever becomes a real route. The masonry
    // and magazine article layouts are noindex alternates of /articles/.
    integrations: [sitemap({
        filter: (page) => !page.includes('/admin') && !/\/articles\/(masonry|magazine)\//.test(page),
    })],
    vite: {
        plugins: [tailwindcss()],
    },
});