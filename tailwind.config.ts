import type { Config } from 'tailwindcss';
import colors from './tailwind/colors';
import typography from './tailwind/typography';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors,
      fontSize: typography,
      boxShadow: {
        '300': '0px 0px 5px -2px #D1D5DB',
        '500': '0px 0px 5px -2px #6B7280',
      },
    },
  },
  plugins: [],
} satisfies Config;
