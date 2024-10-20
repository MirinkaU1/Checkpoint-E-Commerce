/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bleu: "#004aad",
        orange: "#ff914d",
      },
    },
    fontFamily: {
      Montserrat: ["Montserrat", "sans-serif"],
      Poppins: ["Poppins", "sans-serif"],
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [],
  },
};
