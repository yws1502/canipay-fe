'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import RefreshIcon from '@/assets/icons/refresh.svg';
import { PAGE_PATH, QUERY_STRING } from '@/constants/page';
import { useMapController } from '../contexts/MapControllerProvider';

function SearchHereButton() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { mapController } = useMapController();

  const handleChangeCenter = () => {
    const search = searchParams.get(QUERY_STRING.search);

    if (!mapController) return;
    if (!search) return;

    const center = mapController.getCenter();

    const searchParam = new URLSearchParams([
      [QUERY_STRING.search, search],
      [QUERY_STRING.lon, center.lon.toString()],
      [QUERY_STRING.lat, center.lat.toString()],
    ]);

    router.push(`${PAGE_PATH.root}?${searchParam.toString()}`, { scroll: false });
  };

  return (
    <button
      type='button'
      className='fixed left-1/2 top-[90px] z-20 flex h-[30px] -translate-x-1/2 items-center justify-center gap-2 rounded-full bg-white px-3 py-2 text-body-2 text-primary shadow-500 hover:opacity-80 active:opacity-60 md:fixed md:bottom-[unset] md:top-[56px] md:translate-x-0'
      onClick={handleChangeCenter}
    >
      <RefreshIcon width={18} height={18} className='fill-primary' />현 위치에서 검색
    </button>
  );
}

export default SearchHereButton;
