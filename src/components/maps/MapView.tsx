'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import 'ol/ol.css';
import { useEffect, useState } from 'react';
import { PAGE_PATH, QUERY_STRING } from '@/constants/page';
import useInfiniteStores from '@/hooks/react-query/useInfiniteStores';
import useInfiniteStoresProxy from '@/hooks/react-query/useInfiniteStoresProxy';
import { useMapView } from '@/hooks/useMapView';
import { MarkerTheme, PointFeature } from '@/types/openlayers';
import { PaymentStatus, StoreInfo } from '@/types/store';
import MapContributors from './MapContributors';
import StoreTooltip from './StoreTooltip';

function MapView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchKeyword = searchParams.get(QUERY_STRING.search) ?? '';

  const { data: rootStoreList } = useInfiniteStoresProxy(searchKeyword);
  const { data: listStoreList } = useInfiniteStores();

  const [displayStoreList, setDisplayStoreList] = useState<StoreInfo[]>([]);

  const [selectedStores, setSelectedStores] = useState<{ id: string; name: string }[]>([]);

  const { mapView, controller } = useMapView('map');

  useEffect(() => {
    if (pathname === PAGE_PATH.root) {
      // TODO: 검색값이 없는 경우 결제 가능 매장 지도 표시
      setDisplayStoreList(searchKeyword === '' ? listStoreList : rootStoreList);
    } else if (pathname === PAGE_PATH.storeList) {
      setDisplayStoreList(listStoreList);
    } else {
      setDisplayStoreList([]);
    }
  }, [pathname, rootStoreList, listStoreList, searchKeyword]);

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
    if (mapView) {
      controller.removeLayer('available');
      controller.removeLayer('unavailable');
      controller.removeLayer('unregistered');
    }

    let clearEvent: () => void;

    if (displayStoreList.length !== 0) {
      const paymentEnabledStores = displayStoreList.filter(
        (store) => store.paymentStatus === 'available'
      );
      const paymentDisabledStores = displayStoreList.filter(
        (store) => store.paymentStatus === 'unavailable'
      );
      const unregisteredStores = displayStoreList.filter(
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
        controller.setCenter(event.coordinate);
      });
    }

    return () => {
      if (clearEvent) clearEvent();
    };
  }, [displayStoreList]);

  const onSelectStoreAtTooltip = (storeId: string) => {
    const targetStore = displayStoreList.find((store) => store.id === storeId);

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
