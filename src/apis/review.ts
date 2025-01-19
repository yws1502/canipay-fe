import { baseAxios } from '@/libs/axios';
import {
  RequestCreateReview,
  RequestGetReviews,
  ResponseCreateReview,
  ResponseGetReviews,
  ResponseReportReview,
} from '@/types/review';

export const createReview = async (storeId: string, payload: RequestCreateReview) => {
  const response = await baseAxios.post<ResponseCreateReview>(`stores/${storeId}/reviews`, payload);
  return response.data;
};

export const getReviewsByStore = async (storeId: string, payload: RequestGetReviews) => {
  const response = await baseAxios.get<ResponseGetReviews>(`stores/${storeId}/reviews`, {
    params: payload,
  });
  return response.data;
};

// 리뷰 신고 기능
export const reportReview = async (reviewId: string) => {
  const response = await baseAxios.patch<ResponseReportReview>(`reviews/${reviewId}`);
  return response.data;
};
