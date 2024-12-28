'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import CopyIcon from '@/assets/icons/copy.svg';
import NaverIcon from '@/assets/icons/naver.svg';
import { QUERY_STRING } from '@/constants/page';
import { useIntersectionObserver } from '@/hooks/useObserver';
import { useStoreInfiniteQuery } from '@/hooks/useTMap';
import ResizeHandle from './common/ResizeHandle';
import TextButton from './common/buttons/TextButton';

function SearchedList() {
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
      className={`${!!searchKeyword ? 'translate-y-0' : 'translate-y-full'} shadow-800 fixed inset-x-0 bottom-0 z-30 flex w-full flex-col gap-5 rounded-t-xl bg-white p-4 transition-transform duration-500 ease-in-out`}
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
          return (
            <li key={store.id} className='rounded-md p-3 shadow-300 hover:bg-gray-50'>
              <div className='mb-2 flex items-start justify-between'>
                <Link href={store.name} className='text-heading-3 text-gray-950 hover:text-primary'>
                  {store.name}
                </Link>
                <span className='text-caption-1 text-primary hover:opacity-80 active:opacity-60'>
                  리뷰 00
                </span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-caption-1 text-gray-950'>{store.category}</span>
                <div className='flex items-center gap-2'>
                  <TextButton>
                    <NaverIcon className='mr-1' width={16} height={16} />
                    <i className='hidden'>네이버로</i> 열기
                  </TextButton>
                  <TextButton>
                    <CopyIcon className='fill-gray-500' width={16} height={16} />
                    주소
                  </TextButton>
                </div>
              </div>
            </li>
          );
        })}
        <li ref={registerObserver}>test</li>
      </ul>
    </article>
  );
}

export default SearchedList;
