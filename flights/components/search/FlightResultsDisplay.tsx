import { formatAsSearchDate } from 'helpers/dajjsUtils';
import useQuery from 'hooks/pageInteraction/useQuery';
import { FlightSearchRequest } from 'flights/types/request/FlightSearchRequest';
import {
  Flight,
  FlightSearchResponse,
  MinRate,
  Rate,
} from 'flights/types/response/SearchResponse';
import React, { ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import HorizontalItemCard from './HorizontalItemCard/HorizontalItemCard';
import { useRouter } from 'next/router';
import FlightMapView from './FlightResultsMapView';
import EmptyState from '../../../components/global/EmptyState/EmptyState';
import EmptyStateIcon from 'public/icons/assets/empty-state.svg';
import { checkIfAnyNull } from 'helpers/arrayUtils';
import { parseQueryNumber } from 'helpers/stringUtils';
import { StringGeolocation } from 'types/search/Geolocation';
import { useSelector } from 'react-redux';
import { CustomWindow } from 'types/global/CustomWindow';
import Loader from '../../../components/global/Loader/Loader';
import FlightItemRateInfo from './FlightItemRateInfo';
import { sortByAdapter } from 'flights/adapters/sort-by.adapter';
import { cancellationTypeAdapter } from 'flights/adapters/cancellation-type.adapter';
import MapIcon from 'public/icons/assets/map.svg';
import ListIcon from 'public/icons/assets/list.svg';
import classnames from 'classnames';
import useQuerySetter from 'hooks/pageInteraction/useQuerySetter';
import FlightFilterFormDesktop from './FlightFilterFormDesktop';
import PriceDisplay from 'flights/components/PriceDisplay/PriceDisplay';
import FlightCancellable from './FlightCancellable';
import Button from 'components/global/Button/Button';

declare let window: CustomWindow;

interface FlightResultsDisplayProps {
  FlightCategory: CategoryOption;
}

interface ViewButtonProps {
  children: ReactNode;
  viewParam: 'list' | 'map';
}

const FlightResultsDisplay = ({ FlightCategory }: FlightResultsDisplayProps) => {
  const [loaded, setLoaded] = useState(false);
  const { ClientSearcher: Searcher } = FlightCategory.core;
  const [t, i18next] = useTranslation('flights');
  const flightsFoundLabel = t('flightsFound', 'Flights Found');
  const flightsFoundLabelDesktop = t('results', 'Results');
  const flightLabel = t('flight', 'Flight');
  const noResultsLabel = t('noResultsSearch', 'No Results Match Your Search.');
  const fromLabel = t('from', 'From');
  const departingFlightsLabel = t('departingFlights', 'Departing Flights');
  const returningFlightsLabel = t('returningFlights', 'Returning Flights');
  const { language } = i18next;
  const router = useRouter();
  const setQueryParams = useQuerySetter();

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
    keywordSearch,
    sortBy,
    minPrice,
    maxPrice,
  } = useQuery();

  const [flights, setFlights] = useState<Flight[]>([]);
  const [flightIndex, setFlightIndex] = useState<number>(0);
  // It could be useful
  // const { memoizedFilterFlights } = useFilter(flights, keywordSearch as string);

  const [currency, setCurrency] = useState<string>(window.currency);
  const storeCurrency = useSelector((state: any) => state.core.currency);

  useEffect(() => {
    if (currency !== storeCurrency) setCurrency(storeCurrency);
  }, [storeCurrency]);

  useEffect(() => {
    const hasEmptyValues = checkIfAnyNull([
      direction,
      startAirport,
      endAirport,
      startDate,
      // endDate,
      adults,
      // children,
      // infants,
      // childrenAges,
      // infantsAges,
      // latitude,
      // longitude,
    ]);
    if (hasEmptyValues) return;

    const geolocation = `${latitude},${longitude}`;

    const params: FlightSearchRequest = {
      direction: direction as unknown as string,
      start_airport: startAirport as unknown as string,
      end_airport: endAirport as unknown as string,
      start_date: formatAsSearchDate(startDate as unknown as string),
      end_date: formatAsSearchDate(endDate as unknown as string),
      adults: parseQueryNumber(adults ?? ''),
      children: parseQueryNumber(children ?? ''),
      infants: parseQueryNumber(infants ?? ''),
      children_ages: childrenAges as unknown as string,
      infants_ages: infantsAges as unknown as string,
    };

    Searcher?.request(params, i18next)
      .then(({ flights: searchedFlights }: FlightSearchResponse) => {
        console.log('searchedFlights', searchedFlights);
        setFlights(searchedFlights);
        localStorage.setItem('lastSearchResponse', JSON.stringify(searchedFlights));
      })
      .catch((error) => console.error(error))
      .then(() => setLoaded(true));
  }, [
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
    language,
    currency,
    sortBy,
    minPrice,
    maxPrice,
  ]);

  const handleOnViewDetailClick = (flight: Flight) => {
    const { id } = flight;
    router.push(
      `/detail/flights/${id}?direction=${direction}&startAirport=${startAirport}&endAirport=${endAirport}&startDate=${startDate}&endDate=${endDate}&adults=${adults}&children=${children}&infants=${infants}&childrenAges=${childrenAges}&infantsAges=${infantsAges}&geolocation=${latitude},${longitude}`,
    );
  };

  const FlightList = () => (
    <ul role="list" className="space-y-4">
      {flights.map((flight, index) => {
        return (
          <HorizontalItemCard
            key={`flight_${index}`}
            icon={FlightCategory.icon}
            categoryName={flightLabel}
            handleOnViewDetailClick={() => handleOnViewDetailClick(flight)}
            className=" flex-0-0-auto"
            item={flight}
            itemIndex={flightIndex}
          />
        );
      })}
    </ul>
  );
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
        <section className="hidden lg:block lg:min-w-[16rem] lg:max-w[18rem] lg:w-[25%]">
          <FlightFilterFormDesktop
            flights={flights}
            itemIndex={flightIndex}
          />
        </section>
        <section className="lg:flex-1 lg:w-[75%] h-full">
          {!loaded ? (
            <Loader />
          ) : flights.length > 0 ? (
            <>
              {isListView && (
                <section className="w-full h-full px-5 pb-6 pt-20 lg:pt-0">
                  <section className="py-6 text-dark-1000 font-semibold text-[20px] leading-[24px] lg:flex lg:justify-between lg:items-center">
                    <section className="flex flex-row mb-3 lg:mb-0">
                      {direction === 'round_trip' && (
                        <>
                          <Button
                            value={departingFlightsLabel}
                            color="outlined"
                            className={
                              flightIndex < 1
                                ? 'p-3 mr-3 text-[15px] font-normal bg-primary-100 border border-primary-1000 text-primary-1000 whitespace-nowrap hover:text-white'
                                : 'p-3 mr-3 text-[15px] font-normal bg-white border border-primary-300 text-primary-1000 whitespace-nowrap hover:text-white'
                            }
                            size="full"
                            onClick={() => setFlightIndex(0)}
                          />
                          <Button
                            value={returningFlightsLabel}
                            color="outlined"
                            className={
                              flightIndex === 1
                                ? 'p-3 text-[15px] font-normal bg-primary-100 border border-primary-1000 text-primary-1000 whitespace-nowrap hover:text-white'
                                : 'p-3 text-[15px] font-normal bg-white border border-primary-300 text-primary-1000 whitespace-nowrap hover:text-white'
                            }
                            size="full"
                            onClick={() => setFlightIndex(1)}
                          />
                        </>
                      )}
                      {direction === 'multi_city' && (
                        <>
                          <Button
                            value={departingFlightsLabel}
                            color="outlined"
                            className={
                              flightIndex < 1
                                ? 'p-3 mr-3 text-[15px] font-normal bg-primary-100 border border-primary-1000 text-primary-1000 whitespace-nowrap hover:text-white'
                                : 'p-3 mr-3 text-[15px] font-normal bg-white border border-primary-300 text-primary-1000 whitespace-nowrap hover:text-white'
                            }
                            size="full"
                            onClick={() => setFlightIndex(0)}
                          />
                        </>
                      )}
                    </section>
                    <section>
                      {flights.length}
                      <span className="lg:hidden"> {flightsFoundLabel}</span>
                      <span className="hidden lg:inline">
                        {' '}
                        {flightsFoundLabelDesktop}
                      </span>
                    </section>
                  </section>
                  <FlightList />
                </section>
              )}
            </>
          ) : (
            <EmptyState
              text={noResultsLabel}
              image={<EmptyStateIcon className="mx-auto" />}
            />
          )}
        </section>
      </section>
    </>
  );
};

export default FlightResultsDisplay;
