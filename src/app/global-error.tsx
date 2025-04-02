'use client';

import React from 'react';

interface ErrorPageProps {
  error: Error;
}

function ErrorPage({ error }: ErrorPageProps) {
  console.error('error', error);
  return (
    <section className='fixed inset-0 z-30 flex items-center justify-center bg-white'>
      <div className='flex flex-col items-center gap-5 text-center'>
        <strong className='text-heading-3'>Oops! 예상치 못한 오류가 발생했어요.</strong>
        <p className='text-center text-body-2'>
          서비스 이용에 불편을 드려 죄송합니다. 잠시 후 다시 시도해 주세요.
          <br />
          문제가 계속된다면
          <strong className='text-primary'> 담당자에게 문의</strong>해주세요.
        </p>
      </div>
    </section>
  );
}

export default ErrorPage;
