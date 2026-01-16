import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/app/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0b0f14',
        surface: '#121826',
        primary: '#4da3ff',
        secondary: '#7cf2c2',
        muted: '#9aa4b2',
      },
    },
  },
  plugins: [],
};

export default config;
