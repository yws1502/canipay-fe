import { InfiniteData } from '@tanstack/react-query';

export const findStoreIndex = <T extends { data: any[] }>(
  infiniteStores: InfiniteData<T, unknown>,
  targetId: string
) => {
  for (let i = 0; i < infiniteStores.pages.length; i += 1) {
    const page = infiniteStores.pages[i];

    for (let j = 0; j < page.data.length; j += 1) {
      const store = page.data[j];
      if (store.id === targetId) {
        return { pageIndex: i, storeIndex: j };
      }
    }
  }
  return { pageIndex: null, storeIndex: null };
};
