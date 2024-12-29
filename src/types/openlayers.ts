import { Coordinate } from 'ol/coordinate';

export type OlProperties = { [x: string]: any };

export interface PointFeature<T extends OlProperties> {
  id: string;
  coordinate: Coordinate;
  properties?: T;
}

export type MarkerTheme = 'blue' | 'red' | 'gray';

export interface MarkerData<T extends OlProperties> {
  name: string;
  theme: MarkerTheme;
  pointFeatureList: PointFeature<T>[];
}
