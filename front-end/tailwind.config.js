/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          100: '#f3e8ff',
          300: '#d8b4fe',
          500: '#a855f7',
        },
        blue: {
          600: '#2563eb',
        }
      }
    },
  },
  plugins: [],
}