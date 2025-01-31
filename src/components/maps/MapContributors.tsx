import Link from 'next/link';
import React from 'react';
import { LICENSES } from '@/constants/licenses';

function MapContributors() {
  return (
    <div className='absolute bottom-0 right-0 z-10 flex gap-1 rounded-tl-md bg-[#ffffffbf] px-1.5 py-0.5 text-caption-2'>
      ©
      <ul className='flex gap-1'>
        {LICENSES.map((license) => {
          return (
            <li key={license.title}>
              <Link href={license.link} target='_blank' className='text-gray-500'>
                {license.title}
              </Link>
            </li>
          );
        })}
      </ul>
      contributes.
    </div>
  );
}

export default MapContributors;
