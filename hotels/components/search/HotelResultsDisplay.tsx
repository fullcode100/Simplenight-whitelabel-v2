import { useQuery as useReactQuery } from '@tanstack/react-query';
import { formatAsSearchDate } from 'helpers/dajjsUtils';
import useQuery from 'hooks/pageInteraction/useQuery';
import { HotelSearchRequest } from 'hotels/types/request/HotelSearchRequest';
import { MinRate } from 'hotels/types/response/SearchResponse';
import { SearchItem } from 'hotels/types/adapters/SearchItem';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import HorizontalItemCard from 'hotels/components/search/HorizontalItemCard';
import Button from 'components/global/Button/Button';
import FiltersIcon from 'public/icons/assets/filters.svg';
import classNames from 'classnames';

import HotelMapView from './HotelResultsMapView';
import { EmptyState } from '@simplenight/ui';
import { getChildrenAges, parseQueryNumber } from 'helpers/stringUtils';
import { StringGeolocation } from 'types/search/Geolocation';
import { createRoom } from 'hotels/helpers/room';
import HotelItemRateInfo from './HotelItemRateInfo';

import FilterSidebarHotels from './FilterSidebarHotels';
import PriceDisplay from 'hotels/components/PriceDisplay/PriceDisplay';
import HotelCancellable from './HotelCancellable';
import HorizontalSkeletonCard from 'components/global/HorizontalItemCard/HorizontalSkeletonCard';
import HorizontalSkeletonList from 'components/global/HorizontalItemCard/HorizontalSkeletonList';
import { useFilterHotels } from '../../hooks/useFilterHotels';
import { ViewActions } from './ViewActions';
import { ListMapMobileBottomTabs } from 'components/global/SearchViewSelector/NewListMapMobileBottomTabs';
import { HotelResultFallbackImage } from 'hotels/helpers/HotelResultFallbackImage';
import EmptyStateContainer from 'components/global/EmptyStateContainer/EmptyStateContainer';
import dayjs from 'dayjs';
import { useSearchFilterStore } from 'hooks/hotels/useSearchFilterStore';
import useModal from 'hooks/layoutAndUITooling/useModal';
import getKeywordSearchListHotels from '../helpers/getKeywordSearchListHotels';
import { getPriceLimits } from 'hotels/helpers/getPriceLimits';
import useMediaViewport from 'hooks/media/useMediaViewport';
import { Option } from 'components/global/MultipleSelect/MultipleSelect';
import { getAmenitiesOptions } from 'hotels/helpers/getAmenitiesOptions';
import getFilterCountHotels from 'hotels/helpers/getFilterCountHotels';
import { getInitialPriceLimits } from 'hotels/helpers/getInitialPriceLimits';
import { useFilterAppliedStore } from 'hooks/hotels/useFilterAppliedStore';
import VerticalSkeletonCard from 'components/global/VerticalItemCard/VerticalSkeletonCard';
import Head from 'next/head';
import { useGA4 } from 'hooks/ga4/useGA4';
import { TRACK_ACTION, TRACK_CATEGORY, TRACK_LABEL } from 'constants/events';

interface HotelResultsDisplayProps {
  HotelCategory: CategoryOption;
}

type FetchHotels = () => Promise<SearchItem[]>;

export type sortByFilters =
  | 'sortByPriceAsc'
  | 'sortByPriceDesc'
  | 'sortByStarRatingDesc'
  | 'sortByStarRatingAsc'
  | 'recommended';

export const SORTBY_INITIAL_VALUE = 'recommended';
export const FREE_CANCELATION_INITIAL_VALUE = false;
export const MIN_STAR_RATING_INITIAL_VALUE = '1';
export const MAX_STAR_RATING_INITIAL_VALUE = '5';
export const HOTELS_INITIAL_VALUE = false;
export const VACATION_RENTALS_INITIAL_VALUE = false;
export const initialPriceRange = {
  min: '0',
  max: '5000',
};
const RESULTS_PER_PAGE = 25;

