/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'morado-electrico': '#ca38ed ',
        'rosa-brillante': '#e487fb',
        'morado-oscuro': '#3e1149',
        'gris-pizarra': '#574e5a',
        'gris-lila': '#bcb1bf',
        'gris': '#787878',
        
      }
    },
  },
  plugins: [],
}

