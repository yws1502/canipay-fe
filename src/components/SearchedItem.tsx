'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import CopyIcon from '@/assets/icons/copy.svg';
import NaverIcon from '@/assets/icons/naver.svg';
import { NAVER_MAP_URL } from '@/constants/env';
import { EXCEPTION_MESSAGE } from '@/constants/error';
import { PAGE_PATH } from '@/constants/page';
import { StoreInfo } from '@/types/tMap';
import TextButton from './common/buttons/TextButton';

interface SearchedItemProps {
  store: StoreInfo;
}

function SearchedItem({ store }: SearchedItemProps) {
  const searchParams = useSearchParams();
  const [isCopied, setIsCopied] = useState(false);

  const handleOpenNaver = (item: string) => {
    if (NAVER_MAP_URL === '') throw new Error(EXCEPTION_MESSAGE.environmentNotSet('NAVER_MAP_URL'));
    window.open(`${NAVER_MAP_URL}/${item}`, '_blank', 'noopener,noreferrer');
  };

  const handleCopyAddress = (address: string) => {
    navigator.clipboard
      .writeText(address)
      .then(() => {
        setIsCopied(true);

        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch(console.error);
  };

  return (
    <li className='rounded-md p-3 shadow-300 hover:bg-gray-50'>
      <div className='mb-2 flex items-start justify-between'>
        <Link
          href={{
            pathname: PAGE_PATH.storeDetail(store.id),
            query: searchParams.toString(),
          }}
          scroll={false}
          className='text-heading-3 text-gray-950 duration-300 ease-in-out hover:text-primary'
        >
          {store.name}
        </Link>
        <span className='text-caption-1 text-primary hover:opacity-80 active:opacity-60'>
          리뷰 00
        </span>
      </div>
      <div className='flex items-center justify-between'>
        <span className='text-caption-1 text-gray-950'>{store.category}</span>
        <div className='relative flex items-center gap-2'>
          <TextButton onClick={() => handleOpenNaver(`${store.address} ${store.name}`)}>
            <NaverIcon className='mr-1' width={16} height={16} />
            <i className='hidden'>네이버로</i> 열기
          </TextButton>
          <TextButton onClick={() => handleCopyAddress(store.address)}>
            <CopyIcon className='fill-gray-500' width={16} height={16} />
            주소
          </TextButton>
          <p
            className={`${isCopied ? 'opacity-100' : 'opacity-0'} absolute bottom-[-28px] right-0 rounded-md bg-white px-1.5 py-1 text-caption-1 shadow-500 duration-700 ease-in-out`}
          >
            복사 완료!
          </p>
        </div>
      </div>
    </li>
  );
}

export default SearchedItem;
