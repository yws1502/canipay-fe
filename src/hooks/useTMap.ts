import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getPoi } from '@/apis/tMap';
import { QUERY_KEY } from '@/constants/tanstackQuery';
import { StoreInfo } from '@/types/tMap';

export const useStoreInfiniteQuery = (search: string) => {
  const result = useInfiniteQuery({
    queryKey: [QUERY_KEY.poiInfiniteQuery, search],
    queryFn: ({ pageParam = 1 }) =>
      getPoi({
        version: '1',
        searchKeyword: search,
        page: pageParam,
        count: 10,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (allPages.length === 0) return undefined;
      return Number(lastPage.searchPoiInfo.page) + 1;
    },
    enabled: !!search,
  });

  const [storeInfoList, setStoreInfoList] = useState<StoreInfo[]>([]);

  useEffect(() => {
    if (!result.data) return;

    const newStoreInfoList: StoreInfo[] = [];
    const savedIds = new Set<string>();

    result.data.pages.forEach((page) => {
      page.searchPoiInfo.pois.poi.forEach((item) => {
        if (savedIds.has(item.id) === false) {
          savedIds.add(item.id);
          newStoreInfoList.push({
            id: item.id,
            name: item.name,
            lat: item.newAddressList.newAddress[0].centerLat,
            lon: item.newAddressList.newAddress[0].centerLon,
            address: item.newAddressList.newAddress[0].fullAddressRoad,
            category: item.lowerBizName,
          });
        }
      });
    });

    setStoreInfoList(newStoreInfoList);
  }, [result.data]);

  return { ...result, data: storeInfoList };
};
