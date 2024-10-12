/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '50': 'repeat(50, 12.5px)', 
      },
      gridTemplateRows:{
        "50":"repeat(50, 12.5px)"
      }
    },
  },
  plugins: [],
}