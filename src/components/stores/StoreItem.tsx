'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { MouseEvent, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import CopyIcon from '@/assets/icons/copy.svg';
import NaverIcon from '@/assets/icons/naver.svg';
import { NAVER_MAP_URL } from '@/constants/env';
import { EXCEPTION_MESSAGE } from '@/constants/error';
import { PAGE_PATH } from '@/constants/page';
import { useLike } from '@/hooks/react-query/useLike';
import { useLikedStores } from '@/stores/useLikedStores';
import { RequestLikeStore, StoreInfo } from '@/types/store';
import TextButton from '../common/buttons/TextButton';
import LikeButton from './LikeButton';

interface StoreItemProps {
  storeInfo: StoreInfo;
  className?: string;
}

function StoreItem({ storeInfo, className }: StoreItemProps) {
  const searchParams = useSearchParams();

  const [isCopied, setIsCopied] = useState(false);

  const { mutate: likeMutate } = useLike();
  const { exists: existsStore, push: pushStore, remove: removeStore } = useLikedStores();

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

  const onClickLike = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    event.stopPropagation();
    const isLiked = existsStore(storeInfo.id);

    const action: RequestLikeStore['body']['action'] = isLiked ? 'unlike' : 'like';
    likeMutate(
      { id: storeInfo.id, body: { action } },
      {
        onSuccess: () => {
          if (action === 'like') pushStore(storeInfo.id);
          else removeStore(storeInfo.id);
        },
      }
    );
  };

  return (
    <li className={twMerge('rounded-md p-3 shadow-300 hover:bg-gray-50', className)}>
      <div className='mb-4 flex items-start justify-between gap-1'>
        <Link
          href={{
            pathname: PAGE_PATH.storeDetail(storeInfo.id),
            query: searchParams.toString(),
          }}
          scroll={false}
          className='truncate text-heading-3 text-gray-950 duration-300 ease-in-out hover:text-primary'
          title={storeInfo.name}
        >
          {storeInfo.name}
        </Link>
        {(() => {
          switch (storeInfo.paymentStatus) {
            case 'available':
              return (
                <div className='flex shrink-0 gap-2 text-caption-1'>
                  <div>
                    <span className='mr-1 text-primary'>리뷰</span>
                    <span>{storeInfo.reviewCount.toString().padStart(2, '0')}</span>
                  </div>
                  <LikeButton
                    isLiked={existsStore(storeInfo.id)}
                    likeCount={storeInfo.likeCount}
                    onClick={onClickLike}
                  />
                </div>
              );
            case 'unavailable':
              return <span className='shrink-0 text-caption-1 text-red'>결제 불가</span>;
            default: // unregistered
              return <TextButton className='shrink-0'>등록</TextButton>;
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
