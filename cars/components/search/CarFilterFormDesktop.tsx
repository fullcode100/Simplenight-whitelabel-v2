import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Checkbox from '../CheckboxGroup/Checkbox';

import IconInput from 'components/global/Input/IconInput';
import SearchIcon from 'public/icons/assets/magnifier.svg';
import { useRouter } from 'next/router';
import { RadioGroup, Radio } from 'components/global/Radio/Radio';
import RangeSlider from 'cars/components/RangeSlider/RangeSlider';
import PassengersSlider from '../PassengersSlider/PassengersSlider';
import MultipleSelect from 'components/global/MultipleSelect/MultipleSelect';
import CloseIcon from 'public/icons/assets/close.svg';
import useQuerySetter from 'hooks/pageInteraction/useQuerySetter';
import { Car } from 'cars/types/response/CarSearchResponse';

const Divider = ({ className }: { className?: string }) => (
  <hr className={className} />
);
const FilterContainer = ({ children }: { children?: any }) => (
  <section className="flex flex-col pr-6 mt-4 mb-6">{children}</section>
);

interface CarFilterFormDesktopProps {
  cars: Car[];
}

const CarFilterFormDesktop = ({ cars }: CarFilterFormDesktopProps) => {
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
    min: '0',
    max: '10000',
  });
  const [minPrice, setMinPrice] = useState<string>(
    (queryFilter?.minPrice as string) || initialPriceRange.min,
  );
  const [maxPrice, setMaxPrice] = useState<string>(
    (queryFilter?.maxPrice as string) || initialPriceRange.max,
  );

  const [t, i18n] = useTranslation('cars');
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
  const carTypeLabel = t('carType', 'Car Type');
  const passengersLabel = t('passengers', 'Passengers');
  const rentalCarCompanyLabel = t('rentalCarCompany', 'Rental Car Company');
  const clearFiltersText = t('clearFilters', 'Clear filters');
  const filtersText = t('filters', 'Filters');

  const [passengers, setPassengers] = useState<string[]>(
    queryFilter?.passengers
      ? queryFilter.passengers.toString().split(',')
      : ['1', '6'],
  );

  const [types, setTypes] = useState<string[]>([]);
  const [companies, setCompanies] = useState<string[]>([]);

  const [typesOptions, setTypesOptions] = useState<string[]>([]);
  const [companiesOptions, setCompaniesOptions] = useState<string[]>([]);
  const [companiesUrlsOptions, setCompaniesUrlsOptions] = useState<string[]>(
    [],
  );

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
    setPassengers(['1', '6']);
    setTypes([]);
    setCompanies([]);
    setQueryParams({
      ...queryFilter,
      keywordSearch,
      sortBy: 'sortByPriceAsc',
      minPrice: `${initialPriceRange.min}`,
      maxPrice: `${initialPriceRange.max}`,
      passengers: '1,6',
      types: '',
      companies: '',
    });
  };

  const onChangeSortBy = (value: string) => {
    setSortBy(value);
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

  const onChangeMinPassengers = (value: string) => {
    setPassengers([value, passengers[1]]);
    setQueryParams({
      passengers: `${value},${passengers[1]}`,
    });
  };

  const onChangeMaxPassengers = (value: string) => {
    setPassengers([passengers[0], value]);
    setQueryParams({
      passengers: `${passengers[0]},${value}`,
    });
  };

  const onChangeTypes = (value: string, isChecked: boolean) => {
    const arr = Object.assign([], types);
    if (isChecked && arr.indexOf(value) < 0) arr.push(value);
    if (!isChecked && arr.indexOf(value) > -1)
      arr.splice(arr.indexOf(value), 1);
    setTypes(arr);
    setQueryParams({
      types: `${arr.join(',')}`,
    });
  };

  const onChangeCompanies = (value: string, isChecked: boolean) => {
    const arr = Object.assign([], companies);
    if (isChecked && arr.indexOf(value) < 0) arr.push(value);
    if (!isChecked && arr.indexOf(value) > -1)
      arr.splice(arr.indexOf(value), 1);
    setCompanies(arr);
    setQueryParams({
      companies: `${arr.join(',')}`,
    });
  };

  const onChangeKeyword = (value: string) => {
    setKeywordSearch(value);
    setQueryParams({
      keywordSearch: value,
    });
  };

  const KeywordSearchFilter = () => (
    <FilterContainer>
      <FilterTitle label={keywordSearchLabel} />
      <IconInput
        value={keywordSearch}
        placeholder={searchKeywordPlaceholder}
        icon={<SearchIcon className="text-dark-700" />}
        onChange={(e) => onChangeKeyword(e.target.value)}
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
      <section className="flex items-center justify-between">
        <p className="text-lg font-semibold text-dark-1000">{filtersText}</p>
        <button
          className="text-base font-semibold underline capitalize text-primary-1000"
          onClick={handleClearFilters}
        >
          {clearFiltersText}
        </button>
      </section>
    </FilterContainer>
  );

  const PassengersRangeFilter = () => (
    <FilterContainer>
      <FilterTitle label={passengersLabel} />
      <PassengersSlider
        initialMin={parseInt(passengers[0])}
        initialMax={parseInt(passengers[1])}
        min={1}
        max={6}
        step={1}
        minDifference={1}
        type="number"
        setMinState={onChangeMinPassengers}
        setMaxState={onChangeMaxPassengers}
      />
    </FilterContainer>
  );

  const getCarCompanyUrl = (cars: Car[], company: string) => {
    if (cars && cars.length) {
      for (let i = 0; i < cars.length; i += 1) {
        if (cars[i].company_short_name === company)
          // return cars[i].Info.TPA_Extensions.VendorPictureURL['#text'];
          return '';
      }
    }
    return '';
  };

  useEffect(() => {
    // analyze cars response
    let carsMinPrice: number =
      cars && cars[0]
        ? parseFloat(cars[0]?.rate_total_amount['@RateTotalAmount'])
        : 100;
    let carsMaxPrice: number =
      cars && cars[0]
        ? parseFloat(cars[0]?.rate_total_amount['@RateTotalAmount'])
        : 5000;
    const carsTypes: string[] = [];
    const carsCompanies: string[] = [];

    if (cars && cars.length) {
      cars.forEach((item: Car) => {
        // price
        const amount = parseFloat(item.rate_total_amount['@RateTotalAmount']);
        if (amount < carsMinPrice) carsMinPrice = amount;
        if (amount > carsMaxPrice) carsMaxPrice = amount;
        // types
        const type = item.car_model;
        if (carsTypes.indexOf(type) < 0) carsTypes.push(type);
        // companies
        const company = item.company_short_name;
        if (carsCompanies.indexOf(company) < 0) carsCompanies.push(company);
      });

      // price
      if (!queryFilter?.minPrice) setMinPrice(`${carsMinPrice}`);
      if (!queryFilter?.maxPrice) setMaxPrice(`${carsMaxPrice}`);
      /*
      setInitialPriceRange({
        min: `${carsMinPrice}`,
        max: `${carsMaxPrice}`,
      });
      */
      // types
      setTypes(
        queryFilter?.types ? queryFilter.types.toString().split(',') : [],
      );
      setTypesOptions(carsTypes.sort(Intl.Collator().compare));
      // companies
      setCompanies(
        queryFilter?.companies
          ? queryFilter.companies.toString().split(',')
          : [],
      );
      const carsCompaniesSorted = carsCompanies.sort(Intl.Collator().compare);
      setCompaniesOptions(carsCompaniesSorted);
      // companies images
      const carsCompaniesUrls: string[] = [];
      if (carsCompaniesSorted && carsCompaniesSorted.length) {
        carsCompaniesSorted.forEach((item) => {
          carsCompaniesUrls.push(getCarCompanyUrl(cars, item));
        });
      }
      setCompaniesUrlsOptions(carsCompaniesUrls);
    }
  }, [cars]);

  return (
    <section className="h-full py-4 overflow-y-scroll">
      <FilterHeader />
      <Divider className="my-4 opacity-0" />
      {/*
      <SortByFilter />

      <Divider className="my-4 opacity-0" />
      <KeywordSearchFilter />
      <Divider className="my-6" />
      */}

      <FilterContainer>
        <FilterTitle label={carTypeLabel} />
        <Checkbox
          items={typesOptions}
          itemsChecked={types}
          onChange={onChangeTypes}
        />
      </FilterContainer>

      <Divider className="my-6" />
      <PriceRangeFilter />

      <Divider className="my-6" />
      <FilterContainer>
        <FilterTitle label={rentalCarCompanyLabel} />
        <Checkbox
          items={companiesOptions}
          itemsUrls={companiesUrlsOptions}
          itemsChecked={companies}
          onChange={onChangeCompanies}
        />
      </FilterContainer>

      <Divider className="my-6" />
      <PassengersRangeFilter />
    </section>
  );
};

export default CarFilterFormDesktop;
