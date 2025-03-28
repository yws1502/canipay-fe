'useClient';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { MouseEvent, useEffect } from 'react';
import { PAGE_PATH } from '@/constants/page';
import useInfiniteReviewsByStore from '@/hooks/react-query/useInfiniteReviewsByStore';
import { useLike } from '@/hooks/react-query/useLike';
import { useIntersectionObserver } from '@/hooks/useObserver';
import { useLikedStores } from '@/stores/useLikedStores';
import { RequestLikeStore, StoreInfo } from '@/types/store';
import Spinner from '../common/Spinner';
import Button from '../common/buttons/Button';
import LikeButton from './LikeButton';
import ReviewItem from './ReviewItem';

interface ReviewListProps {
  storeInfo: StoreInfo;
}

function ReviewList({ storeInfo }: ReviewListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data: reviewList, fetchNextPage, hasNextPage } = useInfiniteReviewsByStore(storeInfo.id);

  const { intersecting, registerObserver } = useIntersectionObserver();

  const { mutate: likeMutate } = useLike();
  const { exists: existsStore, push: pushStore, remove: removeStore } = useLikedStores();

  useEffect(() => {
    if (intersecting) {
      fetchNextPage();
    }
  }, [intersecting]);

  const onClickLike = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    event.stopPropagation();
    const isLiked = existsStore(storeInfo.id);

    const action: RequestLikeStore['body']['action'] = isLiked ? 'unlike' : 'like';
    likeMutate(
      { id: storeInfo.id, body: { action } },
      {
        onSuccess: () => {
          if (action === 'like') pushStore(storeInfo.id);
          else removeStore(storeInfo.id);
        },
      }
    );
  };

  return (
    <article className='flex flex-1 flex-col gap-3 overflow-auto'>
      <div className='flex justify-between'>
        <div className='flex shrink-0 gap-2 text-caption-1'>
          <LikeButton
            isLiked={existsStore(storeInfo.id)}
            likeCount={storeInfo.likeCount}
            onClick={onClickLike}
          />
          <span className='shrink-0 text-primary'>
            리뷰 {storeInfo.reviewCount.toString().padStart(2, '0')}
          </span>
        </div>
        <ul className='flex items-center gap-2 text-caption-1'>
          <li>맛 {storeInfo.tastyCount}</li>
          <li>친절 {storeInfo.friendlyCount}</li>
          <li>가성비 {storeInfo.valuableCount}</li>
          <li>쾌적 {storeInfo.comfortableCount}</li>
        </ul>
      </div>
      <Button
        className='mb-2'
        onClick={() =>
          router.replace(`${PAGE_PATH.reviewForm(storeInfo.id)}?${searchParams.toString()}`)
        }
      >
        리뷰 작성 하러가기
      </Button>
      <ul className='flex h-full flex-col gap-3 overflow-auto pb-2 pr-1'>
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
