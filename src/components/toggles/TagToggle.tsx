import React, { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface TagToggleProps {
  id: string;
  children: ReactNode;
  onChange: (tagId: string) => void;
  className?: string;
}

function TagToggle({ id, className, onChange, children }: TagToggleProps) {
  return (
    <label htmlFor={id} className={twMerge(`tag-toggle ${className}`)}>
      <input type='checkbox' id={id} className='hidden' onChange={() => onChange(id)} />
      {children}
    </label>
  );
}

export default TagToggle;
