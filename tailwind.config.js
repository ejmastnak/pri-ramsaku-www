/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    screens: {
      'xxs': '375px',
      'xs': '540px',
      'sm': '640px',
      'md': '768px',
      'nav': '820px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        'sans': ['Figtree', ...defaultTheme.fontFamily.sans],
      },
    },
  },
}

