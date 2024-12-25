'use client';

import React, { FC, ReactNode, SVGProps, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import CircleBlueOffIcon from '@/assets/icons/circle-blue-off.svg';
import CircleBlueOnIcon from '@/assets/icons/circle-blue-on.svg';
import CircleCheckedIcon from '@/assets/icons/circle-checked.svg';
import CircleRedOffIcon from '@/assets/icons/circle-red-off.svg';
import CircleRedOnIcon from '@/assets/icons/circle-red-on.svg';
import CircleUncheckedIcon from '@/assets/icons/circle-unchecked.svg';

type IconTheme = 'check' | 'blue' | 'red';

const onIconMapper: Record<IconTheme, FC<SVGProps<SVGElement>>> = {
  check: CircleCheckedIcon,
  blue: CircleBlueOnIcon,
  red: CircleRedOnIcon,
};

const offIconMapper: Record<IconTheme, FC<SVGProps<SVGElement>>> = {
  check: CircleUncheckedIcon,
  blue: CircleBlueOffIcon,
  red: CircleRedOffIcon,
};

interface IconTextToggleProps {
  id: string;
  children: ReactNode;
  theme: IconTheme;
  defaultToggle?: boolean;
  className?: string;
}

function IconTextToggle({ id, children, theme, defaultToggle = false, className }: IconTextToggleProps) {
  const [toggle, setToggle] = useState(defaultToggle);

  const handleChangeToggle = () => {
    setToggle(!toggle);
  };

  const OnIcon = onIconMapper[theme];
  const OffIcon = offIconMapper[theme];
  return (
    <label htmlFor={id} className={twMerge(`icon-text-toggle ${className}`)}>
      <input type='checkbox' id={id} className='hidden' onChange={handleChangeToggle} />
      {toggle ? <OnIcon width={16} height={16} /> : <OffIcon width={16} height={16} />}
      {children}
    </label>
  );
}

export default IconTextToggle;
