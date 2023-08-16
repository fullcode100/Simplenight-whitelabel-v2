import { useEffect, useState, useCallback } from 'react';

const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState('up');

  const updateScrollDirection = useCallback(() => {
    let lastScrollY = window.pageYOffset;
    const scrollY = window.pageYOffset;
    const direction = scrollY > lastScrollY ? 'down' : 'up';
    if (
      direction !== scrollDirection &&
      (scrollY - lastScrollY > 2 || scrollY - lastScrollY < -2)
    ) {
      setScrollDirection(direction);
    }
    lastScrollY = scrollY > 0 ? scrollY : 0;
  }, [scrollDirection]);

  useEffect(() => {
    updateScrollDirection();
    window.addEventListener('scroll', updateScrollDirection); // add event listener
    return () => {
      window.removeEventListener('scroll', updateScrollDirection); // clean up
    };
  }, [scrollDirection]);

  return scrollDirection;
};

export default useScrollDirection;
