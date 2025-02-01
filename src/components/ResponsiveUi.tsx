'use client';

import React, { useEffect, useState } from 'react';
import { MOBILE_WIDTH } from '@/constants/responsive';
import SearchInputField from './common/SearchInputField';
import SearchedStoreList from './stores/SearchedStoreList';
import StoreListDesktopView from './stores/StoreListDesktopView';

function ResponsiveUi() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_WIDTH);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < MOBILE_WIDTH);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile ? (
    <>
      <SearchInputField />
      <SearchedStoreList />
    </>
  ) : (
    <StoreListDesktopView />
  );
}

export default ResponsiveUi;
