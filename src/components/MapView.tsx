'use client';

import 'ol/ol.css';
import { useMapView } from '@/hooks/useMapView';

function MapView() {
  useMapView('map');

  return <div id='map' className='h-svh' />;
}

export default MapView;
