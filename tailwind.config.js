/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/some-library/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"), // Plugin untuk styling teks
    require("@tailwindcss/forms"), // Plugin untuk form styling
  ],
};
