import { formatAsSearchDate } from 'helpers/dajjsUtils';
import useQuery from 'hooks/pageInteraction/useQuery';
import { useQuery as useReactQuery } from '@tanstack/react-query';
import { FlightSearchRequest } from 'flights/types/request/FlightSearchRequest';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import HorizontalItemCard from './HorizontalItemCard/HorizontalItemCard';
import { useRouter } from 'next/router';
import ArrowRight from 'public/icons/assets/flights/arrow_right-short.svg';
import {
  EmptyState as EmptyStateIllustration,
  IconWrapper,
} from '@simplenight/ui';
import { checkIfAnyNull } from 'helpers/arrayUtils';
import { parseQueryNumber } from 'helpers/stringUtils';
import { CustomWindow } from 'types/global/CustomWindow';
import { useQueryShallowSetter } from 'hooks/pageInteraction/useQuerySetter';
import ChevronRight from 'public/icons/assets/chevron-right.svg';

import HorizontalSkeletonList from './HorizontalItemCard/HorizontalSkeletonList';
import EmptyStateContainer from 'components/global/EmptyStateContainer/EmptyStateContainer';
import FlightsBreadcrumbs from '../FlightsBreadcrumbs/FlightsBreadcrumbs';
import FlightInfo from '../FlightInfo/FlightInfo';
import { useCategorySlug } from 'hooks/category/useCategory';
import { useFlightsStore } from 'hooks/flights/useFligthsStore';
import { usePassengersStore } from 'hooks/flights/usePassengersStore';
import {
  FlightItem,
  FlightResponse,
} from 'flights/types/response/FlightSearchResponseMS';
import { useSelector } from 'react-redux';
import HorizontalSkeletonCard from './HorizontalItemCard/HorizontalSkeletonCard';
import FiltersIcon from 'public/icons/assets/filters.svg';
import FlightSecondarySearchOptions from './FlightSecondarySearchOptions';
import FlightFilterFormDesktop from './FlightFilterFormDesktop';
import moment from 'moment';

declare let window: CustomWindow;

interface FlightResultsDisplayProps {
  FlightCategory: CategoryOption;
}

