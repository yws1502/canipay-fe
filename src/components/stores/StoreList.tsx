'use client';

import React, { useEffect } from 'react';
import useInfiniteStores from '@/hooks/react-query/useInfiniteStores';
import { useIntersectionObserver } from '@/hooks/useObserver';
import ResizeBottomPanel from '../common/ResizeBottomPanel';
import Spinner from '../common/Spinner';
import StoreItem from './StoreItem';

function StoreList() {
  // TODO: 추후 결제 가능 목록만 필터할 수 있는 기능 필요
  const { data: storeInfoList, fetchNextPage, hasNextPage } = useInfiniteStores();

  const { intersecting, registerObserver } = useIntersectionObserver();

  useEffect(() => {
    if (intersecting) {
      fetchNextPage();
    }
  }, [intersecting]);

  return (
    <ResizeBottomPanel title='결제 가능 목록' className='z-0 mb-[50px]'>
      <ul className='flex flex-1 flex-col gap-3 overflow-auto pr-1'>
        {storeInfoList.map((storeInfo) => {
          return <StoreItem key={storeInfo.id} storeInfo={storeInfo} />;
        })}
        {hasNextPage && (
          <li ref={registerObserver} className='p-3 text-center'>
            <Spinner />
          </li>
        )}
      </ul>
    </ResizeBottomPanel>
  );
}

export default StoreList;
