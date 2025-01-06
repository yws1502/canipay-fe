import { Feature, Overlay, View } from 'ol';
import { defaults as defaultControls } from 'ol/control';
import { altKeyOnly, pointerMove } from 'ol/events/condition';
import { Point } from 'ol/geom';
import { DragRotate, Select, defaults as defaultInteraction } from 'ol/interaction';
import { SelectEvent } from 'ol/interaction/Select';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { fromLonLat } from 'ol/proj';
import { OSM, Vector as VectorSource, XYZ } from 'ol/source';
import { Icon, Style } from 'ol/style';
import { EXCEPTION_MESSAGE } from '@/constants/error';
import { MarkerData, PointFeature } from '@/types/openlayers';

export const generateView = ({ lon, lat, zoom }: { lon: number; lat: number; zoom: number }) => {
  return new View({ center: fromLonLat([lon, lat]), zoom });
};

export const generateOSMLayer = () => {
  return new TileLayer({
    source: new OSM(),
  });
};

export const generateXYZLayer = (url: string) => {
  return new TileLayer({
    source: new XYZ({ url }),
  });
};

export const generateControls = () => {
  return defaultControls({ zoom: false, attribution: false });
};

export const generatePointFeature = ({ id, coordinate, properties }: PointFeature) => {
  const feature = new Feature({
    id,
    geometry: new Point(fromLonLat(coordinate)),
  });

  if (properties) feature.setProperties(properties);

  return feature;
};

export const generateMarker = ({ name, theme, pointFeatureList }: MarkerData) => {
  const arg = {
    name,
    source: new VectorSource({
      features: pointFeatureList.map(generatePointFeature),
    }),
    style: new Style({
      image: new Icon({
        src: `/icons/circle-${theme}-on.svg`,
        scale: 1,
      }),
    }),
  };

  return new VectorLayer(arg);
};

const generateMarkerInteraction = () => {
  const interaction = new Select({
    condition: pointerMove,
  });

  const handleSelect = ({ selected }: SelectEvent) => {
    document.body.style.cursor = selected.length ? 'pointer' : '';
  };

  interaction.on('select', handleSelect);

  const removeInteraction = () => {
    interaction.un('select', handleSelect);
  };

  return { interaction, removeInteraction };
};

export const generateInteraction = () => {
  const { interaction } = generateMarkerInteraction();

  return defaultInteraction({
    altShiftDragRotate: false,
    doubleClickZoom: false,
  }).extend([new DragRotate({ condition: altKeyOnly }), interaction]);
};

export const generateOverlay = (domID: string) => {
  const element = document.getElementById(domID);
  if (!element) throw new Error(EXCEPTION_MESSAGE.documentIdNotSet(domID));

  return new Overlay({
    element,
    autoPan: true,
  });
};
