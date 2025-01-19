import { ResponseGetStore } from './store';

export type ReviewType = 'isTasty' | 'isFriendly' | 'isValuable' | 'isComfortable';

// ==============  API  ==============
// path = /stores/${storeId}/reviews
export interface RequestCreateReview extends Record<ReviewType, boolean> {
  content: string;
}

export interface ResponseCreateReview {
  id: string;
  isTasty: 'isTasty';
  isFriendly: 'isFriendly';
  isValuable: 'isValuable';
  isComfortable: 'isComfortable';
  content: string;
  isReported: boolean;
  store: ResponseGetStore;
  createdAt: string;
  updatedAt: string;
}
