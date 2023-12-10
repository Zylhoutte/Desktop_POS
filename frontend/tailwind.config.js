/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#1f1f1f",
        "light-white": "rgb(255,133,2)",
      },
    },
  },
  plugins: [

  ],
}