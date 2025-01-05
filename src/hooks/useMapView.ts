import { Map, MapBrowserEvent } from 'ol';
import { FeatureLike } from 'ol/Feature';
import { useEffect, useState } from 'react';
import { EXCEPTION_MESSAGE } from '@/constants/error';
import { LOCATION } from '@/constants/location';
import { URL } from '@/constants/url';
import {
  generateControls,
  generateInteraction,
  generateMarker,
  generateOSMLayer,
  generateView,
  generateXYZLayer,
} from '@/libs/openlayers';
import { MarkerData } from '@/types/openlayers';

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

  const controller = {
    addMarkerLayer: (markerData: MarkerData) => {
      if (mapView === null) throw new Error(EXCEPTION_MESSAGE.variableNotSet('mapView'));
      controller.removeLayer(markerData.name);

      const markerLayer = generateMarker(markerData);
      mapView.addLayer(markerLayer);
    },
    addMarkerClickEvent: (
      onClickMarker: (event: MapBrowserEvent<any>, features: FeatureLike[]) => void
    ) => {
      if (mapView === null) throw new Error(EXCEPTION_MESSAGE.variableNotSet('mapView'));

      const handleMarkerClick = (event: MapBrowserEvent<any>) => {
        const features = mapView.getFeaturesAtPixel(event.pixel);
        if (features.length === 0) return;

        onClickMarker(event, features);
      };
      mapView.on('click', handleMarkerClick);

      return () => {
        mapView.un('click', handleMarkerClick);
      };
    },
    removeLayer: (name: string) => {
      if (mapView === null) throw new Error(EXCEPTION_MESSAGE.variableNotSet('mapView'));

      mapView
        .getAllLayers()
        .filter((layer) => layer.get('name') === name)
        .forEach((removeLayer) => {
          mapView.removeLayer(removeLayer);
        });
    },
  };

  return { mapView, controller };
};
