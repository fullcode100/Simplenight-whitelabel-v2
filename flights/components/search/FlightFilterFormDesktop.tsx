import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Checkbox from 'components/global/CheckboxGroup/Checkbox';

import IconInput from 'components/global/Input/IconInput';
import SearchIcon from 'public/icons/assets/magnifier.svg';
import { useRouter } from 'next/router';
import { RadioGroup, Radio } from 'components/global/Radio/Radio';
import RangeSlider from 'components/global/RangeSlider/RangeSlider';
import TimeRangeSlider from '../TimeRangeSlider/TimeRangeSlider';
import MultipleSelect from 'components/global/MultipleSelect/MultipleSelect';
import CloseIcon from 'public/icons/assets/close.svg';
import useQuerySetter from 'hooks/pageInteraction/useQuerySetter';
import { Flight } from 'flights/types/response/SearchResponse';

const Divider = ({ className }: { className?: string }) => (
  <hr className={className} />
);
const FilterContainer = ({ children }: { children?: any }) => (
  <section className="pr-6 mt-4 mb-6 flex flex-col">{children}</section>
);

interface FlightFilterFormDesktopProps {
  flights: Flight[];
  itemIndex: number;
}

const FlightFilterFormDesktop = ({ flights, itemIndex }: FlightFilterFormDesktopProps) => {
  const router = useRouter();
  const setQueryParams = useQuerySetter();
  const [queryFilter, setQueryFilters] = useState(router.query);
  
  const [keywordSearch, setKeywordSearch] = useState<string>(
    (queryFilter?.keywordSearch as string) || '',
  );
  const [sortBy, setSortBy] = useState<string>(
    (queryFilter?.sortBy as string) || 'sortByPriceAsc',
  );

  const [initialPriceRange, setInitialPriceRange] = useState({
    min: `0`,
    max: `10000`,
  });
  const [minPrice, setMinPrice] = useState<string>(
    (queryFilter?.minPrice as string) || initialPriceRange.min,
  );
  const [maxPrice, setMaxPrice] = useState<string>(
    (queryFilter?.maxPrice as string) || initialPriceRange.max,
  );

  const [t, i18n] = useTranslation('flights');
  const keywordSearchLabel = t('keywordSearch', 'Keyword Search');
  const searchKeywordPlaceholder = t(
    'searchKeywordPlaceholder',
    'Venue Name, Landmark, Location, etc.',
  );
  const sortByLabel = t('sortBy', 'Sort By');
  const sortByPriceAsc = t('sortByPriceAsc', 'Price (Lowest First)');
  const sortByPriceDesc = t('sortByPriceDesc', 'Price (Highest First)');
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
  const connectingCitiesLabel = t('connectingCities', 'Connecting Cities');
  const clearFiltersText = t('clearFilters', 'Clear filters');
  const filtersText = t('filters', 'Filters');

  const [stops, setStops] = useState<string[]>([directText]);
  const [airlines, setAirlines] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const FilterTitle = ({
    label,
    className = '',
  }: {
    label: string;
    className?: string;
  }) => <label className={`mb-2 ${className}`}>{label}</label>;

  const handleClearFilters = () => {
    setKeywordSearch('');
    setMinPrice(initialPriceRange.min);
    setMaxPrice(initialPriceRange.max);
    setSortBy('sortByPriceAsc');
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

  const onChangeSortBy = (value: string) => {
    setSortBy(value);
    setQueryParams({
      sortBy: value,
    });
  };

  const onChangeFilter = (value: string, isChecked: boolean) => {
    console.log(value, isChecked);
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
        initialMin={0}
        initialMax={23}
        min={0}
        max={23}
        step={1}
        minDifference={1}
        type="hour"
        setMinState={onChangeMinPrice}
        setMaxState={onChangeMaxPrice}
      />
    </FilterContainer>
  );

  const ArrivalTimesRangeFilter = () => (
    <FilterContainer>
      <FilterTitle label={arrivalTimesLabel} />
      <TimeRangeSlider
        initialMin={0}
        initialMax={23}
        min={0}
        max={23}
        step={1}
        minDifference={1}
        type="hour"
        setMinState={onChangeMinPrice}
        setMaxState={onChangeMaxPrice}
      />
    </FilterContainer>
  );

  useEffect(() => {
    // analyze flights response
    let flightsMinPrice: number = flights && flights[0] ? flights[0]?.airItineraryPricingInfo[0]?.itinTotalFare?.totalFare?.amount : 100;
    let flightsMaxPrice: number = flights && flights[0] ? flights[0]?.airItineraryPricingInfo[0]?.itinTotalFare?.totalFare?.amount : 5000;
    let flightsMaxStops: number = 0;
    let flightsAirlines: string[] = [];
    let flightsCities: string[] = [];

    if (flights && flights.length) {
      flights.forEach((item) => {
        const itemFlight = item?.airItinerary?.originDestinationOptions?.originDestinationOption[itemIndex];
        //price
        if (item?.airItineraryPricingInfo[0]?.itinTotalFare?.totalFare?.amount < flightsMinPrice)
          flightsMinPrice = item?.airItineraryPricingInfo[0]?.itinTotalFare?.totalFare?.amount;
        if (item?.airItineraryPricingInfo[0]?.itinTotalFare?.totalFare?.amount > flightsMaxPrice)
          flightsMaxPrice = item?.airItineraryPricingInfo[0]?.itinTotalFare?.totalFare?.amount;
        //stops
        if (itemFlight?.flightSegment.length - 1 > flightsMaxStops) flightsMaxStops = itemFlight?.flightSegment.length - 1;
        //airlines
        itemFlight?.flightSegment.forEach((segment) => {
          if (flightsAirlines.indexOf(segment?.operatingAirline?.code) < 0)
            flightsAirlines.push(segment?.operatingAirline?.code);
        });
        //cities
        itemFlight?.flightSegment.forEach((segment) => {
          if (flightsCities.indexOf(itemFlight?.flightSegment[0]?.departureAirport?.locationCode) < 0)
            flightsCities.push(itemFlight?.flightSegment[0]?.departureAirport?.locationCode);
          if (flightsCities.indexOf(itemFlight?.flightSegment[0]?.arrivalAirport?.locationCode) < 0)
            flightsCities.push(itemFlight?.flightSegment[0]?.arrivalAirport?.locationCode);
        });
      });

      //price
      if (!queryFilter?.minPrice) setMinPrice(`${flightsMinPrice}`);
      if (!queryFilter?.maxPrice) setMaxPrice(`${flightsMaxPrice}`);
      /*
      setInitialPriceRange({
        min: `${flightsMinPrice}`,
        max: `${flightsMaxPrice}`,
      });
      */
      //stops
      let flightsStops = [directText];
      for (let i = 1; i <= flightsMaxStops; i += 1) {
        if (i < 2) flightsStops.push(`${i} ${stopText}`);
        else flightsStops.push(`${i} ${stopsText}`);
      }
      setStops(flightsStops);
      //airlines
      setAirlines(flightsAirlines.sort(Intl.Collator().compare));
      //cities
      setCities(flightsCities.sort(Intl.Collator().compare));
    }
  }, [flights, itemIndex]);

  return (
    <section className="py-4 h-full overflow-y-scroll">
      <FilterHeader />
      {/* <KeywordSearchFilter /> */}
      <PriceRangeFilter />
      <Divider className="my-4 opacity-0" />
      <SortByFilter />

      <Divider className="my-6" />
      <FilterContainer>
        <FilterTitle label={stopsLabel} />
        <Checkbox items={stops} />
      </FilterContainer>

      <Divider className="my-6" />
      <DepartureTimesRangeFilter />

      <Divider className="my-6" />
      <ArrivalTimesRangeFilter />

      <Divider className="my-6" />
      <FilterContainer>
        <FilterTitle label={airlinesLabel} />
        <Checkbox items={airlines} />
      </FilterContainer>

      <Divider className="my-6" />
      <FilterContainer>
        <FilterTitle label={connectingCitiesLabel} />
        <Checkbox items={cities} />
      </FilterContainer>
    </section>
  );
};

export default FlightFilterFormDesktop;
