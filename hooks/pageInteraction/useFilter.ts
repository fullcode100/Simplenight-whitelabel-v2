import React, { useCallback, useEffect } from 'react';
import { Hotel } from 'hotels/types/response/SearchResponse';
import { Flight } from 'flights/types/response/SearchResponse';
import { Car } from 'cars/types/response/SearchResponse';

const useFilter = (
  hotels: Hotel[],
  flights: Flight[],
  cars: Car[],
  keywordSearch = '',
) => {
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
    const filteredFlights = array;
    /*
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
    */
    return filteredFlights;
  };

  const filterCars = (array: Car[]): Car[] => {
    const filteredCars = array;
    /*
    if (keywordSearch !== '') {
      filteredCars = filteredCars.filter(
        (car: Car) =>
          car.details.name
            .toLowerCase()
            .includes((keywordSearch as string).toLowerCase()) ||
          car.details.description
            .toLowerCase()
            .includes((keywordSearch as string).toLowerCase()) ||
          car.details.address.address1
            .toLowerCase()
            .includes((keywordSearch as string).toLowerCase()),
      );
    }
    */
    return filteredCars;
  };

  const memoizedFilterFlights = useCallback(() => {
    return filterFlights(flights);
  }, [keywordSearch, flights]);

  const memoizedFilterCars = useCallback(() => {
    return filterCars(cars);
  }, [keywordSearch, cars]);

  return {
    memoizedFilterHotels,
    memoizedFilterFlights,
    memoizedFilterCars,
  };
};

export default useFilter;
