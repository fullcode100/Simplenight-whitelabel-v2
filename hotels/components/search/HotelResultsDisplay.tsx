import dayjs from 'dayjs';
import { formatAsSearchDate } from 'helpers/dajjsUtils';
import useQuery from 'hooks/pageInteraction/useQuery';
import { HotelSearchRequest } from 'hotels/types/request/HotelSearchRequest';
import { Hotel } from 'hotels/types/response/SearchResponse';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import LocationPin from 'public/icons/assets/location-pin.svg';
import { add } from 'lodash';
import Image from 'next/image';
import SectionTitle from 'components/global/SectionTitle/SectionTitle';
import { Amount } from 'types/global/Amount';

import hotels from 'hotels/hotelMock';
import ItemCard from 'components/global/ItemCard/ItemCard';
import HorizontalItemCard from 'components/global/HorizontalItemCard/HorizontalItemCard';

const addressMock = {
  coordinates: {
    latitude: 40.75635,
    longitude: -73.98001,
    radius: 15,
    unit: 'mi',
  },
  country_code: '',
  country: 'USA',
  state: 'Chicago',
  city: '',
  zone: '',
  district: '',
  address1: '11 E. Watson',
  address2: '',
  postal_code: '',
};

const Divider = () => (
  <div className="h-[1px] w-[140%] bg-dark-200 absolute left-0 mt-4" />
);

interface HotelResultsDisplayProps {
  HotelCategory: CategoryOption;
}

const HotelResultsDisplay = ({ HotelCategory }: HotelResultsDisplayProps) => {
  const { ClientSearcher: Searcher } = HotelCategory.core;
  const [t, i18next] = useTranslation('hotels');
  const pickForYouLabel = t('pickForYou', 'Our pick for you');
  const totalLabel = t('total', 'Total');
  const fromLabel = t('from', 'from');

  const { adults, children, startDate, endDate, geolocation } = useQuery();

  // const [hotels, setHotels] = useState<Hotel[]>([]);

  useEffect(() => {
    // const hasEmptyValues = checkIfAnyNull([
    //   adults,
    //   children,
    //   startDate,
    //   endDate,
    //   geolocation,
    // ]);
    // if (hasEmptyValues) return;
    // const params: HotelSearchRequest = {
    //   adults: parseQueryNumber(adults ?? ''),
    //   start_date: formatAsSearchDate(startDate as unknown as string),
    //   end_date: formatAsSearchDate(endDate as unknown as string),
    //   dst_geolocation: geolocation as unknown as StringGeolocation,
    //   rsp_fields: '-rooms',
    // };
    // const params: HotelSearchRequest = {
    //   adults: 2,
    //   start_date: formatAsSearchDate(dayjs().add(15, 'day')),
    //   end_date: formatAsSearchDate(dayjs().add(17, 'day')),
    //   dst_geolocation: '36.1699412,-115.1398296',
    //   rsp_fields: '-rooms',
    // };
    // Searcher?.request(params, i18next).then(({ data }) => {
    //   const { hotels: searchedHotels } = data;
    //   setHotels(searchedHotels);
    // });
  }, [adults, children, startDate, endDate, geolocation]);

  const handleOnViewDetailClick = (hotel: Hotel) => {
    console.log(hotel);
  };

  const PriceSection = ({ amountMin }: { amountMin: Amount }) => (
    <footer className="mt-8 flex justify-between items-center">
      <section>
        <span className="font-lato font-semibold text-base">{totalLabel}</span>
      </section>
      <section className="grid grid-cols-2 items-center">
        <span className="pl-4 font-lato text-base">{fromLabel}</span>
        <span className="font-lato font-semibold text-base">
          {amountMin.formatted}
        </span>
      </section>
    </footer>
  );

  const AddressSection = ({ hotel }: { hotel: Hotel }) => (
    <section className="font-lato font-normal text-base mt-5">
      <span>{hotel.details.address.address1}</span>
    </section>
  );

  const TitleSection = ({ name }: { name: string }) => (
    <header className="flex justify-between items-center mt-[50%]">
      <span className="h5">{name}</span>
      <LocationPin className="text-primary-1000" />
    </header>
  );

  const HotelList = () => (
    <ul role="list" className="space-y-4">
      {hotels.map((hotel, index) => {
        const {
          id,
          details: { name, address, star_rating: starRating },
          amount_min: amountMin,
          thumbnail,
        } = hotel;

        const itemKey = hotel.id + index;

        return (
          <HorizontalItemCard
            key={itemKey}
            handleOnViewDetailClick={() => console.log(hotel)}
            item={hotel}
            title={name}
            image={thumbnail}
            price={amountMin}
            extraInformation={{ address }}
            className=" flex-0-0-auto"
            rating={starRating}
          />
        );
      })}
    </ul>
  );

  return (
    <section className="w-full h-full px-4 pt-28">
      <SectionTitle label={pickForYouLabel} />
      <HotelList />
    </section>
  );
};

export default HotelResultsDisplay;
