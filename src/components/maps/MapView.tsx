'use client';

import 'ol/ol.css';
import { useMapView } from '@/hooks/useMapView';
import MapContributors from './MapContributors';

function MapView() {
  useMapView('map');

  return (
    <div id='map' className='relative h-full'>
      <MapContributors />
    </div>
  );
}

export default MapView;
