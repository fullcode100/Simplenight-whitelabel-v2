import React, { useCallback, useEffect } from 'react';
import { Hotel } from 'hotels/types/response/SearchResponse';
import { Flight } from 'flights/types/response/SearchResponse';

const useFilter = (hotels: Hotel[], flights: Flight[], keywordSearch = '') => {
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

  const filterFlights = (array: Flight[]): Flight[] => {
    let filteredFlights = array;
    if (keywordSearch !== '') {
      filteredFlights = filteredFlights.filter(
        (flight: Flight) =>
          flight.details.name
            .toLowerCase()
            .includes((keywordSearch as string).toLowerCase()) ||
          flight.details.description
            .toLowerCase()
            .includes((keywordSearch as string).toLowerCase()) ||
          flight.details.address.address1
            .toLowerCase()
            .includes((keywordSearch as string).toLowerCase()),
      );
    }
    return filteredFlights;
  };

  const memoizedFilterFlights = useCallback(() => {
    return filterFlights(flights);
  }, [keywordSearch, flights]);

  return {
    memoizedFilterHotels,
    memoizedFilterFlights,
  };
};

export default useFilter;
