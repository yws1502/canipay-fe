'use client';

import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import CloseIcon from '@/assets/icons/close.svg';
import { PAGE_TITLE_MAPPER } from '@/constants/page';

function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const title = PAGE_TITLE_MAPPER[pathname] ?? '';

  return (
    <header className='flex items-center justify-between p-4'>
      <h1 className='text-heading-2 text-gray-950'>{title}</h1>
      <button type='button' onClick={() => router.back()}>
        <CloseIcon className='fill-gray-500' width={24} height={24} />
      </button>
    </header>
  );
}

export default Header;
