/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat","serif"],
        kanit: ["Kanit", "serif"],
        outfit: ["Outfit", "serif"],
      },
    },
  },
  plugins: [],
}
