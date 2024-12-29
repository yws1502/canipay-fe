'use client';

import { useParams, useSearchParams } from 'next/navigation';
import React from 'react';
import CloseIcon from '@/assets/icons/close.svg';
import CopyIcon from '@/assets/icons/copy.svg';
import NaverIcon from '@/assets/icons/naver.svg';
import { QUERY_STRING } from '@/constants/page';
import { useStoreInfiniteQuery } from '@/hooks/useTMap';
import Button from './common/buttons/Button';
import TextButton from './common/buttons/TextButton';

function StoreDetail() {
  const params = useParams<{ store: string }>();
  const searchParams = useSearchParams();
  const searchKeyword = searchParams.get(QUERY_STRING.search) ?? '';

  const { data: storeList } = useStoreInfiniteQuery(searchKeyword);

  return (
    <section className='fixed left-1/2 top-[30%] z-30 w-[90%] -translate-x-1/2 rounded-sm bg-white p-4 shadow-500'>
      <div className='mb-5'>
        <div className='mb-2 flex items-start justify-between'>
          <header>
            <h3 className='text-heading-3'>식당 이름</h3>
            <span className='text-caption-1'>카테고리</span>
          </header>
          <div className='flex gap-2'>
            <TextButton>
              <NaverIcon className='mr-1' width={16} height={16} />
              <i className='hidden'>네이버로</i> 열기
            </TextButton>
            <button type='button' className='hover:opacity-80 active:opacity-60'>
              <CloseIcon className='fill-gray-500' width={16} height={16} />
            </button>
          </div>
        </div>
        <TextButton>
          <CopyIcon className='fill-gray-500' width={16} height={16} />
          서울 광진구 자양로 165 1층
        </TextButton>
      </div>
      <div>
        <span className='text-body-2 text-gray-950'>등록하기</span>
        <div className='mt-3 flex justify-center gap-3'>
          <Button>결제 가능</Button>
          <Button color='red'>결제 불가능</Button>
        </div>
      </div>
    </section>
  );
}

export default StoreDetail;
