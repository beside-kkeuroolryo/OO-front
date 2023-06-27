/** @type {import('tailwindcss').Config} */

const spacing = Array(101)
  .fill()
  .reduce((acc, _, index) => {
    const value = index * 2;
    acc[value] = `${value / 10}rem`;
    return acc;
  }, {});

const borderRadius = Array(51)
  .fill()
  .reduce((acc, _, index) => {
    const value = index * 2;
    acc[value] = `${value / 10}rem`;
    return acc;
  }, {});

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    spacing,
    borderRadius,
    extend: {},
  },
  plugins: [],
};
