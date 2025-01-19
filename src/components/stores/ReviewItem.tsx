'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
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
    if (confirm(MESSAGE.reportReviewConfirm)) {
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

  return (
    <li className='p-2'>
      <div className='relative mb-1.5 flex items-start justify-between'>
        <p className='flex-1 text-body-2'>{review.content}</p>
        <button
          type='button'
          className='hover:opacity-80 active:opacity-60'
          onClick={() => setToggle(!toggle)}
        >
          <MoreIcon className='fill-gray-500' width={16} height={16} />
        </button>
        {toggle && (
          <ul
            ref={outsideRef}
            className='absolute right-0 top-full z-30 flex flex-col gap-2 rounded-md bg-white p-2 text-caption-1 shadow-500'
          >
            <li>
              <TextButton onClick={handleClickReportReview}>신고</TextButton>
            </li>
          </ul>
        )}
      </div>
      <ul className='flex items-center gap-2 text-caption-2'>
        {review.isTasty && <li>맛</li>}
        {review.isFriendly && <li>친절</li>}
        {review.isValuable && <li>가성비</li>}
        {review.isComfortable && <li>쾌적</li>}
      </ul>
    </li>
  );
}

export default ReviewItem;
