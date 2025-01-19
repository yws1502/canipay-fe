import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import MoreIcon from '@/assets/icons/more.svg';
import { PAGE_PATH } from '@/constants/page';
import useInfiniteReviewsByStore from '@/hooks/react-query/useInfiniteReviewsByStore';
import { useIntersectionObserver } from '@/hooks/useObserver';
import { StoreInfo } from '@/types/store';
import Spinner from '../common/Spinner';
import TextButton from '../common/buttons/TextButton';

interface StoreReviewListProps {
  storeInfo: StoreInfo;
}

function StoreReviewList({ storeInfo }: StoreReviewListProps) {
  const router = useRouter();

  const { data: reviewList, fetchNextPage, hasNextPage } = useInfiniteReviewsByStore(storeInfo.id);

  const { intersecting, registerObserver } = useIntersectionObserver();

  useEffect(() => {
    if (intersecting) {
      fetchNextPage();
    }
  }, [intersecting]);

  return (
    <article className='flex flex-1 flex-col gap-3 overflow-auto'>
      <div className='flex justify-between'>
        <span className='text-caption-1 text-primary'>리뷰 00</span>
        <ul className='flex items-center gap-2 text-caption-2'>
          <li>맛 {storeInfo.tastyCount}</li>
          <li>친절 {storeInfo.friendlyCount}</li>
          <li>가성비 {storeInfo.valuableCount}</li>
          <li>쾌적 {storeInfo.comfortableCount}</li>
        </ul>
      </div>
      <TextButton onClick={() => router.push(PAGE_PATH.reviewForm(storeInfo.id))}>
        리뷰 작성하기
      </TextButton>
      <ul className='flex h-full flex-col gap-3 overflow-auto pr-1'>
        {reviewList.map((review) => {
          return (
            <li key={review.id} className='p-2'>
              <div className='mb-1.5 flex items-start justify-between'>
                <p className='flex-1 text-body-2'>{review.content}</p>
                <button type='button' className='hover:opacity-80 active:opacity-60'>
                  <MoreIcon className='fill-gray-500' width={16} height={16} />
                </button>
              </div>
              <ul className='flex items-center gap-2 text-caption-2'>
                {review.isTasty && <li>맛</li>}
                {review.isFriendly && <li>친절</li>}
                {review.isValuable && <li>가성비</li>}
                {review.isComfortable && <li>쾌적</li>}
              </ul>
            </li>
          );
        })}
        {hasNextPage && (
          <li ref={registerObserver} className='p-3 text-center'>
            <Spinner />
          </li>
        )}
      </ul>
    </article>
  );
}

export default StoreReviewList;
