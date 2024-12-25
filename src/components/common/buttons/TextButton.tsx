import React, { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';
import { Size } from '@/types/style';

const sizes: Record<Size, string> = {
  sm: 'text-caption-2',
  md: 'text-caption-1',
};

interface TextButtonProps extends ComponentProps<'button'> {
  size?: 'sm' | 'md';
}

function TextButton({
  className,
  type = 'button',
  size = 'md',
  children,
  ...props
}: TextButtonProps) {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={twMerge(`button-text ${sizes[size]} ${className}`)}
      {...props}>
      {children}
    </button>
  );
}

export default TextButton;
