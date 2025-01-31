import { EXCEPTION_MESSAGE } from '@/constants/error';
import { LOCAL_STORAGE_KEYS } from '@/constants/localStorage';
import { DEFAULT_FONT_SIZE } from '@/constants/preferences';

export const localStorageHelper = () => {
  const get = (key: keyof typeof LOCAL_STORAGE_KEYS) => {
    switch (key) {
      case 'fontSize':
        // FIXME: [수정 필요] Server Side에서 해당 함수가 실행되어 에러 발생 -> 서비스 사용에는 문제 없음.
        return localStorage.getItem(key) ?? DEFAULT_FONT_SIZE;
      default:
        return '';
    }
  };

  const set = (key: keyof typeof LOCAL_STORAGE_KEYS, value: string) => {
    switch (key) {
      case 'fontSize':
        try {
          localStorage.setItem(key, value);
        } catch {
          throw new Error(EXCEPTION_MESSAGE.setLocalStorage);
        }
        break;
      default:
        throw new Error(EXCEPTION_MESSAGE.localStorageKeyNotSet);
    }
  };

  return { get, set };
};
