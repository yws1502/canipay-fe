import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getStores } from '@/apis/store';
import { QUERY_KEY } from '@/constants/tanstackQuery';
import { StoreInfo } from '@/types/store';

const useInfiniteStores = () => {
  const result = useInfiniteQuery({
    queryKey: [QUERY_KEY.infiniteStores],
    queryFn: ({ pageParam }) => getStores({ skip: pageParam, take: 10 }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.totalPage <= allPages.length) return undefined;

      return allPages.length + 1;
    },
  });

  const [storeInfoList, setStoreInfoList] = useState<StoreInfo[]>([]);

  useEffect(() => {
    if (!result.data) return;

    const newStoreInfoList: StoreInfo[] = [];

    result.data.pages.forEach((page) => {
      page.data.forEach((store) => {
        newStoreInfoList.push(store);
      });
    });

    setStoreInfoList(newStoreInfoList);
  }, [result.data]);

  return { ...result, data: storeInfoList };
};

export default useInfiniteStores;
