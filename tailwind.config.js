/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      aspectRatio: {
        'video': '16 / 9',
      },
      maxWidth: {
        '8xl': '90rem',
      },
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [],
};