import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Button from 'components/global/Button/Button';
import FullScreenModal from 'components/global/NewModal/FullScreenModal';
import Checkbox from '../CheckboxGroup/Checkbox';
import useQuery from 'hooks/pageInteraction/useQuery';
import useQuerySetter from 'hooks/pageInteraction/useQuerySetter';

import IconInput from 'components/global/Input/IconInput';
import ListIcon from 'public/icons/assets/list.svg';
import FilterIcon from 'public/icons/assets/filter.svg';
import SearchIcon from 'public/icons/assets/magnifier.svg';
import { useRouter } from 'next/router';
import { RadioGroup, Radio } from 'components/global/Radio/Radio';
import RangeSlider from 'flights/components/RangeSlider/RangeSlider';
import TimeRangeSlider from '../TimeRangeSlider/TimeRangeSlider';
import { Flight } from 'flights/types/response/SearchResponse';

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

  const [stopsOptions, setStopsOptions] = useState<string[]>([]);
  const [airlinesOptions, setAirlinesOptions] = useState<string[]>([]);
  const [citiesOptions, setCitiesOptions] = useState<string[]>([]);

  const handleFilterButtonClick = () => {
    setFilterModalOpen(true);
    let flights = JSON.parse(localStorage.getItem('flightsSearched') as string);
    if (!flights) flights = [];

    // analyze flights response
    let flightsMinPrice: number =
      flights && flights[0]
        ? parseFloat(flights[0]?.offers[0]?.totalAmound)
        : 100;
    let flightsMaxPrice: number =
      flights && flights[0]
        ? parseFloat(flights[0]?.offers[0]?.totalAmound)
        : 5000;
    let flightsMaxStops = 0;
    const flightsAirlines: string[] = [];
    const flightsCities: string[] = [];

    if (flights && flights.length) {
      flights.forEach((item: Flight) => {
        const itemFlight = item;
        const amountMin = item?.offers[0]?.totalAmound
          ? parseFloat(item?.offers[0]?.totalAmound)
          : 0;
        const amountMax = item?.offers[item?.offers.length - 1]?.totalAmound
          ? parseFloat(item?.offers[item?.offers.length - 1]?.totalAmound)
          : 0;
        // price
        if (amountMin < flightsMinPrice) flightsMinPrice = amountMin;
        if (amountMax > flightsMaxPrice) flightsMaxPrice = amountMax;
        // stops
        if (itemFlight?.segments?.collection.length - 1 > flightsMaxStops)
          flightsMaxStops = itemFlight?.segments?.collection.length - 1;
        // airlines
        itemFlight?.segments?.collection.forEach((segment) => {
          if (flightsAirlines.indexOf(segment?.marketingCarrierName) < 0)
            flightsAirlines.push(segment?.marketingCarrierName);
        });
        // cities
        itemFlight?.segments?.collection.forEach((segment) => {
          if (
            flightsCities.indexOf(
              itemFlight?.segments?.collection[0]?.departureAirportName,
            ) < 0
          )
            flightsCities.push(
              itemFlight?.segments?.collection[0]?.departureAirportName,
            );
          if (
            flightsCities.indexOf(
              itemFlight?.segments?.collection[0]?.arrivalAirportName,
            ) < 0
          )
            flightsCities.push(
              itemFlight?.segments?.collection[0]?.arrivalAirportName,
            );
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
      const flightsStops = [directText];
      for (let i = 1; i <= flightsMaxStops; i += 1) {
        if (i < 2) flightsStops.push(`${i} ${stopText}`);
        else flightsStops.push(`${i} ${stopsText}`);
      }
      setStopsOptions(flightsStops);
      // airlines
      setAirlines(
        queryFilter?.airlines ? queryFilter.airlines.toString().split(',') : [],
      );
      setAirlinesOptions(flightsAirlines.sort(Intl.Collator().compare));
      // cities
      setCities(
        queryFilter?.cities ? queryFilter.cities.toString().split(',') : [],
      );
      setCitiesOptions(flightsCities.sort(Intl.Collator().compare));
    }
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
    /*
    setQueryParams({
      sortBy: value,
    });
    */
  };

  const onChangeMinPrice = (value: string) => {
    setMinPrice(value);
    /*
    setQueryParams({
      minPrice: value,
    });
    */
  };

  const onChangeMaxPrice = (value: string) => {
    setMaxPrice(value);
    /*
    setQueryParams({
      maxPrice: value,
    });
    */
  };

  const onChangeMinDepartureTimes = (value: string) => {
    setDepartureTimes([value, departureTimes[1]]);
    /*
    setQueryParams({
      departureTimes: `${value},${departureTimes[1]}`,
    });
    */
  };

  const onChangeMaxDepartureTimes = (value: string) => {
    setDepartureTimes([departureTimes[0], value]);
    /*
    setQueryParams({
      departureTimes: `${departureTimes[0]},${value}`,
    });
    */
  };

  const onChangeMinArrivalTimes = (value: string) => {
    setArrivalTimes([value, arrivalTimes[1]]);
    /*
    setQueryParams({
      arrivalTimes: `${value},${arrivalTimes[1]}`,
    });
    */
  };

  const onChangeMaxArrivalTimes = (value: string) => {
    setArrivalTimes([arrivalTimes[0], value]);
    /*
    setQueryParams({
      arrivalTimes: `${arrivalTimes[0]},${value}`,
    });
    */
  };

  const onChangeStops = (value: string, isChecked: boolean) => {
    const arr = Object.assign([], stops);
    if (isChecked && arr.indexOf(value) < 0) arr.push(value);
    if (!isChecked && arr.indexOf(value) > -1)
      arr.splice(arr.indexOf(value), 1);
    setStops(arr);
    /*
    setQueryParams({
      stops: `${arr.join(',')}`,
    });
    */
  };

  const onChangeAirlines = (value: string, isChecked: boolean) => {
    const arr = Object.assign([], airlines);
    if (isChecked && arr.indexOf(value) < 0) arr.push(value);
    if (!isChecked && arr.indexOf(value) > -1)
      arr.splice(arr.indexOf(value), 1);
    setAirlines(arr);
    /*
    setQueryParams({
      airlines: `${arr.join(',')}`,
    });
    */
  };

  const onChangeCities = (value: string, isChecked: boolean) => {
    const arr = Object.assign([], cities);
    if (isChecked && arr.indexOf(value) < 0) arr.push(value);
    if (!isChecked && arr.indexOf(value) > -1)
      arr.splice(arr.indexOf(value), 1);
    setCities(arr);
    /*
    setQueryParams({
      cities: `${arr.join(',')}`,
    });
    */
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
        <Checkbox
          items={stopsOptions}
          itemsChecked={stops}
          onChange={onChangeStops}
        />
      </FilterContainer>

      <Divider className="my-6" />
      <DepartureTimesRangeFilter />

      <Divider className="my-6" />
      <ArrivalTimesRangeFilter />

      <Divider className="my-6" />
      <FilterContainer>
        <FilterTitle label={airlinesLabel} />
        <Checkbox
          items={airlinesOptions}
          itemsChecked={airlines}
          onChange={onChangeAirlines}
        />
      </FilterContainer>

      <Divider className="my-6" />
      <FilterContainer>
        <FilterTitle label={connectingAirportsLabel} />
        <Checkbox
          items={citiesOptions}
          itemsChecked={cities}
          onChange={onChangeCities}
        />
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
      <button
        className="flex items-center gap-2 py-1 me-2 lg:hidden"
        onClick={handleFilterButtonClick}
      >
        <span className="text-primary-1000">
          <FilterIcon />
        </span>
        <span className="text-xs font-semibold text-left text-dark-1000 flex-1">
          {t('filter', 'Filter')}
        </span>
      </button>
      {Modals}
    </section>
  );
};

export default FlightSecondarySearchOptions;
