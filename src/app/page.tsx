'use client';

import { useState } from 'react';
import CopyIcon from '@/assets/icons/copy.svg';
import NaverIcon from '@/assets/icons/naver.svg';
import Button from '@/components/common/buttons/Button';
import TextButton from '@/components/common/buttons/TextButton';
import TagToggleList from '@/components/common/toggles/TagToggleList';

export default function Home() {
  const tagList = [
    { id: 'taste', text: '맛' },
    { id: 'portion', text: '양' },
    { id: 'value', text: '가성비' },
    { id: 'comfort', text: '쾌적' },
  ];

  const [_, setCheckedTagList] = useState<string[]>([]);

  const onChangeCheckedTagList = (tagId: string) => {
    setCheckedTagList((previous) => {
      return previous.includes(tagId) ? previous.filter((tag) => tag !== tagId) : [...previous, tagId];
    });
  };

  return (
    <div className='grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20'>
      <main className='row-start-2 flex flex-col items-center gap-8 sm:items-start'>
        <ol className='list-inside list-decimal text-center font-[family-name:var(--font-geist-mono)] text-sm sm:text-left'>
          <li className='mb-2'>
            Get started by editing{' '}
            <code className='rounded bg-black/[.05] px-1 py-0.5 font-semibold dark:bg-white/[.06]'>
              src/app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <TagToggleList tagList={tagList} onChangeCheckedTagList={onChangeCheckedTagList} />
        <Button type='button' className='w-full'>
          작성 완료
        </Button>
        <Button type='button' className='w-full' color='secondary'>
          작성 완료
        </Button>
        <Button type='button' className='w-full' color='tertiary'>
          작성 완료
        </Button>
        <Button type='button' className='w-full' color='quaternary'>
          작성 완료
        </Button>
        <Button type='button' className='flex w-full items-center justify-center gap-[8px] px-[16px]' color='white'>
          <NaverIcon width={16} height={16} />
          작성 완료
        </Button>
        <Button type='button' className='w-[100px]' color='red'>
          작성 완료
        </Button>
        <TextButton type='button'>test</TextButton>
        <TextButton type='button'>
          <CopyIcon className='fill-red' width={24} height={24} /> test
        </TextButton>
        <div className='flex flex-col items-center gap-4 sm:flex-row'>
          <a
            className='flex h-10 items-center justify-center gap-2 rounded-full border border-solid border-transparent px-4 text-sm transition-colors hover:bg-[#383838] sm:h-12 sm:px-5 sm:text-base dark:hover:bg-[#ccc]'
            href='https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
            target='_blank'
            rel='noopener noreferrer'>
            Deploy now
          </a>
          <a
            className='flex h-10 items-center justify-center rounded-full border border-solid border-black/[.08] px-4 text-sm transition-colors hover:border-transparent hover:bg-[#f2f2f2] sm:h-12 sm:min-w-44 sm:px-5 sm:text-base dark:border-white/[.145] dark:hover:bg-[#1a1a1a]'
            href='https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
            target='_blank'
            rel='noopener noreferrer'>
            Read our docs
          </a>
        </div>
      </main>
      <footer className='row-start-3 flex flex-wrap items-center justify-center gap-6'>
        <a
          className='flex items-center gap-2 hover:underline hover:underline-offset-4'
          href='https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'>
          Learn
        </a>
        <a
          className='flex items-center gap-2 hover:underline hover:underline-offset-4'
          href='https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'>
          Examples
        </a>
        <a
          className='flex items-center gap-2 hover:underline hover:underline-offset-4'
          href='https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'>
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
