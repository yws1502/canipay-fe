import React from 'react';
import { twMerge } from 'tailwind-merge';
import { registerMouseDownDrag } from '@/utils/domEvent';

interface ResizeHandleProps {
  direction: 'col' | 'row';
  size: number;
  onChangeSize: (value: number) => void;
  className?: string;
  limit?: { min?: number; max?: number };
}

function ResizeHandle({ direction, size, onChangeSize, className, limit }: ResizeHandleProps) {
  const handleChangeSize = (deltaX: number, deltaY: number) => {
    const targetDelta = direction === 'col' ? deltaX : deltaY;
    const newSize = size - targetDelta;

    if (limit && limit.min && limit.min >= newSize) return;
    if (limit && limit.max && limit.max <= newSize) return;

    onChangeSize(newSize);
  };

  const { onMouseDown, onTouchStart } = registerMouseDownDrag(handleChangeSize, direction, true);

  return (
    <button
      type='button'
      className={twMerge('cursor-row-resize py-1.5', className)}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >
      <i className='block h-[6px] w-[80px] rounded-xl bg-gray-300' />
    </button>
  );
}

export default ResizeHandle;
