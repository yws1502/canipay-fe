'useClient';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { PAGE_PATH } from '@/constants/page';
import useInfiniteReviewsByStore from '@/hooks/react-query/useInfiniteReviewsByStore';
import { useIntersectionObserver } from '@/hooks/useObserver';
import { StoreInfo } from '@/types/store';
import Spinner from '../common/Spinner';
import TextButton from '../common/buttons/TextButton';
import ReviewItem from './ReviewItem';

interface ReviewListProps {
  storeInfo: StoreInfo;
}

function ReviewList({ storeInfo }: ReviewListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

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
      <TextButton
        onClick={() =>
          router.replace(`${PAGE_PATH.reviewForm(storeInfo.id)}?${searchParams.toString()}`)
        }
      >
        리뷰 작성하기
      </TextButton>
      <ul className='flex h-full flex-col gap-3 overflow-auto pr-1'>
        {reviewList.length === 0 ? (
          <li className='p-4'>
            <p className='text-center text-body-2'>
              현재 등록된 리뷰가 없습니다. 첫 리뷰의 주인공이 되어보세요!
            </p>
          </li>
        ) : (
          reviewList.map((review) => {
            return <ReviewItem key={review.id} review={review} />;
          })
        )}
        {hasNextPage && (
          <li ref={registerObserver} className='p-3 text-center'>
            <Spinner />
          </li>
        )}
      </ul>
    </article>
  );
}

export default ReviewList;
