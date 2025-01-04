import { storeAxios } from '@/libs/axios';
import {
  RequestGetStoresProxy,
  RequestRegisterStore,
  ResponseGetStoresProxy,
  ResponseRegisterStore,
} from '@/types/store';

export const registerStore = async (payload: RequestRegisterStore) => {
  const response = await storeAxios.post<ResponseRegisterStore>('stores', payload);
  return response.data;
};

export const getStoresProxy = async (payload: RequestGetStoresProxy) => {
  const response = await storeAxios.get<ResponseGetStoresProxy>('proxy/stores', {
    params: payload,
  });
  return response.data;
};
