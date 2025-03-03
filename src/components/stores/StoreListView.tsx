'use client';

import React, { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { useIntersectionObserver } from '@/hooks/useObserver';
import { StoreInfo } from '@/types/store';
import Spinner from '../common/Spinner';
import StoreItem from './StoreItem';

interface StoreListViewProps {
  storeInfoList: StoreInfo[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  className?: string;
}

function StoreListView({
  storeInfoList,
  fetchNextPage,
  hasNextPage,
  className,
}: StoreListViewProps) {
  const { intersecting, registerObserver } = useIntersectionObserver();

  useEffect(() => {
    if (intersecting) {
      fetchNextPage();
    }
  }, [intersecting]);

  return (
    <ul className={twMerge('flex flex-1 flex-col gap-3 overflow-auto pr-1', className)}>
      {storeInfoList.map((storeInfo) => {
        return <StoreItem key={storeInfo.id} storeInfo={storeInfo} />;
      })}
      {hasNextPage && (
        <li ref={registerObserver} className='p-3 text-center'>
          <Spinner />
        </li>
      )}
    </ul>
  );
}

export default StoreListView;
