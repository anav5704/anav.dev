import opengraph from "./packages/astro/opengraph";
import { defineConfig } from "astro/config";
import partytown from "@astrojs/partytown";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import gruvbox from "./gruvbox.json";
import latex from "rehype-mathjax";
import math from "remark-math";

export default defineConfig({
    site: "https://www.anav.dev",
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
    integrations: [tailwind(), opengraph(), sitemap(), partytown()],
});
