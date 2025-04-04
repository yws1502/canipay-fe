'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import ArrowRightIcon from '@/assets/icons/arrow-right.svg';
import MinusIcon from '@/assets/icons/minus.svg';
import OpenWindowIcon from '@/assets/icons/open-window.svg';
import PlusIcon from '@/assets/icons/plus.svg';
import TextButton from '@/components/common/buttons/TextButton';
import SlideToggle from '@/components/common/toggles/SlideToggle';
import { usePreferences } from '@/components/contexts/PreferencesProvider';
import { MESSAGE } from '@/constants/message';
import { PAGE_PATH } from '@/constants/page';
import { copyClipboard } from '@/utils/clipboard';

function Setting() {
  const router = useRouter();

  const { fontSize, changeFontSize } = usePreferences();

  const [isCopied, setIsCopied] = useState(false);

  const handleChangeFontSize = (operation: '+' | '-') => {
    const newFontSize = operation === '+' ? +fontSize + 1 : +fontSize - 1;
    changeFontSize(newFontSize.toString());
  };

  const handleGoToLicensesPage = () => {
    router.push(PAGE_PATH.licenses);
  };

  const handleMoveReleaseNote = () => {
    window.open('https://github.com/yws1502/canipay-fe');
  };

  const handleCopyEmail = async () => {
    const result = await copyClipboard('woosang0430@gmail.com');

    if (result) {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500);
    } else {
      alert('주소 복사에 실패하였습니다. 개발자에게 문의주세요.');
    }
  };

  return (
    <ul className='flex flex-col gap-3 text-body-1 text-gray-950'>
      <li className='relative flex items-center justify-between py-2'>
        문의사항
        <TextButton onClick={handleCopyEmail}>woosang0430@gmail.com</TextButton>
        <p
          className={`${isCopied ? 'z-30 opacity-100' : '-z-10 opacity-0'} absolute bottom-[-28px] right-0 rounded-md bg-white px-1.5 py-1 text-caption-1 shadow-500 duration-700 ease-in-out`}
        >
          복사 완료!
        </p>
      </li>
      <li className='flex items-center justify-between py-2'>
        글자 크기
        <div className='flex items-center gap-2'>
          <button
            type='button'
            className='select-none hover:opacity-80 active:opacity-60'
            onClick={() => handleChangeFontSize('-')}
          >
            <MinusIcon className='fill-gray-500' width={20} height={20} />
          </button>
          {fontSize}
          <button
            type='button'
            className='select-none hover:opacity-80 active:opacity-60'
            onClick={() => handleChangeFontSize('+')}
          >
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
          onClick={handleMoveReleaseNote}
        >
          버전 정보 (v1.0.0)
          <OpenWindowIcon className='fill-gray-500' width={20} height={20} />
        </button>
      </li>
      <li className='flex items-center justify-between py-2'>
        <button
          type='button'
          className='flex w-full items-center justify-between hover:opacity-80 active:opacity-60'
          onClick={handleGoToLicensesPage}
        >
          오픈소스 라이선스 이용고지
          <ArrowRightIcon className='fill-gray-500' width={20} height={20} />
        </button>
      </li>
    </ul>
  );
}

export default Setting;
