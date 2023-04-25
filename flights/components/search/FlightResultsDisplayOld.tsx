/* eslint-disable */
import { formatAsSearchDate } from 'helpers/dajjsUtils';
import useQuery from 'hooks/pageInteraction/useQuery';
import { useQuery as useReactQuery } from '@tanstack/react-query';
import { FlightSearchRequest } from 'flights/types/request/FlightSearchRequest';
import { Flight, FlightOffer } from 'flights/types/response/SearchResponse';
import React, { ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import HorizontalItemCard from './HorizontalItemCard/HorizontalItemCard';
import { useRouter } from 'next/router';

import {
  Button,
  EmptyState as EmptyStateIllustration,
  IconWrapper,
} from '@simplenight/ui';
import { checkIfAnyNull } from 'helpers/arrayUtils';
import { parseQueryNumber } from 'helpers/stringUtils';
import { useSelector } from 'react-redux';
import { CustomWindow } from 'types/global/CustomWindow';
import ListIcon from 'public/icons/assets/list.svg';
import classnames from 'classnames';
import { useQueryShallowSetter } from 'hooks/pageInteraction/useQuerySetter';
import FlightFilterFormDesktop from './FlightFilterFormDesktop';
import ChevronRight from 'public/icons/assets/chevron-right.svg';

import moment from 'moment';
import { Item } from 'types/cart/CartType';
import HorizontalSkeletonList from 'components/global/HorizontalItemCard/HorizontalSkeletonList';
import SortIcon from 'public/icons/assets/sort.svg';
import FiltersIcon from 'public/icons/assets/filters.svg';
import Dropdown from 'components/global/Dropdown/Dropdown';
import FlightSecondarySearchOptions from './FlightSecondarySearchOptions';
import { Radio, RadioGroup } from 'components/global/Radio/Radio';
import EmptyStateContainer from 'components/global/EmptyStateContainer/EmptyStateContainer';
import FlightsBreadcrumbs from '../FlightsBreadcrumbs/FlightsBreadcrumbs';
import FlightInfo from '../FlightInfo/FlightInfo';
import { useCategorySlug } from 'hooks/category/useCategory';

declare let window: CustomWindow;

interface FlightResultsDisplayProps {
  FlightCategory: CategoryOption;
}

interface ViewButtonProps {
  children: ReactNode;
  viewParam: 'list' | 'map';
}

const FlightResultsDisplay = ({
  FlightCategory,
}: FlightResultsDisplayProps) => {
  const [loaded, setLoaded] = useState(false);
  const { ClientSearcher: Searcher } = FlightCategory.core;
  const [t, i18next] = useTranslation('flights');
  const flightsFoundLabel = t('flightsFound', 'Flight(s) Found');
  const flightsFoundLabelDesktop = t('results', 'Results');
  const flightLabel = t('flight', 'Flight');
  const noResultsLabel = t('noResultsSearch', 'No Results Match Your Search.');
  const fromLabel = t('from', 'From');
  const departingFlightsLabel = t('departingFlights', 'Departing Flights');
  const returningFlightsLabel = t('returningFlights', 'Returning Flights');
  const loadMoreLabel = t('loadMore', 'Load More');
  const stopText = t('stop', 'Stop');
  const stopsText = t('stops', 'Stops');
  const directText = t('direct', 'Direct');
  const { language } = i18next;
  const router = useRouter();
  const setQueryParams = useQueryShallowSetter();
  const [queryFilter, setQueryFilters] = useState(router.query);

  const pageItems = 10;
  const [page, setPage] = useState<number>(1);

  const {
    direction,

    startAirport,
    endAirport,
    startDate,
    endDate,

    adults,
    children,
    infants,
    childrenAges,
    infantsAges,

    latitude,
    longitude,

    // filters
    //sortBy,
    minPrice,
    maxPrice,
    departureTimes,
    arrivalTimes,
    stops,
    airlines,
    cities,

    // multi city
    startAirports,
    endAirports,
    startDates,
    sortBy,

    selected,
    filters,
  } = useQuery();

  const [flights, setFlights] = useState<Flight[]>([]);
  const [offers, setOffers] = useState<FlightOffer[]>([]);
  const [flightsSearched, setFlightsSearched] = useState<Flight[]>([]);
  const [flightsFiltered, setFlightsFiltered] = useState<Flight[]>([]);
  const [isOpenFilters, setIsOpenFilters] = useState<boolean>(false);

  const [selectedFlights, setSelectedFlights] = useState<Flight[]>([]);

  const [flightIndex, setFlightIndex] = useState<number>(
    selected ? selected.toString().split(',').length : 0,
  );
  const [flightsSelected, setFlightsSelected] = useState<string[]>(
    selected ? selected.toString().split(',') : [],
  );

  let flightsCount = 1;
  if (direction === 'round_trip') flightsCount = 2;
  else if (direction === 'multi_city' && startAirports)
    flightsCount = startAirports.toString().split('|').length;

  const [currency, setCurrency] = useState<string>(window.currency);
  const storeCurrency = useSelector((state: any) => state.core.currency);

  const { slug } = useQuery();
  const apiUrl = useCategorySlug(slug as string)?.apiUrl ?? '';

  const params: FlightSearchRequest = {
    direction: direction as unknown as string,
    cabin_type: '',

    origin: startAirport as unknown as string,
    destination: endAirport as unknown as string,
    departure_date: formatAsSearchDate(startDate as unknown as string),
    return_date: formatAsSearchDate(endDate as unknown as string),

    adults: parseQueryNumber(adults ?? ''),
    children: parseQueryNumber(children ?? ''),
    infants: parseQueryNumber(infants ?? ''),
    children_ages: childrenAges as unknown as string,
    infants_ages: infantsAges as unknown as string,

    start_airports: startAirports as unknown as string,
    end_airports: endAirports as unknown as string,
    start_dates: startDates as unknown as string,

    currency: currency as unknown as string,
    apiUrl,
  };
  const hasEmptyValues = checkIfAnyNull([
    direction,
    startAirport,
    endAirport,
    startDate,
    adults,
  ]);

  const isMultiCity = direction === 'multi_city';

  const hasEmptyValuesMultiCity = checkIfAnyNull([
    startAirports,
    endAirports,
    startDates,
  ]);

  const fetchFligths = async () => {
    if (hasEmptyValues) return;
    if (isMultiCity && hasEmptyValuesMultiCity) return;
    try {
      return await Searcher?.request?.(params, i18next);
    } catch (e) {
      console.error(e);
    }
  };

  const { data, isLoading } = useReactQuery(
    ['flights-search', params],
    fetchFligths,
    { retry: false, staleTime: Infinity, refetchOnWindowFocus: false },
  );

  useEffect(() => {
    if (currency !== storeCurrency) setCurrency(storeCurrency);
  }, [storeCurrency]);

  useEffect(() => {
    if (data) {
      const { flights, offers } = data;
      setFlights(flights);
      setOffers(offers);
      filterFlights(flights, offers, flightIndex, flightsSelected);
    }
  }, [data]);

  const onChangeFlightIndex = (value: number) => {
    const _flightsSelected: string[] = [];
    for (let i = 0; i < value; i += 1) {
      if (flightsSelected[i]) _flightsSelected.push(flightsSelected[i]);
    }
    setFlightsSelected(_flightsSelected);
    localStorage.setItem('flightsSelected', JSON.stringify(_flightsSelected));
    // filterFlights(flights, offers, value, _flightsSelected);
    setQueryParams({
      ...queryFilter,
      // selected flights
      selected: _flightsSelected.join(','),
      // reset filters
      sortBy: '',
      minPrice: '',
      maxPrice: '',
      departureTimes: '',
      arrivalTimes: '',
      stops: '',
      airlines: '',
      cities: '',
    });
  };

  const getFlightOffers = (_offers: FlightOffer[], ids: string[]) => {
    const flightOffers: FlightOffer[] = [];
    _offers.forEach((offer: FlightOffer, index: number) => {
      const containsAll = ids.every((element) => {
        return offer.legRef.includes(element);
      });
      if (containsAll) flightOffers.push(offer);
    });
    // sort
    flightOffers.sort((a, b) =>
      parseFloat(a?.totalAmound) < parseFloat(b?.totalAmound)
        ? -1
        : Number(parseFloat(a?.totalAmound) > parseFloat(b?.totalAmound)),
    );
    return flightOffers;
  };

  const filterFlights = (
    _flights: Flight[],
    _offers: FlightOffer[],
    _flightIndex: number,
    _flightsSelected: string[],
  ) => {
    const _flightsSearched: Flight[] = [];
    const _flightsFiltered: Flight[] = [];
    // setFlightsSearched(_flightsSearched);
    // setFlightsSearched(_flightsFiltered);

    _flights.forEach((item: Flight, index: number) => {
      const id = item.legId.split('_');
      if (_flightIndex + 1 === parseInt(id[0])) {
        const flightOffers = getFlightOffers(
          _offers,
          _flightsSelected.concat([item.legId]),
        );
        if (flightOffers.length > 0) {
          item.offers = flightOffers;
          const amount = parseFloat(item.offers[0]?.totalAmound);

          const _stops = item?.segments?.collection.length - 1;
          let stopsLabel = `${stops} ${stopsText}`;
          if (_stops < 1) stopsLabel = directText;
          else if (_stops < 2) stopsLabel = `1 ${stopText}`;
          const _departureTime = moment(
            item?.segments?.collection[0]?.departureDateTime,
          ).format('H');
          const _arrivalTime = moment(
            item?.segments?.collection[item?.segments?.collection.length - 1]
              ?.arrivalDateTime,
          ).format('H');
          const _airlines: string[] = [];
          const _cities: string[] = [];
          item?.segments?.collection.forEach((segment, index) => {
            if (_airlines.indexOf(segment?.marketingCarrierName) < 0)
              _airlines.push(segment?.marketingCarrierName);
            if (_cities.indexOf(segment?.departureAirportName) < 0)
              _cities.push(segment?.departureAirportName);
            if (_cities.indexOf(segment?.arrivalAirportName) < 0)
              _cities.push(segment?.arrivalAirportName);
          });

          let valid = true;
          if (minPrice && parseFloat(minPrice as string) > amount)
            valid = false;
          if (maxPrice && parseFloat(maxPrice as string) < amount)
            valid = false;
          if (stops && stops.indexOf(stopsLabel) < 0) valid = false;
          if (
            departureTimes &&
            departureTimes.toString().split(',').length === 2
          ) {
            const _departureTimes = departureTimes.toString().split(',');
            if (parseInt(_departureTimes[0]) > parseInt(_departureTime))
              valid = false;
            if (parseInt(_departureTimes[1]) < parseInt(_departureTime))
              valid = false;
          }
          if (arrivalTimes && arrivalTimes.toString().split(',').length === 2) {
            const _arrivalTimes = arrivalTimes.toString().split(',');
            if (parseInt(_arrivalTimes[0]) > parseInt(_arrivalTime))
              valid = false;
            if (parseInt(_arrivalTimes[1]) < parseInt(_arrivalTime))
              valid = false;
          }
          if (airlines) {
            let found = false;
            airlines
              .toString()
              .split(',')
              .forEach((airline, index) => {
                if (_airlines.indexOf(airline) > -1) found = true;
              });
            if (!found) valid = false;
          }
          if (cities) {
            let found = false;
            cities
              .toString()
              .split(',')
              .forEach((city, index) => {
                if (_cities.indexOf(city) > -1) found = true;
              });
            if (!found) valid = false;
          }

          if (valid) _flightsFiltered.push(item);
          _flightsSearched.push(item);
        }
      }
    });

    // sort by price
    if (sortBy && sortBy === 'sortByPriceDesc')
      _flightsFiltered.sort((a, b) =>
        parseFloat(a?.offers[0]?.totalAmound) >
        parseFloat(b?.offers[0]?.totalAmound)
          ? -1
          : Number(
              parseFloat(a?.offers[0]?.totalAmound) <
                parseFloat(b?.offers[0]?.totalAmound),
            ),
      );
    else
      _flightsFiltered.sort((a, b) =>
        parseFloat(a?.offers[0]?.totalAmound) <
        parseFloat(b?.offers[0]?.totalAmound)
          ? -1
          : Number(
              parseFloat(a?.offers[0]?.totalAmound) >
                parseFloat(b?.offers[0]?.totalAmound),
            ),
      );

    setFlightsFiltered(_flightsFiltered);
    setFlightsSearched(_flightsSearched);
    localStorage.setItem('flightsSearched', JSON.stringify(_flightsSearched));
    setFlightIndex(_flightIndex);
    localStorage.setItem('flightIndex', `${_flightIndex}`);
  };

  const getFlightsByIds = (_flights: Flight[], ids: string[]) => {
    let results: Flight[] = [];
    _flights.forEach((item: Flight, index: number) => {
      const id = item.legId;
      const found = ids.indexOf(id);
      if (found > -1) results[found] = item;
    });
    return results;
  };

  const selectFlight = (flight: Flight) => {
    setSelectedFlights((flights) => [...flights, flight]);
  };

  const FlightList = () => (
    <ul role="list" className="space-y-4">
      {flightsFiltered.map((flight: Flight, index: number) => {
        if (index < page * pageItems)
          return (
            // <HorizontalItemCard
            //   key={`flight_${index}`}
            //   item={flight}
            //   selectFlight={selectFlight}
            // />
            <></>
          );
      })}
      {flightsFiltered.length > page * pageItems && (
        <section className="w-full mx-auto lg:w-fit">
          <Button onClick={() => setPage(page + 1)}>{loadMoreLabel}</Button>
        </section>
      )}
    </ul>
  );

  const toggleFilters = () => {
    setQueryParams({
      filters: queryFilter?.filters === 'open' ? '' : 'open',
    });
  };

  const { view = 'list' } = useQuery();
  const isListView = view === 'list';

  const ViewButton = ({ children, viewParam }: ViewButtonProps) => {
    const active = viewParam === 'list' ? isListView : !isListView;
    const onClick = () => {
      setQueryParams({
        view: viewParam,
      });
    };
    return (
      <button
        onClick={onClick}
        className={classnames(
          'h-[2.75rem] w-[2.75rem] grid place-content-center',
          {
            'bg-white text-primary-1000': !active,
            'bg-primary-1000 text-white': active,
          },
        )}
      >
        {children}
      </button>
    );
  };

  const ViewActions = () => {
    return (
      <section className="flex rounded-4 overflow-hidden w-[5.5rem] border border-primary-1000">
        <ViewButton viewParam="list">
          <ListIcon className="w-[1.3rem] h-[1.3rem]" />
        </ViewButton>
      </section>
    );
  };

  return (
    <>
      <section className="lg:flex lg:w-full">
        {!isLoading && flightsFiltered.length > 0 && (
          <FlightsBreadcrumbs
            step={1}
            content={selectedFlights.map((flight, idx) => {
              const flightSegments = flight.segments.collection;
              const firstSegment = flightSegments[0];
              const lastSegment = flightSegments[flightSegments.length - 1];
              const airline = firstSegment.marketingCarrier;
              const departure = firstSegment.departureAirport;
              const arrival = lastSegment.arrivalAirport;
              const isLastFlight = idx === selectedFlights.length - 1;
              return (
                <>
                  <FlightInfo
                    key={flight.legId}
                    airline={airline}
                    departure={departure}
                    arrival={arrival}
                  />
                  {!isLastFlight && (
                    <IconWrapper size={20}>
                      <ChevronRight className="text-dark-500" />
                    </IconWrapper>
                  )}
                </>
              );
            })}
          />
        )}
        {filters === 'open' && (
          <section className="hidden lg:block lg:min-w-[16rem] lg:max-w[18rem] lg:w-[25%]">
            <FlightFilterFormDesktop flights={flightsSearched} />
          </section>
        )}
        <section className="lg:flex-1 lg:w-[75%] h-full">
          {isLoading ? (
            <section className="w-full h-full px-5 pb-6 mt-[40px] lg:pt-0">
              <HorizontalSkeletonList />
            </section>
          ) : (
            <>
              <section className="w-full h-full px-5 pb-6">
                <section className="py-6 text-dark-1000 font-semibold text-[20px] leading-[20px] flex justify-between items-center">
                  <section className="flex flex-row items-center py-3 text-base">
                    {filters !== 'open' && (
                      <button
                        className="p-2 m-2 border-2 rounded-full text-primary-100 border-primary-100"
                        onClick={toggleFilters}
                      >
                        <FiltersIcon className="text-primary-1000" />
                      </button>
                    )}
                    <span>
                      {`${flightsFiltered.length} ${flightsFoundLabelDesktop}`}{' '}
                    </span>
                  </section>
                  <section className="relative flex gap-1 px-3 py-1 rounded bg-primary-100 lg:bg-transparent lg:px-0 lg:mr-0">
                    <FlightSecondarySearchOptions />
                  </section>
                </section>
                {flightsFiltered.length > 0 ? (
                  <FlightList />
                ) : (
                  <EmptyStateContainer
                    text={noResultsLabel}
                    Icon={EmptyStateIllustration}
                    width={114}
                    desktopWidth={223}
                  />
                )}
              </section>
            </>
          )}
        </section>
      </section>
    </>
  );
};

export default FlightResultsDisplay;
