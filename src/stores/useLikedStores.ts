import dayjs from 'dayjs';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LikedStoreItem {
  id: string;
  date: string;
}

interface LikedStore {
  likedStores: LikedStoreItem[];
  exists: (storeId: string) => boolean;
  push: (storeId: string) => void;
  remove: (storeId: string) => void;
  dailyUpdate: () => void;
}

export const useLikedStores = create<LikedStore>()(
  persist(
    (set, get) => ({
      likedStores: [],

      exists: (storeId: string) => {
        const { likedStores } = get();
        return !!likedStores.find((store) => store.id === storeId);
      },

      push: (storeId: string) => {
        set(({ likedStores }) => {
          if (likedStores.find((store) => store.id === storeId)) return { likedStores };
          const today = dayjs().format('YYYY-MM-DD');

          likedStores.push({ id: storeId, date: today });
          return { likedStores };
        });
      },

      remove: (storeId: string) => {
        set(({ likedStores }) => {
          return {
            likedStores: likedStores.filter((store) => store.id !== storeId),
          };
        });
      },

      // NOTE: 당일이 아닌 좋아요 기록 제거 메소드
      dailyUpdate: () => {
        set(({ likedStores }) => {
          const today = dayjs().format('YYYY-MM-DD');

          return {
            likedStores: likedStores.filter((store) => store.date === today),
          };
        });
      },
    }),
    {
      name: 'likedStores',
    }
  )
);
