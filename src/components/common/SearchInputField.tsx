'use client';

import { usePathname, useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react';
import CloseIcon from '@/assets/icons/close.svg';
import SearchIcon from '@/assets/icons/search.svg';
import { PAGE_PATH, QUERY_STRING } from '@/constants/page';

function SearchInputField() {
  const router = useRouter();
  const pathname = usePathname();

  const [search, setSearch] = useState('');

  const onGoToMap = () => {
    setSearch('');
    router.push(PAGE_PATH.map.root);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (search.length === 0) return;

    router.push(`${PAGE_PATH.map.search}?${QUERY_STRING.search}=${search}`);
  };

  const isSearchPage = pathname === PAGE_PATH.map.search;
  return (
    <form
      className='fixed inset-x-[15px] top-[15px] z-30 flex items-center justify-between rounded-md bg-white px-4 py-1.5 shadow-500 outline-1 has-[:focus]:outline has-[:focus]:outline-primary'
      onSubmit={onSubmit}>
      <input
        type='search'
        className='flex-1 text-body-1 outline-none'
        placeholder='검색...'
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      {isSearchPage ? (
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
    </form>
  );
}

export default SearchInputField;
