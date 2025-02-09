/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        maven: ['Maven Pro', 'sans-serif'],
        bruno: ['Bruno Ace SC', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        avant: ['Avant-Garde', 'sans-serif'],
        mont: ['Montserrat', "sans-serif"]  // Replace with your desired font
      },
      screens: {
        xs: "450px",
        s: "600px",
      },
    },
  },
  plugins: [],
};

