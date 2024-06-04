/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            fontFamily: {
                zodiak: ["Zodiak", defaultTheme.fontFamily.serif],
                jakatra: ["Jakatra", defaultTheme.fontFamily.serif]
            }
        },
    },
    plugins: [],
}
