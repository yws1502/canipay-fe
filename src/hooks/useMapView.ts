import { Map, MapBrowserEvent } from 'ol';
import { FeatureLike } from 'ol/Feature';
import { Point } from 'ol/geom';
import { useEffect, useState } from 'react';
import { EXCEPTION_MESSAGE } from '@/constants/error';
import { LOCATION } from '@/constants/location';
import { URL } from '@/constants/url';
import {
  generateControls,
  generateInteraction,
  generateMarker,
  generateMarkerInteraction,
  generateOSMLayer,
  generateView,
  generateXYZLayer,
} from '@/libs/openlayers';
import { MarkerData } from '@/types/openlayers';
import { StoreProperties } from '@/types/tMap';

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
    addMarkerLayer: (
      markerData: MarkerData<StoreProperties>,
      onClickMarker?: (event: MapBrowserEvent<any>, features: FeatureLike[]) => void
    ) => {
      if (mapView === null) throw new Error(EXCEPTION_MESSAGE.variableNotSet('mapView'));
      controller.removeLayer(markerData.name);

      const markerLayer = generateMarker(markerData);
      mapView.addLayer(markerLayer);

      const { interaction, removeInteraction } = generateMarkerInteraction(markerData.theme);
      mapView.addInteraction(interaction);

      const handleMarkerClick = (event: MapBrowserEvent<any>) => {
        if (onClickMarker === undefined) return;

        onClickMarker(event, mapView.getFeaturesAtPixel(event.pixel));
      };
      mapView.on('click', handleMarkerClick);

      return () => {
        removeInteraction();
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
