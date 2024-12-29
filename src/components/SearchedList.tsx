'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { PAGE_PATH, QUERY_STRING } from '@/constants/page';
import { useIntersectionObserver } from '@/hooks/useObserver';
import { useStoreInfiniteQuery } from '@/hooks/useTMap';
import SearchedItem from './SearchedItem';
import ResizeHandle from './common/ResizeHandle';
import Spinner from './common/Spinner';

function SearchedList() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchKeyword = searchParams.get(QUERY_STRING.search) ?? '';

  const [height, setHeight] = useState(300);

  const { data: searchedStoreList, fetchNextPage } = useStoreInfiniteQuery(searchKeyword);

  const { intersecting, registerObserver } = useIntersectionObserver();

  useEffect(() => {
    if (intersecting) {
      fetchNextPage();
    }
  }, [intersecting]);

  const onChangeHeight = (value: number) => {
    setHeight(value);
  };

  return (
    <article
      className={`${pathname === PAGE_PATH.storeList && searchKeyword ? 'translate-y-0' : 'translate-y-full'} fixed inset-x-0 bottom-0 z-30 flex w-full flex-col gap-5 rounded-t-xl bg-white p-4 shadow-500 transition-transform duration-500 ease-in-out`}
      style={{ height }}
    >
      <header className='relative'>
        <h3 className='text-body-2'>결과목록</h3>
        <ResizeHandle
          className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
          direction='row'
          size={height}
          onChangeSize={onChangeHeight}
          limit={{ min: 60, max: 600 }}
        />
      </header>
      <ul className='flex-1 overflow-auto pr-1'>
        {searchedStoreList.map((store) => {
          return <SearchedItem key={store.id} store={store} />;
        })}
        <li ref={registerObserver} className='p-3 text-center'>
          <Spinner />
        </li>
      </ul>
    </article>
  );
}

export default SearchedList;
