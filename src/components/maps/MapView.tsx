'use client';

import { useSearchParams } from 'next/navigation';
import 'ol/ol.css';
import { useEffect } from 'react';
import { QUERY_STRING } from '@/constants/page';
import { useMapView } from '@/hooks/useMapView';
import { useStoreInfiniteQuery } from '@/hooks/useTMap';
import { PointFeature } from '@/types/openlayers';
import { StoreProperties } from '@/types/tMap';
import MapContributors from './MapContributors';

function MapView() {
  const searchParams = useSearchParams();
  const searchKeyword = searchParams.get(QUERY_STRING.search) ?? '';

  const { data: searchedStoreList } = useStoreInfiniteQuery(searchKeyword);

  const { controller } = useMapView('map');

  useEffect(() => {
    if (searchedStoreList.length === 0) return;

    const pointFeatureList: PointFeature<StoreProperties>[] = searchedStoreList.map((store) => {
      const { id, lon, lat, name, category, address } = store;
      return {
        id,
        coordinate: [Number(lon), Number(lat)],
        properties: { name, category, address },
      };
    });

    const clearEvent = controller.addMarkerLayer(
      {
        name: 'unregistered', // TODO: 추후 결제 가능, 불가, 미등록으로 나뉠 예정
        theme: 'gray', // TODO: 추후 결제 가능, 불가, 미등록으로 나뉠 예정
        pointFeatureList,
      },
      (event, features) => {
        // TODO: 추후 click event 등록 (정보 overlay 표출)
        console.info(event.coordinate);
        console.info(features.map((feature) => feature.getProperties()));
      }
    );

    return () => {
      clearEvent();
    };
  }, [searchedStoreList]);

  return (
    <div id='map' className='relative h-full'>
      <MapContributors />
    </div>
  );
}

export default MapView;
