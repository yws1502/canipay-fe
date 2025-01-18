import axios from 'axios';
import { BASE_API_URL } from '@/constants/env';

export const baseAxios = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    Accept: 'application/json',
  },
});
