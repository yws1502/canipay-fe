'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import CloseIcon from '@/assets/icons/close.svg';
import CopyIcon from '@/assets/icons/copy.svg';
import NaverIcon from '@/assets/icons/naver.svg';
import { NAVER_MAP_URL } from '@/constants/env';
import { EXCEPTION_MESSAGE } from '@/constants/error';
import { QUERY_STRING } from '@/constants/page';
import { useDelayLoading } from '@/hooks/useDelayLoading';
import { useRegisterStore } from '@/hooks/useStore';
import { useStoreInfiniteQuery } from '@/hooks/useTMap';
import { PaymentStatus, RequestRegisterStore } from '@/types/store';
import Spinner from './common/Spinner';
import Button from './common/buttons/Button';
import TextButton from './common/buttons/TextButton';

function StoreDetail() {
  const params = useParams<{ store: string }>();
  const searchParams = useSearchParams();
  const searchKeyword = searchParams.get(QUERY_STRING.search) ?? '';
  const router = useRouter();

  const [isCopied, setIsCopied] = useState(false);

  const { data: storeList } = useStoreInfiniteQuery(searchKeyword);

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

  // TODO: 더 좋은 방법에 대해 생각 필요
  const targetStore = storeList.find((store) => store.id === params.store);

  const handleRegisterStore = (paymentStatus: PaymentStatus) => {
    if (!targetStore) return;
    const storeForm: RequestRegisterStore = {
      ...targetStore, // id, name, category, address, lon, lat
      paymentStatus,
    };

    registerMutate(storeForm, {
      onSuccess: console.info,
      onError: console.error,
    });
  };

  return (
    <section className='fixed left-1/2 top-[30%] z-30 w-[90%] -translate-x-1/2 rounded-sm bg-white p-4 shadow-500'>
      <div className='relative mb-5'>
        <div className='mb-3 flex items-start justify-between'>
          <header className='flex-1 overflow-auto'>
            <h3 className='truncate text-heading-3' title={targetStore?.name}>
              {targetStore?.name}
            </h3>
            <span className='text-caption-1'>{targetStore?.category}</span>
          </header>
          <div className='flex gap-2'>
            <TextButton
              onClick={() => handleOpenNaver(`${targetStore?.address} ${targetStore?.name}`)}
            >
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
        <TextButton onClick={() => handleCopyAddress(targetStore?.address ?? '')}>
          <CopyIcon className='fill-gray-500' width={16} height={16} />
          {targetStore?.address}
        </TextButton>
        <p
          className={`${isCopied ? 'opacity-100' : 'opacity-0'} absolute bottom-[-28px] left-0 rounded-md bg-white px-1.5 py-1 text-caption-1 shadow-500 duration-700 ease-in-out`}
        >
          복사 완료!
        </p>
      </div>
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
    </section>
  );
}

export default StoreDetail;
