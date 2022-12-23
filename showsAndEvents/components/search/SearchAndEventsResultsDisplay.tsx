// Libraries
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
// models
import { CategoryOption } from 'types/search/SearchTypeOptions';
// components
import ResultCard from './ResultCard/ResultCard';
// mocks
import { thingToDo } from '../../mocks/showsAndEventsMock';
import ThingsCancellable from './ShowsCancellable/ShowsCancellable';
import PriceDisplay from '../PriceDisplay/PriceDisplay';
import SearchViewSelectorFixed from 'components/global/SearchViewSelector/SearchViewSelectorFixed';
import ShowAndEventsFilterFormDesktop from './ShowAndEventsFilterFormDesktop';
import { ShowsSearchResponse as iShowAndEventsResult } from '../../types/response/ShowsSearchResponse';
import useQuery from 'hooks/pageInteraction/useQuery';
import classnames from 'classnames';
import useQuerySetter from 'hooks/pageInteraction/useQuerySetter';
import HorizontalSkeletonList from 'components/global/HorizontalItemCard/HorizontalSkeletonList';

import LocationMap from 'components/global/LocationMap/LocationMap';
import ResultsOptionsBar from '../ResultsOptionsBar/ResultsOptionsBar';
import { SORT_BY_OPTIONS } from 'showsAndEvents/constants/sortByOptions';
import Button from 'components/global/Button/Button';
import { ShowsSearchRequest } from 'showsAndEvents/types/request/ShowsSearchRequest';
import { formatAsSearchDate } from 'helpers/dajjsUtils';
import { StringGeolocation } from 'types/search/Geolocation';
import axios from 'axios';
const RESULTS_PER_PAGE = 10;
import EmptyState from '../../../components/global/EmptyState/EmptyState';
import EmptyStateIcon from 'public/icons/assets/empty-state.svg';
import { useCategorySlug } from 'hooks/category/useCategory';

interface ShowsResultsDisplayProps {
  ShowsCategory: CategoryOption;
}

const ThingsResultsDisplay = ({ ShowsCategory }: ShowsResultsDisplayProps) => {
  const [t, i18next] = useTranslation('events');
  const thingsToDoLabel = t('events', 'Shows & events');
  const { ClientSearcher: Searcher } = ShowsCategory.core;

  const { slug } = useQuery();
  const apiUrl = useCategorySlug(slug as string)?.apiUrl ?? '';

  const { view = 'list' } = useQuery();
  const isListView = view === 'list';
  const resultsMock = thingToDo;
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
  const [showsEvents, setShowsEventsItems] = useState<iShowAndEventsResult[]>(
    [],
  );
  const [sortedShowsEvents, setSortedShowsEvents] = useState<
    iShowAndEventsResult[]
  >([]);
  const [sortBy, setSortBy] = useState<any>(SORT_BY_OPTIONS?.[0].value || '');

  const [gt] = useTranslation('global');
  const noResultsLabel = gt('noResultsSearch', 'No Results Match Your Search.');

  useEffect(() => {
    const params: ShowsSearchRequest = {
      start_date: formatAsSearchDate(startDate as string),
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
    setLoaded(false);
    Searcher?.request?.(params, i18next)
      .then((data) => {
        setShowsEventsItems(data.items);
        setLoaded(true);
      })
      .catch((error) => {
        setLoaded(true);
      })
      .then(() => setLoaded(true));
  }, [startDate, endDate, dstGeolocation, distance, seats, maxPrice, minPrice]);

  const lowestPriceItems = useMemo(() => {
    return [...showsEvents].sort(
      (
        { rate: rate1 }: iShowAndEventsResult,
        { rate: rate2 }: iShowAndEventsResult,
      ) => {
        return rate1.total.net.amount - rate2.total.net.amount;
      },
    );
  }, [showsEvents]);

  const HighestPriceItems = useMemo(() => {
    return [...showsEvents].sort(
      (
        { rate: rate1 }: iShowAndEventsResult,
        { rate: rate2 }: iShowAndEventsResult,
      ) => {
        return rate2.total.net.amount - rate1.total.net.amount;
      },
    );
  }, [showsEvents]);

  useEffect(() => {
    if (showsEvents.length) {
      if (sortBy === SORT_BY_OPTIONS[0].value) {
        setSortedShowsEvents(lowestPriceItems);
      } else if (sortBy === SORT_BY_OPTIONS[1].value) {
        setSortedShowsEvents(HighestPriceItems);
      }
    }
  }, [showsEvents, sortBy]);

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
    coordinates,
  } = addresObject;
  const setQueryParams = useQuerySetter();
  const [loaded, setLoaded] = useState(true);
  const [next, setNext] = useState(RESULTS_PER_PAGE);

  const loadMoreResults = () => {
    setNext(next + RESULTS_PER_PAGE);
  };

  const ThingsToDoList = () => {
    const urlDetail = (thingToDo: iShowAndEventsResult) => {
      const { id } = thingToDo;

      return `/detail/${slug}/${id}?fromDate=${startDate}&toDate=${endDate}`;
    };
    return (
      // eslint-disable-next-line react/jsx-no-comment-textnodes
      <ul>
        {sortedShowsEvents &&
          sortedShowsEvents
            ?.slice(0, next)
            .map((thingToDo: iShowAndEventsResult, index) => {
              const url = urlDetail(thingToDo);
              const {
                id,
                name,
                address,
                tags,
                images,
                fromDate,
                toDate,
                cancellation_policy: cancellationPolicy,
                rate,
                extra_data: extraData,
                thumbnail,
              } = thingToDo;
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
              } ${[state, countryCode].filter((item) => item).join(' - ')}`;
              return (
                <li key={id}>
                  <ResultCard
                    url={url}
                    icon={ShowsCategory.icon}
                    categoryName={thingsToDoLabel}
                    item={thingToDo}
                    title={name}
                    images={images}
                    address={formattedLocation}
                    className=" flex-0-0-auto"
                    fromDate={extraData.starts_at}
                    toDate={toDate}
                    tags={tags}
                    index={index}
                    thumbnail={thumbnail}
                    cancellable={
                      <ThingsCancellable
                        cancellationPolicy={cancellationPolicy}
                      />
                    }
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
  return (
    <div className="pt-2 lg:pt-6 px-4">
      <section className="lg:flex lg:w-full">
        <section className="hidden lg:block lg:min-w-[16rem] lg:max-w[18rem] lg:w-[25%] lg:mr-8">
          <ShowAndEventsFilterFormDesktop />
        </section>
        <section className="relative lg:flex-1 lg:w-[75%] h-full lg:mt-20 lg:mt-0">
          {loaded && sortedShowsEvents.length ? (
            <>
              <section className="block">
                <>
                  <ResultsOptionsBar
                    results={sortedShowsEvents.length}
                    sortByOptions={SORT_BY_OPTIONS}
                    onClickSort={setSortBy}
                  />{' '}
                </>
              </section>
              <ThingsToDoList />
              {!isListView && (
                <section className="relative w-full h-full">
                  {loaded ? (
                    <LocationMap center={coordinates} />
                  ) : (
                    <HorizontalSkeletonList />
                  )}
                </section>
              )}
              {sortedShowsEvents.length > next && (
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
              {loaded ? (
                <section className="flex w-full justify-center items-center">
                  <EmptyState
                    text={noResultsLabel}
                    image={<EmptyStateIcon className="mx-auto" />}
                    forcedHeight={400}
                  />
                </section>
              ) : (
                <HorizontalSkeletonList />
              )}
            </>
          )}
        </section>
      </section>
    </div>
  );
};

export default ThingsResultsDisplay;
