import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getStoresProxy } from '@/apis/store';
import { QUERY_KEY } from '@/constants/tanstackQuery';
import { StoreInfo } from '@/types/store';

const useInfiniteStoresProxy = (search: string, lon: number, lat: number) => {
  const result = useInfiniteQuery({
    queryKey: [QUERY_KEY.infiniteStoresProxy, search, lon, lat],
    queryFn: ({ pageParam }) => getStoresProxy({ search, lon, lat, skip: pageParam, take: 10 }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.totalPage <= allPages.length) return undefined;

      return allPages.length;
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
