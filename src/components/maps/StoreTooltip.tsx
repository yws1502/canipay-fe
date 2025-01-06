'use client';

import React from 'react';
import useStore from '@/hooks/react-query/useStore';
import StoreItem from '../StoreItem';

interface StoreTooltipProps {
  stores: {
    id: string;
    name: string;
  }[];
  onSelectStore: (storeId: string) => void;
}

function StoreTooltip({ stores, onSelectStore }: StoreTooltipProps) {
  const { data: storeInfo } = useStore(stores[0].id);

  return stores.length === 1 ? (
    <div className='absolute bottom-4 left-full w-[250px] -translate-x-1/2'>
      {storeInfo && (
        <>
          <StoreItem storeInfo={storeInfo} className='w-full list-none bg-gray-50' />
          <div className='absolute -bottom-1 left-1/2 size-[20px] -translate-x-1/2 rotate-45 rounded-sm bg-gray-50' />
        </>
      )}
    </div>
  ) : (
    <ul
      role='menu'
      className='absolute top-1 flex w-[80px] flex-col gap-1 rounded-sm bg-white p-1 text-caption-1 duration-200 hover:w-[140px]'
    >
      {stores.map((store) => {
        return (
          <li key={store.id} className='w-full overflow-auto'>
            <button
              type='button'
              className='w-full truncate rounded-sm p-1 text-left duration-200 hover:bg-gray-200'
              title={store.name}
              onClick={() => onSelectStore(store.id)}
            >
              {store.name}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default StoreTooltip;
