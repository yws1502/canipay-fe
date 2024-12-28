import axios from 'axios';
import { T_MAP_API_URL, T_MAP_APP_KEY } from '@/constants/env';
import { EXCEPTION_MESSAGE } from '@/constants/error';

export const tMapAxios = axios.create({
  baseURL: T_MAP_API_URL,
  headers: {
    Accept: 'application/json',
  },
});

tMapAxios.interceptors.request.use((config) => {
  const appKey = T_MAP_APP_KEY;
  if (appKey === '') throw new Error(EXCEPTION_MESSAGE.environmentNotSet('TMAP_APP_KEY'));

  config.headers.set('appKey', appKey);

  return config;
});
