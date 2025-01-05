import { useQuery } from '@tanstack/react-query';
import { getStore, getStoreProxy } from '@/apis/store';
import { QUERY_KEY } from '@/constants/tanstackQuery';

const useStore = (id: string) => {
  const result = useQuery({
    queryKey: [QUERY_KEY.store, id],
    queryFn: () => getStore(id).catch(() => getStoreProxy(id)),
    enabled: !!id,
  });

  return result;
};

export default useStore;
