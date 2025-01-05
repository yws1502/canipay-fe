'use client';

import React, { ReactNode, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import ResizeHandle from './ResizeHandle';

interface ResizeBottomPanelProps {
  title: string;
  children: ReactNode;
  defaultHeight?: number;
  className?: string;
}

function ResizeBottomPanel({
  title,
  children,
  className,
  defaultHeight = 300,
}: ResizeBottomPanelProps) {
  const [height, setHeight] = useState(defaultHeight);

  const onChangeHeight = (value: number) => {
    setHeight(value);
  };

  return (
    <article
      className={twMerge(
        'fixed inset-x-0 bottom-0 z-30 flex w-full flex-col gap-5 rounded-t-xl bg-white p-4 shadow-500 transition-transform duration-500 ease-in-out',
        className
      )}
      style={{ height }}
    >
      <header className='relative'>
        <h3 className='text-body-2'>{title}</h3>
        <ResizeHandle
          className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
          direction='row'
          size={height}
          onChangeSize={onChangeHeight}
          limit={{ min: 60, max: 600 }}
        />
      </header>
      {children}
    </article>
  );
}

export default ResizeBottomPanel;
