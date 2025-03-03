'use client';

import React, { ReactNode, createContext, useContext, useMemo, useState } from 'react';
import { EXCEPTION_MESSAGE } from '@/constants/error';

interface AsideToggleContextType {
  asideToggle: boolean;
  setAsideToggle: (toggle: boolean) => void;
}

const AsideToggleContext = createContext<AsideToggleContextType | undefined>(undefined);

interface AsideToggleProviderProps {
  children: ReactNode;
}

function AsideToggleProvider({ children }: AsideToggleProviderProps) {
  const [toggle, setToggle] = useState(true);

  const asideToggleMemoization = useMemo(() => {
    return {
      asideToggle: toggle,
      setAsideToggle: (toggle: boolean) => setToggle(toggle),
    };
  }, [toggle]);

  return (
    <AsideToggleContext.Provider value={asideToggleMemoization}>
      {children}
    </AsideToggleContext.Provider>
  );
}

export const useAsideToggle = () => {
  const asideToggleContext = useContext(AsideToggleContext);
  if (!asideToggleContext)
    throw new Error(EXCEPTION_MESSAGE.hookException('useAsideToggle', 'AsideToggleProvider'));

  return asideToggleContext;
};

export default AsideToggleProvider;
