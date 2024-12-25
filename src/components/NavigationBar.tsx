'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import ExplorerIcon from '@/assets/icons/explorer.svg';
import ListIcon from '@/assets/icons/list.svg';
import MapIcon from '@/assets/icons/map.svg';
import SettingIcon from '@/assets/icons/setting.svg';

function NavigationBar() {
  const currentPath = usePathname();

  const navigationList = [
    {
      id: 'list',
      icon: ListIcon,
      text: '목록',
      path: '/list',
    },
    {
      id: 'map',
      icon: MapIcon,
      text: '지도',
      path: '/',
    },
    {
      id: 'explorer',
      icon: ExplorerIcon,
      text: '주변',
      path: '/explorer',
    },
    {
      id: 'setting',
      icon: SettingIcon,
      text: '설정',
      path: '/setting',
    },
  ];

  return (
    <nav className='fixed inset-x-0 bottom-0 shadow-300'>
      <ul className='flex justify-center gap-[10px]'>
        {navigationList.map((item) => {
          const isTarget = currentPath === item.path;
          return (
            <li key={item.id}>
              <Link
                href={item.path}
                className={`${isTarget ? 'text-primary' : 'text-gray-500'} flex h-[60px] w-[80px] cursor-pointer flex-col items-center justify-center gap-[2px] text-caption-1 hover:opacity-80 active:opacity-60`}>
                <item.icon
                  className={`${isTarget ? 'fill-primary' : 'fill-gray-500'} `}
                  width={24}
                  height={24}
                />
                {item.text}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default NavigationBar;
