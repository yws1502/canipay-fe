'use client';

import React from 'react';
import useStore from '@/hooks/react-query/useStore';
import StoreItem from '../stores/StoreItem';

interface StoreTooltipProps {
  storeId: string;
}

function StoreTooltip({ storeId }: StoreTooltipProps) {
  const { data: storeInfo } = useStore(storeId);

  return (
    <div className='absolute bottom-4 left-full w-[250px] -translate-x-1/2'>
      {storeInfo && (
        <>
          <StoreItem storeInfo={storeInfo} className='w-full list-none bg-gray-50' />
          <div className='absolute -bottom-1 left-1/2 size-[20px] -translate-x-1/2 rotate-45 rounded-sm bg-gray-50' />
        </>
      )}
    </div>
  );
}

export default StoreTooltip;
