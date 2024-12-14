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
    },
  },
  plugins: [],
} satisfies Config;
