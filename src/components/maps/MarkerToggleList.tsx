'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';
import IconTextToggle from '../common/toggles/IconTextToggle';
import { useAsideToggle } from '../contexts/AsideToggleProvider';
import { useMapController } from '../contexts/MapControllerProvider';

function MarkerToggleList() {
  const { mapController } = useMapController();
  const { asideToggle } = useAsideToggle();

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
    <ul
      className={twMerge(
        'absolute left-[16px] top-[60px] z-20 flex gap-2 duration-500 md:left-[366px] md:top-[16px]',
        !asideToggle && 'md:-translate-x-[350px]'
      )}
    >
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
