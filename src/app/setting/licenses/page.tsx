'use client';

import Link from 'next/link';
import React from 'react';
import { OSM_LINK, SOFTWARE_LICENSES, TMAP_LINK, VWORLD_LINK } from '@/constants/licenses';

function License() {
  return (
    <>
      <article className='mb-7'>
        <h2 className='mb-2 text-heading-3'>소프트웨어 패키지</h2>
        <ul className='flex flex-col gap-3 text-body-2 text-gray-950'>
          {SOFTWARE_LICENSES.map((software) => {
            return (
              <li key={software.name} className='flex items-center justify-between py-1.5'>
                <span>{software.name}</span>
                <span>({software.license})</span>
              </li>
            );
          })}
        </ul>
      </article>
      <article>
        <h2 className='mb-2 text-heading-3'>지도 및 API</h2>
        <ul className='flex flex-col gap-3 text-body-2 text-gray-950'>
          <li className='py-1.5'>
            지도 데이터 ©
            <Link className='underline hover:text-primary' target='_blank' href={OSM_LINK}>
              OpenStreetMap
            </Link>
            contributors, ODbL 라이선스 적용.
          </li>
          <li className='py-1.5'>
            본 지도는
            <Link className='underline hover:text-primary' target='_blank' href={VWORLD_LINK}>
              VWorld
            </Link>
            에서 제공하는 공공 데이터를 포함하고 있습니다.
          </li>
          <li className='py-1.5'>
            본 서비스는
            <Link className='underline hover:text-primary' target='_blank' href={TMAP_LINK}>
              TMap API
            </Link>
            를 이용하여 지역 검색 기능을 제공합니다.
          </li>
        </ul>
      </article>
    </>
  );
}

export default License;
