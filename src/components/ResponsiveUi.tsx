'use client';

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { QUERY_STRING } from '@/constants/page';
import { MOBILE_WIDTH } from '@/constants/responsive';
import SearchInputField from './common/SearchInputField';
import SearchHereButton from './maps/SearchHereButton';
import SearchedStoreList from './stores/SearchedStoreList';
import StoreListDesktopView from './stores/StoreListDesktopView';

function ResponsiveUi() {
  const searchParams = useSearchParams();

  const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_WIDTH);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < MOBILE_WIDTH);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {searchParams.get(QUERY_STRING.search) && <SearchHereButton />}
      {isMobile ? (
        <>
          <SearchInputField />
          <SearchedStoreList />
        </>
      ) : (
        <StoreListDesktopView />
      )}
    </>
  );
}

export default ResponsiveUi;
