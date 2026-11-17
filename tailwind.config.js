/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Paleta: tinta (fondos), washi (texto), fuji/glicina (acento principal)
      // y tres acentos semánticos para las categorías de personajes.
      colors: {
        tinta: {
          950: "#0c0b0f",
          900: "#131118",
          800: "#1b1922",
          700: "#262330",
          600: "#34303f",
        },
        washi: {
          50: "#f4efe6",
          200: "#d9d2c5",
          400: "#a59e93",
        },
        fuji: {
          300: "#d4b5f0",
          400: "#b98ce0",
          500: "#9c6bc9",
          600: "#7d4fae",
        },
        beni: { 400: "#e0525a", 500: "#c8323b" }, // demonios / errores
        jade: { 400: "#4fb393", 500: "#3f9b7f" }, // humanos / éxito
        kin: { 400: "#e2b866", 500: "#d9a84e" }, // hashira
      },
      fontFamily: {
        display: ['"Shippori Mincho B1"', "Georgia", "serif"],
        sans: ["Manrope", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
    },
  },
  plugins: [],
};
