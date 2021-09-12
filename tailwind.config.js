module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        "80vw": "80vw",
        "20vw": "20vw",
      },
      minWidth: {
        "20vw": "20vw",
      },
      zIndex: {
        100: "100",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
