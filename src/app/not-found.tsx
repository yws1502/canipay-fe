import Link from 'next/link';
import React from 'react';
import { PAGE_PATH } from '@/constants/page';

function NotFound() {
  return (
    <section className='fixed inset-0 z-30 flex items-center justify-center bg-white'>
      <div className='flex flex-col items-center gap-5 text-center'>
        <div className='w-fit rounded-sm bg-primary/20 p-1.5 text-body-1 text-primary'>
          404 error
        </div>
        <strong className='text-heading-3'>Oops! 찾을 수 없는 페이지입니다.</strong>
        <p className='text-center text-body-2'>
          요청하신 페이지가 사라졌거나 주소가 잘못 입력된 것 같아요.
          <br />
          홈으로 돌아가 보세요.
        </p>
        <Link
          href={PAGE_PATH.root}
          scroll={false}
          className='text-body-1 duration-200 ease-in-out hover:text-primary hover:underline hover:decoration-primary'
        >
          Go Home
        </Link>
      </div>
    </section>
  );
}

export default NotFound;
