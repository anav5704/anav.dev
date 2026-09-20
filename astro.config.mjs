import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import rehypeMermaid from "rehype-mermaid";
import partytown from "@astrojs/partytown";
import { pathToFileURL } from "node:url";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import react from "@astrojs/react";
import latex from "rehype-mathjax";
import mdx from "@astrojs/mdx";
import path from "node:path";

const mermaidConfig = {
    theme: "base",
    themeVariables: {
        primaryColor: "#ffffff",
        primaryTextColor: "#444444",
        primaryBorderColor: "#71717a",
        lineColor: "#71717a",
        background: "#ffffff",
        edgeLabelBackground: "#ffffff",
        clusterBkg: "#ffffff",
        clusterBorder: "#71717a",
        titleColor: "#444444",
        fontFamily: '"Geist Sans", sans-serif',
        fontSize: "16px"
    },
};

const mermaidPlugin = [
    rehypeMermaid,
    {
        strategy: "inline-svg",
        mermaidConfig,
        css: pathToFileURL(
            path.join(process.cwd(), "assets", "mermaid-headless.css")
        ).href
    }
];

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
        syntaxHighlight: {
            type: "shiki",
            excludeLangs: ["mermaid"]
        },
        shikiConfig: {
            theme: "gruvbox-dark-medium"
        },
        rehypePlugins: [mermaidPlugin, latex]
    },
    integrations: [
        mdx({
            syntaxHighlight: {
                type: "shiki",
                excludeLangs: ["mermaid"]
            },
            shikiConfig: {
                theme: "gruvbox-dark-medium"
            },
            rehypePlugins: [mermaidPlugin, latex]
        }),
        react(),
        partytown(),
        sitemap()
    ],
    vite: {
        plugins: [tailwindcss()]
    }
});
