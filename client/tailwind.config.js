/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#A8715A",
        secondary: "#DD8560",
      },
      fontFamily: {
        ["TenorSans-Regular"]: ["TenorSans-Regular"],
        ["Poppins-Thin"]: ["Poppins-Thin"],
        ["Poppins-ExtraLight"]: ["Poppins-ExtraLight"],
        ["Poppins-Light"]: ["Poppins-Light"],
        ["Poppins-Regular"]: ["Poppins-Regular"],
        ["Poppins-Medium"]: ["Poppins-Medium"],
        ["Poppins-SemiBold"]: ["Poppins-SemiBold"],
        ["Poppins-Bold"]: ["Poppins-Bold"],
        ["Poppins-ExtraBold"]: ["Poppins-ExtraBold"],
        ["Poppins-Black"]: ["Poppins-Black"],
      },
    },
  },
  plugins: [],
};
