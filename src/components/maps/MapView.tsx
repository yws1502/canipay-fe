'use client';

import { useParams, usePathname, useSearchParams } from 'next/navigation';
import { Point } from 'ol/geom';
import 'ol/ol.css';
import { fromLonLat } from 'ol/proj';
import { useEffect, useState } from 'react';
import { LOCATION } from '@/constants/location';
import { QUERY_STRING } from '@/constants/page';
import useInfiniteStores from '@/hooks/react-query/useInfiniteStores';
import useInfiniteStoresProxy from '@/hooks/react-query/useInfiniteStoresProxy';
import { useMapView } from '@/hooks/useMapView';
import { MarkerTheme, PointFeature } from '@/types/openlayers';
import { PaymentStatus, StoreInfo } from '@/types/store';
import { useMapController } from '../contexts/MapControllerProvider';
import MapContributors from './MapContributors';
import MarkerToggleList from './MarkerToggleList';
import StoreTooltip from './StoreTooltip';

function MapView() {
  const params = useParams<{ store?: string }>();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchKeyword = searchParams.get(QUERY_STRING.search) ?? '';
  const lon = Number(searchParams.get(QUERY_STRING.lon)) ?? LOCATION.lon;
  const lat = Number(searchParams.get(QUERY_STRING.lat)) ?? LOCATION.lat;

  const { data: rootStoreList } = useInfiniteStoresProxy(searchKeyword, lon, lat);
  const { data: listStoreList } = useInfiniteStores();

  const [displayStoreList, setDisplayStoreList] = useState<StoreInfo[]>([]);

  const [selectedStores, setSelectedStores] = useState<{ id: string; name: string }[]>([]);

  const { mapView, controller } = useMapView('map');

  const { setMapController } = useMapController();

  useEffect(() => {
    if (mapView) {
      setMapController(controller);
    }
  }, [mapView]);

  useEffect(() => {
    // store id
    if (params?.store) {
      const { store } = params;
      setSelectedStores([{ id: store, name: store }]);
    }
  }, [params]);

  useEffect(() => {
    setDisplayStoreList(searchKeyword === '' ? listStoreList : rootStoreList);
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

      clearEvent = controller.addMarkerClickEvent((_, features) => {
        const selectedStores = features.map((feature) => {
          return {
            id: feature.get('id') as string,
            name: feature.get('name') as string,
          };
        });

        setSelectedStores(selectedStores);
        const coordinate = (features[0].get('geometry') as Point).getCoordinates();

        controller.setOverlayLocation(coordinate);
        controller.setCenter(coordinate);
      });
    }

    return () => {
      if (clearEvent) clearEvent();
    };
  }, [displayStoreList]);

  const onSelectStoreAtTooltip = (storeId: string) => {
    const targetStore = displayStoreList.find((store) => store.id === storeId);

    if (targetStore) {
      // NOTE: 선택된 매장 위치로 이동
      controller.setCenter(fromLonLat([+targetStore.lon, +targetStore.lat]));
      setSelectedStores([targetStore]);
    }
  };

  return (
    <div id='map' className='relative size-full'>
      <MarkerToggleList />
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
