import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getReviewsByStore } from '@/apis/review';
import { QUERY_KEY } from '@/constants/tanstackQuery';
import { Review } from '@/types/review';

const useInfiniteReviewsByStore = (storeId: string) => {
  const result = useInfiniteQuery({
    queryKey: [QUERY_KEY.infiniteReviewsByStore, storeId],
    queryFn: ({ pageParam }) => getReviewsByStore(storeId, { skip: pageParam, take: 10 }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.totalPage <= allPages.length) return undefined;

      return allPages.length + 1;
    },
  });

  const [reviewList, setReviewList] = useState<Review[]>([]);

  useEffect(() => {
    if (!result.data) return;

    const newReviewList: Review[] = [];

    result.data.pages.forEach((page) => {
      page.data.forEach((review) => {
        newReviewList.push(review);
      });
    });

    setReviewList(newReviewList);
  }, [result.data]);

  return { ...result, data: reviewList };
};

export default useInfiniteReviewsByStore;
