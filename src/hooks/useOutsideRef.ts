import { useEffect, useRef } from 'react';

export const useOutsideRef = <T extends HTMLElement>(close: () => void) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const targetNode = event.target as Node;

      if (ref.current && !ref.current.contains(targetNode)) {
        close();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return ref;
};
