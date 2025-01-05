'use client';

import { useSearchParams } from 'next/navigation';
import 'ol/ol.css';
import { useEffect, useState } from 'react';
import { QUERY_STRING } from '@/constants/page';
import useInfiniteStoresProxy from '@/hooks/react-query/useInfiniteStoresProxy';
import { useMapView } from '@/hooks/useMapView';
import { MarkerTheme, PointFeature } from '@/types/openlayers';
import { PaymentStatus, StoreInfo } from '@/types/store';
import MapContributors from './MapContributors';
import StoreTooltip from './StoreTooltip';

function MapView() {
  const searchParams = useSearchParams();
  const searchKeyword = searchParams.get(QUERY_STRING.search) ?? '';

  const { data: storeList } = useInfiniteStoresProxy(searchKeyword);

  const [selectedStores, setSelectedStores] = useState<{ id: string; name: string }[]>([]);

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
        const selectedStores = features.map((feature) => {
          return {
            id: feature.get('id') as string,
            name: feature.get('name') as string,
          };
        });

        setSelectedStores(selectedStores);
        controller.setOverlayLocation(event.coordinate);
      });
    }

    return () => {
      if (clearEvent) clearEvent();
    };
  }, [storeList]);

  const onSelectStoreAtTooltip = (storeId: string) => {
    const targetStore = storeList.find((store) => store.id === storeId);

    if (targetStore) {
      setSelectedStores([targetStore]);
    }
  };

  return (
    <div id='map' className='relative h-full'>
      <MapContributors />
      <div id='map-tooltip' className='absolute'>
        {selectedStores.length > 0 && (
          <StoreTooltip stores={selectedStores} onSelectStore={onSelectStoreAtTooltip} />
        )}
      </div>
    </div>
  );
}

export default MapView;
