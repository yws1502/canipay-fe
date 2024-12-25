import Link from 'next/link';
import React from 'react';
import { MAP_CONTRIBUTORS } from '@/constants/mapContributors';

function MapContributors() {
  return (
    <div className='absolute bottom-0 right-0 z-10 flex gap-1 rounded-tl-md bg-[#ffffffbf] px-1.5 py-0.5 text-caption-2'>
      ©
      <ul className='flex gap-1'>
        {MAP_CONTRIBUTORS.map((contributor) => {
          return (
            <li key={contributor.title}>
              <Link href={contributor.link} target='_blank' className='text-gray-500'>
                {contributor.title}
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
