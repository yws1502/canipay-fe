import { tMapAxios } from '@/libs/axios';
import { RequestTMapPoi, ResponseTMapPoi } from '@/types/tMap';

export const getPoi = async (payload: RequestTMapPoi) => {
  const response = await tMapAxios.get<ResponseTMapPoi>('/', { params: payload });
  return response.data;
};
