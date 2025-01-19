import { baseAxios } from '@/libs/axios';
import { RequestCreateReview, ResponseCreateReview } from '@/types/review';

export const createReview = async (storeId: string, payload: RequestCreateReview) => {
  const response = await baseAxios.post<ResponseCreateReview>(`stores/${storeId}/reviews`, payload);
  return response.data;
};
