// Libraries
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery as useReactQuery } from '@tanstack/react-query';
// models
import { CategoryOption } from 'types/search/SearchTypeOptions';
// components
import ResultCard from './ResultCard/ResultCard';

import PriceDisplay from '../PriceDisplay/PriceDisplay';
import ShowAndEventsFilterFormDesktop from './ShowAndEventsFilterFormDesktop';
import useQuery from 'hooks/pageInteraction/useQuery';
import classnames from 'classnames';
import HorizontalSkeletonList from 'components/global/HorizontalItemCard/HorizontalSkeletonList';

import ResultsOptionsBar from '../ResultsOptionsBar/ResultsOptionsBar';
import { SORT_BY_OPTIONS } from 'showsAndEvents/constants/sortByOptions';
import Button from 'components/global/Button/Button';
import { ShowsSearchRequest } from 'showsAndEvents/types/request/ShowsSearchRequest';
import { formatAsSearchDate } from 'helpers/dajjsUtils';
import { StringGeolocation } from 'types/search/Geolocation';
import EmptyStateContainer from 'components/global/EmptyStateContainer/EmptyStateContainer';
import { EmptyState } from '@simplenight/ui';
import { useCategorySlug } from 'hooks/category/useCategory';
import { SearchItem } from 'showsAndEvents/types/adapters/SearchItem';
import VerticalSkeletonCard from 'components/global/VerticalItemCard/VerticalSkeletonCard';
import ShowAndEventsResultMapView from './ShowAndEventsResultMapView/ShowAndEventsResultMapView';
import { useSearchFilterStore } from 'hooks/showsAndEvents/useSearchFilterStore';

interface ShowsResultsDisplayProps {
  ShowsCategory: CategoryOption;
}

const RESULTS_PER_PAGE = 10;

