import { Map } from 'ol';
import { useEffect, useState } from 'react';
import { LOCATION } from '@/constants/location';
import {
  generateControls,
  generateInteraction,
  generateOSMLayer,
  generateView,
} from '@/libs/openlayers';

export const useMapView = (domName: string) => {
  const [mapView, setMapView] = useState<Map | null>(null);

  useEffect(() => {
    const mapView = new Map({
      target: domName,
      view: generateView(LOCATION),
      controls: generateControls(),
      interactions: generateInteraction(),
      layers: [generateOSMLayer()],
    });

    setMapView(mapView);
  }, []);

  return { mapView };
};
