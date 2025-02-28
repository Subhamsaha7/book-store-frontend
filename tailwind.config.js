/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css}"
  ],
  mode: 'jit', // Ensure JIT mode is enabled
  theme: {
    extend: {
      colors: {
        primary: '#FFCE1A',
        secondary: "#0D0842",
        blackBG: '#F3F3F3',
        Favorite: '#FF5841'
      }, 
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        playfair: ["Playfair Display", "serif"],
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ],
}