const ThingsResultsDisplay = ({ ShowsCategory }: ShowsResultsDisplayProps) => {
  const [t, i18next] = useTranslation('events');
  const thingsToDoLabel = t('events', 'Shows & events');

  const { slug } = useQuery();
  const apiUrl = useCategorySlug(slug as string)?.apiUrl ?? '';

  const {
    startDate,
    endDate,
    latitude,
    longitude,
    distance,
    seats,
    maxPrice,
    minPrice,
    query,
  } = useQuery();
  const dstGeolocation = `${latitude},${longitude}`;
  const {
    filteredShowsAndEvents,
    setFilteredShowsAndEvents,
    setShowsAndEvents,
  } = useSearchFilterStore((state) => state);

  const [sortBy, setSortBy] = useState<any>(SORT_BY_OPTIONS?.[0].value || '');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filterView, setFilterView] = useState('list');
  const [showFilters, setShowFilters] = useState(true);
  const isListView = filterView === 'list';
  const [gt] = useTranslation('global');
  const noResultsLabel = gt('noResultsSearch', 'No Results Match Your Search.');

  const { ClientSearcher: Searcher } = ShowsCategory.core;

  const params: ShowsSearchRequest = {
    start_date:
      startDate == 'null'
        ? formatAsSearchDate(endDate as string)
        : formatAsSearchDate(startDate as string),
    end_date: formatAsSearchDate(endDate as string),
    dst_geolocation: dstGeolocation as StringGeolocation,
    rsp_fields_set: 'basic',
    min_price: minPrice as string,
    max_price: maxPrice as string,
    radius: distance as string,
    seats: seats as string,
    query: query as string,
    apiUrl,
  };

  const fetchShowsAndEvents = async () => {
    try {
      return await Searcher?.request?.(params, i18next);
    } catch (e) {
      console.error(e);
    }
  };

  const { data, isLoading } = useReactQuery(
    ['showsandevents-search', params],
    fetchShowsAndEvents,
    { retry: false, staleTime: Infinity, refetchOnWindowFocus: false },
  );

  useEffect(() => {
    if (!data) return;
    setShowsAndEvents(data);
  }, [data]);

  const lowestPriceItems = useMemo(() => {
    return [...filteredShowsAndEvents].sort(
      ({ rate: rate1 }: SearchItem, { rate: rate2 }: SearchItem) => {
        return rate1.total.net.amount - rate2.total.net.amount;
      },
    );
  }, [filteredShowsAndEvents]);

  const HighestPriceItems = useMemo(() => {
    return [...filteredShowsAndEvents].sort(
      ({ rate: rate1 }: SearchItem, { rate: rate2 }: SearchItem) => {
        return rate2.total.net.amount - rate1.total.net.amount;
      },
    );
  }, [filteredShowsAndEvents]);

  useEffect(() => {
    if (filteredShowsAndEvents.length) {
      if (sortBy === SORT_BY_OPTIONS[0].value) {
        setFilteredShowsAndEvents(lowestPriceItems);
      } else if (sortBy === SORT_BY_OPTIONS[1].value) {
        setFilteredShowsAndEvents(HighestPriceItems);
      }
    } else {
      setFilteredShowsAndEvents([]);
    }
  }, [sortBy]);

  const [addresObject, setAddressObject] = useState({
    address1: '',
    city: '',
    country_code: '',
    postal_code: '',
    coordinates: { latitude: 18.969049, longitude: 72.821182 },
  });
  const {
    city,
    country_code: countryCode,
    postal_code: postalCode,
  } = addresObject;
  const [next, setNext] = useState(RESULTS_PER_PAGE);

  const loadMoreResults = () => {
    setNext(next + RESULTS_PER_PAGE);
  };

  const ThingsToDoList = () => {
    const urlDetail = (showEvent: SearchItem) => {
      const { id } = showEvent;

      return `/detail/${slug}/${id}?fromDate=${startDate}&toDate=${endDate}`;
    };
    return (
      <ul>
        {filteredShowsAndEvents?.slice(0, next).map((showEvent: SearchItem) => {
          const url = urlDetail(showEvent);
          const {
            id,
            name,
            address,
            cancellationType,
            rate,
            extraData,
            thumbnail,
          } = showEvent;
          const {
            address1,
            city,
            state,
            country_code: countryCode,
          } = address ?? {};
          const formattedLocation = `${[address1, city]
            .filter((item) => item)
            .join(' - ')}${
            [state, countryCode].some((item) => item) ? ',' : ''
          } ${[state, countryCode].filter((item) => item).join(', ')}`;
          return (
            <li key={id}>
              <ResultCard
                url={url}
                icon={ShowsCategory.icon}
                categoryName={thingsToDoLabel}
                item={showEvent}
                title={name}
                address={formattedLocation}
                fromDate={extraData.starts_at}
                thumbnail={thumbnail}
                cancellationType={cancellationType}
                priceDisplay={
                  <PriceDisplay
                    rate={rate}
                    totalLabel={`${rate.total.net.formatted}`}
                  />
                }
              />
            </li>
          );
        })}
      </ul>
    );
  };

  const urlDetail = (showEvent: SearchItem) => {
    const { id } = showEvent;
    return `/detail/${slug}/${id}?fromDate=${startDate}&toDate=${endDate}`;
  };

  const onCloseFilters = () => setShowFilters(false);

  const onOpenFilters = () => setShowFilters(true);

  return (
    <div className="px-4 pt-2 lg:pt-6">
      <section className="lg:flex lg:w-full">
        {showFilters && (
          <section
            className={classnames(
              ' lg:block lg:min-w-[16rem] lg:max-w[18rem] lg:w-[25%] lg:mr-8',
              {
                hidden: !showMobileFilters,
                block: showMobileFilters,
              },
            )}
          >
            {isLoading ? (
              <VerticalSkeletonCard />
            ) : (
              <ShowAndEventsFilterFormDesktop
                handleHideFilters={() => setShowMobileFilters(false)}
                isMobile={showMobileFilters}
                onClose={onCloseFilters}
                resultAmount={!!filteredShowsAndEvents.length}
              />
            )}
          </section>
        )}
        <section className="relative lg:flex-1 lg:w-[75%] h-full lg:mt-0">
          {!isLoading && filteredShowsAndEvents.length ? (
            <>
              <section className="block">
                <>
                  <ResultsOptionsBar
                    results={filteredShowsAndEvents.length}
                    sortByOptions={SORT_BY_OPTIONS}
                    onClickSort={setSortBy}
                    onClickFilter={() => setShowMobileFilters(true)}
                    defaultOption={sortBy}
                    filterView={filterView}
                    setFilterView={setFilterView}
                    onOpenFilters={onOpenFilters}
                    showFilters={showFilters}
                  />{' '}
                </>
              </section>
              {isListView && <ThingsToDoList />}
              {!isListView && (
                <ShowAndEventsResultMapView
                  items={filteredShowsAndEvents}
                  isLoading={isLoading}
                  showCategoryIcon={ShowsCategory.icon}
                  createUrl={urlDetail}
                  label={thingsToDoLabel}
                />
              )}

              {filteredShowsAndEvents.length > next && (
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
          ) : (
            <>
              {!isLoading ? (
                <section className="flex items-center justify-center w-full">
                  <EmptyStateContainer
                    text={noResultsLabel}
                    Icon={EmptyState}
                    width={114}
                    desktopWidth={223}
                  />
                </section>
              ) : (
                <div className="pt-3">
                  <HorizontalSkeletonList />
                </div>
              )}
            </>
          )}
        </section>
      </section>
    </div>
  );
};

export default ThingsResultsDisplay;
