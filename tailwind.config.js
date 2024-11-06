module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',  
    './src/components/**/*.{js,ts,jsx,tsx}',  
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Rubik', 'sans-serif'], // Rubik font family
      },
      colors: {
        'primary-dark': '#11175E', // Custom color for primary dark text
      },
    },
  },
  plugins: [],
};