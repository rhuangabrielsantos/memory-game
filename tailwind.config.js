module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false,
  theme: {
    extend: {},
    fontFamily: {
      roboto: ["Roboto", "ui-sans-serif", "system-ui"],
      righteous: ["Righteous", "ui-sans-serif", "system-ui"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("tailwind-dracula")()],
};
