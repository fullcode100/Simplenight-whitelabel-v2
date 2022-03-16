import { useAppDispatch } from 'hooks/redux/useAppDispatch';
import { useAppSelector } from 'hooks/redux/useAppSelector';
import { HotelSearchRequest } from 'hotels/types/request/HotelSearchRequest';
import { Hotel } from 'hotels/types/response/SearchResponse';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CategoryOption } from 'types/search/SearchTypeOptions';

interface HotelResultsDisplayProps {
  HotelCategory: CategoryOption;
}

const HotelResultsDisplay = ({ HotelCategory }: HotelResultsDisplayProps) => {
  const { ClientSearcher: Searcher } = HotelCategory.core;
  const [t, i18next] = useTranslation('global');

  const [hotels, setHotels] = useState<Hotel[]>([]);


  useEffect(() => {
    const params: HotelSearchRequest = {
      adults: 2,
      start_date: '2022-09-01',
      end_date: '2022-09-05',
      dst_geolocation: '40.730610,-73.935242',
      rsp_fields: '-rooms',
    };

    Searcher?.request(params, i18next).then(({ data }) => {
      const { hotels: searchedHotels } = data;
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
