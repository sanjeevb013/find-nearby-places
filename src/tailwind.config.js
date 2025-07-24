// tailwind.config.js
module.exports = {
  darkMode: 'class', // <-- important!
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}', // adjust based on your folder structure
  ],
  theme: {
    extend: {
      keyframes: {
        'facebook-loader': {
          '0%': { top: '0.5rem', height: '4rem' },
          '50%, 100%': { top: '1.5rem', height: '2rem' },
        },
      },
      animation: {
        'facebook-bar': 'facebook-loader 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite',
      },
    },
  },
  plugins: [],
}
