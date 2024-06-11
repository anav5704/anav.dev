import vercel from '@astrojs/vercel/serverless';
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

export default defineConfig({
    site: 'https://anav.dev',
    output: 'server',
    adapter: vercel({
        webAnalytics: {
            enabled: true
        }
    }),
    devToolbar: {
        enabled: false
    },
    markdown: {
        syntaxHighlight: 'shiki',
        theme: 'dracula'
    },
    integrations: [tailwind(), react(), sitemap()]
});