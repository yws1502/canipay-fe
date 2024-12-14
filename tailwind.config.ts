import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#029CFD',
        secondary: '#A7E28C',
        tertiary: '#FE4685',
        quaternary: '#FEAE00',
        white: '#FFFFFF',
        red: '#D01E1E',
        gray: {
          '50': '#F9FAFB',
          '100': '#F3F4F6',
          '200': '#E5E7EB',
          '300': '#D1D5DB',
          '400': '#9CA3AF',
          '500': '#6B7280',
          '600': '#4B5563',
          '700': '#374151',
          '800': '#1F2937',
          '900': '#111827',
        },
      },
      fontSize: {
        'heading-1': [
          '1.625rem', // 26px / 16px = 1.625rem
          {
            lineHeight: '2.375rem', // 38px / 16px = 2.375rem
            letterSpacing: '0',
            fontWeight: '700',
          },
        ],
        'heading-2': [
          '1.375rem', // 22px / 16px = 1.375rem
          {
            lineHeight: '2rem', // 32px / 16px = 2rem
            letterSpacing: '0',
            fontWeight: '700',
          },
        ],
        'heading-3': [
          '1.125rem', // 18px / 16px = 1.125rem
          {
            lineHeight: '1.625rem', // 26px / 16px = 1.625rem
            letterSpacing: '0',
            fontWeight: '700',
          },
        ],
        'body-1': [
          '1rem', // 16px / 16px = 1rem
          {
            lineHeight: '1.4375rem', // 23px / 16px = 1.4375rem
            letterSpacing: '0',
            fontWeight: '400',
          },
        ],
        'body-2': [
          '0.875rem', // 14px / 16px = 0.875rem
          {
            lineHeight: '1.25rem', // 20px / 16px = 1.25rem
            letterSpacing: '0',
            fontWeight: '400',
          },
        ],
        'caption-1': [
          '0.75rem', // 12px / 16px = 0.75rem
          {
            lineHeight: '1.0625rem', // 17px / 16px = 1.0625rem
            letterSpacing: '0',
            fontWeight: '400',
          },
        ],
        'caption-2': [
          '0.625rem', // 10px / 16px = 0.625rem
          {
            lineHeight: '0.875rem', // 14px / 16px = 0.875rem
            letterSpacing: '0',
            fontWeight: '300',
          },
        ],
        'error-1': [
          '0.875rem', // 14px / 16px = 0.875rem
          {
            lineHeight: '1.25rem', // 20px / 16px = 1.25rem
            letterSpacing: '0',
            fontWeight: '400',
          },
        ],
        'error-2': [
          '0.75rem', // 12px / 16px = 0.75rem
          {
            lineHeight: '0.875rem', // 14px / 16px = 0.875rem
            letterSpacing: '0',
            fontWeight: '300',
          },
        ],
      },
    },
  },
  plugins: [],
} satisfies Config;
