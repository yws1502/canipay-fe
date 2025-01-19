'use client';

import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import CloseIcon from '@/assets/icons/close.svg';
import CopyIcon from '@/assets/icons/copy.svg';
import NaverIcon from '@/assets/icons/naver.svg';
import { NAVER_MAP_URL } from '@/constants/env';
import { EXCEPTION_MESSAGE } from '@/constants/error';
import { StoreInfo } from '@/types/store';
import TextButton from '../common/buttons/TextButton';
import { MapControllerContext } from '../maps/MapControllerProvider';
import RegisterStore from './RegisterStore';
import ReviewList from './ReviewList';

interface StoreDetailProps {
  initStoreInfo: StoreInfo;
}

function StoreDetail({ initStoreInfo }: StoreDetailProps) {
  const router = useRouter();

  const [isCopied, setIsCopied] = useState(false);

  const [storeInfo, setStoreInfo] = useState(initStoreInfo);

  const mapController = useContext(MapControllerContext);

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
      className={`${storeInfo.paymentStatus === 'unregistered' ? 'top-[30%]' : 'inset-y-[15%]'} fixed left-1/2 z-30 flex w-[90%] -translate-x-1/2 flex-col gap-5 overflow-auto rounded-sm bg-white p-4 shadow-500`}
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
              onClick={() => router.back()}
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
          case 'unavailable':
            return <ReviewList storeInfo={storeInfo} />;
          default: // unregistered
            return <RegisterStore storeInfo={storeInfo} updateStoreInfo={setStoreInfo} />;
        }
      })()}
    </section>
  );
}

export default StoreDetail;
