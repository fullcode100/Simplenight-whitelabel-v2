import dayjs from 'dayjs';
import { formatAsSearchDate } from 'helpers/dajjsUtils';
import useQuery from 'hooks/pageInteraction/useQuery';
import { HotelSearchRequest } from 'hotels/types/request/HotelSearchRequest';
import {
  Hotel,
  HotelSearchResponse,
} from 'hotels/types/response/SearchResponse';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import LocationPin from 'public/icons/assets/location-pin.svg';
import { add } from 'lodash';
import Image from 'next/image';
import { Amount } from 'types/global/Amount';

import ItemCard from 'components/global/ItemCard/ItemCard';
import HorizontalItemCard from 'components/global/HorizontalItemCard/HorizontalItemCard';
import { useRouter } from 'next/router';
import HotelMapView from './HotelResultsMapView';
import { itemsProps } from 'components/global/MapView/MapViewTypes';
import EmptyState from '../../../components/global/EmptyState/EmptyState';
import EmptyStateIcon from 'public/icons/assets/empty-state.svg';
import { checkIfAnyNull } from 'helpers/arrayUtils';
import { parseQueryNumber } from 'helpers/stringUtils';
import { StringGeolocation } from 'types/search/Geolocation';

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

  const router = useRouter();

  const { adults, children, startDate, endDate, latitude, longitude, rooms } =
    useQuery();

  const [hotels, setHotels] = useState<Hotel[]>([]);

  useEffect(() => {
    const hasEmptyValues = checkIfAnyNull([
      rooms,
      adults,
      children,
      startDate,
      endDate,
      latitude,
      longitude,
    ]);
    if (hasEmptyValues) return;

    const geolocation = `${latitude},${longitude}`;

    const params: HotelSearchRequest = {
      rooms: parseQueryNumber(rooms ?? ''),
      adults: parseQueryNumber(adults ?? ''),
      children: parseQueryNumber(children ?? ''),
      start_date: formatAsSearchDate(startDate as unknown as string),
      end_date: formatAsSearchDate(endDate as unknown as string),
      dst_geolocation: geolocation as unknown as StringGeolocation,
      rsp_fields_set: 'basic',
    };
    // const params: HotelSearchRequest = {
    //   rooms: 1,
    //   adults: 2,
    //   children: 0,
    //   start_date: formatAsSearchDate(dayjs().add(15, 'day')),
    //   end_date: formatAsSearchDate(dayjs().add(17, 'day')),
    //   dst_geolocation: '36.1699412,-115.1398296',
    //   rsp_fields_set: 'basic',
    // };
    Searcher?.request(params, i18next).then(
      ({ hotels: searchedHotels }: HotelSearchResponse) => {
        setHotels(searchedHotels);
      },
    );
  }, [adults, children, startDate, endDate, latitude, longitude, rooms]);

  const handleOnViewDetailClick = (hotel: Hotel) => {
    const { id } = hotel;
    router.push(
      `/detail/hotels/${id}?adults=${adults}&children=${children}&startDate=${startDate}&endDate=${endDate}&geolocation=${latitude},${longitude}&rooms=${rooms}`,
    );
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
            handleOnViewDetailClick={() => handleOnViewDetailClick(hotel)}
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
  const { view = 'list' } = useQuery();
  const isListView = view === 'list';
  return (
    <>
      {hotels.length > 0 ? (
        <>
          <section className="w-full h-full px-4">
            {isListView && <HotelList />}
          </section>
          {!isListView && (
            <HotelMapView items={hotels as any as itemsProps[]} />
          )}
        </>
      ) : (
        <EmptyState
          text="No Results Match Your Search."
          image={<EmptyStateIcon className="mx-auto" />}
        />
      )}
    </>
  );
};

export default HotelResultsDisplay;
