import { useEffect, useState } from 'react';

export const useIntersectionObserver = <T extends HTMLElement>(rootMargin = '0px') => {
  const [intersecting, setIntersecting] = useState(false);

  const [observerElement, setObserverElement] = useState<T | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      { rootMargin }
    );

    if (observerElement) observer.observe(observerElement);

    return () => {
      if (observerElement) observer.unobserve(observerElement);
    };
  }, [observerElement]);

  return { intersecting, registerObserver: setObserverElement };
};
