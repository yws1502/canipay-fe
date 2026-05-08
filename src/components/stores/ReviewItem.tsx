'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import MoreIcon from '@/assets/icons/more.svg';
import { MESSAGE } from '@/constants/message';
import { PAGE_PATH } from '@/constants/page';
import { QUERY_KEY } from '@/constants/tanstackQuery';
import useReportReview from '@/hooks/react-query/useReportReview';
import { useOutsideRef } from '@/hooks/useOutsideRef';
import { Review } from '@/types/review';
import TextButton from '../common/buttons/TextButton';

interface ReviewItemProps {
  review: Review;
}

function ReviewItem({ review }: ReviewItemProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [toggle, setToggle] = useState(false);

  const outsideRef = useOutsideRef<HTMLUListElement>(() => setToggle(false));

  const { mutate: reportReview } = useReportReview();

  const handleClickReportReview = () => {
    if (window.confirm(MESSAGE.reportReviewConfirm)) {
      reportReview(review.id, {
        onSuccess: () => {
          alert(MESSAGE.reportReviewSuccess);
          queryClient.invalidateQueries({ queryKey: [QUERY_KEY.infiniteReviewsByStore] });
        },
        onError: () => {
          alert(MESSAGE.unexpectedError);
          router.replace(PAGE_PATH.root);
        },
      });
    }
  };

  const hasContent = !!review.content;
  const hasTags = review.isTasty || review.isFriendly || review.isValuable || review.isComfortable;

  return (
    <li className='rounded-sm border border-gray-200 p-3'>
      <div className='relative flex items-start justify-between gap-2'>
        <div className='flex-1'>
          {hasContent && <p className='break-words text-body-2 text-gray-800'>{review.content}</p>}
          {hasTags && (
            <ul
              className={twMerge(
                'flex flex-wrap items-center gap-1 text-gray-700',
                hasContent && 'mt-2'
              )}
            >
              {review.isTasty && (
                <li className='inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-caption-1'>
                  <span className='size-1.5 rounded-full bg-quaternary' />맛
                </li>
              )}
              {review.isFriendly && (
                <li className='inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-caption-1'>
                  <span className='size-1.5 rounded-full bg-secondary' />
                  친절
                </li>
              )}
              {review.isValuable && (
                <li className='inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-caption-1'>
                  <span className='size-1.5 rounded-full bg-primary' />
                  가성비
                </li>
              )}
              {review.isComfortable && (
                <li className='inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-caption-1'>
                  <span className='size-1.5 rounded-full bg-gray-400' />
                  쾌적
                </li>
              )}
            </ul>
          )}
        </div>
        <button
          type='button'
          className='shrink-0 rounded-full p-1 hover:bg-gray-100 active:opacity-60'
          aria-label='리뷰 더보기'
          onClick={() => setToggle(!toggle)}
        >
          <MoreIcon className='fill-gray-500' width={16} height={16} />
        </button>
        {toggle && (
          <ul
            ref={outsideRef}
            className='absolute right-0 top-full z-30 flex flex-col gap-2 rounded-md border border-gray-200 bg-white p-2 text-caption-1 shadow-500'
          >
            <li>
              <TextButton onClick={handleClickReportReview}>신고</TextButton>
            </li>
          </ul>
        )}
      </div>
    </li>
  );
}

export default ReviewItem;
