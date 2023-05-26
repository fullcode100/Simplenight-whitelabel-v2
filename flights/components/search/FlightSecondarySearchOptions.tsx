import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import FullScreenModal from 'components/global/NewModal/FullScreenModal';
import Checkbox from '../CheckboxGroup/Checkbox';
import useQuery from 'hooks/pageInteraction/useQuery';
import useQuerySetter from 'hooks/pageInteraction/useQuerySetter';

import IconInput from 'components/global/Input/IconInput';
import FiltersIcon from 'public/icons/assets/filters.svg';

import SearchIcon from 'public/icons/assets/magnifier.svg';
import { useRouter } from 'next/router';
import { RadioGroup, Radio } from 'components/global/Radio/Radio';
import RangeSlider from 'flights/components/RangeSlider/RangeSlider';
import TimeRangeSlider from '../TimeRangeSlider/TimeRangeSlider';
import { FlightItem } from 'flights/types/response/FlightSearchResponseMS';
import { Button } from '@simplenight/ui';

const Divider = ({ className }: { className?: string }) => (
  <hr className={className} />
);

const FlightSecondarySearchOptions = () => {
  const router = useRouter();
  const [queryFilter, setQueryFilters] = useState(router.query);
  const setQueryParams = useQuerySetter();

  // const [flights, setFlights] = useState<Flight[]>([]);
  // const [itemIndex, setItemIndex] = useState<number>(0);

  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const [checkedLabels, setCheckedLabels] = useState<any[]>([]);
  const [keywordSearch, setKeywordSearch] = useState<string>(
    (queryFilter?.keywordSearch as string) || '',
  );
  const [sortBy, setSortBy] = useState<string>(
    (queryFilter?.sortBy as string) || 'sortByPriceAsc',
  );

  const [initialPriceRange, setInitialPriceRange] = useState({
    min: '0',
    max: '10000',
  });
  const [minPrice, setMinPrice] = useState<string>(
    (queryFilter?.minPrice as string) || initialPriceRange.min,
  );
  const [maxPrice, setMaxPrice] = useState<string>(
    (queryFilter?.maxPrice as string) || initialPriceRange.max,
  );

  const [t, i18n] = useTranslation('flights');
  const filtersLabel = t('filters', 'Filters');
  const applyFiltersLabel = t('applyFilters', 'Apply Filters');
  const keywordSearchLabel = t('keywordSearch', 'Keyword Search');
  const searchKeywordPlaceholder = t(
    'searchKeywordPlaceholder',
    'Venue Name, Landmark, Location, etc.',
  );
  const sortByLabel = t('sortBy', 'Sort By');
  const sortByPriceAsc = t('sortByPriceAsc', 'Lowest Price');
  const sortByPriceDesc = t('sortByPriceDesc', 'Highest Price');
  const SORT_BY_OPTIONS = [
    { value: 'sortByPriceAsc', label: sortByPriceAsc },
    { value: 'sortByPriceDesc', label: sortByPriceDesc },
  ];

  const priceRangeLabel = t('priceRange', 'Price Range');
  const stopsLabel = t('stops', 'Stops');
  const stopText = t('stop', 'Stop');
  const stopsText = t('stops', 'Stops');
  const directText = t('direct', 'Direct');
  const departureTimesLabel = t('departureTimes', 'Departure Times');
  const arrivalTimesLabel = t('arrivalTimes', 'Arrival Times');
  const airlinesLabel = t('airlines', 'Airlines');
  const connectingAirportsLabel = t(
    'connectingAirports',
    'Connecting Airports',
  );
  const clearFiltersText = t('clearFilters', 'Clear filters');
  const filtersText = t('filters', 'Filters');

  const [departureTimes, setDepartureTimes] = useState<string[]>(
    queryFilter?.departureTimes
      ? queryFilter.departureTimes.toString().split(',')
      : ['0', '23'],
  );
  const [arrivalTimes, setArrivalTimes] = useState<string[]>(
    queryFilter?.arrivalTimes
      ? queryFilter.arrivalTimes.toString().split(',')
      : ['0', '23'],
  );

  const [stops, setStops] = useState<string[]>([]);
  const [airlines, setAirlines] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const [stopsOptions, setStopsOptions] = useState<
    Array<{ id: string; label: string; selected: boolean }>
  >([]);
  const [airlinesOptions, setAirlinesOptions] = useState<
    Array<{ id: string; label: string; selected: boolean }>
  >([]);
  const [citiesOptions, setCitiesOptions] = useState<
    Array<{ id: string; label: string; selected: boolean }>
  >([]);

  const handleFilterButtonClick = () => {
    setFilterModalOpen(true);
    let flights = JSON.parse(localStorage.getItem('flightsSearched') as string);
    if (!flights) flights = [];

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
      flights.forEach((item: FlightItem) => {
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
        segmentsCollection.forEach((segment) => {
          if (
            !flightsCities.includes(segmentsCollection[0]?.departureAirportName)
          )
            flightsCities.push(segmentsCollection[0]?.departureAirportName);
          if (
            !flightsCities.includes(segmentsCollection[0]?.arrivalAirportName)
          )
            flightsCities.push(segmentsCollection[0]?.arrivalAirportName);
        });
      });

      // price
      if (!queryFilter?.minPrice) setMinPrice(`${flightsMinPrice}`);
      if (!queryFilter?.maxPrice) setMaxPrice(`${flightsMaxPrice}`);
      /*
      setInitialPriceRange({
        min: `${flightsMinPrice}`,
        max: `${flightsMaxPrice}`,
      });
      */
      // stops
      setStops(
        queryFilter?.stops ? queryFilter.stops.toString().split(',') : [],
      );
      const flightsStops = flightsStopsList.sort();
      setStopsOptions(defineStopOptions(flightsStops));
      // airlines
      setAirlines(
        queryFilter?.airlines ? queryFilter.airlines.toString().split(',') : [],
      );
      const airlinesList = flightsAirlines.sort(
        Intl.Collator().compare,
      ) as string[];
      setAirlinesOptions(defineAirlinesOptions(airlinesList));
      // cities
      setCities(
        queryFilter?.cities ? queryFilter.cities.toString().split(',') : [],
      );
      const citiesList = flightsCities.sort(
        Intl.Collator().compare,
      ) as string[];
      setCitiesOptions(defineCitiesOptions(citiesList));
    }
  };

  const defineStopOptions = (stps: Array<number>) => {
    const currentStopSelected = queryFilter?.stops || [];
    return stps.map((item) => ({
      id: `${item}`,
      label: item ? `${item} ${stopsText}` : directText,
      selected: currentStopSelected.includes(`${item}`),
    }));
  };

  const defineAirlinesOptions = (airlines: Array<string>) => {
    const currentAirlinesSelected = queryFilter?.airlines || [];
    return airlines.map((item) => ({
      id: `${item}`,
      label: `${item}`,
      selected: currentAirlinesSelected.includes(`${item}`),
    }));
  };

  const defineCitiesOptions = (cities: Array<string>) => {
    const currentCitiesSelected = queryFilter?.cities || [];
    return cities.map((item) => ({
      id: `${item}`,
      label: `${item}`,
      selected: currentCitiesSelected.includes(`${item}`),
    }));
  };

  const handleClearFilters = () => {
    setMinPrice(initialPriceRange.min);
    setMaxPrice(initialPriceRange.max);
    setSortBy('sortByPriceAsc');
    setDepartureTimes(['0', '23']);
    setArrivalTimes(['0', '23']);
    setStops([]);
    setAirlines([]);
    setCities([]);
  };

  const handleDispatchFilters = () => {
    setFilterModalOpen(false);
    setQueryParams({
      ...queryFilter,
      // keywordSearch,
      sortBy,
      ...(minPrice && { minPrice }),
      ...(maxPrice && { maxPrice }),
      departureTimes: `${departureTimes.join(',')}`,
      arrivalTimes: `${arrivalTimes.join(',')}`,
      stops: `${stops.join(',')}`,
      airlines: `${airlines.join(',')}`,
      cities: `${cities.join(',')}`,
    });
  };

  const onChangeSortBy = (value: string) => {
    setSortBy(value);
  };

  const onChangeMinPrice = (value: string) => {
    setMinPrice(value);
  };

  const onChangeMaxPrice = (value: string) => {
    setMaxPrice(value);
  };

  const onChangeMinDepartureTimes = (value: string) => {
    setDepartureTimes([value, departureTimes[1]]);
  };

  const onChangeMaxDepartureTimes = (value: string) => {
    setDepartureTimes([departureTimes[0], value]);
  };

  const onChangeMinArrivalTimes = (value: string) => {
    setArrivalTimes([value, arrivalTimes[1]]);
  };

  const onChangeMaxArrivalTimes = (value: string) => {
    setArrivalTimes([arrivalTimes[0], value]);
  };

  const onChangeStops = (value: string) => {
    const arr = Object.assign([], stops);
    if (arr.indexOf(value) < 0) {
      arr.push(value);
    } else if (arr.indexOf(value) > -1) {
      arr.splice(arr.indexOf(value), 1);
    }
    const updateOptions = stopsOptions.map((item) => ({
      ...item,
      selected: item.id === value ? !item.selected : item.selected,
    }));
    setStopsOptions(updateOptions);
    setStops(arr);
  };

  const onChangeAirlines = (value: string) => {
    const arr = Object.assign([], airlines);
    if (arr.indexOf(value) < 0) {
      arr.push(value);
    } else if (arr.indexOf(value) > -1) {
      arr.splice(arr.indexOf(value), 1);
    }
    const updateOptions = airlinesOptions.map((item) => ({
      ...item,
      selected: item.id === value ? !item.selected : item.selected,
    }));
    setAirlinesOptions(updateOptions);
    setAirlines(arr);
  };

  const onChangeCities = (value: string) => {
    const arr = Object.assign([], cities);
    if (arr.indexOf(value) < 0) {
      arr.push(value);
    } else if (arr.indexOf(value) > -1) {
      arr.splice(arr.indexOf(value), 1);
    }
    const updateOptions = citiesOptions.map((item) => ({
      ...item,
      selected: item.id === value ? !item.selected : item.selected,
    }));
    setCitiesOptions(updateOptions);
    setCities(arr);
  };

  const KeywordSearchFilter = () => (
    <FilterContainer>
      <FilterTitle label={keywordSearchLabel} />
      <IconInput
        value={keywordSearch}
        placeholder={searchKeywordPlaceholder}
        icon={<SearchIcon className="text-dark-700" />}
        onChange={(e) => setKeywordSearch(e.target.value)}
      />
    </FilterContainer>
  );

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

  const SortByFilter = () => (
    <FilterContainer>
      <FilterTitle label={sortByLabel} className="mb-3" />
      <RadioGroup onChange={onChangeSortBy} value={sortBy}>
        {SORT_BY_OPTIONS.map((option, i) => (
          <Radio key={i} value={option?.value} containerClass="mb-4">
            {option.label}
          </Radio>
        ))}
      </RadioGroup>
    </FilterContainer>
  );

  const FilterHeader = () => (
    <FilterContainer>
      <section className="flex justify-between items-center">
        <p className="text-lg font-semibold text-dark-1000">{filtersText}</p>
        <button
          className="font-semibold text-base text-primary-1000 capitalize"
          onClick={handleClearFilters}
        >
          {clearFiltersText}
        </button>
      </section>
    </FilterContainer>
  );

  const DepartureTimesRangeFilter = () => (
    <FilterContainer>
      <FilterTitle label={departureTimesLabel} />
      <TimeRangeSlider
        initialMin={parseInt(departureTimes[0])}
        initialMax={parseInt(departureTimes[1])}
        min={0}
        max={23}
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
        max={23}
        step={1}
        minDifference={1}
        type="hour"
        setMinState={onChangeMinArrivalTimes}
        setMaxState={onChangeMaxArrivalTimes}
      />
    </FilterContainer>
  );

  const FilterTitle = ({
    label,
    className = '',
  }: {
    label: string;
    className?: string;
  }) => <label className={`mb-2 ${className}`}>{label}</label>;

  const FilterContainer = ({ children }: { children?: any }) => (
    <section className="px-4 mt-4 mb-6 flex flex-col">{children}</section>
  );

  const FilterForm = (
    <section className="py-4 h-full overflow-y-scroll">
      {/* <KeywordSearchFilter /> */}
      <PriceRangeFilter />
      <Divider className="my-4 opacity-0" />
      {/*
      <SortByFilter />
      */}
      <Divider className="my-6" />
      <FilterContainer>
        <FilterTitle label={stopsLabel} />
        <Checkbox options={stopsOptions} onChange={onChangeStops} />
      </FilterContainer>

      <Divider className="my-6" />
      <DepartureTimesRangeFilter />

      <Divider className="my-6" />
      <ArrivalTimesRangeFilter />

      <Divider className="my-6" />
      <FilterContainer>
        <FilterTitle label={airlinesLabel} />
        <Checkbox options={airlinesOptions} onChange={onChangeAirlines} />
      </FilterContainer>

      <Divider className="my-6" />
      <FilterContainer>
        <FilterTitle label={connectingAirportsLabel} />
        <Checkbox options={citiesOptions} onChange={onChangeCities} />
      </FilterContainer>
    </section>
  );

  const ClearFilterButton = () => (
    <button
      className="text-base text-primary-1000 font-semibold underline"
      onClick={handleClearFilters}
    >
      {clearFiltersText}
    </button>
  );

  const Modals = (
    <>
      <FullScreenModal
        open={isFilterModalOpen}
        closeModal={() => setFilterModalOpen(false)}
        title={filtersLabel}
        primaryButtonText={applyFiltersLabel}
        primaryButtonAction={() => handleDispatchFilters()}
        headerAction={<ClearFilterButton />}
      >
        {FilterForm}
      </FullScreenModal>
    </>
  );

  const { view = 'list' } = useQuery();
  const isListView = view === 'list';
  const viewParam = isListView ? 'map' : 'list';

  const handleChangeResultView = () => {
    setQueryParams({
      view: viewParam,
    });
  };

  return (
    <section className="lg:hidden">
      <Button
        size="small"
        type="no-background"
        icon={<FiltersIcon />}
        onClick={handleFilterButtonClick}
        compact
      />
      {Modals}
    </section>
  );
};

export default FlightSecondarySearchOptions;
