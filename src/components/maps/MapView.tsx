'use client';

import { useSearchParams } from 'next/navigation';
import 'ol/ol.css';
import { useEffect } from 'react';
import { QUERY_STRING } from '@/constants/page';
import useInfiniteStoresProxy from '@/hooks/react-query/useInfiniteStoresProxy';
import { useMapView } from '@/hooks/useMapView';
import { PointFeature } from '@/types/openlayers';
import { StoreProperties } from '@/types/store';
import MapContributors from './MapContributors';

function MapView() {
  const searchParams = useSearchParams();
  const searchKeyword = searchParams.get(QUERY_STRING.search) ?? '';

  const { data: storeList } = useInfiniteStoresProxy(searchKeyword);

  const { mapView, controller } = useMapView('map');

  useEffect(() => {
    if (mapView && searchKeyword === '') {
      controller.removeLayer('unregistered');
    }
  }, [searchKeyword]);

  useEffect(() => {
    let clearEvent: () => void;

    if (storeList.length !== 0) {
      const pointFeatureList: PointFeature<StoreProperties>[] = storeList.map((store) => {
        const { id, lon, lat, name, category, address } = store;
        return {
          id,
          coordinate: [Number(lon), Number(lat)],
          properties: { name, category, address },
        };
      });

      clearEvent = controller.addMarkerLayer(
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
    }

    return () => {
      if (clearEvent) clearEvent();
    };
  }, [storeList]);

  return (
    <div id='map' className='relative h-full'>
      <MapContributors />
    </div>
  );
}

export default MapView;
