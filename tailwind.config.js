/** @type {import('tailwindcss').Config} */
const defaulTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["*"],
  theme: {
    extend: {
      fontFamily: {
        bebas : ['"Bebas Neue"', ...defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [],
}

