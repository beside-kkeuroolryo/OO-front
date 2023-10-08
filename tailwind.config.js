/** @type {import('tailwindcss').Config} */
import { fontFamily as defaultTheme } from 'tailwindcss/defaultTheme';

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
    spacing: {
      ...spacing,
      default: 'var(--padding)',
    },
    borderRadius,
    fontSize: {
      13: '1.3rem',
      14: '1.4rem',
      15: '1.5rem',
      16: '1.6rem',
      17: '1.7rem',
      18: '1.8rem',
      20: '2.0rem',
      22: '2.2rem',
      24: '2.4rem',
    },
    extend: {
      maxWidth: {
        mobile: 'var(--max-width)',
      },
      fontFamily: {
        sans: ['Pretendard', ...defaultTheme.sans],
      },
      colors: {
        dark: '#262626',
        cyan: '#00f6bf',
        header: '#404040',
        primary: '#525252',
        secondary: '#737373',
        tertiary: '#d4d4d4',
        placeholder: '#a3a3a3',
        cancelborder: '#e0e0e0',
        cancel: '#838383',
        background: '#f5f5f5',
        bar: '#f7f7f7',
      },
    },
  },
  plugins: [],
};
