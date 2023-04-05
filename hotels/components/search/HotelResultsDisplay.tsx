import { useQuery as useReactQuery } from '@tanstack/react-query';
import { formatAsSearchDate } from 'helpers/dajjsUtils';
import useQuery from 'hooks/pageInteraction/useQuery';
import { HotelSearchRequest } from 'hotels/types/request/HotelSearchRequest';
import { MinRate } from 'hotels/types/response/SearchResponse';
import { SearchItem } from 'hotels/types/adapters/SearchItem';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import HorizontalItemCard from 'components/global/HorizontalItemCard/HorizontalItemCard';
import Button from 'components/global/Button/Button';

import HotelMapView from './HotelResultsMapView';
import { EmptyState } from '@simplenight/ui';
import { getChildrenAges, parseQueryNumber } from 'helpers/stringUtils';
import { StringGeolocation } from 'types/search/Geolocation';
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
import { useFilterHotels, FilterCriteria } from '../../hooks/useFilterHotels';
import { ViewActions } from './ViewActions';
import { DropdownRadio } from 'components/global/DropdownRadio';
import { ListMapMobileBottomTabs } from 'components/global/SearchViewSelector/ListMapMobileBottomTabs';
import { useWindowSize } from 'hotels/hooks/useWinoowsResize';
import { HotelResultFallbackImage } from 'hotels/helpers/HotelResultFallbackImage';
import HotelMobileFilters from './HotelMobileFilters';
import EmptyStateContainer from 'components/global/EmptyStateContainer/EmptyStateContainer';

interface HotelResultsDisplayProps {
  HotelCategory: CategoryOption;
}

type FetchHotels = () => Promise<SearchItem[]>;

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

export const FREE_CANCELATION_INITIAL_VALUE = false;
export const MIN_STAR_RATING_INITIAL_VALUE = 1;
export const MAX_STAR_RATING_INITIAL_VALUE = 5;
export const HOTELS_INITIAL_VALUE = false;
export const VACATION_RENTALS_INITIAL_VALUE = false;
export const initialPriceRange = {
  min: 0,
  max: 5000,
};
const RESULTS_PER_PAGE = 25;

