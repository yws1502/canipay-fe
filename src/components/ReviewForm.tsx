'use client';

import React from 'react';
import CloseIcon from '@/assets/icons/close.svg';
import Button from './common/buttons/Button';
import TagToggleList from './common/toggles/TagToggleList';

function ReviewForm() {
  const tagList = [
    { id: 'tasty', text: '맛' },
    { id: 'friendly', text: '친절' },
    { id: 'valuable', text: '가성비' },
    { id: 'comfortable', text: '쾌적' },
  ];

  return (
    <form className='fixed inset-x-2.5 top-1/2 -translate-y-1/2 bg-white p-4'>
      <header className='mb-5 flex justify-between'>
        <h3 className='text-heading-3 text-gray-950'>식당 이름</h3>
        <button type='button'>
          <CloseIcon className='fill-gray-500' width={16} height={16} />
        </button>
      </header>
      <article className='text-center'>
        <p className='text-body-2 text-gray-950'>어떤 점이 좋으셨나요??</p>
        <p className='mb-3 text-caption-1 text-gray-600'>여러 개 선택 가능합니다.</p>
        <TagToggleList className='mb-4' tagList={tagList} onChangeCheckedTagList={console.info} />
        <textarea
          className='mb-4 h-[150px] w-full resize-none rounded-md border border-solid border-gray-300 p-2 text-body-2 text-gray-950 outline-none'
          placeholder='비고 / 의견 적절하지 않은 리뷰는 제거될 수 있습니다.'
        />
        <Button className='w-full'>작성 완료</Button>
      </article>
    </form>
  );
}

export default ReviewForm;
