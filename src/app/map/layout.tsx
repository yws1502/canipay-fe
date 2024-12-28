import React, { ReactNode } from 'react';
import NavigationBar from '@/components/NavigationBar';
import SearchedList from '@/components/SearchedList';
import SearchInputField from '@/components/common/SearchInputField';
import MapView from '@/components/maps/MapView';

function MapLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className='flex h-svh flex-col'>
      {children}
      <SearchInputField />
      <SearchedList />
      <MapView />
      <NavigationBar />
    </div>
  );
}

export default MapLayout;
