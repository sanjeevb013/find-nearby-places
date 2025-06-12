// tailwind.config.js
module.exports = {
  darkMode: 'class', // <-- important!
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}', // adjust based on your folder structure
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
