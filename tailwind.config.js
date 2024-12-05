/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'mostarda-escuro': '#CC9D2F',
        'mostarda-claro': '#E5CE97',
        vinho: '#5B0017',
        'bg-card': '#243054'
      },
      fontFamily: {
        'Playfair': ['Playfair Display', 'sans-serif']
      }
    },
  },
  plugins: [],
}

