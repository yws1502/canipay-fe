import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getStoresProxy } from '@/apis/store';
import { QUERY_KEY } from '@/constants/tanstackQuery';
import { StoreInfo } from '@/types/store';

const useInfiniteStoresProxy = (search: string) => {
  const result = useInfiniteQuery({
    queryKey: [QUERY_KEY.infiniteSearchStores, search],
    queryFn: ({ pageParam }) => getStoresProxy({ search, skip: pageParam, limit: 10 }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.totalPage === allPages.length) return undefined;

      return allPages.length + 1;
    },
    enabled: !!search,
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

export default useInfiniteStoresProxy;
