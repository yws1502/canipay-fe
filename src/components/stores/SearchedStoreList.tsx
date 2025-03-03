'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import React from 'react';
import { LOCATION } from '@/constants/location';
import { PAGE_PATH, QUERY_STRING } from '@/constants/page';
import useInfiniteStoresProxy from '@/hooks/react-query/useInfiniteStoresProxy';
import ResizeBottomPanel from '../common/ResizeBottomPanel';
import StoreListView from './StoreListView';

function SearchedList() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchKeyword = searchParams.get(QUERY_STRING.search) ?? '';
  const lon = Number(searchParams.get(QUERY_STRING.lon)) ?? LOCATION.lon;
  const lat = Number(searchParams.get(QUERY_STRING.lat)) ?? LOCATION.lat;

  const {
    data: storeInfoList,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteStoresProxy(searchKeyword, lon, lat);

  return (
    <ResizeBottomPanel
      title='결과목록'
      className={
        pathname === PAGE_PATH.root && searchKeyword ? 'translate-y-0' : 'translate-y-full'
      }
    >
      <StoreListView
        storeInfoList={storeInfoList}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
      />
    </ResizeBottomPanel>
  );
}

export default SearchedList;
