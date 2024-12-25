import { Map } from 'ol';
import { useEffect, useState } from 'react';
import { LOCATION } from '@/constants/location';
import { URL } from '@/constants/url';
import {
  generateControls,
  generateInteraction,
  generateOSMLayer,
  generateView,
  generateXYZLayer,
} from '@/libs/openlayers';

export const useMapView = (domName: string) => {
  const [mapView, setMapView] = useState<Map | null>(null);

  useEffect(() => {
    const mapView = new Map({
      target: domName,
      view: generateView(LOCATION),
      controls: generateControls(),
      interactions: generateInteraction(),
      layers: [generateOSMLayer(), generateXYZLayer(URL.vworld)],
    });

    setMapView(mapView);
  }, []);

  return { mapView };
};
