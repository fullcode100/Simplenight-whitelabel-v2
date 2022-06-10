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
import useFilter from 'hooks/pageInteraction/useFilter';
import { sortByAdapter } from 'hotels/adapters/sort-by.adapter';
import { cancellationTypeAdapter } from 'hotels/adapters/cancellation-type.adapter';

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
  const noResultsLabel = t('noResultsSearch', 'No Results Match Your Search.');
  const { language } = i18next;
  const router = useRouter();

  const {
    adults,
    children,
    startDate,
    endDate,
    latitude,
    longitude,
    rooms,
    keywordSearch,
    sortBy,
    paymentTypes,
    starRating,
    minPrice,
    maxPrice,
  } = useQuery();

  const [hotels, setHotels] = useState<Hotel[]>([]);
  // It could be useful
  // const { memoizedFilterHotels } = useFilter(hotels, keywordSearch as string);

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
      sort: sortByAdapter(sortBy as unknown as string),
      cancellation_type: cancellationTypeAdapter(
        paymentTypes as unknown as string,
      ),
      star_rating: starRating as string,
      min_price: minPrice as string,
      max_price: maxPrice as string,
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
    sortBy,
    starRating,
    minPrice,
    maxPrice,
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
          {isListView && (
            <section className="w-full h-full px-5 pb-6">
              <section className="py-6 text-dark-1000 font-semibold text-[20px] leading-[24px]">
                {hotels.length} {hotelsFoundLabel}
              </section>
              <HotelList />
            </section>
          )}
          {!isListView && (
            <HotelMapView
              HotelCategory={HotelCategory}
              items={hotels}
              onViewDetailClick={handleOnViewDetailClick}
            />
          )}
        </>
      ) : (
        <EmptyState
          text={noResultsLabel}
          image={<EmptyStateIcon className="mx-auto" />}
        />
      )}
    </>
  );
};

export default HotelResultsDisplay;
