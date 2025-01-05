import axios from 'axios';
import { STORE_API_URL } from '@/constants/env';

export const storeAxios = axios.create({
  baseURL: STORE_API_URL,
  headers: {
    Accept: 'application/json',
  },
});
