'use client';

import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';
import { useLikedStores } from '@/stores/useLikedStores';
import NavigationBar from './NavigationBar';
import MapView from './maps/MapView';

const ResponsiveUi = dynamic(() => import('@/components/ResponsiveUi'), { ssr: false });

function MapLayout() {
  const { dailyUpdate } = useLikedStores();

  useEffect(() => {
    dailyUpdate();
  }, []);

  return (
    <>
      <MapView />
      <ResponsiveUi />
      <NavigationBar />
    </>
  );
}

export default MapLayout;
