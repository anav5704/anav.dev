import vercel from '@astrojs/vercel/serverless';
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
    output: 'server',
    adapter: vercel({
        webAnalytics: {
            enabled: true,
        },
    }),
    devToolbar: {
        enabled: false
    },
    markdown: {
        syntaxHighlight: 'shiki',
        theme: 'dracula'
    },
    integrations: [tailwind(), react()]
});