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
import FiltersIcon from 'public/icons/assets/filters.svg';

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
import { ListMapMobileBottomTabs } from 'components/global/SearchViewSelector/ListMapMobileBottomTabs';
import { HotelResultFallbackImage } from 'hotels/helpers/HotelResultFallbackImage';
import EmptyStateContainer from 'components/global/EmptyStateContainer/EmptyStateContainer';
import dayjs from 'dayjs';
import { useSearchFilterStore } from 'hooks/hotels/useSearchFilterStore';
import useModal from 'hooks/layoutAndUITooling/useModal';
import getKeywordSearchListHotels from '../helpers/getKeywordSearchListHotels';
import { getPriceLimits } from 'hotels/helpers/getPriceLimits';

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
  const { clear, criteria, setCriteria } = useSearchFilterStore(
    (state) => state,
  );
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
  } = useQuery();

  const [sortByVal, setSortByVal] = useState<string>('recommended');
  const [hotels, setHotels] = useState<SearchItem[]>([]);
  const [view, setview] = useState('list');
  const isListView = view === 'list';

  const [isOpen, onOpen, onClose] = useModal();
  const [keywordSearchData, setKeywordSearchData] = useState<string[]>([]);
  const [keywordState, setKeywordState] = useState<string>('');

  const [minPriceFilter, setMinPriceFilter] = useState<number>(
    parseInt(criteria.MinPrice),
  );
  const [maxPriceFilter, setMaxPriceFilter] = useState<number>(
    parseInt(criteria.MaxPrice),
  );
  const [minStarRating, setMinStarRating] = useState<string>(criteria.MinRange);
  const [maxStarRating, setMaxStarRating] = useState<string>(criteria.MaxRange);
  const [keywordSearch, setKeywordSearch] = useState<string>(
    criteria.keywordSearch,
  );

  const [filtersCount, setFiltersCount] = useState(0);

  const [next, setNext] = useState(RESULTS_PER_PAGE);

  const [limitsPrice, setLimitsPrice] = useState<number[]>([0, 5000]);

  const loadMoreResults = () => {
    setNext(next + RESULTS_PER_PAGE);
  };

  const resetCriteria = () => {
    clear();
    setLimitsPrice(getPriceLimits(data as SearchItem[], criteria));
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

  const filteredHotels = useFilterHotels(
    hotels,
    criteria,
    setFiltersCount,
    limitsPrice,
  );

  useEffect(() => {
    if (data) {
      setHotels(data);
    }
  }, [data]);

  useEffect(() => {
    getKeywordSearchListHotels(filteredHotels, setKeywordSearchData);
  }, [filteredHotels]);

  useEffect(() => {
    if (data) {
      setLimitsPrice(getPriceLimits(data, criteria));
    }
  }, [data, criteria.MaxRange, criteria.MinRange, criteria.keywordSearch]);

  useEffect(() => {
    setMaxPriceFilter(limitsPrice[1]);
    setMinPriceFilter(limitsPrice[0]);
    setCriteria({
      ...criteria,
      MinPrice: String(limitsPrice[0]),
      MaxPrice: String(limitsPrice[1]),
    });
  }, [limitsPrice]);

  const urlDetail = (hotel: SearchItem) => {
    const { id } = hotel;
    return `/detail/${slug}/${id}?adults=${adults}&children=${children}&startDate=${startDate}&endDate=${endDate}&geolocation=${latitude},${longitude}&rooms=${rooms}&roomsData=${roomsData}`;
  };
  const hasNoHotels = data?.length === 0;

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
            const { address, city, postalCode, countryCode } =
              fullAddress ?? {};
            const formattedLocation = `${[city, countryCode, postalCode]
              .filter((item) => item)
              .join(', ')}`;
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
      <section className="relative lg:flex lg:w-full">
        {isOpen && (
          <section>
            <FilterSidebarHotels
              keywordState={keywordState}
              setKeywordState={setKeywordState}
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
            />
          </section>
        )}
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
              <section className=" w-full px-5 z-[1] right-0 block my-1 lg:mt-0 lg:absolute lg:top-6  lg:px-0 ">
                <div
                  className={`flex bg-white  rounded justify-between py-4 ${
                    !isListView ? 'px-4 lg:shadow-container' : ''
                  }`}
                >
                  <section className=" text-dark-1000 font-semibold text-[20px] leading-[24px] lg:flex lg:justify-between lg:items-center">
                    {!isLoading ? (
                      <>
                        {!isOpen && (
                          <button
                            className="hover:bg-primary-800 hover:text-white p-2 mx-2 border-2 rounded-full text-primary-1000 border-primary-100"
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
                  <section className="flex items-center gap-4">
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
    </>
  );
};

export default HotelResultsDisplay;
