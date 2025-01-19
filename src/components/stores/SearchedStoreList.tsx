'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { PAGE_PATH, QUERY_STRING } from '@/constants/page';
import useInfiniteStoresProxy from '@/hooks/react-query/useInfiniteStoresProxy';
import { useIntersectionObserver } from '@/hooks/useObserver';
import ResizeBottomPanel from '../common/ResizeBottomPanel';
import Spinner from '../common/Spinner';
import StoreItem from './StoreItem';

function SearchedList() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchKeyword = searchParams.get(QUERY_STRING.search) ?? '';

  const { data: storeInfoList, fetchNextPage, hasNextPage } = useInfiniteStoresProxy(searchKeyword);

  const { intersecting, registerObserver } = useIntersectionObserver();

  useEffect(() => {
    if (intersecting) {
      fetchNextPage();
    }
  }, [intersecting]);

  return (
    <ResizeBottomPanel
      title='결과목록'
      className={
        pathname === PAGE_PATH.root && searchKeyword ? 'translate-y-0' : 'translate-y-full'
      }
    >
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

export default SearchedList;
