import { Range } from './common';

export interface StoreInfo {
  id: string;
  name: string;
  address: string;
  category: string;
  lat: string;
  lon: string;
}

export interface RegisteredStore extends StoreInfo {
  paymentStatus: PaymentStatus;
}

export type StoreProperties = Omit<StoreInfo, 'id' | 'lat' | 'lon'>;

export type PaymentStatus = 'available' | 'unavailable';

// 결과 정렬 순서 A = 정확도순, R = 거리순 (default A)
type SearchStoreSortBy = 'A' | 'R';

// ==============  API  ==============
// path = /stores
export interface ErrorResponse {
  error: string;
  message: string | string[];
  statusCode: number;
  success: false;
}

export type RequestRegisterStore = RegisteredStore;

export interface ResponseRegisterStore extends RegisteredStore {
  createdAt: string;
  updatedAt: string;
}

export type ResponseGetStore = RegisteredStore;

// path = /proxy/stores
export interface RequestGetStoresProxy {
  search: string;
  sortBy?: SearchStoreSortBy; // 결과 정렬 순서 A = 정확도순, R = 거리순 (default A)
  radius?: Range<34>; // 검색 반경 1 ~ 33km, 0인 경우 전국
  limit?: number; // default 10
  skip?: number; // default 1
}

export interface ResponseGetStoresProxy {
  data: StoreInfo[];
  totalCount: number;
  totalPage: number;
}
