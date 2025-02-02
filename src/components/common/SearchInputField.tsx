'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { FormEvent, useEffect, useState } from 'react';
import CloseIcon from '@/assets/icons/close.svg';
import RefreshIcon from '@/assets/icons/refresh.svg';
import SearchIcon from '@/assets/icons/search.svg';
import { PAGE_PATH, QUERY_STRING } from '@/constants/page';
import { useMapController } from '../contexts/MapControllerProvider';

function SearchInputField() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { mapController } = useMapController();

  const [search, setSearch] = useState('');

  useEffect(() => {
    const searchKeyword = searchParams.get(QUERY_STRING.search);
    if (searchKeyword) {
      setSearch(searchKeyword);
    }
  }, []);

  const changeSearchParams = () => {
    if (!mapController) return;
    if (search.length === 0) return;

    const center = mapController.getCenter();

    const searchParam = new URLSearchParams([
      [QUERY_STRING.search, search],
      [QUERY_STRING.lon, center.lon.toString()],
      [QUERY_STRING.lat, center.lat.toString()],
    ]);

    router.push(`${PAGE_PATH.root}?${searchParam.toString()}`, { scroll: false });
  };

  const onGoToMap = () => {
    setSearch('');
    router.push(PAGE_PATH.root);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    changeSearchParams();
  };

  const handleChangeCenter = () => {
    changeSearchParams();
  };

  return (
    <form
      className='fixed inset-x-[16px] top-[16px] z-30 flex items-center justify-between rounded-md bg-white px-4 py-1.5 shadow-500 outline-1 has-[:focus]:outline has-[:focus]:outline-primary md:static'
      onSubmit={onSubmit}
    >
      <input
        type='search'
        className='flex-1 bg-white text-body-1 outline-none'
        placeholder='검색...'
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      {searchParams.get(QUERY_STRING.search) ? (
        <button type='button' onClick={onGoToMap}>
          <CloseIcon
            className='fill-gray-500 hover:opacity-80 active:opacity-60'
            width={24}
            height={24}
          />
        </button>
      ) : (
        <button type='submit' className='outline-none'>
          <SearchIcon
            className='fill-gray-500 hover:opacity-80 active:opacity-60'
            width={24}
            height={24}
          />
        </button>
      )}
      {searchParams.get(QUERY_STRING.search) && (
        <button
          type='button'
          className='absolute bottom-[-80px] left-1/2 z-20 flex h-[30px] -translate-x-1/2 items-center justify-center gap-2 rounded-full bg-white px-3 py-2 text-body-2 text-primary shadow-500 hover:opacity-80 active:opacity-60 md:fixed md:bottom-[unset] md:translate-x-0'
          onClick={handleChangeCenter}
        >
          <RefreshIcon width={18} height={18} className='fill-primary' />현 위치에서 검색
        </button>
      )}
    </form>
  );
}

export default SearchInputField;
