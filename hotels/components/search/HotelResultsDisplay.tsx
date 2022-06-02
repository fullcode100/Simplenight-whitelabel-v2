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
import HorizontalItemCard from 'components/global/HorizontalItemCard/HorizontalItemCard';
import { useRouter } from 'next/router';
import HotelMapView from './HotelResultsMapView';
import { itemsProps } from 'components/global/MapView/MapViewTypes';
import EmptyState from '../../../components/global/EmptyState/EmptyState';
import EmptyStateIcon from 'public/icons/assets/empty-state.svg';
import { checkIfAnyNull } from 'helpers/arrayUtils';
import { parseQueryNumber } from 'helpers/stringUtils';
import { StringGeolocation } from 'types/search/Geolocation';
import { useSelector } from 'react-redux';
import { CustomWindow } from 'types/global/CustomWindow';
import Loader from '../../../components/global/Loader/Loader';
import HotelItemRateInfo from './HotelItemRateInfo';

declare let window: CustomWindow;

interface HotelResultsDisplayProps {
  HotelCategory: CategoryOption;
}

const HotelResultsDisplay = ({ HotelCategory }: HotelResultsDisplayProps) => {
  const [loaded, setLoaded] = useState(false);
  const { ClientSearcher: Searcher } = HotelCategory.core;
  const [t, i18next] = useTranslation('hotels');
  const hotelsFoundLabel = t('hotelsFound', 'Hotels Found');
  const hotelLabel = t('hotel', 'Hotel');
  const { language } = i18next;
  const router = useRouter();

  const { adults, children, startDate, endDate, latitude, longitude, rooms } =
    useQuery();

  const [hotels, setHotels] = useState<Hotel[]>([]);

  const [currency, setCurrency] = useState<string>(window.currency);
  const storeCurrency = useSelector((state: any) => state.core.currency);

  useEffect(() => {
    if (currency !== storeCurrency) setCurrency(storeCurrency);
  }, [storeCurrency]);

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

    Searcher?.request(params, i18next)
      .then(({ hotels: searchedHotels }: HotelSearchResponse) => {
        setHotels(searchedHotels);
      })
      .then(() => setLoaded(true));
  }, [
    adults,
    children,
    startDate,
    endDate,
    latitude,
    longitude,
    rooms,
    language,
    currency,
  ]);

  const handleOnViewDetailClick = (hotel: Hotel) => {
    const { id } = hotel;
    router.push(
      `/detail/hotels/${id}?adults=${adults}&children=${children}&startDate=${startDate}&endDate=${endDate}&geolocation=${latitude},${longitude}&rooms=${rooms}`,
    );
  };

  const HotelList = () => (
    <ul role="list" className="space-y-4">
      {hotels.map((hotel, index) => {
        const {
          details: { name, address, star_rating: starRating },
          min_rate_room: minRateRoom,
          thumbnail,
        } = hotel;

        const itemKey = hotel.id + index;
        const minRate = minRateRoom.rates.min_rate;
        const formattedLocation = `${address.address1}, ${address.country_code}, ${address.postal_code}`;

        return (
          <HorizontalItemCard
            key={itemKey}
            icon={HotelCategory.icon}
            categoryName={hotelLabel}
            handleOnViewDetailClick={() => handleOnViewDetailClick(hotel)}
            item={hotel}
            title={name}
            image={thumbnail}
            price={<HotelItemRateInfo minRate={minRate} />}
            address={formattedLocation}
            className=" flex-0-0-auto"
            rating={parseInt(starRating)}
          />
        );
      })}
    </ul>
  );
  const { view = 'list' } = useQuery();
  const isListView = view === 'list';

  if (!loaded) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <>
      {hotels.length > 0 ? (
        <>
          <section className="w-full h-full px-5">
            <section className="py-6 text-dark-1000 font-semibold text-[20px] leading-[24px]">
              {hotels.length} {hotelsFoundLabel}
            </section>
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
