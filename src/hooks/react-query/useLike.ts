import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { likeStore } from '@/apis/store';
import { QUERY_KEY } from '@/constants/tanstackQuery';
import {
  RequestLikeStore,
  ResponseGetStore,
  ResponseGetStores,
  ResponseGetStoresProxy,
} from '@/types/store';
import { findStoreIndex } from '@/utils/findStoreIndex';

/**
 * NOTE: mutate 실행 시 store, store list, proxy store list 재조회 처리
 */
export const useLike = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: RequestLikeStore) => likeStore(payload),
    onMutate: async (payload) => {
      const { id: storeId, body } = payload;
      const { action } = body;

      // Store
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.store, storeId] });

      const previousStore = queryClient.getQueryData<ResponseGetStore>([QUERY_KEY.store, storeId]);

      queryClient.setQueryData<ResponseGetStore>([QUERY_KEY.store, storeId], () => {
        if (previousStore === undefined) return undefined;

        previousStore.likeCount += action === 'like' ? 1 : -1;
        return previousStore;
      });

      // Stores
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.infiniteStores] });

      const previousStores = queryClient.getQueryData<InfiniteData<ResponseGetStores>>([
        QUERY_KEY.infiniteStores,
      ]);

      queryClient.setQueryData<InfiniteData<ResponseGetStores>>([QUERY_KEY.infiniteStores], () => {
        if (previousStores === undefined) return undefined;

        const { pageIndex, storeIndex } = findStoreIndex(previousStores, payload.id);
        if (pageIndex === null || storeIndex === null) return previousStores;

        const cloneStores = structuredClone(previousStores);
        cloneStores.pages[pageIndex].data[storeIndex].likeCount += action === 'like' ? 1 : -1;

        return cloneStores;
      });

      // Proxy Stores
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.infiniteStoresProxy] });

      const cachedStoresProxyQueryInfo = queryClient
        .getQueriesData<
          InfiniteData<ResponseGetStoresProxy>
        >({ queryKey: [QUERY_KEY.infiniteStoresProxy] })
        .at(-1);

      const [queryKey, previousStoresProxy] = cachedStoresProxyQueryInfo ?? [[], undefined];

      queryClient.setQueryData(queryKey, () => {
        if (previousStoresProxy === undefined) return undefined;

        const { pageIndex, storeIndex } = findStoreIndex(previousStoresProxy, payload.id);
        if (pageIndex === null || storeIndex === null) return previousStoresProxy;

        const cloneStores = structuredClone(previousStoresProxy);
        cloneStores.pages[pageIndex].data[storeIndex].likeCount += action === 'like' ? 1 : -1;

        return cloneStores;
      });

      return { previousStore, previousStores, previousStoresProxy, payload };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData([QUERY_KEY.store], context?.previousStore);
      queryClient.setQueryData([QUERY_KEY.infiniteStores], context?.previousStores);
      queryClient.setQueryData([QUERY_KEY.infiniteStoresProxy], context?.previousStoresProxy);
    },
  });

  return mutation;
};
