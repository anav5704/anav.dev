import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

export default defineConfig({
    devToolbar: {
        enabled: false
    },
    markdown: {
        syntaxHighlight: 'shiki',
        theme: 'dracula',
    },
    integrations: [tailwind(), react()]
});