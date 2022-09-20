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
import moment from 'moment';

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
  const flightsFoundLabel = t('flightsFound', 'Flights Found');
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
  const setQueryParams = useQuerySetter();

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
    sortBy,
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
  } = useQuery();

  const [flights, setFlights] = useState<Flight[]>([]);
  const [flightsFiltered, setFlightsFiltered] = useState<Flight[]>([]);
  const [flightIndex, setFlightIndex] = useState<number>(0);

  const [currency, setCurrency] = useState<string>(window.currency);
  const storeCurrency = useSelector((state: any) => state.core.currency);

  const onChangeFlightIndex = (value: number) => {
    setFlightIndex(value);
    localStorage.setItem('flightIndex', `${value}`);
  };

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

    if (direction === 'multi_city') {
      const hasEmptyValuesMultiCity = checkIfAnyNull([
        startAirports,
        endAirports,
        startDates,
      ]);
      if (hasEmptyValuesMultiCity) return;
    }

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

      start_airports: startAirports as unknown as string,
      end_airports: endAirports as unknown as string,
      start_dates: startDates as unknown as string,
    };

    Searcher?.request(params, i18next)
      .then(({ flights: searchedFlights }: FlightSearchResponse) => {
        console.log('searchedFlights', searchedFlights);
        setFlights(searchedFlights);
        filterFlights(searchedFlights);
        localStorage.setItem(
          'lastSearchResponse',
          JSON.stringify(searchedFlights),
        );
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
    departureTimes,
    arrivalTimes,
    stops,
    airlines,
    cities,

    startAirports,
    endAirports,
    startDates,
  ]);

  const handleOnViewDetailClick = (flight: Flight) => {
    const { sequenceNumber } = flight;
    router.push(
      `/detail/flights/${sequenceNumber}?direction=${direction}&startAirport=${startAirport}&endAirport=${endAirport}&startDate=${startDate}&endDate=${endDate}&adults=${adults}&children=${children}&infants=${infants}&childrenAges=${childrenAges}&infantsAges=${infantsAges}&geolocation=${latitude},${longitude}&startAirports=${startAirports}&endAirports=${endAirports}&startDates=${startDates}`,
    );
  };

  const filterFlights = (_flights: Flight[]) => {
    const _flightsFiltered: Flight[] = [];

    _flights.forEach((item: Flight, index: number) => {
      const amount =
        item?.airItineraryPricingInfo[0]?.itinTotalFare?.totalFare?.amount;
      const itemFlight =
        item?.airItinerary?.originDestinationOptions?.originDestinationOption[
          flightIndex
        ];
      const _stops = itemFlight?.flightSegment.length - 1;
      let stopsLabel = `${stops} ${stopsText}`;
      if (_stops < 1) stopsLabel = directText;
      else if (_stops < 2) stopsLabel = `1 ${stopText}`;
      const _departureTime = moment(
        itemFlight?.flightSegment[0]?.departureDateTime,
      ).format('H');
      const _arrivalTime = moment(
        itemFlight?.flightSegment[itemFlight?.flightSegment.length - 1]
          ?.arrivalDateTime,
      ).format('H');
      const _airlines: string[] = [];
      const _cities: string[] = [];
      itemFlight?.flightSegment.forEach((segment, index) => {
        if (_airlines.indexOf(segment?.operatingAirline?.code) < 0)
          _airlines.push(segment?.operatingAirline?.code);
        if (_cities.indexOf(segment?.departureAirport?.locationCode) < 0)
          _cities.push(segment?.departureAirport?.locationCode);
        if (_cities.indexOf(segment?.arrivalAirport?.locationCode) < 0)
          _cities.push(segment?.arrivalAirport?.locationCode);
      });

      let valid = true;
      if (minPrice && parseInt(minPrice as string) > amount) valid = false;
      if (maxPrice && parseInt(maxPrice as string) < amount) valid = false;
      if (stops && stops.indexOf(stopsLabel) < 0) valid = false;
      if (departureTimes && departureTimes.toString().split(',').length === 2) {
        const _departureTimes = departureTimes.toString().split(',');
        if (parseInt(_departureTimes[0]) > parseInt(_departureTime))
          valid = false;
        if (parseInt(_departureTimes[1]) < parseInt(_departureTime))
          valid = false;
      }
      if (arrivalTimes && arrivalTimes.toString().split(',').length === 2) {
        const _arrivalTimes = arrivalTimes.toString().split(',');
        if (parseInt(_arrivalTimes[0]) > parseInt(_arrivalTime)) valid = false;
        if (parseInt(_arrivalTimes[1]) < parseInt(_arrivalTime)) valid = false;
      }
      if (airlines) {
        airlines
          .toString()
          .split(',')
          .forEach((airline, index) => {
            if (_airlines.indexOf(airline) < 0) valid = false;
          });
      }
      if (cities) {
        cities
          .toString()
          .split(',')
          .forEach((city, index) => {
            if (_cities.indexOf(city) < 0) valid = false;
          });
      }

      if (valid) _flightsFiltered.push(item);
    });

    // sort by price
    if (sortBy && sortBy === 'sortByPriceDesc')
      _flightsFiltered.sort((a, b) =>
        a?.airItineraryPricingInfo[0]?.itinTotalFare?.totalFare?.amount >
        b?.airItineraryPricingInfo[0]?.itinTotalFare?.totalFare?.amount
          ? -1
          : Number(
            a?.airItineraryPricingInfo[0]?.itinTotalFare?.totalFare?.amount <
                b?.airItineraryPricingInfo[0]?.itinTotalFare?.totalFare?.amount,
          ),
      );
    else
      _flightsFiltered.sort((a, b) =>
        a?.airItineraryPricingInfo[0]?.itinTotalFare?.totalFare?.amount <
        b?.airItineraryPricingInfo[0]?.itinTotalFare?.totalFare?.amount
          ? -1
          : Number(
            a?.airItineraryPricingInfo[0]?.itinTotalFare?.totalFare?.amount >
                b?.airItineraryPricingInfo[0]?.itinTotalFare?.totalFare?.amount,
          ),
      );

    setFlightsFiltered(_flightsFiltered);
  };

  const FlightList = () => (
    <ul role="list" className="space-y-4">
      {flightsFiltered.map((flight: Flight, index: number) => {
        if (index < page * pageItems)
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
      {flightsFiltered.length > page * pageItems && (
        <section className="flex w-full justify-center">
          <Button
            value={loadMoreLabel}
            color="outlined"
            className="p-3 text-[15px] font-normal bg-primary-100 border border-primary-1000 text-primary-1000 whitespace-nowrap hover:text-white lg:w-[200px]"
            size="full"
            onClick={() => setPage(page + 1)}
          />
        </section>
      )}
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
          <FlightFilterFormDesktop flights={flights} itemIndex={flightIndex} />
        </section>
        <section className="lg:flex-1 lg:w-[75%] h-full">
          {!loaded ? (
            <Loader />
          ) : flightsFiltered.length > 0 ? (
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
                            onClick={() => onChangeFlightIndex(0)}
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
                            onClick={() => onChangeFlightIndex(1)}
                          />
                        </>
                      )}
                      {direction === 'multi_city' && (
                        <>
                          {startAirports
                            ?.toString()
                            .split('|')
                            .map((item, index) => (
                              <Button
                                key={`tab_flight_${index}`}
                                value={`${
                                  startAirports?.toString().split('|')[index]
                                } - ${
                                  endAirports?.toString().split('|')[index]
                                }`}
                                color="outlined"
                                className={
                                  flightIndex === index
                                    ? 'p-3 mr-3 text-[15px] font-normal bg-primary-100 border border-primary-1000 text-primary-1000 whitespace-nowrap hover:text-white'
                                    : 'p-3 mr-3 text-[15px] font-normal bg-white border border-primary-300 text-primary-1000 whitespace-nowrap hover:text-white'
                                }
                                size="full"
                                onClick={() => onChangeFlightIndex(index)}
                              />
                            ))}
                        </>
                      )}
                    </section>
                    <section>
                      {flightsFiltered.length}
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
