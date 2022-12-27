import { formatAsSearchDate } from 'helpers/dajjsUtils';
import useQuery from 'hooks/pageInteraction/useQuery';
import { HotelSearchRequest } from 'hotels/types/request/HotelSearchRequest';
import { Hotel, MinRate } from 'hotels/types/response/SearchResponse';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import HorizontalItemCard from 'components/global/HorizontalItemCard/HorizontalItemCard';

import HotelMapView from './HotelResultsMapView';
import EmptyState from '../../../components/global/EmptyState/EmptyState';
import EmptyStateIcon from 'public/icons/assets/empty-state.svg';
import { checkIfAnyNull } from 'helpers/arrayUtils';
import { getChildrenAges, parseQueryNumber } from 'helpers/stringUtils';
import { StringGeolocation } from 'types/search/Geolocation';
import { useSelector, useDispatch } from 'react-redux';
import { createRoom } from 'hotels/helpers/room';
import HotelItemRateInfo from './HotelItemRateInfo';
import { sortByAdapter } from 'hotels/adapters/sort-by.adapter';
import { cancellationTypeAdapter } from 'hotels/adapters/cancellation-type.adapter';

import HotelFilterFormDesktop from './HotelFilterFormDesktop';
import PriceDisplay from 'hotels/components/PriceDisplay/PriceDisplay';
import HotelCancellable from './HotelCancellable';
import HorizontalSkeletonCard from 'components/global/HorizontalItemCard/HorizontalSkeletonCard';
import HorizontalSkeletonList from 'components/global/HorizontalItemCard/HorizontalSkeletonList';
import { propertyTypesAdapter } from 'hotels/adapters/property-type.adapter';
import { hotelsSetInitialState } from 'hotels/redux/actions';
import { useFilterHotels } from '../../hooks/useFilterHotels';
import { ViewActions } from './ViewActions';
import { DropdownRadio } from 'components/global/DropdownRadio';
import { ListMapMobileBottomTabs } from 'components/global/SearchViewSelector/ListMapMobileBottomTabs';
import { useWindowSize } from 'hotels/hooks/useWinoowsResize';

interface HotelResultsDisplayProps {
  HotelCategory: CategoryOption;
}

export type availableFilters =
  | 'minPrice'
  | 'maxPrice'
  | 'minRating'
  | 'maxRating'
  | 'freeCancelation'
  | 'ratingLowFirst'
  | 'ratingHighFirst'
  | 'priceLowFirst'
  | 'priceHighFirst'
  | 'showAll'
  | 'propertyHotel'
  | 'propertyRental'
  | 'propertyHotel&Rental'
  | 'propertyAll'
  | 'hotelName';

export type sortByFilters =
  | 'Price (Lowest First)'
  | 'Price (Highest First)'
  | 'Rating (Highest First)'
  | 'Rating (Lowest First)';

