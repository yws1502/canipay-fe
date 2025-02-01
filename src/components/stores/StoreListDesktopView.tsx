import { useSearchParams } from 'next/navigation';
import React from 'react';
import { LOCATION } from '@/constants/location';
import { QUERY_STRING } from '@/constants/page';
import useInfiniteStores from '@/hooks/react-query/useInfiniteStores';
import useInfiniteStoresProxy from '@/hooks/react-query/useInfiniteStoresProxy';
import SearchInputField from '../common/SearchInputField';
import StoreListView from './StoreListView';

function StoreListDesktopView() {
  const searchParams = useSearchParams();
  const searchKeyword = searchParams.get(QUERY_STRING.search) ?? '';
  const lon = Number(searchParams.get(QUERY_STRING.lon)) ?? LOCATION.lon;
  const lat = Number(searchParams.get(QUERY_STRING.lat)) ?? LOCATION.lat;

  const {
    data: searchedStoreInfoList,
    fetchNextPage: fetchSearchedStoreListNextPage,
    hasNextPage: hasSearchedStoreListNextPage,
  } = useInfiniteStoresProxy(searchKeyword, lon, lat);

  // TODO: 추후 결제 가능 목록만 필터할 수 있는 기능 필요
  const {
    data: storeInfoList,
    fetchNextPage: fetchStoreListNextPage,
    hasNextPage: hasStoreListNextPage,
  } = useInfiniteStores();

  return (
    // TODO: min width 300px, max width 500px 사이즈 조절 기능 추가 예정
    <div className='fixed inset-y-0 left-[60px] flex w-[300px] flex-col gap-4 overflow-auto bg-white p-4'>
      <SearchInputField />
      <p className='text-body-2'>{searchKeyword ? '결과 목록' : '결제 가능 목록'}</p>
      <StoreListView
        storeInfoList={searchKeyword ? searchedStoreInfoList : storeInfoList}
        fetchNextPage={searchKeyword ? fetchSearchedStoreListNextPage : fetchStoreListNextPage}
        hasNextPage={searchKeyword ? hasSearchedStoreListNextPage : hasStoreListNextPage}
      />
    </div>
  );
}

export default StoreListDesktopView;
