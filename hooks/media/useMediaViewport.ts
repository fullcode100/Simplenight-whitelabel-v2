import useMediaQuery from './useMediaQuery';

const useMediaViewport = () => {
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  return { isDesktop };
};

export default useMediaViewport;
