import React, { ReactNode } from 'react';
import NavigationBar from '@/components/NavigationBar';
import MapView from '@/components/maps/MapView';

function MapLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className='flex h-svh flex-col'>
      {children}
      <MapView />
      <NavigationBar />
    </div>
  );
}

export default MapLayout;
