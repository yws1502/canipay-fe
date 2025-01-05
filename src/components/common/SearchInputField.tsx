'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { FormEvent, useEffect, useState } from 'react';
import CloseIcon from '@/assets/icons/close.svg';
import SearchIcon from '@/assets/icons/search.svg';
import { PAGE_PATH, QUERY_STRING } from '@/constants/page';

function SearchInputField() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState('');

  useEffect(() => {
    const searchKeyword = searchParams.get(QUERY_STRING.search);
    if (searchKeyword) {
      setSearch(searchKeyword);
    }
  }, []);

  const onGoToMap = () => {
    setSearch('');
    router.push(PAGE_PATH.root);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (search.length === 0) return;

    router.push(`${PAGE_PATH.root}?${QUERY_STRING.search}=${search}`, { scroll: false });
  };

  return (
    <form
      className='fixed inset-x-[15px] top-[15px] z-30 flex items-center justify-between rounded-md bg-white px-4 py-1.5 shadow-500 outline-1 has-[:focus]:outline has-[:focus]:outline-primary'
      onSubmit={onSubmit}
    >
      <input
        type='search'
        className='flex-1 text-body-1 outline-none'
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
    </form>
  );
}

export default SearchInputField;
