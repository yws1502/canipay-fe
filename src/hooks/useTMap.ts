import { useInfiniteQuery } from '@tanstack/react-query';
import { getPoi } from '@/apis/tMap';
import { QUERY_KEY } from '@/constants/tanstackQuery';

export const usePoiInfiniteQuery = (search: string) => {
  const result = useInfiniteQuery({
    queryKey: [QUERY_KEY.poiInfiniteQuery, search],
    queryFn: ({ pageParam = 1 }) =>
      getPoi({
        version: '1',
        searchKeyword: search,
        page: pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (allPages.length === 0) return undefined;
      return Number(lastPage.searchPoiInfo.page) + 1;
    },
  });

  return result;
};
