import useQuerySetter from 'hooks/pageInteraction/useQuerySetter';
import { useRouter } from 'next/router';

export const useFilterDining = () => {
  const router = useRouter();
  const setQueryParams = useQuerySetter();
  const priceFilterArray =
    typeof router.query?.price === 'string'
      ? router?.query?.price?.split(',')
      : ['1', '4'];

  const minPrice = priceFilterArray[0];
  const maxPrice = priceFilterArray[priceFilterArray.length - 1];

  const clearFilters = () => {
    setQueryParams({
      price: '',
    });
  };

  const generateQuery = (minString: string, maxString: string) => {
    const min = minString ? Number(minString) : 1;
    const max = minString ? Number(maxString) : 4;
    return Array.from({ length: max - min + 1 }, (_, i) => i + min).join(',');
  };

  const changePrice = (min = minPrice, max = maxPrice) => {
    setQueryParams({
      price: generateQuery(min, max),
    });
  };

  return { clearFilters, changePrice, minPrice, maxPrice };
};
