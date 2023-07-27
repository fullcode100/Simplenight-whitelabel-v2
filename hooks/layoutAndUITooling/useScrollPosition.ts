import { useLayoutEffect, useEffect, useState, useCallback } from 'react';

interface IUseDetentionProps {
  y: number;
}

export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const useScrollPosition = (): IUseDetentionProps => {
  const [y, setY] = useState(0);

  const handleScroll = useCallback(
    (scrollY) => {
      if (window.innerWidth > 640) {
        setY(scrollY);
      }
    },
    [y],
  );

  useIsomorphicLayoutEffect(() => {
    handleScroll(window.scrollY);
    if (window.innerWidth > 640) {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (window.innerWidth > 640) {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll]);
  return { y };
};

export default useScrollPosition;