const HotelResultsDisplay = ({ HotelCategory }: HotelResultsDisplayProps) => {
  const { trackEvent } = useGA4();
  const { clear, criteria, setCriteria } = useSearchFilterStore(
    (state) => state,
  );
  const {
    sortByVal,
    keywordSearch,
    minPriceFilter,
    maxPriceFilter,
    minStarRating,
    maxStarRating,
    selectedAmenities,
    setSortByVal,
    setKeywordSearch,
    setMinPriceFilter,
    setMaxPriceFilter,
    setMinStarRating,
    setMaxStarRating,
    setSelectedAmenities,
  } = useFilterAppliedStore((state) => state);
  const { ClientSearcher: Searcher } = HotelCategory.core;
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
    roomsData,
    supplierIds,
    slug,
    address,
  } = useQuery();

  const [hotels, setHotels] = useState<SearchItem[]>([]);
  const [view, setview] = useState('list');
  const isListView = view === 'list';
  const { isDesktop } = useMediaViewport();

  const [isOpen, onOpen, onClose] = useModal();
  const [keywordSearchData, setKeywordSearchData] = useState<string[]>([]);
  const [amenitiesOptions, setAmenitiesOptions] = useState<Option[]>([]);

  useEffect(() => {
    isDesktop && onOpen();
  }, [isDesktop]);
  const [filtersCount, setFiltersCount] = useState(0);

  const [next, setNext] = useState(RESULTS_PER_PAGE);

  const [limitsPrice, setLimitsPrice] = useState<number[]>([]);

  const loadMoreResults = () => {
    setNext(next + RESULTS_PER_PAGE);
  };

  const resetCriteria = () => {
    let amenitiesOptions: Option[] = [];
    const initialPriceLimits = getInitialPriceLimits(data as SearchItem[]);
    if (data) {
      amenitiesOptions = getAmenitiesOptions(data);
    }
    clear(amenitiesOptions, initialPriceLimits);
  };

  const paramRoomsData = roomsData
    ? JSON.parse(roomsData as string)
    : [createRoom()];
  const geolocation = `${latitude},${longitude}`;

  const params: HotelSearchRequest = {
    rooms: parseQueryNumber(rooms !== '0' && rooms ? rooms : '1'),
    adults: parseQueryNumber(adults !== '0' && adults ? adults : '2'),
    children: parseQueryNumber(children ?? ''),
    start_date: formatAsSearchDate(startDate as unknown as string),
    end_date: formatAsSearchDate(
      dayjs(endDate as unknown as string).isAfter(
        startDate as unknown as string,
      )
        ? (endDate as unknown as string)
        : dayjs(startDate as unknown as string).add(1, 'day'),
    ),
    dst_geolocation: geolocation as unknown as StringGeolocation,
    rsp_fields_set: 'basic',
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
      trackEvent({
        action: TRACK_ACTION.SET,
        category: TRACK_CATEGORY.HOTELS,
        label: TRACK_LABEL.RESULTS,
        value: data?.length?.toString(),
      });
    }
  }, [data, trackEvent]);

  useEffect(() => {
    if (data) {
      const initialPriceLimits = getInitialPriceLimits(data);
      const initialAmenitiesOptions = getAmenitiesOptions(data);
      setAmenitiesOptions(initialAmenitiesOptions);
      setCriteria({
        keywordSearch: keywordSearch,
        MaxPrice: initialPriceLimits[1].toString(),
        MinPrice: initialPriceLimits[0].toString(),
        MaxRange: maxStarRating,
        MinRange: minStarRating,
        sortCriteria: sortByVal,
        selectedAmenities:
          selectedAmenities.length > 0
            ? selectedAmenities
            : initialAmenitiesOptions,
      });
    }
  }, [data]);

  useEffect(() => {
    if (selectedAmenities.length === 0) {
      setSelectedAmenities(amenitiesOptions);
    }
  }, [amenitiesOptions, criteria]);

  useEffect(() => {
    getKeywordSearchListHotels(filteredHotels, setKeywordSearchData);
  }, [filteredHotels]);

  useEffect(() => {
    if (data && criteria.selectedAmenities.length > 0) {
      setLimitsPrice(getPriceLimits(data, criteria));
    }
  }, [
    data,
    criteria.MaxRange,
    criteria.MinRange,
    criteria.keywordSearch,
    criteria.selectedAmenities,
  ]);

  useEffect(() => {
    let newMinPrice = minPriceFilter;
    let newMaxPrice = maxPriceFilter;
    if (minPriceFilter <= limitsPrice[0] || minPriceFilter >= limitsPrice[1]) {
      newMinPrice = limitsPrice[0];
    }
    if (maxPriceFilter >= limitsPrice[1] || maxPriceFilter <= limitsPrice[0]) {
      newMaxPrice = limitsPrice[1];
    }
    setMinPriceFilter(newMinPrice);
    setMaxPriceFilter(newMaxPrice);
    setCriteria({
      ...criteria,
      MinPrice: String(newMinPrice),
      MaxPrice: String(newMaxPrice),
    });
  }, [limitsPrice]);

  useEffect(() => {
    if (limitsPrice.length === 0) return;
    setFiltersCount(
      getFilterCountHotels(criteria, limitsPrice, amenitiesOptions.length),
    );
  }, [criteria, limitsPrice]);

  const urlDetail = (hotel: SearchItem) => {
    const { id } = hotel;
    return `/detail/${slug}/${id}?adults=${adults}&children=${children}&startDate=${startDate}&endDate=${endDate}&geolocation=${latitude},${longitude}&rooms=${rooms}&roomsData=${roomsData}&address=${address}`;
  };
  const hasNoHotels = data?.length === 0;

  const ResultsAndControls = () => (
    <section className="w-full px-5 z-[1] right-0 block lg:mt-0 lg:absolute lg:px-0">
      <div
        className={`${
          !isOpen && !isListView ? 'px-0 lg:px-60' : 'px-0 lg:px-4'
        } flex  bg-white mt-2 lg:mt-0 bg-opacity-80 backdrop-blur-6 justify-between pt-4 pb-4 ${
          !isListView ? ' lg:shadow-container pb-4' : ''
        }`}
      >
        <section className=" text-dark-1000 font-semibold text-[16px] lg:text-[18px] lg:flex lg:justify-between lg:items-center">
          {!isLoading ? (
            <>
              {!isOpen && (
                <button
                  className="p-2 mx-2 border-2 rounded-full hover:bg-primary-800 hover:text-white text-primary-1000 border-primary-100"
                  onClick={() => {
                    onOpen();
                  }}
                >
                  <FiltersIcon />
                </button>
              )}
              <span>
                {filteredHotels.length}
                <span className="lg:hidden"> {hotelsFoundLabel}</span>
                <span className="hidden lg:inline">
                  {' '}
                  {hotelsFoundLabelDesktop}
                </span>
              </span>
            </>
          ) : (
            <div className="w-40 h-8 rounded bg-dark-200 animate-pulse"></div>
          )}
        </section>
        <section
          className={`flex items-center gap-4 absolute ${
            isOpen && !isListView && 'bottom-2'
          } ${isListView ? 'right-0' : 'right-[194px]'}`}
        >
          <ViewActions view={view} setview={setview} />
        </section>
      </div>
    </section>
  );

  const HotelList = () => (
    <ul role="list" className="space-y-4 lg:pt-1">
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
            const { address, city, state, postalCode, countryCode } =
              fullAddress ?? {};
            const formattedLocation = `${[city, state, countryCode, postalCode]
              .filter((item) => item)
              .join(', ')}`;
            const allRoomsAmount =
              minRate?.min_rate.rate.rate_breakdown?.total_base_amount
                ?.formatted;
            const totalAmount = minRate?.min_rate.rate.total_amount.formatted;
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
                address={address}
                address2={formattedLocation}
                className=" flex-0-0-auto"
                rating={parseInt(starRating)}
                url={url}
                priceDisplay={
                  <>{allRoomsAmount ? allRoomsAmount : totalAmount}</>
                }
                cancellable={
                  <>
                    <HotelCancellable minRate={minRate?.min_rate as MinRate} />
                    <PriceDisplay
                      rate={minRate}
                      totalLabel={fromLabel}
                      isStartingTotal={true}
                      isPriceBase
                      isAvgAmount
                    />
                  </>
                }
              />
            );
          })}
        </>
      )}
    </ul>
  );

  const overflowStyles =
    isOpen && window.innerWidth < 1024
      ? `
      body {
        overflow: hidden;
      }
    `
      : '';

  return (
    <>
      <Head>
        <style>{overflowStyles}</style>
      </Head>
      <div
        className={classNames({
          'lg:px-20 flex justify-center': isListView,
        })}
      >
        <div className={classNames({ 'max-w-7xl w-full': isListView })}>
          <section className="relative lg:flex lg:w-full">
            {isOpen && (
              <section>
                {isLoading ? (
                  <VerticalSkeletonCard />
                ) : (
                  <FilterSidebarHotels
                    isListView={isListView}
                    limitsPrice={limitsPrice}
                    filtersCount={filtersCount}
                    setCriteria={setCriteria}
                    keywordSearchData={keywordSearchData}
                    keywordSearch={keywordSearch}
                    setKeywordSearch={setKeywordSearch}
                    sortByVal={sortByVal}
                    setSortByVal={setSortByVal}
                    onClose={onClose}
                    isOpen={isOpen}
                    loading={isLoading}
                    handleFilterHotels={setCriteria}
                    resetFilters={resetCriteria}
                    criteria={criteria}
                    minPrice={minPriceFilter}
                    setMinPrice={setMinPriceFilter}
                    maxPrice={maxPriceFilter}
                    setMaxPrice={setMaxPriceFilter}
                    minStarRating={minStarRating}
                    setMinStarRating={setMinStarRating}
                    maxStarRating={maxStarRating}
                    setMaxStarRating={setMaxStarRating}
                    amenitiesOptions={amenitiesOptions}
                    selectedAmenities={selectedAmenities}
                    setSelectedAmenities={setSelectedAmenities}
                  />
                )}
              </section>
            )}
            <section className="relative h-full lg:flex-1 lg:mt-0">
              {!isLoading && !filteredHotels.length ? (
                <EmptyStateContainer
                  text={noResultsLabel}
                  Icon={EmptyState}
                  width={114}
                  desktopWidth={300}
                />
              ) : (
                <>
                  <ResultsAndControls />
                  {isListView && (
                    <section className="w-full h-full px-5 pb-6 mt-0 lg:px-0 lg:mt-16">
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
                  {filteredHotels.length > next && isListView && (
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
          <section className="w-full bg-red-400">
            <ListMapMobileBottomTabs view={view} setview={setview} />
          </section>
        </div>
      </div>
    </>
  );
};

export default HotelResultsDisplay;
