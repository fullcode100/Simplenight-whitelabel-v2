import { useMemo, useState } from 'react';
import { TransportationItem } from 'transportation/types/response/TransportationSearchResponse';

export const useSortList = (transportationList: TransportationItem[]) => {
  const [sortBy, setSortBy] = useState('recommended');

  const sortedTransportationList = useMemo(() => {
    return transportationList.sort((quote1, quote2) => {
      const price1 = quote1.rate?.total?.full?.amount || 0;
      const price2 = quote2.rate?.total?.full?.amount || 0;
      if (sortBy === 'sortByPriceDesc') {
        if (price1 > price2) {
          return -1;
        } else if (price1 < price2) {
          return 1;
        } else return 0;
      }

      if (price1 < price2) {
        return -1;
      } else if (price1 > price2) {
        return 1;
      } else return 0;
    });
  }, [sortBy, transportationList]);

  return {
    sortBy,
    setSortBy,
    sortedTransportationList,
  };
};
