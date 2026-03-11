/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // FIN5IVE Brand Colors
        finBlue: {
          DEFAULT: '#003366', // The deep corporate blue
          light: '#004c99',
          dark: '#001933',
        },
        finOrange: {
          DEFAULT: '#FF6600', // The energetic brand orange
          light: '#ff8533',
          dark: '#cc5200',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'], // Clean, modern corporate font
      }
    },
  },
  plugins: [],
}