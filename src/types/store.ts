export type PaymentStatus = 'available' | 'unavailable';

// ==============  API  ==============

export interface RequestRegisterStore {
  id: string;
  name: string;
  category: string;
  address: string;
  lon: string;
  lat: string;
  paymentStatus: PaymentStatus;
}

export interface ResponseRegisterStore {
  id: string;
  name: string;
  category: string;
  address: string;
  lon: string;
  lat: string;
  paymentStatus: PaymentStatus;
  createdAt: string;
  updatedAt: string;
}
