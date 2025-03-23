import { Range } from './common';

export interface StoreInfo {
  id: string;
  name: string;
  address: string;
  category: string;
  lat: string;
  lon: string;
  paymentStatus: PaymentStatus;
  reviewCount: number;
  tastyCount: number;
  friendlyCount: number;
  valuableCount: number;
  comfortableCount: number;
  likeCount: number;
}

export type PaymentStatus = 'available' | 'unavailable' | 'unregistered';

// 결과 정렬 순서 A = 정확도순, R = 거리순 (default A)
type SearchStoreSortBy = 'A' | 'R';

export type LikeAction = 'like' | 'unlike';

// ==============  API  ==============
// path = /stores
export interface ErrorResponse {
  error: string;
  message: string | string[];
  statusCode: number;
  success: false;
}

export type RequestRegisterStore = StoreInfo;

export interface ResponseRegisterStore extends StoreInfo {
  createdAt: string;
  updatedAt: string;
}

export interface ResponseGetStore extends StoreInfo {
  createdAt: string;
  updatedAt: string;
}

export interface RequestGetStores {
  take?: number; // default 10
  skip?: number; // default 1
}

export interface ResponseGetStores {
  data: ResponseGetStore[];
  totalCount: number;
  totalPage: number;
}

export interface RequestLikeStore {
  id: string;
  body: {
    action: LikeAction;
  };
}

export interface ResponseLikeStore extends StoreInfo {
  createdAt: string;
  updatedAt: string;
}

// path = /proxy/stores
export type ResponseGetStoreProxy = StoreInfo;

export interface RequestGetStoresProxy {
  search: string;
  lon: number;
  lat: number;
  sortBy?: SearchStoreSortBy; // 결과 정렬 순서 A = 정확도순, R = 거리순 (default A)
  radius?: Range<34>; // 검색 반경 1 ~ 33km, 0인 경우 전국
  take?: number; // default 10
  skip?: number; // default 1
}

export interface ResponseGetStoresProxy {
  data: StoreInfo[];
  totalCount: number;
  totalPage: number;
}
