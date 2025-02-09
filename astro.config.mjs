import { defineConfig } from "astro/config";
import partytown from "@astrojs/partytown";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import gruvbox from "./gruvbox.json";
import latex from "rehype-mathjax";
import math from "remark-math";

import node from "@astrojs/node";

export default defineConfig({
    site: "https://www.anav.dev",

    trailingSlash: "never",

    adapter: node({
        mode: "standalone",
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
            latex,
        ],
        remarkPlugins: [
            math
        ],
    },

    integrations: [tailwind(), sitemap(), partytown()],
});