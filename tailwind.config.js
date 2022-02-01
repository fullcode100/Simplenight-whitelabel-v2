module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        'primary-light': 'var(--primary-light-color)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
