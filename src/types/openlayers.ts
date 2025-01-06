import { MapBrowserEvent } from 'ol';
import { FeatureLike } from 'ol/Feature';
import { Coordinate } from 'ol/coordinate';

export interface PointFeature {
  id: string;
  coordinate: Coordinate;
  properties?: any;
}

export type MarkerTheme = 'blue' | 'red' | 'gray';

export interface MarkerData {
  name: string;
  theme: MarkerTheme;
  pointFeatureList: PointFeature[];
}

export interface MapController {
  addMarkerLayer: (markerData: MarkerData) => void;
  addMarkerClickEvent: (
    onClickMarker: (event: MapBrowserEvent<any>, features: FeatureLike[]) => void
  ) => () => void;
  removeLayer: (name: string) => void;
  setOverlayLocation: (coordinate: Coordinate, shouldTransformed?: boolean) => void;
  setCenter: (coordinate: Coordinate, shouldTransformed?: boolean, duration?: number) => void;
}
