/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        '30px': '30px'
      },
      screens: {
        '450': '450px'
      },
      translate: {
        '50': '-50%'
      },
      boxShadow: {
        'section': '0 2px 4px 0 rgba(0, 0, 0, .2), 0 25px 50px 0 rgba(0, 0, 0, .1)',
        'input': '0 0 2px 2px #cf7d7d'
      }
    },
  },
  plugins: [],
}

