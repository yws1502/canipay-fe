import { useEffect, useRef, useState } from 'react';

export const useDelayLoading = (delay: number, ...loadings: boolean[]) => {
  const [isLoading, setIsLoading] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (loadings.some((loading) => loading)) {
      timeoutRef.current = setTimeout(() => {
        setIsLoading(true);
      }, delay);
    } else {
      setIsLoading(false);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }
  }, loadings);

  return isLoading;
};
