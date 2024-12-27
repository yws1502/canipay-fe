'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { PAGE_PATH } from '@/constants/page';

export default function Home() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    console.log(pathname);

    if (pathname === PAGE_PATH.root) {
      router.replace(PAGE_PATH.map.root);
    }
  }, [pathname]);

  return <div />;
}
