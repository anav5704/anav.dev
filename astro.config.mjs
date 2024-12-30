import cloudflare from "@astrojs/cloudflare";
import { defineConfig } from "astro/config";
import partytown from "@astrojs/partytown";
import rehypeMathjax from 'rehype-mathjax'
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import gruvbox from './gruvbox.json'
import react from "@astrojs/react";


export default defineConfig({
    site: "https://www.anav.dev",
    output: "static",
    adapter: cloudflare({
        platformProxy: {
            enabled: true,
        }
    }),
    prefetch: {
        prefetchAll: true,
        defaultStrategy: "viewport"
    },
    markdown: {
        syntaxHighlight: "shiki",
        shikiConfig: {
            theme: gruvbox,
        },
        rehypePlugins: [
            rehypeMathjax
        ],
    },
    integrations: [tailwind(), react(), sitemap(), partytown()],
});
