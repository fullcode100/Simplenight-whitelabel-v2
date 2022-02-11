import useQuery from 'hooks/pageInteraction/useQuery';

export const useIsDev = () => {
  const query = useQuery();
  return !!query.dev;
};
