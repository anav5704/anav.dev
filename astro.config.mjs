import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
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
        imageService: true,
        devImageService: "sharp"
    }),
    markdown: {
        syntaxHighlight: "shiki",
        shikiConfig: {
            theme: "gruvbox-dark-medium"
        },
        rehypePlugins: [latex]
    },
    integrations: [
        mdx({
            syntaxHighlight: "shiki",
            shikiConfig: {
                theme: "gruvbox-dark-medium"
            },
            rehypePlugins: [latex]
        }),
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
        react(),
        partytown(),
        sitemap()
    ],
    vite: {
        plugins: [tailwindcss()]
    }
});
