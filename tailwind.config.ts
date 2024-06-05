/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                "primary-dim": "var(--primary-dim)",
                "primary-accent": "var(--primary-accent)",
                "primary-bright": "var(--primary-bright)",
            },
            fontFamily: {
                satoshi: ["Satoshi", defaultTheme.fontFamily.sans],
                dmSans: ["DMSans", defaultTheme.fontFamily.sans],
                jakatra: ["Jakatra", defaultTheme.fontFamily.serif]
            }
        },
    },
    plugins: [],
}
