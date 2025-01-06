import { Map, MapBrowserEvent, Overlay } from 'ol';
import { FeatureLike } from 'ol/Feature';
import { Coordinate } from 'ol/coordinate';
import { fromLonLat } from 'ol/proj';
import { useEffect, useState } from 'react';
import { EXCEPTION_MESSAGE } from '@/constants/error';
import { LOCATION } from '@/constants/location';
import { URL } from '@/constants/url';
import {
  generateControls,
  generateInteraction,
  generateMarker,
  generateOSMLayer,
  generateOverlay,
  generateView,
  generateXYZLayer,
} from '@/libs/openlayers';
import { MapController, MarkerData } from '@/types/openlayers';

export const useMapView = (domName: string) => {
  const [mapView, setMapView] = useState<Map | null>(null);
  const [overlay, setOverlay] = useState<Overlay | null>(null);

  const controller: MapController = {
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
    setOverlayLocation: (coordinate: Coordinate, shouldTransformed = false) => {
      if (overlay === null) throw new Error(EXCEPTION_MESSAGE.variableNotSet('overlay'));
      if (mapView === null) throw new Error(EXCEPTION_MESSAGE.variableNotSet('mapView'));

      const newCenter = shouldTransformed ? fromLonLat(coordinate) : coordinate;

      overlay.setPosition(newCenter);

      const closeOverlay = () => {
        overlay.setPosition(undefined);
        mapView.un('pointerdrag', closeOverlay);
      };

      mapView.on('pointerdrag', closeOverlay);
    },
    setCenter: (coordinate: Coordinate, shouldTransformed = false, duration = 500) => {
      if (mapView === null) throw new Error(EXCEPTION_MESSAGE.variableNotSet('mapView'));

      const newCenter = shouldTransformed ? fromLonLat(coordinate) : coordinate;

      mapView.getView().animate({
        center: newCenter,
        duration,
      });
    },
  };

  useEffect(() => {
    const overlay = generateOverlay('map-tooltip');

    const mapView = new Map({
      target: domName,
      view: generateView(LOCATION),
      controls: generateControls(),
      interactions: generateInteraction(),
      layers: [generateOSMLayer(), generateXYZLayer(URL.vworld)],
      overlays: [overlay],
    });

    setMapView(mapView);
    setOverlay(overlay);
  }, []);

  return { mapView, controller };
};
