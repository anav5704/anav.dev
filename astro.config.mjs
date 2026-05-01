import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import gruvbox from "./gruvbox.json";
import svelte from "@astrojs/svelte";
import vercel from "@astrojs/vercel";
import latex from "rehype-mathjax";
import d2 from "astro-d2";

export default defineConfig({
    site: "https://www.anav.dev",
    trailingSlash: "never",
    prefetch: {
        prefetchAll: true,
        defaultStrategy: "viewport"
    },
    adapter: vercel({
        isr: {
            expiration: 60 * 60 * 24
        },
        imageService: true,
        devImageService: "sharp"
    }),
    markdown: {
        syntaxHighlight: "shiki",
        shikiConfig: {
            theme: gruvbox
        },
        rehypePlugins: [latex]
    },
    integrations: [
        d2({
            pad: 0,
            fonts: {
                regular: "./assets/Geist.ttf",
                bold: "./assets/Geist.ttf",
                italic: "./assets/Geist.ttf",
                semibold: "./assets/Geist.ttf"
            },
            theme: {
                default: "1",
                dark: false
            }
        }),
        svelte(),
        partytown(),
        sitemap()
    ],
    vite: {
        plugins: [tailwindcss()]
    }
});
