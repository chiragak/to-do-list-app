module.exports = {
  darkMode: 'class', // This enables dark mode based on the class 'dark'
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Rubik', 'sans-serif'],
      },
      colors: {
        'primary-dark': '#11175E',
      },
    },
  },
  plugins: [],
};
