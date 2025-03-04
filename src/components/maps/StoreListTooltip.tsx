import React from 'react';

interface StoreListTooltipProps {
  stores: {
    id: string;
    name: string;
  }[];
  onSelectStore: (storeId: string) => void;
}

function StoreListTooltip({ stores, onSelectStore }: StoreListTooltipProps) {
  return (
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

export default StoreListTooltip;
