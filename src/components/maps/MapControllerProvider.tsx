'use client';

import React, { ReactNode, createContext, useCallback, useState } from 'react';
import { MapController } from '@/types/openlayers';

export const MapControllerContext = createContext<MapController | null>(null);
export const SetMapControllerContext = createContext<(controller: MapController) => void>(() => {});

interface MapControllerProviderProps {
  children: ReactNode;
}

function MapControllerProvider({ children }: MapControllerProviderProps) {
  const [controller, setController] = useState<MapController | null>(null);

  const setMapController = useCallback(
    (controller: MapController) => {
      setController(controller);
    },
    [controller]
  );

  return (
    <MapControllerContext.Provider value={controller}>
      <SetMapControllerContext.Provider value={setMapController}>
        {children}
      </SetMapControllerContext.Provider>
    </MapControllerContext.Provider>
  );
}

export default MapControllerProvider;
