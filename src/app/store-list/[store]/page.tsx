import React from 'react';
import { getStore, getStoreProxy } from '@/apis/store';
import StoreDetail from '@/components/StoreDetail';

interface StoreProps {
  params: Promise<{ store: string }>;
}

async function Store({ params }: StoreProps) {
  const { store } = await params;

  const storeInfo = await getStore(store).catch(async () => {
    const unregisteredStoreInfo = await getStoreProxy(store);
    return unregisteredStoreInfo;
  });

  return <StoreDetail storeInfo={storeInfo} />;
}

export default Store;
