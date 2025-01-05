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
