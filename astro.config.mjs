import { defineConfig } from "astro/config";
import partytown from "@astrojs/partytown";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import gruvbox from "./gruvbox.json";
import latex from "rehype-mathjax";
import node from "@astrojs/node";
import d2 from "astro-d2";

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
    },

    integrations: [d2({
        pad: 0,
        theme: {
            default: "301",
            dark: false
        }
    }), tailwind(), partytown(), sitemap()],
});