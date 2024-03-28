/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'print': { 'raw': 'print' },
      }
    },
  },
  plugins: [],
  darkMode: ["selector", '[data-mantine-color-scheme="dark"]']
};