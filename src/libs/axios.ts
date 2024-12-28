import axios from 'axios';
import { T_MAP_API_URL, T_MAP_APP_KEY } from '@/constants/env';

export const tMapAxios = axios.create({
  baseURL: T_MAP_API_URL,
  headers: {
    Accept: 'application/json',
  },
});

tMapAxios.interceptors.request.use((config) => {
  const appKey = T_MAP_APP_KEY;
  if (appKey === '') throw new Error('TMAP APP Key 환경 변수를 설정해주세요.');

  config.headers.set('appKey', appKey);

  return config;
});
