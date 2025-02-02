'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React from 'react';
import ExplorerIcon from '@/assets/icons/explorer.svg';
import ListIcon from '@/assets/icons/list.svg';
import LogoIcon from '@/assets/icons/logo.svg';
import MapIcon from '@/assets/icons/map.svg';
import SettingIcon from '@/assets/icons/setting.svg';
import { PAGE_PATH } from '@/constants/page';
import { useAsideToggle } from './contexts/AsideToggleProvider';

function NavigationBar() {
  const currentPath = usePathname();
  const searchParams = useSearchParams();
  const { asideToggle, setAsideToggle } = useAsideToggle();

  const navigationList = [
    {
      id: 'list',
      icon: ListIcon,
      text: '목록',
      path: PAGE_PATH.storeList,
    },
    {
      id: 'map',
      icon: MapIcon,
      text: '지도',
      path: PAGE_PATH.root,
    },
    {
      id: 'explorer',
      icon: ExplorerIcon,
      text: '주변',
      path: PAGE_PATH.explorer,
    },
    {
      id: 'setting',
      icon: SettingIcon,
      text: '설정',
      path: PAGE_PATH.setting,
    },
  ];

  return (
    <nav className='z-10 bg-white shadow-300'>
      <ul className='flex justify-center gap-[10px] md:flex-col'>
        <li className='hidden select-none border border-solid border-transparent border-b-gray-200 md:block'>
          <Link
            href={{
              pathname: undefined,
              query: searchParams.toString(),
            }}
            className='flex h-[60px] w-[80px] cursor-pointer flex-col items-center justify-center gap-[2px] text-caption-1 hover:opacity-80 active:opacity-60 md:w-[60px]'
            scroll={false}
            onClick={() => setAsideToggle(!asideToggle)}
          >
            <LogoIcon />
          </Link>
        </li>
        {navigationList.map((item, index) => {
          const isTarget = currentPath === item.path;
          return (
            <li key={item.id} className={`${index === 0 ? 'md:hidden' : ''} select-none`}>
              <Link
                href={item.path}
                className={`${isTarget ? 'text-primary' : 'text-gray-500'} flex h-[60px] w-[80px] cursor-pointer flex-col items-center justify-center gap-[2px] text-caption-1 hover:opacity-80 active:opacity-60 md:w-[60px]`}
                scroll={false}
              >
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
