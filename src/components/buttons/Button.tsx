import React, { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';
import { Color } from '@/types/style';

const colors: Record<Color, string> = {
  primary: 'bg-primary text-white',
  secondary: 'bg-secondary text-white',
  tertiary: 'bg-tertiary text-white',
  quaternary: 'bg-quaternary text-white',
  white: 'text-gray-950',
  red: 'bg-red text-white',
};

interface ButtonProps extends ComponentProps<'button'> {
  color?: Color;
}

function Button({ className, type = 'button', color = 'primary', children, ...props }: ButtonProps) {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={twMerge(`button ${colors[color]} ${className}`)}
      {...props}>
      {children}
    </button>
  );
}

export default Button;
