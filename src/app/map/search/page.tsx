import React from 'react';
import PoiList from '@/components/PoiList';

function Search() {
  return (
    <div className='fixed inset-x-0 bottom-0 z-30'>
      <PoiList />
    </div>
  );
}

export default Search;
