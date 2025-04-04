'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { FormEvent, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import CloseIcon from '@/assets/icons/close.svg';
import { MESSAGE } from '@/constants/message';
import { PAGE_PATH } from '@/constants/page';
import { QUERY_KEY } from '@/constants/tanstackQuery';
import useCreateReview from '@/hooks/react-query/useCreateReview';
import { ReviewType } from '@/types/review';
import Button from '../common/buttons/Button';
import TagToggleList from '../common/toggles/TagToggleList';
import { useAsideToggle } from '../contexts/AsideToggleProvider';

function ReviewForm() {
  const params = useParams<{ store: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();

  const { asideToggle } = useAsideToggle();

  const [checkedReviewTypes, setCheckedReviewTypes] = useState<ReviewType[]>([]);
  const [content, setContent] = useState('');

  const queryClient = useQueryClient();
  const { mutate } = useCreateReview();

  const handleChangeReviewTypeOptions = (tag: ReviewType) => {
    const newCheckedReviewTypes = checkedReviewTypes.includes(tag)
      ? checkedReviewTypes.filter((checkedTag) => checkedTag !== tag)
      : [...checkedReviewTypes, tag];

    setCheckedReviewTypes(newCheckedReviewTypes);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    mutate(
      {
        id: params.store,
        payload: {
          isTasty: checkedReviewTypes.includes('isTasty'),
          isFriendly: checkedReviewTypes.includes('isFriendly'),
          isValuable: checkedReviewTypes.includes('isValuable'),
          isComfortable: checkedReviewTypes.includes('isComfortable'),
          content,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [QUERY_KEY.infiniteReviewsByStore] });
          queryClient.invalidateQueries({ queryKey: [QUERY_KEY.infiniteStores] });
          router.replace(PAGE_PATH.storeDetail(params.store), { scroll: false });
        },
        onError: () => {
          alert(MESSAGE.unexpectedError);
          router.replace(PAGE_PATH.root, { scroll: false });
        },
      }
    );
  };

  const reviewTypeOptions: { id: ReviewType; text: string }[] = [
    { id: 'isTasty', text: '맛' },
    { id: 'isFriendly', text: '친절' },
    { id: 'isValuable', text: '가성비' },
    { id: 'isComfortable', text: '쾌적' },
  ];

  return (
    <form
      className={twMerge(
        'fixed inset-x-2.5 top-1/2 z-20 -translate-y-1/2 bg-white p-4 shadow-500 duration-500 md:left-[426px] md:top-[66px] md:w-[370px] md:translate-y-0',
        !asideToggle && '-translate-x-[350px]'
      )}
      onSubmit={handleSubmit}
    >
      <header className='mb-5 flex justify-between'>
        <h3 className='text-heading-3 text-gray-950'>식당 이름</h3>
        <button
          type='button'
          onClick={() =>
            router.replace(`${PAGE_PATH.storeDetail(params.store)}?${searchParams.toString()}`, {
              scroll: false,
            })
          }
        >
          <CloseIcon className='fill-gray-500' width={16} height={16} />
        </button>
      </header>
      <article className='text-center'>
        <p className='text-body-2 text-gray-950'>어떤 점이 좋으셨나요??</p>
        <p className='mb-3 text-caption-1 text-gray-600'>여러 개 선택 가능합니다.</p>
        <TagToggleList
          className='mb-4'
          tagList={reviewTypeOptions}
          onChangeCheckedTagList={handleChangeReviewTypeOptions}
        />
        <textarea
          className='mb-4 h-[150px] w-full resize-none rounded-md border border-solid border-gray-300 p-2 text-body-2 text-gray-950 outline-none'
          placeholder='비고 / 의견 적절하지 않은 리뷰는 제거될 수 있습니다.'
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
        <Button className='w-full' type='submit'>
          작성 완료
        </Button>
      </article>
    </form>
  );
}

export default ReviewForm;
