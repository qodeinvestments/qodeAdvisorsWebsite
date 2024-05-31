/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '9': '2.25rem', // 36px
      },
      padding: {
        'page': '1rem 2rem', // 16px 32px
      },
    },
  },
  plugins: [],
}

