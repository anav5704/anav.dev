import vercel from "@astrojs/vercel/serverless";
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

const theme = {
    name: "gruvbox-dark",
    settings: [
        {
            scope: ["comment"],
            settings: {
                foreground: "#928374"
            }
        },
        {
            scope: ["string"],
            settings: {
                foreground: "#B8BB26"
            }
        },
        {
            scope: ["keyword"],
            settings: {
                foreground: "#FB4934"
            }
        },
        {
            scope: ["number", "constant", "variable.language"],
            settings: {
                foreground: "#D79921"
            }
        },
        {
            scope: ["function", "entity.name.function"],
            settings: {
                foreground: "#FABD2F"
            }
        },
        {
            scope: ["variable.parameter", "variable"],
            settings: {
                foreground: "#83A598"
            }
        },
        {
            scope: ["class", "type"],
            settings: {
                foreground: "#D3869B"
            }
        },
        {
            scope: ["punctuation"],
            settings: {
                foreground: "#EBDBB2"
            }
        },
        {
            scope: ["operator"],
            settings: {
                foreground: "#FE8019"
            }
        },
        {
            scope: ["meta.embedded"],
            settings: {
                foreground: "#8EC07C"
            }
        },
        {
            scope: ["support"],
            settings: {
                foreground: "#689D6A"
            }
        }
    ],
    colors: {
        "editor.background": "#282828",
        "editor.foreground": "#EBDBB2",
        "editorCursor.foreground": "#EBDBB2",
        "editor.selectionBackground": "#D5C4A1",
        "editor.lineHighlightBackground": "#3C3836",
        "editorLineNumber.foreground": "#928374"
    }
};

// https://astro.build/config
export default defineConfig({
    site: "https://anav.dev",
    output: "server",
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
        shikiConfig: { theme }
    },
    integrations: [tailwind(), react(), sitemap()]
});
