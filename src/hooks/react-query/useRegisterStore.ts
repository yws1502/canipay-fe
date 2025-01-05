import { useMutation } from '@tanstack/react-query';
import { registerStore } from '@/apis/store';
import { RequestRegisterStore } from '@/types/store';

const useRegisterStore = () => {
  const mutation = useMutation({
    mutationFn: (payload: RequestRegisterStore) => registerStore(payload),
  });

  return mutation;
};

export default useRegisterStore;
