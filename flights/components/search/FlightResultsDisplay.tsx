import { formatAsSearchDate } from 'helpers/dajjsUtils';
import useQuery from 'hooks/pageInteraction/useQuery';
import { useQuery as useReactQuery } from '@tanstack/react-query';
import { FlightSearchRequest } from 'flights/types/request/FlightSearchRequest';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import HorizontalItemCard from './HorizontalItemCard/HorizontalItemCard';
import { useRouter } from 'next/router';

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

    selected,
    cabinType,
  } = useQuery();

  const [flights, setFlights] = useState<Array<Array<FlightItem>>>([]);

  const [selectedFlights, setSelectedFlights] = useState<FlightItem[]>([]);

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

  useEffect(() => {
    if (currency !== storeCurrency) setCurrency(storeCurrency);
  }, [storeCurrency]);

  useEffect(() => {
    if (data) {
      setFlights(data);
    }
  }, [data]);

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
      {flights[currentIndex]
        .filter((flight) => {
          if (selectedFlights.length > 0) {
            return selectedFlights
              .map((leg) => leg.legId)
              .every((legId) => flight.offers?.[0].legRef?.includes(legId));
          }
          return true;
        })
        .map((flight: FlightItem, index: number) => {
          let price = flight.offers?.[0].totalAmount;
          if (selectedFlights[currentIndex - 1]) {
            const lastPrice = Number(
              selectedFlights[currentIndex - 1].offers?.[0].totalAmount,
            );
            price = `+ $${Number(price) - lastPrice}`;
          } else {
            price = `$${price}`;
          }

          if (index < page * pageItems)
            return (
              <HorizontalItemCard
                key={`flight_${index}`}
                item={flight}
                price={price}
                selectFlight={selectFlight}
              />
            );
        })}
      {/* {flights.length > page * pageItems && (
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
            content={selectedFlights.map((flight, idx) => {
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
          />
        )}
        {/* {filters === 'open' && (
          <section className="hidden lg:block lg:min-w-[16rem] lg:max-w[18rem] lg:w-[25%]">
            <FlightFilterFormDesktop flights={flightsSearched} />
          </section>
        )} */}
        <section className="lg:flex-1 lg:w-[75%] h-full pt-9">
          {isLoading ? (
            <section className="w-full h-full px-5 pb-6 mt-[40px] lg:pt-0">
              <HorizontalSkeletonList />
            </section>
          ) : (
            <>
              <section className="w-full h-full px-5 pb-6">
                <section className="py-6 text-dark-1000 font-semibold text-[20px] leading-[20px] flex justify-between items-center">
                  <section className="flex flex-row items-center py-3 text-base">
                    {/* {filters !== 'open' && (
                      <button
                        className="p-2 m-2 border-2 rounded-full text-primary-100 border-primary-100"
                        onClick={toggleFilters}
                      >
                        <FiltersIcon className="text-primary-1000" />
                      </button>
                    )} */}
                    <span>
                      {`${flights.length} ${flightsFoundLabelDesktop}`}{' '}
                    </span>
                  </section>
                  <section className="relative flex gap-1 px-3 py-1 rounded bg-primary-100 lg:bg-transparent lg:px-0 lg:mr-0">
                    {/* <FlightSecondarySearchOptions /> */}
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
