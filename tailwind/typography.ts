import type { KeyValuePair, ResolvableTo } from 'tailwindcss/types/config';

const typography: ResolvableTo<
  KeyValuePair<
    string,
    | string
    | [fontSize: string, lineHeight: string]
    | [
        fontSize: string,
        configuration: Partial<{
          lineHeight: string;
          letterSpacing: string;
          fontWeight: string | number;
        }>,
      ]
  >
> = {
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
};

export default typography;
