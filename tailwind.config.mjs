/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f4f6fa',
          100: '#e9edf5',
          200: '#cbd5e7',
          300: '#9db0d3',
          400: '#6886ba',
          500: '#46659f',
          600: '#354f81',
          700: '#2b3f69',
          800: '#202f4f',
          900: '#1b2641',
          950: '#10172a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
