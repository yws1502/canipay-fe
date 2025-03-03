'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import NavigationBar from './NavigationBar';
import MapView from './maps/MapView';

const ResponsiveUi = dynamic(() => import('@/components/ResponsiveUi'), { ssr: false });

function MapLayout() {
  return (
    <>
      <MapView />
      <ResponsiveUi />
      <NavigationBar />
    </>
  );
}

export default MapLayout;
