import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useRouter } from 'next/router';
import RangeSlider from 'flights/components/RangeSlider/RangeSlider';
import TimeRangeSlider from '../TimeRangeSlider/TimeRangeSlider';
import { useQueryShallowSetter } from 'hooks/pageInteraction/useQuerySetter';
import { FlightItem } from 'flights/types/response/FlightSearchResponseMS';
import FiltersIcon from 'public/icons/assets/filters.svg';
import CollapseUnbordered from 'components/global/CollapseUnbordered/CollapseUnbordered';
import TabSelector from 'components/global/TabSelector';
import Selector from 'components/global/Select/Selector';
import Divider from 'components/global/Divider/Divider';

const FilterMainContainer = ({ children }: { children?: any }) => (
  <section className="flex flex-col pr-6 mt-20 mb-6">{children}</section>
);

const FilterContainer = ({ children }: { children?: any }) => (
  <section className="flex flex-col pr-6 my-6">{children}</section>
);

interface FlightFilterFormDesktopProps {
  flights: FlightItem[];
}

const FlightFilterFormDesktop = ({ flights }: FlightFilterFormDesktopProps) => {
  const router = useRouter();
  const setQueryParams = useQueryShallowSetter();
  const queryFilter = router.query;
  const initialPriceRange = {
    min: '0',
    max: '10000',
  };
  const [minPrice, setMinPrice] = useState<string>(
    (queryFilter?.minPrice as string) || initialPriceRange.min,
  );
  const [maxPrice, setMaxPrice] = useState<string>(
    (queryFilter?.maxPrice as string) || initialPriceRange.max,
  );

  const [t] = useTranslation('flights');
  const [tg] = useTranslation('flights');
  const SORT_BY_OPTIONS = [
    { id: 'sortByPriceAsc', name: t('sortByPriceAsc') },
    { id: 'sortByPriceDesc', name: t('sortByPriceDesc') },
  ];

  const priceRangeLabel = t('priceRange', 'Price Range');
  const stopText = t('stop', 'Stop');
  const stopsText = t('stops', 'Stops');
  const directText = t('direct', 'Direct');
  const departureTimesLabel = t('departureTimes', 'Departure Times');
  const arrivalTimesLabel = t('arrivalTimes', 'Arrival Times');
  const clearFiltersText = t('clearFilters', 'Clear filters');
  const filtersText = t('filters', 'Filters');

  const [departureTimes, setDepartureTimes] = useState<string[]>(
    queryFilter?.departureTimes
      ? queryFilter.departureTimes.toString().split(',')
      : ['0', '24'],
  );
  const [arrivalTimes, setArrivalTimes] = useState<string[]>(
    queryFilter?.arrivalTimes
      ? queryFilter.arrivalTimes.toString().split(',')
      : ['0', '24'],
  );
  const [stops, setStops] = useState<string[]>([]);

  const [stopsOptions, setStopsOptions] = useState<
    Array<{ id: string; label: string; selected: boolean }>
  >([]);
  const [airlinesOptions, setAirlinesOptions] = useState<string[]>([]);
  const [citiesOptions, setCitiesOptions] = useState<string[]>([]);
  const [paymentTypes, setPaymentTypes] = useState<string[]>([
    t('freeCancellation'),
    t('payAtProperty'),
  ]);

  const FilterTitle = ({
    label,
    className = '',
  }: {
    label: string;
    className?: string;
  }) => <label className={`mb-2 ${className}`}>{label}</label>;

  const handleClearFilters = () => {
    setMinPrice(initialPriceRange.min);
    setMaxPrice(initialPriceRange.max);
    setDepartureTimes(['0', '24']);
    setArrivalTimes(['0', '24']);
    setStops([]);
    setQueryParams({
      ...queryFilter,
      // keywordSearch,
      sortBy: 'sortByPriceAsc',
      minPrice: `${initialPriceRange.min}`,
      maxPrice: `${initialPriceRange.max}`,
      departureTimes: '0,24',
      arrivalTimes: '0,24',
      stops: '',
      airlines: '',
      cities: '',
    });
  };

  const onChangeSortBy = (value: string) => {
    // setSortBy(value);
    setQueryParams({
      sortBy: value,
    });
  };

  const onChangeMinPrice = (value: string) => {
    setMinPrice(value);
    setQueryParams({
      minPrice: value,
    });
  };

  const onChangeMaxPrice = (value: string) => {
    setMaxPrice(value);
    setQueryParams({
      maxPrice: value,
    });
  };

  const onChangeMinDepartureTimes = (value: string) => {
    setDepartureTimes([value, departureTimes[1]]);
    setQueryParams({
      departureTimes: `${value},${departureTimes[1]}`,
    });
  };

  const onChangeMaxDepartureTimes = (value: string) => {
    setDepartureTimes([departureTimes[0], value]);
    setQueryParams({
      departureTimes: `${departureTimes[0]},${value}`,
    });
  };

  const onChangeMinArrivalTimes = (value: string) => {
    setArrivalTimes([value, arrivalTimes[1]]);
    setQueryParams({
      arrivalTimes: `${value},${arrivalTimes[1]}`,
    });
  };

  const onChangeMaxArrivalTimes = (value: string) => {
    setArrivalTimes([arrivalTimes[0], value]);
    setQueryParams({
      arrivalTimes: `${arrivalTimes[0]},${value}`,
    });
  };

  const onChangeCity = (value: string) => {
    setQueryParams({
      cities: value === 'all' ? '' : value,
    });
  };

  const onChangeAirline = (value: string) => {
    setQueryParams({
      airlines: value === 'all' ? '' : value,
    });
  };
  const paymentTypesChecked =
    queryFilter?.paymentTypes && typeof queryFilter.paymentTypes === 'string'
      ? queryFilter.paymentTypes.split(',')
      : [];

  const onChangePaymentTypes = (value: string) => {
    const arr = Object.assign([], paymentTypesChecked);
    if (arr.indexOf(value) < 0) arr.push(value);
    else if (arr.indexOf(value) > -1) arr.splice(arr.indexOf(value), 1);
    setQueryParams({
      paymentTypes: `${arr.join(',')}`,
    });
  };

  const PriceRangeFilter = () => (
    <FilterContainer>
      <FilterTitle label={priceRangeLabel} />
      <RangeSlider
        initialMin={minPrice ? parseInt(minPrice) : 100}
        initialMax={maxPrice ? parseInt(maxPrice) : 5000}
        min={parseInt(initialPriceRange.min)}
        max={parseInt(initialPriceRange.max)}
        step={100}
        minDifference={100}
        type="price"
        setMinState={onChangeMinPrice}
        setMaxState={onChangeMaxPrice}
      />
    </FilterContainer>
  );

  const FilterHeader = () => (
    <FilterMainContainer>
      <section className="flex items-center justify-between ">
        <button
          onClick={() => {
            setQueryParams({
              isFiltersOpen: '',
            });
          }}
          className="flex flex-row items-center p-2 border-2 rounded-3xl border-primary-1000"
        >
          <FiltersIcon className="text-primary-1000" />
          <span className="ml-2 text-primary-1000">{filtersText}</span>
        </button>
        <button
          className="text-sm font-semibold underline capitalize text-primary-1000"
          onClick={handleClearFilters}
        >
          {clearFiltersText}
        </button>
      </section>
    </FilterMainContainer>
  );

  useEffect(() => {
    // analyze flights response
    let flightsMinPrice: number = parseFloat(
      flights?.[0]?.offer?.totalFareAmount || '100',
    );
    let flightsMaxPrice: number = parseFloat(
      flights?.[0]?.offer?.totalFareAmount || '5000',
    );
    const flightsStopsList: number[] = [];
    const flightsAirlines: string[] = [];
    const flightsCities: string[] = [];

    if (flights && flights.length) {
      flights.forEach((item) => {
        const itemFlight = item;
        const totalAmount = itemFlight?.offer?.totalFareAmount;
        const segmentsCollection = itemFlight?.segments?.collection;
        const totalStops = segmentsCollection.length - 1;
        // price
        const amountMin = parseFloat(totalAmount || '0');
        const amountMax = parseFloat(totalAmount || '0');
        if (amountMin < flightsMinPrice) flightsMinPrice = amountMin;
        if (amountMax > flightsMaxPrice) flightsMaxPrice = amountMax;
        // stops
        if (!flightsStopsList.includes(totalStops)) {
          flightsStopsList.push(totalStops);
        }
        // airlines
        segmentsCollection.forEach((segment) => {
          if (!flightsAirlines.includes(segment?.marketingCarrierName)) {
            flightsAirlines.push(segment?.marketingCarrierName);
          }
        });
        // cities
        const departureAirport = segmentsCollection[0]?.departureAirportName;
        const arrivalAirport =
          segmentsCollection[segmentsCollection.length - 1]?.arrivalAirportName;

        segmentsCollection.forEach((segment) => {
          if (
            segment.departureAirportName !== departureAirport &&
            !flightsCities.includes(segment.departureAirportName)
          ) {
            flightsCities.push(segment.departureAirportName);
          }
          if (
            segment.arrivalAirportName !== arrivalAirport &&
            !flightsCities.includes(segment.arrivalAirportName)
          ) {
            flightsCities.push(segment.arrivalAirportName);
          }
        });
      });

      // price
      if (!queryFilter?.minPrice) setMinPrice(`${flightsMinPrice}`);
      if (!queryFilter?.maxPrice) setMaxPrice(`${flightsMaxPrice}`);
      // stops
      setStops(
        queryFilter?.stops ? queryFilter.stops.toString().split(',') : [],
      );
      const flightsStops = flightsStopsList.sort();
      setStopsOptions(defineStopOptions(flightsStops));
      // airlines
      setAirlinesOptions(flightsAirlines.sort(Intl.Collator().compare));
      // cities

      setCitiesOptions(flightsCities.sort(Intl.Collator().compare));
    }
  }, [flights]);

  const defineStopOptions = (stps: Array<number>) => {
    const currentStopSelected = queryFilter?.stops || [];
    return stps.map((item) => ({
      id: `${item}`,
      label: item ? `${item} ${stopsText}` : directText,
      selected: currentStopSelected.includes(`${item}`),
    }));
  };

  const availableAirlines = [
    { id: 'all', name: t('allAirlines') },
    ...airlinesOptions.map((id) => ({
      id,
      name: id,
    })),
  ];
  const availableCities = [
    { id: 'all', name: t('connectingCities') },
    ...citiesOptions.map((id) => ({ id, name: id })),
  ];

  const onChangeStop = (changedStop: string) => {
    const arr = Object.assign([], stops);
    if (arr.indexOf(changedStop) < 0) {
      arr.push(changedStop);
    } else if (arr.indexOf(changedStop) > -1) {
      arr.splice(arr.indexOf(changedStop), 1);
    }
    setQueryParams({
      stops: arr.join(','),
    });
  };

  const DepartureTimesRangeFilter = () => (
    <FilterContainer>
      <FilterTitle label={departureTimesLabel} />
      <TimeRangeSlider
        initialMin={parseInt(departureTimes[0])}
        initialMax={parseInt(departureTimes[1])}
        min={0}
        max={24}
        step={1}
        minDifference={1}
        type="hour"
        setMinState={onChangeMinDepartureTimes}
        setMaxState={onChangeMaxDepartureTimes}
      />
    </FilterContainer>
  );

  const ArrivalTimesRangeFilter = () => (
    <FilterContainer>
      <FilterTitle label={arrivalTimesLabel} />
      <TimeRangeSlider
        initialMin={parseInt(arrivalTimes[0])}
        initialMax={parseInt(arrivalTimes[1])}
        min={0}
        max={24}
        step={1}
        minDifference={1}
        type="hour"
        setMinState={onChangeMinArrivalTimes}
        setMaxState={onChangeMaxArrivalTimes}
      />
    </FilterContainer>
  );

  return (
    <section className="h-full py-2 overflow-y-scroll">
      <FilterHeader />
      <Selector
        options={SORT_BY_OPTIONS}
        onChange={(i) => {
          onChangeSortBy(i);
        }}
        idSelected={
          queryFilter?.sortBy ? queryFilter.sortBy.toString() : 'sortByPriceAsc'
        }
      />
      <Divider className="my-6" />
      <CollapseUnbordered
        initialState={true}
        title={
          <label className="text-[18px] font-semibold text-dark-1000">
            {tg('price')}
          </label>
        }
        body={<PriceRangeFilter />}
      />
      {/* <Divider className="my-6" />
      <CollapseUnbordered
        initialState={true}
        title={
          <label className="text-[18px] font-semibold text-dark-1000">
            {t('paymentTypes')}
          </label>
        }
        body={
          <>
            <Checkbox
              items={paymentTypes}
              itemsChecked={paymentTypesChecked}
              onChange={onChangePaymentTypes}
            />
          </>
        }
      /> */}
      <Divider className="my-6" />
      <CollapseUnbordered
        initialState={true}
        title={
          <label className="text-[18px] font-semibold text-dark-1000">
            {t('stops')}
          </label>
        }
        body={
          <TabSelector options={stopsOptions} onChangeStop={onChangeStop} />
        }
      />
      <Divider className="my-6" />
      <CollapseUnbordered
        initialState={true}
        title={
          <label className="text-[18px] font-semibold text-dark-1000">
            {t('departureAndArrival')}
          </label>
        }
        body={
          <>
            <DepartureTimesRangeFilter />
            <ArrivalTimesRangeFilter />
          </>
        }
      />
      <Divider className="my-6" />
      <CollapseUnbordered
        initialState={true}
        title={
          <label className="text-[18px] font-semibold text-dark-1000">
            {t('airlinesAndCities')}
          </label>
        }
        body={
          <>
            <Selector
              options={availableAirlines}
              idSelected={queryFilter?.airlines?.toString()}
              onChange={(i) => {
                onChangeAirline(i);
              }}
            />
            <Selector
              options={availableCities}
              idSelected={queryFilter?.cities?.toString()}
              onChange={(i) => {
                onChangeCity(i);
              }}
            />
          </>
        }
      />
    </section>
  );
};

export default FlightFilterFormDesktop;
