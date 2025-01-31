'use client';

import React, { ReactNode, createContext, useContext, useMemo, useState } from 'react';
import { EXCEPTION_MESSAGE } from '@/constants/error';
import { MapController } from '@/types/openlayers';

interface MapControllerContextType {
  mapController: MapController | undefined;
  setMapController: (controller: MapController) => void;
}

const MapControllerContext = createContext<MapControllerContextType | undefined>(undefined);

interface MapControllerProviderProps {
  children: ReactNode;
}

function MapControllerProvider({ children }: MapControllerProviderProps) {
  const [controller, setController] = useState<MapController | undefined>(undefined);

  const mapControllerMemoization = useMemo(() => {
    return {
      mapController: controller,
      setMapController: (controller: MapController) => {
        setController(controller);
      },
    };
  }, [controller]);

  return (
    <MapControllerContext.Provider value={mapControllerMemoization}>
      {children}
    </MapControllerContext.Provider>
  );
}

export const useMapController = () => {
  const mapControllerContext = useContext(MapControllerContext);
  if (!mapControllerContext) throw new Error(EXCEPTION_MESSAGE.useMapControllerException);

  return mapControllerContext;
};

export default MapControllerProvider;
