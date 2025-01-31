'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import ArrowRightIcon from '@/assets/icons/arrow-right.svg';
import CloseIcon from '@/assets/icons/close.svg';
import MinusIcon from '@/assets/icons/minus.svg';
import OpenWindowIcon from '@/assets/icons/open-window.svg';
import PlusIcon from '@/assets/icons/plus.svg';
import TextButton from '@/components/common/buttons/TextButton';
import SlideToggle from '@/components/common/toggles/SlideToggle';
import { MESSAGE } from '@/constants/message';

function Setting() {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard
      .writeText('woosang0430@gmail.com')
      .then(() => {
        setIsCopied(true);

        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch(console.error);
  };

  return (
    <div className='fixed inset-0 z-30 bg-white'>
      <header className='flex items-center justify-between p-4'>
        <h2 className='text-heading-2 text-gray-950'>설정</h2>
        <button type='button'>
          <CloseIcon className='fill-gray-500' width={24} height={24} />
        </button>
      </header>
      <section className='p-4'>
        <ul className='flex flex-col gap-3 text-body-1 text-gray-950'>
          <li className='relative flex items-center justify-between py-2'>
            문의사항
            <TextButton onClick={handleCopyEmail}>woosang0430@gmail.com</TextButton>
            <p
              className={`${isCopied ? 'opacity-100' : 'opacity-0'} absolute bottom-[-28px] right-0 z-30 rounded-md bg-white px-1.5 py-1 text-caption-1 shadow-500 duration-700 ease-in-out`}
            >
              복사 완료!
            </p>
          </li>
          <li
            className='flex cursor-not-allowed items-center justify-between py-2 opacity-30'
            title={MESSAGE.featureComingSoon}
          >
            글자 크기
            <div className='flex items-center gap-2'>
              <button type='button' className='hover:opacity-80 active:opacity-60' disabled>
                <MinusIcon className='fill-gray-500' width={20} height={20} />
              </button>
              16
              <button type='button' className='hover:opacity-80 active:opacity-60' disabled>
                <PlusIcon className='fill-gray-500' width={20} height={20} />
              </button>
            </div>
          </li>
          <li
            className='flex cursor-not-allowed items-center justify-between py-2 opacity-30'
            title={MESSAGE.featureComingSoon}
          >
            다크 테마
            <SlideToggle disabled />
          </li>
          <li className='flex items-center justify-between py-2'>
            <button
              type='button'
              className='flex w-full items-center justify-between hover:opacity-80 active:opacity-60'
            >
              버전 정보 (v1.0.0)
              <OpenWindowIcon className='fill-gray-500' width={20} height={20} />
            </button>
          </li>
          <li className='flex items-center justify-between py-2'>
            <button
              type='button'
              className='flex w-full items-center justify-between hover:opacity-80 active:opacity-60'
            >
              오픈소스 라이선스 이용고지
              <ArrowRightIcon className='fill-gray-500' width={20} height={20} />
            </button>
          </li>
        </ul>
      </section>
      <footer className='absolute inset-x-0 bottom-0 bg-gray-200 p-4 shadow-500'>
        <table className='mb-[10px] border-separate border-spacing-y-2'>
          <tbody className='text-left text-caption-1 text-gray-600'>
            <tr>
              <th className='w-[30%] font-normal'>개발자</th>
              <td className='w-[70%] font-normal'>윤우상</td>
            </tr>
            <tr>
              <th className='w-[30%] font-normal'>이메일</th>
              <td className='w-[70%] font-normal'>woosang043@gmail.com</td>
            </tr>
            <tr>
              <th className='w-[30%] font-normal'>Github</th>
              <td className='w-[70%] font-normal'>
                <Link
                  href='https://github.com/yws1502/canipay-fe'
                  className='underline'
                  target='_blank'
                >
                  https://github.com/yws1502/canipay-fe
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
        <strong className='text-heading-3 text-gray-500'>Can I Pay</strong>
      </footer>
    </div>
  );
}

export default Setting;
