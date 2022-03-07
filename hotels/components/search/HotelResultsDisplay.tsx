import { useAppDispatch } from 'hooks/redux/useAppDispatch';
import { useAppSelector } from 'hooks/redux/useAppSelector';
import { HotelSearchRequest } from 'hotels/types/request/HotelSearchRequest';
import { Hotel } from 'hotels/types/response/SearchResponse';
import React, { useEffect, useState } from 'react';
import { CategoryOption } from 'types/search/SearchTypeOptions';

interface HotelResultsDisplayProps {
  HotelCategory: CategoryOption;
}

const HotelResultsDisplay = ({ HotelCategory }: HotelResultsDisplayProps) => {
  const dispatch = useAppDispatch();
  const { ClientSearcher: Searcher } = HotelCategory.core;
  const { store } = HotelCategory;
  const { actions } = store;
  const { search: searchHotels } = actions;

  const [hotels, setHotels] = useState<Hotel[]>([]);

  // const hotels = useAppSelector((state) => state.hotels.hotels);

  useEffect(() => {
    const params: HotelSearchRequest = {
      adults: 2,
      start_date: '2022-09-01',
      end_date: '2022-09-05',
      dst_geolocation: '40.730610,-73.935242',
      rsp_fields: '-rooms',
    };
    // dispatch(searchHotels(params));

    Searcher?.search(params).then(({ hotels: searchedHotels }) => {
      setHotels(searchedHotels);
    });
  }, []);

  const handleOnViewDetailClick = (hotel: Hotel) => {
    console.log(hotel);
  };

  return (
    <section className="w-full h-full">
      {hotels.map((hotel: Hotel) => (
        <span onClick={() => handleOnViewDetailClick(hotel)} key={hotel.id}>
          {hotel.name}
        </span>
      ))}
    </section>
  );
};

export default HotelResultsDisplay;
