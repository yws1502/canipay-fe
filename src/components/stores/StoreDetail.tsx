'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import CloseIcon from '@/assets/icons/close.svg';
import CopyIcon from '@/assets/icons/copy.svg';
import NaverIcon from '@/assets/icons/naver.svg';
import { NAVER_MAP_URL } from '@/constants/env';
import { EXCEPTION_MESSAGE } from '@/constants/error';
import { PAGE_PATH } from '@/constants/page';
import { StoreInfo } from '@/types/store';
import TextButton from '../common/buttons/TextButton';
import { useAsideToggle } from '../contexts/AsideToggleProvider';
import { useMapController } from '../contexts/MapControllerProvider';
import RegisterStore from './RegisterStore';
import ReviewList from './ReviewList';

interface StoreDetailProps {
  initStoreInfo: StoreInfo;
}

function StoreDetail({ initStoreInfo }: StoreDetailProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { asideToggle } = useAsideToggle();

  const [isCopied, setIsCopied] = useState(false);

  const [storeInfo, setStoreInfo] = useState(initStoreInfo);

  const { mapController } = useMapController();

  useEffect(() => {
    if (mapController) {
      const { lon, lat } = initStoreInfo;
      mapController.setCenter([Number(lon), Number(lat)], true);
      mapController.setOverlayLocation([Number(lon), Number(lat)], true);
    }
  }, [mapController]);

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
    <section
      className={twMerge(
        'fixed left-1/2 z-30 flex w-[90%] -translate-x-1/2 flex-col gap-5 overflow-auto rounded-sm bg-white p-4 shadow-500 duration-500',
        // NOTE: 사용자 디바이스 크기에 따라 height를 설정하기 위하여 inset-y 활용 (등록된 컴포넌트만 리뷰 목록이 존재하여 Height의 크기가 가변적)
        storeInfo.paymentStatus === 'available' ? 'inset-y-[15%]' : 'top-[30%]',
        'md:left-[426px] md:top-[66px] md:w-[370px] md:translate-x-0',
        !asideToggle && 'md:-translate-x-[350px]'
      )}
    >
      <div className='relative'>
        <div className='mb-3 flex items-start justify-between'>
          <header className='flex-1 overflow-auto'>
            <h3 className='truncate text-heading-3' title={storeInfo.name}>
              {storeInfo.name}
            </h3>
            <span className='text-caption-1'>{storeInfo.category}</span>
          </header>
          <div className='flex gap-2'>
            <TextButton onClick={() => handleOpenNaver(`${storeInfo.address} ${storeInfo.name}`)}>
              <NaverIcon className='mr-1' width={16} height={16} />
              <i className='hidden'>네이버로</i> 열기
            </TextButton>
            <button
              type='button'
              className='hover:opacity-80 active:opacity-60'
              onClick={() => router.push(`${PAGE_PATH.root}?${searchParams.toString()}`)}
            >
              <CloseIcon className='fill-gray-500' width={16} height={16} />
            </button>
          </div>
        </div>
        <TextButton onClick={() => handleCopyAddress(storeInfo.address)}>
          <CopyIcon className='fill-gray-500' width={16} height={16} />
          {storeInfo.address}
        </TextButton>
        <p
          className={`${isCopied ? 'opacity-100' : 'opacity-0'} absolute bottom-[-28px] left-0 rounded-md bg-white px-1.5 py-1 text-caption-1 shadow-500 duration-700 ease-in-out`}
        >
          복사 완료!
        </p>
      </div>
      {(() => {
        switch (storeInfo.paymentStatus) {
          case 'available':
            return <ReviewList storeInfo={storeInfo} />;
          case 'unavailable':
            return (
              <article>
                <p className='text-caption-1 text-red'>결제 불가 매장</p>
              </article>
            );
          // unregistered
          default:
            return <RegisterStore storeInfo={storeInfo} updateStoreInfo={setStoreInfo} />;
        }
      })()}
    </section>
  );
}

export default StoreDetail;
