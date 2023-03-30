/* eslint-disable */
import { formatAsSearchDate } from 'helpers/dajjsUtils';
import useQuery from 'hooks/pageInteraction/useQuery';
import { useQuery as useReactQuery } from '@tanstack/react-query';
import { FlightSearchRequest } from 'flights/types/request/FlightSearchRequest';
import {
  Flight,
  FlightOffer,
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
import {
  EmptyState as EmptyStateIllustration,
  Itinerary,
} from '@simplenight/ui';
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
import { Item } from 'types/cart/CartType';
import HorizontalSkeletonList from 'components/global/HorizontalItemCard/HorizontalSkeletonList';
import SortIcon from 'public/icons/assets/sort.svg';
import Dropdown from 'components/global/Dropdown/Dropdown';
import FlightSecondarySearchOptions from './FlightSecondarySearchOptions';
import Sort from '@/icons/assets/sort.svg';
import Chevron from '@/icons/assets/chevron-down-small.svg';
import { Radio, RadioGroup } from 'components/global/Radio/Radio';
import EmptyStateContainer from 'components/global/EmptyStateContainer/EmptyStateContainer';

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
  const setQueryParams = useQuerySetter();
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

    selected,
  } = useQuery();

  const [sortBy, setSortBy] = useState<string>('sortByPriceAsc');
  const [showSortingDropdown, setShowSortingDropdown] = useState(false);

  const onSortByChange = (_sortBy: string) => {
    setSortBy(_sortBy);
  };

  const [flights, setFlights] = useState<Flight[]>([]);
  const [offers, setOffers] = useState<FlightOffer[]>([]);
  const [flightsSearched, setFlightsSearched] = useState<Flight[]>([]);
  const [flightsFiltered, setFlightsFiltered] = useState<Flight[]>([]);

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

    currency: currency as unknown as string,
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

  const handleFlightClick = (flight: Flight) => {
    const _flightsSelected: string[] = [];
    for (let i = 0; i < flightIndex; i += 1) {
      if (flightsSelected[i]) _flightsSelected.push(flightsSelected[i]);
    }
    const { legId } = flight;
    _flightsSelected.push(legId);
    setFlightsSelected(_flightsSelected);
    localStorage.setItem('flightsSelected', JSON.stringify(_flightsSelected));

    if (flightIndex + 1 < flightsCount) {
      // filterFlights(flights, offers, flightIndex + 1, _flightsSelected);
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
    } else {
      // all flights selected - goto flights detail page
      /*
      router.push(
        `/detail/flights/${_flightsSelected.join('-')}?direction=${direction}&startAirport=${startAirport}&endAirport=${endAirport}&startDate=${startDate}&endDate=${endDate}&adults=${adults}&children=${children}&infants=${infants}&childrenAges=${childrenAges}&infantsAges=${infantsAges}&geolocation=${latitude},${longitude}&startAirports=${startAirports}&endAirports=${endAirports}&startDates=${startDates}`,
      );
      */
    }
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

  const FlightList = () => (
    <ul role="list" className="space-y-4">
      {flightsFiltered.map((flight: Flight, index: number) => {
        const cartItem: Item = {
          category: 'FLIGHTS',
          sector: 'other',
          booking_data: {
            inventory_id: '7e6cfd32:7264P3',
            search: {
              direction: direction as string,

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

              currency: currency as unknown as string,
            },
            flights: getFlightsByIds(flights, flightsSelected),
          },
        };
        if (index < page * pageItems)
          return (
            <HorizontalItemCard
              cartItem={cartItem}
              key={`flight_${index}`}
              item={flight}
              showAllOffers={flightIndex + 1 === flightsCount}
              currency={currency}
              icon={FlightCategory.icon}
              categoryName={flightLabel}
              handleFlightClick={() => handleFlightClick(flight)}
              className={
                flightsSelected.indexOf(flight?.legId) > -1
                  ? 'bg-primary-100 border-primary-1000'
                  : 'bg-white border-dark-300'
              }
            />
          );
      })}
      {flightsFiltered.length > page * pageItems && (
        <section className="flex justify-center w-full">
          <Button
            value={loadMoreLabel}
            color="outlined"
            className="p-3 text-[15px] font-normal bg-primary-100 border border-primary-1000 text-primary-1000 whitespace-nowrap hover:text-white hover:bg-primary-1000 lg:w-[200px]"
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
          <FlightFilterFormDesktop flights={flightsSearched} />
        </section>
        <section className="lg:flex-1 lg:w-[75%] h-full">
          {isLoading ? (
            <section className="w-full h-full px-5 pb-6 mt-[40px] lg:pt-0">
              <HorizontalSkeletonList />
            </section>
          ) : flightsFiltered.length > 0 ? (
            <>
              {isListView && (
                <section className="w-full h-full px-5 pb-6">
                  <section className="py-6 text-dark-1000 font-semibold text-[20px] leading-[20px] flex justify-between items-center">
                    <section className="py-4">
                      {flightsFiltered.length}
                      <span className="lg:hidden"> {flightsFoundLabel}</span>
                      <span className="hidden lg:inline">
                        {' '}
                        {flightsFoundLabelDesktop}
                      </span>
                    </section>

                    <section className="flex flex-row hidden mb-3 lg:mb-0 lg:block">
                      {direction === 'round_trip' && (
                        <>
                          <span
                            className={
                              flightIndex < 1
                                ? 'px-4 py-2 mr-3 text-[15px] font-normal bg-primary-100 border border-primary-1000 text-primary-1000 whitespace-nowrap rounded-4 cursor-pointer'
                                : 'px-4 py-2 mr-3 text-[15px] font-normal bg-white-1000 border border-dark-200 text-dark-1000 whitespace-nowrap rounded-4 cursor-pointer'
                            }
                            onClick={() =>
                              flightIndex > 0 && onChangeFlightIndex(0)
                            }
                          >
                            {departingFlightsLabel}
                          </span>
                          <span
                            className={
                              flightIndex === 1
                                ? 'px-4 py-2 text-[15px] font-normal bg-primary-100 border border-primary-1000 text-primary-1000 whitespace-nowrap rounded-4 cursor-pointer'
                                : 'px-4 py-2 text-[15px] font-normal bg-white-1000 border border-dark-200 text-dark-1000 whitespace-nowrap rounded-4 cursor-pointer'
                            }
                          >
                            {returningFlightsLabel}
                          </span>
                        </>
                      )}
                      {direction === 'multi_city' && (
                        <>
                          {startAirports
                            ?.toString()
                            .split('|')
                            .map((item, index) => (
                              <span
                                key={`tab_flight_${index}`}
                                color="outlined"
                                className={
                                  flightIndex === index
                                    ? 'px-4 py-2 mr-3 text-[15px] font-normal bg-primary-100 border border-primary-1000 text-primary-1000 whitespace-nowrap rounded-4 cursor-pointer'
                                    : 'px-4 py-2 mr-3 text-[15px] font-normal bg-white-1000 border border-dark-200 text-dark-1000 whitespace-nowrap rounded-4 cursor-pointer'
                                }
                                onClick={() =>
                                  index < flightIndex &&
                                  onChangeFlightIndex(index)
                                }
                              >{`${
                                startAirports?.toString().split('|')[index]
                              } - ${
                                endAirports?.toString().split('|')[index]
                              }`}</span>
                            ))}
                        </>
                      )}
                    </section>

                    <section className="relative flex gap-1 px-3 py-1 rounded bg-primary-100 lg:bg-transparent lg:px-0 lg:mr-0">
                      <section className="flex items-center justify-start w-auto">
                        <button
                          className="flex items-center h-6 gap-2 mr-2"
                          onClick={() => setShowSortingDropdown((p) => !p)}
                          onBlur={() => setShowSortingDropdown(false)}
                        >
                          <span className="text-primary-1000">
                            <Sort />
                          </span>
                          <span className="flex-1 text-xs font-semibold text-left text-dark-1000">
                            <span className="hidden lg:inline whitespace-nowrap">
                              {t(sortBy)}
                            </span>
                            <span className="inline lg:hidden">
                              {t('sort')}
                            </span>
                          </span>
                          <span className="text-dark-800">
                            <Chevron />
                          </span>
                        </button>

                        <section
                          className={`absolute z-[9] border border-dark-300 rounded shadow-container top-[100%] right-0 bg-white w-[256px] transition-all duration-500 text-dark-1000 ${
                            !showSortingDropdown && 'opacity-0 invisible'
                          }`}
                        >
                          <RadioGroup
                            onChange={onSortByChange}
                            value={sortBy}
                            gap="gap-0"
                          >
                            <Radio
                              value="sortByPriceAsc"
                              containerClass="px-3 py-2 border-b border-dark-200"
                            >
                              {t('sortByPriceAsc')}
                            </Radio>
                            <Radio
                              value="sortByPriceDesc"
                              containerClass="px-3 py-2 border-b border-dark-200"
                            >
                              {t('sortByPriceDesc')}
                            </Radio>
                          </RadioGroup>
                        </section>
                      </section>

                      <FlightSecondarySearchOptions />
                    </section>
                  </section>
                  <FlightList />
                </section>
              )}
            </>
          ) : (
            <EmptyStateContainer
              text={noResultsLabel}
              Icon={EmptyStateIllustration}
              width={114}
              desktopWidth={223}
            />
          )}
        </section>
      </section>
    </>
  );
};

export default FlightResultsDisplay;
