import { storeAxios } from '@/libs/axios';
import {
  RequestGetStores,
  RequestGetStoresProxy,
  RequestRegisterStore,
  ResponseGetStore,
  ResponseGetStoreProxy,
  ResponseGetStores,
  ResponseGetStoresProxy,
  ResponseRegisterStore,
} from '@/types/store';

export const registerStore = async (payload: RequestRegisterStore) => {
  const response = await storeAxios.post<ResponseRegisterStore>('stores', payload);
  return response.data;
};

export const getStore = async (id: string) => {
  const response = await storeAxios.get<ResponseGetStore>(`stores/${id}`);
  return response.data;
};

export const getStores = async (payload: RequestGetStores) => {
  const response = await storeAxios.get<ResponseGetStores>('stores', { params: payload });
  return response.data;
};

export const getStoreProxy = async (id: string) => {
  const response = await storeAxios.get<ResponseGetStoreProxy>(`proxy/stores/${id}`);
  return response.data;
};

export const getStoresProxy = async (payload: RequestGetStoresProxy) => {
  const response = await storeAxios.get<ResponseGetStoresProxy>('proxy/stores', {
    params: payload,
  });
  return response.data;
};
