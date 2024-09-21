import vercel from "@astrojs/vercel/serverless";
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import gruvbox from './gruvbox.json'
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
    site: "https://www.anav.dev",
    output: "hybrid",
    adapter: vercel({
        webAnalytics: {
            enabled: true
        }
    }),
    prefetch: {
        prefetchAll: true,
        defaultStrategy: "viewport"
    },
    devToolbar: {
        enabled: false
    },
    markdown: {
        syntaxHighlight: "shiki",
        shikiConfig: {
            theme: gruvbox
        }
    },
    integrations: [tailwind(), react(), sitemap()]
});