import { useRouter } from 'next/navigation';
import React from 'react';
import MoreIcon from '@/assets/icons/more.svg';
import { PAGE_PATH } from '@/constants/page';
import { StoreInfo } from '@/types/store';
import TextButton from '../common/buttons/TextButton';

interface StoreReviewListProps {
  storeInfo: StoreInfo;
}

function StoreReviewList({ storeInfo }: StoreReviewListProps) {
  const router = useRouter();

  return (
    <article className='flex flex-1 flex-col gap-3 overflow-auto'>
      <div className='flex justify-between'>
        <span className='text-caption-1 text-primary'>리뷰 00</span>
        <ul className='flex items-center gap-2 text-caption-2'>
          <li>맛 {storeInfo.tastyCount}</li>
          <li>친절함 {storeInfo.friendlyCount}</li>
          <li>가성비 {storeInfo.valuableCount}</li>
          <li>쾌적 {storeInfo.comfortableCount}</li>
        </ul>
      </div>
      <TextButton onClick={() => router.push(PAGE_PATH.reviewForm(storeInfo.id))}>
        리뷰 작성하기
      </TextButton>
      <ul className='flex h-full flex-col gap-5 overflow-auto pr-1'>
        {Array.from({ length: 2 }).map((_, index) => {
          const key = `test-${index}`;
          return (
            <li key={key}>
              <div className='mb-1.5 flex items-start justify-between'>
                <p className='flex-1 text-body-2'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, officiis.
                </p>
                <button type='button' className='hover:opacity-80 active:opacity-60'>
                  <MoreIcon className='fill-gray-500' width={16} height={16} />
                </button>
              </div>
              <ul className='flex items-center gap-2 text-caption-2'>
                <li>맛</li>
                <li>양</li>
                <li>가격</li>
                <li>쾌적</li>
              </ul>
            </li>
          );
        })}
      </ul>
    </article>
  );
}

export default StoreReviewList;
