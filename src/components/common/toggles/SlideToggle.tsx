import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface SlideToggleProps {
  defaultToggle?: boolean;
  className?: string;
}

function SlideToggle({ defaultToggle = false, className }: SlideToggleProps) {
  const [toggle, setToggle] = useState(defaultToggle);

  const handleChangeToggle = () => {
    setToggle(!toggle);
  };

  return (
    <button
      type='button'
      className={twMerge(
        `slide-toggle ${className} ${toggle ? 'border-white' : 'border-gray-500'}`
      )}
      onClick={handleChangeToggle}>
      <div
        className={`${toggle ? 'translate-x-full bg-white' : 'bg-gray-500'} size-[14px] rounded-full duration-300 ease-in-out`}
      />
    </button>
  );
}

export default SlideToggle;
