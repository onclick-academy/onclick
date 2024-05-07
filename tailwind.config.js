/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      'color': {
        'ocblack': '#192335',
        'ocgray': '#6b7385',
        'ocgold': '#FF8F3C',
      },
    },
  },
  plugins: [],
};
