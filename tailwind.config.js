/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';
import daisyui from 'daisyui';

module.exports = {
  // prefix: 'arb-',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.8rem',
      md: '0.875rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    },
    extend: {
      spacing: {
        xxs: '0.25rem',
        xs: '0.5rem',
        s: '1rem',
        m: '1.5rem',
        l: '2.5rem',
        xl: '5rem',
        xxl: '10rem',
        xxxl: '15rem',
        'container-max-width': 'var(--container-max-width)',
        'page-width': 'var(--container-max-width)',
        'content-padding': 'var(--content-padding)',
        'content-top-margin': 'var(--content-top-margin)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
        '6xl': '5rem',
        '7xl': '8rem',
      },
      zoom: {
        40: '0.40',
        45: '0.45',
        50: '0.5',
        55: '0.55',
        60: '0.6',
        65: '0.65',
        70: '0.7',
        75: '0.75',
        80: '0.8',
        85: '0.85',
        90: '0.9',
        95: '0.95',
        100: '1',
        110: '1.1',
        120: '1.2',
        130: '1.3',
        140: '1.4',
        150: '1.5',
        160: '1.6',
        170: '1.7',
        180: '1.8',
        190: '1.9',
        200: '2',
      },
    },
  },
  plugins: [
    typography,
    daisyui,
    function ({ addUtilities }) {
      const newUtilities = {
        '.zoom-40': {
          zoom: '0.40',
        },
        '.zoom-45': {
          zoom: '0.45',
        },
        '.zoom-50': {
          zoom: '0.50',
        },
        '.zoom-55': {
          zoom: '0.55',
        },
        '.zoom-60': {
          zoom: '0.60',
        },
        '.zoom-65': {
          zoom: '0.65',
        },
        '.zoom-70': {
          zoom: '0.70',
        },
        '.zoom-75': {
          zoom: '0.75',
        },
        '.zoom-80': {
          zoom: '0.80',
        },
        '.zoom-85': {
          zoom: '0.85',
        },
        '.zoom-90': {
          zoom: '0.90',
        },
        '.zoom-95': {
          zoom: '0.95',
        },
        '.zoom-100': {
          zoom: '1',
        },
        '.zoom-110': {
          zoom: '1.10',
        },
        '.zoom-120': {
          zoom: '1.20',
        },
        '.zoom-130': {
          zoom: '1.30',
        },
        '.zoom-140': {
          zoom: '1.40',
        },
        '.zoom-150': {
          zoom: '1.50',
        },
        '.zoom-160': {
          zoom: '1.60',
        },
        '.zoom-170': {
          zoom: '1.70',
        },
        '.zoom-180': {
          zoom: '1.80',
        },
        '.zoom-190': {
          zoom: '1.90',
        },
        '.zoom-200': {
          zoom: '2',
        },
      };

      addUtilities(newUtilities);
    },
  ],
  daisyui: {
    themes: [
      'light',
      'dark',
      {
        arb: {
          ...require('daisyui/src/theming/themes')['light'],
          'base-content': '#000045',
          primary: '#150FE0',
          secondary: '#01B2FE',
          // "accent": "#E6EDFF",
          // "neutral": "#090909",
          // "base-100": "#FFFFFF",
          // "info": "#0000ff",
          // "success": "#00ff00",
          // "warning": "#00ff00",
          // "error": "#ff0000",
          '--rounded-box': '1rem', // border radius rounded-box utility class, used in card and other large boxes
          '--rounded-btn': '0.75rem',
          // "--rounded-badge": "1.9rem", // border radius rounded-badge utility class, used in badges and similar
          // "--animation-btn": "0.25s", // duration of animation when you click on button
          // "--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
          // "--btn-focus-scale": "0.95", // scale transform of button when you focus on it
          // "--border-btn": "1px", // border width of buttons
          // "--tab-border": "1px", // border width of tabs
          // "--tab-radius": "0.5rem", // border radius of tabs
        },
      },
    ],
    darkTheme: 'dark',
    base: true,
    styled: true,
    utils: true,
    prefix: '',
    logs: false,
    themeRoot: ':root',
  },
};
