import { ResponseGetStore } from './store';

export type ReviewType = 'isTasty' | 'isFriendly' | 'isValuable' | 'isComfortable';

export interface Review {
  id: string;
  isTasty: boolean;
  isFriendly: boolean;
  isValuable: boolean;
  isComfortable: boolean;
  content: string;
  isReported: boolean;
  createdAt: string;
  updatedAt: string;
}

// ==============  API  ==============
// path = /stores/${storeId}/reviews
export interface RequestCreateReview extends Record<ReviewType, boolean> {
  content: string;
}

export interface ResponseCreateReview extends Review {
  store: ResponseGetStore;
}

export interface RequestGetReviews {
  take?: number;
  skip?: number;
}

export interface ResponseGetReviews {
  data: Review[];
  totalCount: number;
  totalPage: number;
}

export type ResponseReportReview = Review;
