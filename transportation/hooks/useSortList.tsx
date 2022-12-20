import { useMemo, useState } from 'react';
import { Quote } from 'transportation/types/response/TransportationSearchResponse';

export const useSortList = (transportationList: Quote[]) => {
  const [sortBy, setSortBy] = useState('recommended');

  const sortedTransportationList = useMemo(() => {
    return transportationList.sort((quote1, quote2) => {
      if (sortBy === 'sortByPriceDesc') {
        const price1 = quote1.fare.price || 0;
        const price2 = quote2.fare.price || 0;

        if (price1 > price2) {
          return -1;
        } else if (price1 < price2) {
          return 1;
        } else return 0;
      } else {
        const price1 = quote1.fare.price || 0;
        const price2 = quote2.fare.price || 0;

        if (price1 < price2) {
          return -1;
        } else if (price1 > price2) {
          return 1;
        } else return 0;
      }
    });
  }, [sortBy, transportationList]);

  return {
    sortBy,
    setSortBy,
    sortedTransportationList,
  };
};
