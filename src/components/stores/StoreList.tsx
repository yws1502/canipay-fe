'use client';

import React from 'react';
import useInfiniteStores from '@/hooks/react-query/useInfiniteStores';
import ResizeBottomPanel from '../common/ResizeBottomPanel';
import StoreListView from './StoreListView';

function StoreList() {
  // TODO: 추후 결제 가능 목록만 필터할 수 있는 기능 필요
  const { data: storeInfoList, fetchNextPage, hasNextPage } = useInfiniteStores();

  return (
    <ResizeBottomPanel title='결제 가능 목록' className='z-0 mb-[50px] sm:hidden'>
      <StoreListView
        storeInfoList={storeInfoList}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
      />
    </ResizeBottomPanel>
  );
}

export default StoreList;
