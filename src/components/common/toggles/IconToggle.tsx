import React, { FC, SVGProps } from 'react';
import { twMerge } from 'tailwind-merge';

interface IconToggleProps {
  id: string;
  Icon: FC<SVGProps<SVGElement>>;
  className?: string;
}

function IconToggle({ id, Icon, className }: IconToggleProps) {
  return (
    <label htmlFor={id} className={twMerge(`icon-toggle ${className}`)}>
      <input type='checkbox' id={id} className='peer/toggle hidden' />
      <Icon className='fill-gray-500 peer-checked/toggle:fill-white' width='20' height='20' />
    </label>
  );
}

export default IconToggle;
