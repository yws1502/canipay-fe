import type { RecursiveKeyValuePair, ResolvableTo } from 'tailwindcss/types/config';

const colors: ResolvableTo<RecursiveKeyValuePair<string, string>> = {
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
};

export default colors;