const FlightResultsDisplay = ({
  FlightCategory,
}: FlightResultsDisplayProps) => {
  const { ClientSearcher: Searcher } = FlightCategory.core;
  const [t, i18next] = useTranslation('flights');
  const noResultsLabel = t('noResultsSearch', 'No Results Match Your Search.');
  const flightsFoundLabelDesktop = t('results', 'Results');
  const loadMoreLabel = t('loadMore', 'Load More');
  const { language } = i18next;
  const router = useRouter();
  const setQueryParams = useQueryShallowSetter();
  const [queryFilter, setQueryFilters] = useState(router.query);
  const setFlightsStore = useFlightsStore((state) => state.setFlights);

  const setPassengersQuantity = usePassengersStore(
    (state) => state.setPassengersQuantity,
  );

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

    // multi city
    startAirports,
    endAirports,
    startDates,
    cabinType,
    // Query filter
    isFiltersOpen,
    // sortBy,
    minPrice,
    maxPrice,
    departureTimes,
    arrivalTimes,
    stops,
    airlines,
    cities,
  } = useQuery();

  const [flights, setFlights] = useState<Array<Array<FlightItem>>>([]);

  const [selectedFlights, setSelectedFlights] = useState<FlightItem[]>([]);
  const [flightsFiltered, setFlightsFiltered] = useState<FlightItem[]>([]);
  const [flightsSearched, setFlightsSearched] = useState<FlightItem[]>([]);

  const [currency, setCurrency] = useState<string>(window.currency);
  const storeCurrency = useSelector((state: any) => state.core.currency);

  const { slug } = useQuery();
  const apiUrl = useCategorySlug(slug as string)?.apiUrl ?? '';

  const isOneWay = direction === 'one_way';
  const isRoundTrip = direction === 'round_trip';
  const isMultiCity = direction === 'multicity';

  const params: FlightSearchRequest = {
    direction: direction as unknown as string,
    cabin_type: cabinType as unknown as string,

    origin: startAirport as unknown as string,
    destination: endAirport as unknown as string,
    departure_date: formatAsSearchDate(startDate as unknown as string),

    adults: parseQueryNumber(adults ?? ''),
    children: parseQueryNumber(children ?? ''),
    infants: parseQueryNumber(infants ?? ''),
    children_ages: childrenAges as unknown as string,
    infants_ages: infantsAges as unknown as string,

    start_airports: startAirports as unknown as string,
    end_airports: endAirports as unknown as string,

    start_airport: startAirport as unknown as string,
    end_airport: endAirport as unknown as string,
    start_dates: startDates as unknown as string,
    start_date: formatAsSearchDate(startDate as unknown as string),
    end_date: formatAsSearchDate(endDate as unknown as string),

    currency: currency as unknown as string,
    apiUrl,
  };
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  if (!isOneWay) {
    params.return_date = formatAsSearchDate(endDate as unknown as string);
  }

  const hasEmptyValues = checkIfAnyNull([
    direction,
    startAirport,
    endAirport,
    startDate,
    adults,
  ]);

  const hasEmptyValuesMultiCity = checkIfAnyNull([
    startAirports,
    endAirports,
    startDates,
  ]);

  const fetchFligths = async () => {
    if (hasEmptyValues) return;
    if (isMultiCity && hasEmptyValuesMultiCity) return;
    try {
      const results: FlightResponse = await Searcher?.request?.(
        params,
        i18next,
      );

      return results.flights;
    } catch (e) {
      console.error(e);
    }
  };

  const { data, isLoading } = useReactQuery(
    ['flights-search', params],
    fetchFligths,
    { retry: false, staleTime: Infinity, refetchOnWindowFocus: false },
  );

  const toggleFilters = () => {
    setQueryParams({
      isFiltersOpen: queryFilter?.isFiltersOpen ? '' : 'true',
    });
  };

  useEffect(() => {
    if (currency !== storeCurrency) setCurrency(storeCurrency);
  }, [storeCurrency]);

  useEffect(() => {
    if (data) {
      setFlights(data);
    }
  }, [data]);

  useEffect(() => {
    if (flights && !!flights.length) {
      const _flightsFiltered: FlightItem[] = [];
      const _flightsSearched: FlightItem[] = [];
      flights[currentIndex]
        .filter((flight) => {
          if (selectedFlights.length > 0) {
            return selectedFlights
              .map((leg) => leg.legId)
              .every((legId) => flight.offer?.legRef?.includes(legId));
          }
          return true;
        })
        .forEach((flight: FlightItem) => {
          // Filter data according to query filters
          let isValid = true;
          const segmentsCollection = flight?.segments?.collection;
          // stops
          const totalStops = segmentsCollection.length - 1;
          if (stops && !stops.includes(`${totalStops}`)) isValid = false;
          // price
          const totalAmount = +flight?.offer.totalAmount;
          if (minPrice && parseFloat(minPrice as string) > totalAmount)
            isValid = false;
          if (maxPrice && parseFloat(maxPrice as string) < totalAmount)
            isValid = false;
          // Departure Times & Arrival times
          const departureTime = moment(
            segmentsCollection[0]?.departureDateTime,
          ).format('H');
          const arrivalTime = moment(
            segmentsCollection[totalStops]?.arrivalDateTime,
          ).format('H');
          if (
            departureTimes &&
            departureTimes.toString().split(',').length === 2
          ) {
            const departureTimesList = departureTimes.toString().split(',');
            if (parseInt(departureTimesList[0]) > parseInt(departureTime))
              isValid = false;
            if (parseInt(departureTimesList[1]) < parseInt(departureTime))
              isValid = false;
          }
          if (arrivalTimes && arrivalTimes.toString().split(',').length === 2) {
            const arrivalTimesList = arrivalTimes.toString().split(',');
            if (parseInt(arrivalTimesList[0]) > parseInt(arrivalTime))
              isValid = false;
            if (parseInt(arrivalTimesList[1]) < parseInt(arrivalTime))
              isValid = false;
          }

          // Airlines & Cities
          const airlinesList: string[] = [];
          const citiesList: string[] = [];
          segmentsCollection.forEach((segment) => {
            if (!airlinesList.includes(segment?.marketingCarrierName))
              airlinesList.push(segment?.marketingCarrierName);
            if (!citiesList.includes(segment?.departureAirportName))
              citiesList.push(segment?.departureAirportName);
            if (!citiesList.includes(segment?.arrivalAirportName))
              citiesList.push(segment?.arrivalAirportName);
          });

          if (airlines) {
            const hasAirline = airlines
              .toString()
              .split(',')
              .some((airline) => airlinesList.includes(airline));

            if (!hasAirline) isValid = false;
          }
          if (cities) {
            const hasCity = cities
              .toString()
              .split(',')
              .some((city) => citiesList.includes(city));

            if (!hasCity) isValid = false;
          }

          if (isValid) _flightsFiltered.push(flight);

          // Keep origin value for create UI filters
          _flightsSearched.push(flight);
        });
      setFlightsFiltered(_flightsFiltered);
      setFlightsSearched(_flightsSearched);
      localStorage.setItem('flightsSearched', JSON.stringify(_flightsSearched));
    }
  }, [flights, currentIndex, selectedFlights]);

  const selectFlight = (flight: FlightItem) => {
    const nextIndex = selectedFlights.length + 1;

    if (nextIndex < flights.length) {
      setCurrentIndex(nextIndex);
      setSelectedFlights((flights) => [...flights, flight]);
    } else {
      setFlightsStore([...selectedFlights, flight]);
      setSelectedFlights((flights) => [...flights, flight]);
      setPassengersQuantity(
        parseInt(adults as string, 10) +
          parseInt(children as string, 10) +
          parseInt(infants as string, 10),
      );
      router.push(`/detail/flights/${direction}`);
    }
  };

  const FlightList = () => (
    <ul role="list" className="space-y-4">
      {flightsFiltered.map((flight: FlightItem, index) => {
        let price = flight.offer?.totalAmount;
        if (selectedFlights[currentIndex - 1]) {
          const lastPrice =
            selectedFlights[currentIndex - 1].offer?.totalAmount;
          price = `+US$${(+price - +lastPrice).toFixed(2)}`;
        } else {
          price = `US$${(+price).toFixed(2)}`;
        }

        if (index < page * pageItems) {
          return (
            <HorizontalItemCard
              key={`flight_${flight.legId}_${flight.offer.id}`}
              item={flight}
              price={price}
              selectFlight={selectFlight}
            />
          );
        }
      })}
      {/* {flightsFiltered.length > page * pageItems && (
        <section className="w-full mx-auto lg:w-fit">
          <Button onClick={() => setPage(page + 1)}>{loadMoreLabel}</Button>
        </section>
      )} */}
    </ul>
  );

  return (
    <>
      <section className="lg:flex lg:w-full">
        {!isLoading && flights.length > 0 && (
          <FlightsBreadcrumbs
            step={1}
            content={
              <>
                {selectedFlights.map((flight, idx) => {
                  const flightSegments = flight.segments.collection || [];
                  const firstSegment = flightSegments[0];
                  const lastSegment = flightSegments[flightSegments.length - 1];
                  const airline = firstSegment.marketingCarrierName;
                  const departure = firstSegment.departureAirport;
                  const arrival = lastSegment.arrivalAirport;
                  const isLastFlight = idx === selectedFlights.length - 1;
                  return (
                    <>
                      <FlightInfo
                        key={idx}
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
                {selectedFlights?.length > 0 && (
                  <IconWrapper size={20}>
                    <ChevronRight className="text-dark-500" />
                  </IconWrapper>
                )}
                <span className="flex flex-row items-center text-sm text-center">
                  <span className="ml-2">
                    {
                      flightsFiltered?.[0]?.segments.collection?.[0]
                        ?.departureAirportName
                    }
                  </span>
                  <IconWrapper size={16}>
                    <ArrowRight />
                  </IconWrapper>
                  <span>
                    {
                      flightsFiltered?.[0]?.segments.collection?.[
                        (flightsFiltered?.[0]?.segments.collection?.length ||
                          1) - 1
                      ]?.arrivalAirportName
                    }
                  </span>
                </span>
              </>
            }
          />
        )}
        {isFiltersOpen && (
          <section className="hidden lg:block lg:min-w-[16rem] lg:max-w[18rem] lg:w-[25%]">
            <FlightFilterFormDesktop flights={flightsSearched} />
          </section>
        )}
        <section className="lg:flex-1 lg:w-[75%] h-full pt-9">
          {isLoading ? (
            <section className="w-full h-full px-5 pb-6 mt-[40px] lg:pt-0">
              <HorizontalSkeletonList />
            </section>
          ) : (
            <>
              <section className="w-full h-full px-5 pb-6">
                <section className="lg:py-6 text-dark-1000 font-semibold text-[20px] leading-[20px] flex justify-between items-center">
                  <section className="flex flex-row items-center lg:pt-8 pb-3 text-base">
                    {!isFiltersOpen && (
                      <button
                        className="p-2 m-2 border-2 rounded-full text-primary-100 border-primary-100"
                        onClick={toggleFilters}
                      >
                        <FiltersIcon className="text-primary-1000" />
                      </button>
                    )}
                    <span>
                      {`${flightsFiltered?.length} ${flightsFoundLabelDesktop}`}{' '}
                    </span>
                  </section>
                  <section className="relative flex gap-1 px-3 py-1 rounded bg-primary-100 lg:bg-transparent lg:px-0 lg:mr-0">
                    <FlightSecondarySearchOptions />
                  </section>
                </section>
                {flights.length > 0 ? (
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
