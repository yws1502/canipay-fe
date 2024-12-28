'use client';

import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { QUERY_STRING } from '@/constants/page';
import { usePoiInfiniteQuery } from '@/hooks/useTMap';

function PoiList() {
  const searchParams = useSearchParams();
  const searchKeyword = searchParams.get(QUERY_STRING.search) ?? '';

  const { data } = usePoiInfiniteQuery(searchKeyword);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return <div>PoiList</div>;
}

export default PoiList;
