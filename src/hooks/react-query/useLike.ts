import { useMutation, useQueryClient } from '@tanstack/react-query';
import { likeStore } from '@/apis/store';
import { QUERY_KEY } from '@/constants/tanstackQuery';
import { RequestLikeStore } from '@/types/store';

/**
 * NOTE: mutate 실행 시 store, store list, proxy store list 재조회 처리
 */
export const useLike = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: RequestLikeStore) => likeStore(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.store] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.infiniteStores] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.infiniteStoresProxy] });
    },
  });

  return mutation;
};
