const colors = require("tailwindcss/colors")
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      main: "#FCA3D9",
      mainDark: "#fb7bc8",
      mainText: "#D9BEB0",
      white: colors.white,
      black: colors.black,
      gray: colors.gray,
    },
  },
  plugins: [],
}
