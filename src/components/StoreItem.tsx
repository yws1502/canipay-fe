'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import CopyIcon from '@/assets/icons/copy.svg';
import NaverIcon from '@/assets/icons/naver.svg';
import { NAVER_MAP_URL } from '@/constants/env';
import { EXCEPTION_MESSAGE } from '@/constants/error';
import { PAGE_PATH } from '@/constants/page';
import { StoreInfo } from '@/types/store';
import TextButton from './common/buttons/TextButton';

interface StoreItemProps {
  storeInfo: StoreInfo;
}

function StoreItem({ storeInfo }: StoreItemProps) {
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
      <div className='mb-4 flex items-start justify-between'>
        <Link
          href={{
            pathname: PAGE_PATH.storeDetail(storeInfo.id),
            query: searchParams.toString(),
          }}
          scroll={false}
          className='text-heading-3 text-gray-950 duration-300 ease-in-out hover:text-primary'
        >
          {storeInfo.name}
        </Link>
        {(() => {
          switch (storeInfo.paymentStatus) {
            case 'available':
              return <span className='text-caption-1 text-primary'>리뷰 00</span>;
            case 'unavailable':
              return <span className='text-caption-1 text-red'>결제 불가</span>;
            default: // unregistered
              return <TextButton>등록</TextButton>;
          }
        })()}
      </div>
      <div className='flex items-center justify-between'>
        <span className='text-caption-1 text-gray-950'>{storeInfo.category}</span>
        <div className='relative flex items-center gap-2'>
          <TextButton onClick={() => handleOpenNaver(`${storeInfo.address} ${storeInfo.name}`)}>
            <NaverIcon className='mr-1' width={16} height={16} />
            <i className='hidden'>네이버로</i> 열기
          </TextButton>
          <TextButton onClick={() => handleCopyAddress(storeInfo.address)}>
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

export default StoreItem;
