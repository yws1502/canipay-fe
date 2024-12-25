import { View } from 'ol';
import { defaults as defaultControls } from 'ol/control';
import { altKeyOnly } from 'ol/events/condition';
import { DragPan, DragRotate, defaults as defaultInteraction } from 'ol/interaction';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat } from 'ol/proj';
import { OSM } from 'ol/source';

export const generateView = ({ lon, lat, zoom }: { lon: number; lat: number; zoom: number }) => {
  return new View({ center: fromLonLat([lon, lat]), zoom });
};

export const generateOSMLayer = () => {
  return new TileLayer({
    source: new OSM(),
  });
};

export const generateControls = () => {
  return defaultControls({ zoom: false });
};

export const generateInteraction = () => {
  return defaultInteraction({
    dragPan: false,
    altShiftDragRotate: false,
  }).extend([new DragPan({}), new DragRotate({ condition: altKeyOnly })]);
};