const priceLowerFirst = 'Price (Lowest First)';
const priceHihgerFirst = 'Price (Highest First)';
const ratingHighestFirst = 'Rating (Highest First)';
const ratingLoweFirst = 'Rating (Lowest First)';
const LG_SCREEN_SIZE = 1024;
const HotelResultsDisplay = ({ HotelCategory }: HotelResultsDisplayProps) => {
  const [counter, setCounter] = useState(0);
  const [t, i18next] = useTranslation('hotels');
  const hotelsFoundLabel = t('hotelsFound', 'Hotels Found');
  const hotelsFoundLabelDesktop = t('results', 'Results');
  const hotelLabel = t('hotel', 'Hotel');
  const noResultsLabel = t('noResultsSearch', 'No Results Match Your Search.');
  const fromLabel = t('from', 'From');
  const { language } = i18next;
  const dispatch = useDispatch();
  const {
    adults,
    children,
    startDate,
    endDate,
    latitude,
    longitude,
    rooms,
    sortBy,
    paymentTypes,
    propertyTypes,
    starRating,
    minPrice,
    maxPrice,
    isTotalPrice,
    roomsData,
    amenities,
    supplierIds,
    slug,
  } = useQuery();
  const [sortByVal, setSortByVal] = useState(priceLowerFirst);
  const [currency, setCurrency] = useState<string>('');
  const storeCurrency = useSelector((state: any) => state.core.currency);
  const { loading, hotels, filteredHotels } = useSelector(
    (state: any) => state.hotels,
  );
  const { handleFilterHotels } = useFilterHotels(hotels);
  const [view, setview] = useState('list');
  const windowSize = useWindowSize();
  const isListView = view === 'list';

  // It could be useful
  // const { memoizedFilterHotels } = useFilter(hotels, keywordSearch as string);

  useEffect(() => {
    if (currency !== storeCurrency) setCurrency(storeCurrency);
  }, [storeCurrency]);

  useEffect(() => {
    if (counter === 0) {
      setCounter((pre) => pre + 1);
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

      const paramRoomsData = roomsData
        ? JSON.parse(roomsData as string)
        : [createRoom()];

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
        accommodation_type: propertyTypesAdapter(
          propertyTypes as unknown as string,
        ),
        star_rating: starRating as string,
        min_price: minPrice as string,
        max_price: maxPrice as string,
        is_total_price: isTotalPrice as string,
        amenities: amenities as string,
        supplier_ids: supplierIds as string,
        apiUrl: '/hotels',
      };

      if (parseQueryNumber(children as string)) {
        params.children_ages = getChildrenAges(paramRoomsData);
      }
      dispatch(hotelsSetInitialState(params, i18next));
    }
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
    amenities,
    counter,
    roomsData,
    paymentTypes,
    propertyTypes,
    isTotalPrice,
    supplierIds,
    dispatch,
    i18next,
  ]);

  const onChangeSortBy = (value: string) => {
    const typedValue: sortByFilters = value as sortByFilters;
    setSortByVal(value);
    switch (typedValue) {
      case 'Rating (Lowest First)':
        handleFilterHotels('ratingLowFirst');
        break;
      case 'Rating (Highest First)':
        handleFilterHotels('ratingHighFirst');
        break;
      case 'Price (Lowest First)':
        handleFilterHotels('priceLowFirst');
        break;
      case 'Price (Highest First)':
        handleFilterHotels('priceHighFirst');
        break;
    }
  };

  const urlDetail = (hotel: Hotel) => {
    const { id } = hotel;
    return `/detail/${slug}/${id}?adults=${adults}&children=${children}&startDate=${startDate}&endDate=${endDate}&geolocation=${latitude},${longitude}&rooms=${rooms}&roomsData=${roomsData}`;
  };
  const hasNoHotels = hotels.length === 0;

  const checkIfShouldBeShown = () => {
    if (
      (windowSize.width >= LG_SCREEN_SIZE && isListView) ||
      windowSize.width < LG_SCREEN_SIZE
    )
      return true;
    else if (!isListView && windowSize.width >= LG_SCREEN_SIZE) return false;
  };

  const HotelList = () => (
    <ul role="list" className="space-y-4">
      {loading ? (
        <HorizontalSkeletonList />
      ) : (
        <>
          {filteredHotels.map((hotel: Hotel) => {
            const {
              details: { name, address, star_rating: starRating },
              min_rate_room: minRateRoom,
              thumbnail,
            } = hotel;

            const url = urlDetail(hotel);
            const itemKey = hotel.id;
            const minRate = minRateRoom.rates;
            const formattedLocation = `${address?.address1}, ${address?.country_code}, ${address?.postal_code}`;

            return (
              <HorizontalItemCard
                key={itemKey}
                icon={HotelCategory.icon}
                categoryName={hotelLabel}
                item={hotel}
                title={name}
                image={thumbnail}
                price={<HotelItemRateInfo minRate={minRate} />}
                address={formattedLocation}
                className=" flex-0-0-auto"
                rating={parseInt(starRating)}
                url={url}
                priceDisplay={
                  <PriceDisplay
                    rate={minRate}
                    totalLabel={fromLabel}
                    isStartingTotal={true}
                    isPriceBase
                    isAvgAmount
                  />
                }
                cancellable={
                  <HotelCancellable minRate={minRate?.min_rate as MinRate} />
                }
              />
            );
          })}
        </>
      )}
    </ul>
  );

  return (
    <>
      <section className="lg:flex lg:w-full">
        <section className="hidden lg:block lg:min-w-[16rem] lg:max-w[18rem] lg:w-[25%] lg:mr-8">
          <HotelFilterFormDesktop
            loading={loading}
            handleFilterHotels={handleFilterHotels}
          />
        </section>
        <section className="relative lg:flex-1 lg:w-[75%] h-full lg:mt-0">
          {!loading && hasNoHotels ? (
            <EmptyState
              text={noResultsLabel}
              image={<EmptyStateIcon className="mx-auto" />}
            />
          ) : (
            <>
              <section className=" w-full px-5 z-[1] right-0 block mt-5 mb-1 lg:mt-0 lg:absolute lg:top-6  lg:px-0 ">
                <div
                  className={`flex bg-white  rounded justify-between py-4 ${
                    !isListView ? 'px-4 lg:shadow-container' : ''
                  }`}
                >
                  <section className=" text-dark-1000 font-semibold text-[20px] leading-[24px] lg:flex lg:justify-between lg:items-center">
                    {!loading ? (
                      <span>
                        {filteredHotels.length}
                        <span className="lg:hidden"> {hotelsFoundLabel}</span>
                        <span className="hidden lg:inline">
                          {' '}
                          {hotelsFoundLabelDesktop}
                        </span>
                      </span>
                    ) : (
                      <div className="w-40 h-8 rounded bg-dark-200 animate-pulse"></div>
                    )}
                  </section>
                  <section className="flex gap-4 items-center">
                    {checkIfShouldBeShown() && (
                      <DropdownRadio
                        translation="hotels"
                        sortByVal={sortByVal}
                        setSortByVal={setSortByVal}
                        onClickOption={onChangeSortBy}
                        options={[
                          priceLowerFirst,
                          priceHihgerFirst,
                          ratingHighestFirst,
                          ratingLoweFirst,
                        ]}
                      />
                    )}
                    <ViewActions view={view} setview={setview} />
                  </section>
                </div>
              </section>
              {isListView && (
                <section className="w-full h-full px-5 pb-6 lg:px-0 lg:mt-24 ">
                  <HotelList />
                </section>
              )}
              {!isListView && (
                <section className="w-full h-full">
                  {!loading ? (
                    <HotelMapView
                      HotelCategory={HotelCategory}
                      items={filteredHotels}
                      createUrl={urlDetail}
                    />
                  ) : (
                    <div className="bg-dark-200 w-full h-[400px] lg:h-[580px] p-4 flex flex-col justify-end">
                      <HorizontalSkeletonCard />
                    </div>
                  )}
                </section>
              )}
            </>
          )}
        </section>
      </section>
      <ListMapMobileBottomTabs view={view} setview={setview} />
    </>
  );
};

export default HotelResultsDisplay;
