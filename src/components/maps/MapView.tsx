'use client';

import { useSearchParams } from 'next/navigation';
import 'ol/ol.css';
import { useEffect } from 'react';
import { QUERY_STRING } from '@/constants/page';
import useInfiniteStoresProxy from '@/hooks/react-query/useInfiniteStoresProxy';
import { useMapView } from '@/hooks/useMapView';
import { MarkerTheme, PointFeature } from '@/types/openlayers';
import { PaymentStatus, StoreInfo } from '@/types/store';
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

  const paintStoreMarker = (stores: StoreInfo[], name: PaymentStatus, theme: MarkerTheme) => {
    const pointFeatureList: PointFeature[] = stores.map((store) => {
      const { id, lon, lat } = store;
      return {
        id,
        coordinate: [Number(lon), Number(lat)],
        properties: { name: store.name },
      };
    });

    const clearEvent = controller.addMarkerLayer({ name, theme, pointFeatureList });
    return clearEvent;
  };

  useEffect(() => {
    let clearEvent: () => void;

    if (storeList.length !== 0) {
      const paymentEnabledStores = storeList.filter((store) => store.paymentStatus === 'available');
      const paymentDisabledStores = storeList.filter(
        (store) => store.paymentStatus === 'unavailable'
      );
      const unregisteredStores = storeList.filter(
        (store) => store.paymentStatus === 'unregistered'
      );

      paintStoreMarker(paymentEnabledStores, 'available', 'blue');
      paintStoreMarker(paymentDisabledStores, 'unavailable', 'red');
      paintStoreMarker(unregisteredStores, 'unregistered', 'gray');

      clearEvent = controller.addMarkerClickEvent((event, features) => {
        // TODO: 추후 click event 등록 (정보 overlay 표출)
        console.info(event.coordinate);
        console.info(features.map((feature) => feature.getProperties()));
      });
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
