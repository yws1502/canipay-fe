'use client';

import React, { ReactNode, createContext, useContext, useLayoutEffect, useState } from 'react';
import { EXCEPTION_MESSAGE } from '@/constants/error';
import { localStorageHelper } from '@/utils/localStorage';

interface FontSizeContextType {
  fontSize: string;
  changeFontSize: (fontSize: string) => void;
}

// TODO: 다크테마 구현 예정
const FontSizeContext = createContext<FontSizeContextType | undefined>(undefined);

interface PreferencesProviderProps {
  children: ReactNode;
}

const storageHelper = localStorageHelper();
function PreferencesProvider({ children }: PreferencesProviderProps) {
  const [fontSize, setFontSize] = useState<string>(storageHelper.get('fontSize'));

  useLayoutEffect(() => {
    storageHelper.set('fontSize', fontSize);
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, [fontSize]);

  return (
    <FontSizeContext.Provider
      value={{
        fontSize,
        changeFontSize: (value) => setFontSize(value),
      }}
    >
      {children}
    </FontSizeContext.Provider>
  );
}

export const usePreferences = () => {
  const fontSizeContext = useContext(FontSizeContext);
  if (!fontSizeContext) throw new Error(EXCEPTION_MESSAGE.usePreferencesHookException);

  return { ...fontSizeContext };
};

export default PreferencesProvider;