const HotelResultsDisplay = ({ HotelCategory }: HotelResultsDisplayProps) => {
  const { ClientSearcher: Searcher } = HotelCategory.core;
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const [criteria, setCriteria] = useState<FilterCriteria>(
    {} as unknown as FilterCriteria,
  );
  const [t, i18next] = useTranslation('hotels');
  const hotelsFoundLabel = t('hotelsFound', 'Hotels Found');
  const hotelsFoundLabelDesktop = t('results', 'Results');
  const hotelLabel = t('hotel', 'Hotel');
  const noResultsLabel = t('noResultsSearch', 'No Results Match Your Search.');
  const fromLabel = t('from', 'From');
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
  const [hotels, setHotels] = useState<SearchItem[]>([]);
  const [view, setview] = useState('list');
  const windowSize = useWindowSize();
  const isListView = view === 'list';
  const [freeCancellation, setFreeCancellation] = useState<boolean>(
    FREE_CANCELATION_INITIAL_VALUE,
  );

  const [vacationRentals, setVacationRentals] = useState<boolean>(
    VACATION_RENTALS_INITIAL_VALUE,
  );
  const [minPriceFilter, setMinPrice] = useState<number>(initialPriceRange.min);
  const [maxPriceFilter, setMaxPrice] = useState<number>(initialPriceRange.max);
  const [minStarRating, setMinStarRating] = useState<number>(
    MIN_STAR_RATING_INITIAL_VALUE,
  );
  const [maxStarRating, setMaxStarRating] = useState<number>(
    MAX_STAR_RATING_INITIAL_VALUE,
  );

  const [next, setNext] = useState(RESULTS_PER_PAGE);

  const loadMoreResults = () => {
    setNext(next + RESULTS_PER_PAGE);
  };

  const resetCriteria = () => {
    setCriteria({} as unknown as FilterCriteria);
  };

  const onChangeSortBy = (value: string) => {
    const typedValue: sortByFilters = value as sortByFilters;
    setSortByVal(value);
    switch (typedValue) {
      case 'Rating (Lowest First)':
        setCriteria({ ...criteria, sortCriteria: 'ratingLowFirst' });
        break;
      case 'Rating (Highest First)':
        setCriteria({ ...criteria, sortCriteria: 'ratingHighFirst' });
        break;
      case 'Price (Lowest First)':
        setCriteria({ ...criteria, sortCriteria: 'priceLowFirst' });
        break;
      case 'Price (Highest First)':
        setCriteria({ ...criteria, sortCriteria: 'priceHighFirst' });
        break;
    }
  };

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

  const fetchHotels: FetchHotels = async () => {
    try {
      return await Searcher?.request?.(params, i18next);
    } catch (e) {
      console.error(e);
    }
  };

  const { data, isLoading } = useReactQuery(
    ['hotels-search', params],
    fetchHotels,
    { retry: false, staleTime: Infinity, refetchOnWindowFocus: false },
  );

  const filteredHotels = useFilterHotels(hotels, criteria);

  useEffect(() => {
    if (data) {
      setHotels(data);
    }
  }, [data]);

  const urlDetail = (hotel: SearchItem) => {
    const { id } = hotel;
    return `/detail/${slug}/${id}?adults=${adults}&children=${children}&startDate=${startDate}&endDate=${endDate}&geolocation=${latitude},${longitude}&rooms=${rooms}&roomsData=${roomsData}`;
  };
  const hasNoHotels = data?.length === 0;

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
      {isLoading ? (
        <HorizontalSkeletonList />
      ) : (
        <>
          {filteredHotels?.slice(0, next).map((hotel) => {
            const {
              details: { name, fullAddress, starRating },
              minRate,
              thumbnail,
            } = hotel;

            const url = urlDetail(hotel);
            const itemKey = hotel.id;
            const { address, city, state, countryCode } = fullAddress ?? {};
            const formattedLocation = `${[address, city]
              .filter((item) => item)
              .join(' - ')}${
              [state, countryCode].some((item) => item) ? ',' : ''
            } ${[state, countryCode].filter((item) => item).join(' - ')}`;
            return (
              <HorizontalItemCard
                key={itemKey}
                icon={HotelCategory.icon}
                categoryName={hotelLabel}
                item={hotel}
                title={name}
                image={thumbnail}
                fallback={<HotelResultFallbackImage />}
                price={<HotelItemRateInfo minRate={minRate} />}
                address={fullAddress}
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
            loading={isLoading}
            handleFilterHotels={setCriteria}
            resetFilters={resetCriteria}
            criteria={criteria}
            freeCancellation={freeCancellation}
            setFreeCancellation={setFreeCancellation}
            vacationRentals={vacationRentals}
            setVacationRentals={setVacationRentals}
            minPrice={minPriceFilter}
            setMinPrice={setMinPrice}
            maxPrice={maxPriceFilter}
            setMaxPrice={setMaxPrice}
            minStarRating={minStarRating}
            setMinStarRating={setMinStarRating}
            maxStarRating={maxStarRating}
            setMaxStarRating={setMaxStarRating}
          />
        </section>
        <section className="relative lg:flex-1 lg:w-[75%] h-full lg:mt-0">
          {!isLoading && hasNoHotels ? (
            <EmptyStateContainer
              text={noResultsLabel}
              Icon={EmptyState}
              width={114}
              desktopWidth={223}
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
                    {!isLoading ? (
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
                  <section className="flex items-center gap-4">
                    {checkIfShouldBeShown() && (
                      <DropdownRadio
                        translation="hotels"
                        sortByVal={sortByVal}
                        setSortByVal={setSortByVal}
                        onClickOption={onChangeSortBy}
                        onFilterClick={setFilterModalOpen}
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
                  {!isLoading ? (
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
              {filteredHotels.length > next && (
                <section className="text-center">
                  <Button
                    onClick={loadMoreResults}
                    value={'Load More'}
                    size="w-60 h-11 text-base leading-[18px]"
                    className="mt-4 mb-12"
                  />
                </section>
              )}
            </>
          )}
        </section>
      </section>
      <ListMapMobileBottomTabs view={view} setview={setview} />
      <HotelMobileFilters
        handleFilterHotels={setCriteria}
        setFilterModalOpen={setFilterModalOpen}
        isFilterModalOpen={isFilterModalOpen}
        criteria={criteria}
        resetFilters={resetCriteria}
        freeCancellation={freeCancellation}
        setFreeCancellation={setFreeCancellation}
        vacationRentals={vacationRentals}
        setVacationRentals={setVacationRentals}
        minPrice={minPriceFilter}
        setMinPrice={setMinPrice}
        maxPrice={maxPriceFilter}
        setMaxPrice={setMaxPrice}
        minStarRating={minStarRating}
        setMinStarRating={setMinStarRating}
        maxStarRating={maxStarRating}
        setMaxStarRating={setMaxStarRating}
      />
    </>
  );
};

export default HotelResultsDisplay;
