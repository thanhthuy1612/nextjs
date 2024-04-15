import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['"Roboto"', 'sans-serif'],
      },
      colors: {
        textPrimary: '#121212',
        primaryBlueDark: '#388087',
        primaryBlueMedium: '#6FB3B8',
        primaryBlueLight: '#AAD7D9',
        primaryBlue: '#BADFE7',
        primaryGreen: '#C2EDCE',
        primaryWhite: '#FBF9F1',
        primaryGray: '#E5E1DA',
        primaryGrayLight: '#F6F6F2',
        primaryYellow: '#F4F2DE',
        blueDarkPastel: '#1261A6',
        redPastel: '#FF6961',
        pinkPastel: '#D49E8D',
      },
      boxShadow: {
        'focus-visible': 'none',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
export default config;
