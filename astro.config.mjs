import vercel from "@astrojs/vercel/serverless";
import { defineConfig } from "astro/config";
import rehypeMathjax from 'rehype-mathjax'
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import gruvbox from './gruvbox.json'
import react from "@astrojs/react";

export default defineConfig({
    site: "https://www.anav.dev",
    output: "hybrid",
    adapter: vercel(),
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
    integrations: [tailwind(), react(), sitemap()],
    devToolbar: {
        enabled: false
    },
});