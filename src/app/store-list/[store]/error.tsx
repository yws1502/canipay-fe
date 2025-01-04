'use client';

import { RedirectType, redirect } from 'next/navigation';
import React from 'react';
import TextButton from '@/components/common/buttons/TextButton';
import { PAGE_PATH } from '@/constants/page';

function Error() {
  const goToHome = () => {
    redirect(PAGE_PATH.root, RedirectType.replace);
  };
  return (
    <section className='fixed left-1/2 top-[30%] z-30 flex w-[90%] -translate-x-1/2 flex-col gap-6 overflow-auto rounded-sm bg-white p-4 shadow-500'>
      <h3 className='text-heading-3'>오류가 발생했습니다.</h3>
      <p className='text-body-2'>
        매장 정보를 불러오는 중 문제가 발생했습니다. <br />
        잠시 후 다시 시도해 주세요.
      </p>
      <TextButton size='lg' className='mx-auto w-fit' onClick={goToHome}>
        Home으로 가기
      </TextButton>
    </section>
  );
}

export default Error;
