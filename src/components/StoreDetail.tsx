'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import CloseIcon from '@/assets/icons/close.svg';
import CopyIcon from '@/assets/icons/copy.svg';
import MoreIcon from '@/assets/icons/more.svg';
import NaverIcon from '@/assets/icons/naver.svg';
import { NAVER_MAP_URL } from '@/constants/env';
import { EXCEPTION_MESSAGE } from '@/constants/error';
import useRegisterStore from '@/hooks/react-query/useRegisterStore';
import { useDelayLoading } from '@/hooks/useDelayLoading';
import { PaymentStatus, RegisteredStoreInfo, RequestRegisterStore, StoreInfo } from '@/types/store';
import Spinner from './common/Spinner';
import Button from './common/buttons/Button';
import TextButton from './common/buttons/TextButton';

interface StoreDetailProps {
  storeInfo: RegisteredStoreInfo | StoreInfo;
}

function StoreDetail({ storeInfo }: StoreDetailProps) {
  console.log(storeInfo);

  const router = useRouter();

  const [isCopied, setIsCopied] = useState(false);

  const { mutate: registerMutate, isPending: isPendingRegister } = useRegisterStore();

  const isPending = useDelayLoading(1000, isPendingRegister);

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

  const handleRegisterStore = (paymentStatus: PaymentStatus) => {
    const storeForm: RequestRegisterStore = {
      ...storeInfo, // id, name, category, address, lon, lat
      paymentStatus,
    };

    registerMutate(storeForm, {
      onSuccess: console.info,
      onError: console.error,
    });
  };

  return (
    <section
      className={`${'paymentStatus' in storeInfo ? 'inset-y-[15%]' : 'top-[30%]'} fixed left-1/2 z-30 flex w-[90%] -translate-x-1/2 flex-col gap-5 overflow-auto rounded-sm bg-white p-4 shadow-500`}
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
        <TextButton onClick={() => handleCopyAddress(storeInfo.address ?? '')}>
          <CopyIcon className='fill-gray-500' width={16} height={16} />
          {storeInfo.address}
        </TextButton>
        <p
          className={`${isCopied ? 'opacity-100' : 'opacity-0'} absolute bottom-[-28px] left-0 rounded-md bg-white px-1.5 py-1 text-caption-1 shadow-500 duration-700 ease-in-out`}
        >
          복사 완료!
        </p>
      </div>
      {'paymentStatus' in storeInfo ? (
        <article className='flex flex-1 flex-col gap-3 overflow-auto'>
          <div className='flex justify-between'>
            <span className='text-caption-1 text-primary'>리뷰 00</span>
            <ul className='flex items-center gap-2 text-caption-2'>
              <li>맛 3</li>
              <li>양 3</li>
              <li>가격 3</li>
              <li>쾌적 3</li>
            </ul>
          </div>
          <TextButton>리뷰 작성하기</TextButton>
          <ul className='flex h-full flex-col gap-5 overflow-auto pr-1'>
            {Array.from({ length: 2 }).map((_, index) => {
              const key = `test-${index}`;
              return (
                <li key={key}>
                  <div className='mb-1.5 flex items-start justify-between'>
                    <p className='flex-1 text-body-2'>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, officiis.
                    </p>
                    <button type='button' className='hover:opacity-80 active:opacity-60'>
                      <MoreIcon className='fill-gray-500' width={16} height={16} />
                    </button>
                  </div>
                  <ul className='flex items-center gap-2 text-caption-2'>
                    <li>맛</li>
                    <li>양</li>
                    <li>가격</li>
                    <li>쾌적</li>
                  </ul>
                </li>
              );
            })}
          </ul>
        </article>
      ) : (
        <div>
          <span className='text-body-2 text-gray-950'>등록하기</span>
          <div className='mt-4 flex justify-center gap-3'>
            <Button disabled={isPendingRegister} onClick={() => handleRegisterStore('available')}>
              {isPending ? (
                <div className='w-[54px]'>
                  <Spinner size='sm' color='white' />
                </div>
              ) : (
                '결제 가능'
              )}
            </Button>
            <Button
              color='red'
              disabled={isPendingRegister}
              onClick={() => handleRegisterStore('unavailable')}
            >
              {isPending ? (
                <div className='w-[67px]'>
                  <Spinner size='sm' color='white' />
                </div>
              ) : (
                '결제 불가능'
              )}
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}

export default StoreDetail;
