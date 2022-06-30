import { formatAsSearchDate } from 'helpers/dajjsUtils';
import useQuery from 'hooks/pageInteraction/useQuery';
import { HotelSearchRequest } from 'hotels/types/request/HotelSearchRequest';
import {
  Hotel,
  HotelSearchResponse,
  MinRate,
  Rate,
} from 'hotels/types/response/SearchResponse';
import React, { ReactNode, useEffect, useState } from 'react';
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
import MapIcon from 'public/icons/assets/map.svg';
import ListIcon from 'public/icons/assets/list.svg';
import classnames from 'classnames';
import useQuerySetter from 'hooks/pageInteraction/useQuerySetter';
import HotelFilterFormDesktop from './HotelFilterFormDesktop';
import PriceDisplay from 'components/global/PriceDisplay/PriceDisplay';
import HotelCancellable from './HotelCancellable';

declare let window: CustomWindow;

interface HotelResultsDisplayProps {
  HotelCategory: CategoryOption;
}

interface ViewButtonProps {
  children: ReactNode;
  viewParam: 'list' | 'map';
}

const HotelResultsDisplay = ({ HotelCategory }: HotelResultsDisplayProps) => {
  const [loaded, setLoaded] = useState(false);
  const { ClientSearcher: Searcher } = HotelCategory.core;
  const [t, i18next] = useTranslation('hotels');
  const hotelsFoundLabel = t('hotelsFound', 'Hotels Found');
  const hotelsFoundLabelDesktop = t('results', 'Results');
  const hotelLabel = t('hotel', 'Hotel');
  const noResultsLabel = t('noResultsSearch', 'No Results Match Your Search.');
  const fromLabel = t('from', 'From');
  const { language } = i18next;
  const router = useRouter();
  const setQueryParams = useQuerySetter();

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
    roomsData,
  } = useQuery();

  const [hotels, setHotels] = useState<Hotel[]>([]);
  // It could be useful
  // const { memoizedFilterHotels } = useFilter(hotels, keywordSearch as string);

  const [currency, setCurrency] = useState<string>(window.currency);
  const storeCurrency = useSelector((state: any) => state.core.currency);

  useEffect(() => {
    if (currency !== storeCurrency) setCurrency(storeCurrency);
  }, [storeCurrency]);

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
      `/detail/hotels/${id}?adults=${adults}&children=${children}&startDate=${startDate}&endDate=${endDate}&geolocation=${latitude},${longitude}&rooms=${rooms}&roomsData=${roomsData}`,
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
        const formattedLocation = `${address?.address1}, ${address?.country_code}, ${address?.postal_code}`;

        const itemKey = hotel.id + index;

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
            priceDisplay={
              <PriceDisplay
                rate={minRate?.rate as Rate}
                totalLabel={fromLabel}
              />
            }
            cancellable={<HotelCancellable minRate={minRate as MinRate} />}
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

  const handleOnViewDetailClick = (hotel: Hotel) => {
    console.log(hotel);
  };

  return (
    <>
      {hotels.length > 0 ? (
        <section className="lg:flex lg:w-full">
          <section className="hidden lg:block lg:min-w-[16rem] lg:max-w[18rem] lg:w-[25%]">
            <HotelFilterFormDesktop />
          </section>
          <section className="lg:flex-1 lg:w-[75%]">
            {isListView && (
              <section className="w-full h-full px-5 pb-6">
                <section className="py-6 text-dark-1000 font-semibold text-[20px] leading-[24px] lg:flex lg:justify-between lg:items-center">
                  <span>
                    {hotels.length}
                    <span className="lg:hidden"> {hotelsFoundLabel}</span>
                    <span className="hidden lg:inline">
                      {' '}
                      {hotelsFoundLabelDesktop}
                    </span>
                  </span>
                  <section className="hidden lg:block">
                    <ViewActions />
                  </section>
                </section>
                <HotelList />
              </section>
            )}
            {!isListView && (
              <section className="relative">
                <section className="hidden lg:block absolute z-[1] right-6 top-6">
                  <ViewActions />
                </section>
                <HotelMapView
                  HotelCategory={HotelCategory}
                  items={hotels}
                  onViewDetailClick={handleOnViewDetailClick}
                />
              </section>
            )}
          </section>
        </section>
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
