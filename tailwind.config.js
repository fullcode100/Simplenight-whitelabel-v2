module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      borderRadius: {
        6: '6px',
        8: '8px',
        10: '10px',
        12: '12px',
      },
      colors: {
        primary: 'var(--primary-color)',
        'primary-light': 'var(--primary-light-color)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
