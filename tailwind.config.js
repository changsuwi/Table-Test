/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        'table-cell': '220px',
        'table-row': '1320px',
      },
      maxWidth: {
        'table': '1322px',
      },
      height: {
        'table': '602px',
      },
    },
  },
  plugins: [],
}