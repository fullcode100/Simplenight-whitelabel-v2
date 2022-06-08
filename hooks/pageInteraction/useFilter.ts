import React, { useCallback, useEffect } from 'react';
import { Hotel } from 'hotels/types/response/SearchResponse';

const useFilter = (hotels: Hotel[], keywordSearch = '') => {
  const filterHotels = (array: Hotel[]): Hotel[] => {
    let filteredHotels = array;
    if (keywordSearch !== '') {
      filteredHotels = filteredHotels.filter(
        (hotel: Hotel) =>
          hotel.details.name
            .toLowerCase()
            .includes((keywordSearch as string).toLowerCase()) ||
          hotel.details.description
            .toLowerCase()
            .includes((keywordSearch as string).toLowerCase()) ||
          hotel.details.address.address1
            .toLowerCase()
            .includes((keywordSearch as string).toLowerCase()),
      );
    }
    return filteredHotels;
  };

  const memoizedFilterHotels = useCallback(() => {
    return filterHotels(hotels);
  }, [keywordSearch, hotels]);

  return {
    memoizedFilterHotels,
  };
};

export default useFilter;
