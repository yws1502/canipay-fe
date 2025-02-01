'use client';

import React from 'react';
import IconTextToggle from '../common/toggles/IconTextToggle';
import { useMapController } from '../contexts/MapControllerProvider';

function MarkerToggleList() {
  const { mapController } = useMapController();

  const handleToggle = (toggle: boolean, name?: string) => {
    if (!mapController) return;

    if (name) {
      mapController.toggleVisibleLayer(toggle, name);
    } else {
      // toggle all layers
      mapController.toggleVisibleLayer(toggle);
    }
  };

  return (
    <ul className='absolute left-[16px] top-[60px] z-20 flex gap-2 sm:left-[unset] sm:right-[16px] sm:top-[16px]'>
      <li>
        <IconTextToggle
          id='all-visible-toggle'
          theme='check'
          defaultToggle
          onChange={(toggle) => handleToggle(toggle)}
        >
          마커
        </IconTextToggle>
      </li>
      <li>
        <IconTextToggle
          id='available-visible-toggle'
          theme='blue'
          defaultToggle
          onChange={(toggle) => handleToggle(toggle, 'available')}
        >
          결제 가능
        </IconTextToggle>
      </li>
      <li>
        <IconTextToggle
          id='unavailable-visible-toggle'
          theme='red'
          defaultToggle
          onChange={(toggle) => handleToggle(toggle, 'unavailable')}
        >
          결제 불가능
        </IconTextToggle>
      </li>
    </ul>
  );
}

export default MarkerToggleList;
