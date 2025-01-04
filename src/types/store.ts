export interface StoreInfo {
  id: string;
  name: string;
  lat: string;
  lon: string;
  address: string;
  category: string;
}

export interface RegisteredStore extends StoreInfo {
  paymentStatus: PaymentStatus;
}

export type StoreProperties = Omit<StoreInfo, 'id' | 'lat' | 'lon'>;

export type PaymentStatus = 'available' | 'unavailable';

// ==============  API  ==============

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
