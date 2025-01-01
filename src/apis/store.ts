import { storeAxios } from '@/libs/axios';
import { RequestRegisterStore, ResponseRegisterStore } from '@/types/store';

export const registerStore = async (payload: RequestRegisterStore) => {
  const response = await storeAxios.post<ResponseRegisterStore>('stores', payload);
  const { data } = response;

  return data;
};
