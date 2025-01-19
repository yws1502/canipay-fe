'use client';

import React, { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface TagToggleProps<T> {
  id: T;
  children: ReactNode;
  onChange: (tagId: T) => void;
  className?: string;
}

function TagToggle<T extends string>({ id, className, onChange, children }: TagToggleProps<T>) {
  return (
    <label htmlFor={id} className={twMerge(`tag-toggle ${className}`)}>
      <input type='checkbox' id={id} className='hidden' onChange={() => onChange(id)} />
      {children}
    </label>
  );
}

export default TagToggle;
