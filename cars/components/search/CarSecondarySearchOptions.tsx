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
import RangeSlider from 'cars/components/RangeSlider/RangeSlider';
import PassengersSlider from '../PassengersSlider/PassengersSlider';
import { Car } from 'cars/types/response/SearchResponse';

const Divider = ({ className }: { className?: string }) => (
  <hr className={className} />
);

const CarSecondarySearchOptions = () => {
  const router = useRouter();
  const [queryFilter, setQueryFilters] = useState(router.query);
  const setQueryParams = useQuerySetter();

  // const [cars, setCars] = useState<Car[]>([]);
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

  const [t, i18n] = useTranslation('cars');
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

  const getCarCompanyUrl = (cars: Car[], company: string) => {
    if (cars && cars.length) {
      for (let i = 0; i < cars.length; i += 1) {
        if (cars[i].Vendor['@CompanyShortName'] === company)
          return cars[i].Info.TPA_Extensions.VendorPictureURL['#text'];
      }
    }
    return '';
  };

  const handleFilterButtonClick = () => {
    setFilterModalOpen(true);
    const response = JSON.parse(
      localStorage.getItem('CarSearchResponse') as string,
    );
    let cars: Car[] = [];
    if (response && response.cars) cars = response.cars;

    // analyze cars response
    let carsMinPrice: number =
      cars && cars[0]
        ? parseFloat(cars[0]?.VehAvailCore.TotalCharge['@RateTotalAmount'])
        : 100;
    let carsMaxPrice: number =
      cars && cars[0]
        ? parseFloat(cars[0]?.VehAvailCore.TotalCharge['@RateTotalAmount'])
        : 5000;
    const carsTypes: string[] = [];
    const carsCompanies: string[] = [];

    if (cars && cars.length) {
      cars.forEach((item: Car) => {
        // price
        const amount = parseFloat(
          item.VehAvailCore.TotalCharge['@RateTotalAmount'],
        );
        if (amount < carsMinPrice) carsMinPrice = amount;
        if (amount > carsMaxPrice) carsMaxPrice = amount;
        // types
        const type = item.VehAvailCore.Vehicle.VehMakeModel['@Name'];
        if (carsTypes.indexOf(type) < 0) carsTypes.push(type);
        // companies
        const company = item.Vendor['@CompanyShortName'];
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
      console.log('carsCompaniesSorted', carsCompaniesSorted);
      if (carsCompaniesSorted && carsCompaniesSorted.length) {
        carsCompaniesSorted.forEach((item) => {
          carsCompaniesUrls.push(getCarCompanyUrl(cars, item));
        });
      }
      setCompaniesUrlsOptions(carsCompaniesUrls);
    }
  };

  const handleClearFilters = () => {
    setMinPrice(initialPriceRange.min);
    setMaxPrice(initialPriceRange.max);
    setSortBy('sortByPriceAsc');
    setPassengers(['1', '6']);
    setTypes([]);
    setCompanies([]);
  };

  const handleDispatchFilters = () => {
    setFilterModalOpen(false);
    setQueryParams({
      ...queryFilter,
      keywordSearch,
      sortBy,
      ...(minPrice && { minPrice }),
      ...(maxPrice && { maxPrice }),
      passengers: `${passengers.join(',')}`,
      types: `${types.join(',')}`,
      companies: `${companies.join(',')}`,
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

  const onChangeMinPassengers = (value: string) => {
    setPassengers([value, passengers[1]]);
    /*
    setQueryParams({
      passengers: `${value},${passengers[1]}`,
    });
    */
  };

  const onChangeMaxPassengers = (value: string) => {
    setPassengers([passengers[0], value]);
    /*
    setQueryParams({
      passengers: `${passengers[0]},${value}`,
    });
    */
  };

  const onChangeTypes = (value: string, isChecked: boolean) => {
    const arr = Object.assign([], types);
    if (isChecked && arr.indexOf(value) < 0) arr.push(value);
    if (!isChecked && arr.indexOf(value) > -1)
      arr.splice(arr.indexOf(value), 1);
    setTypes(arr);
    /*
    setQueryParams({
      types: `${arr.join(',')}`,
    });
    */
  };

  const onChangeCompanies = (value: string, isChecked: boolean) => {
    const arr = Object.assign([], companies);
    if (isChecked && arr.indexOf(value) < 0) arr.push(value);
    if (!isChecked && arr.indexOf(value) > -1)
      arr.splice(arr.indexOf(value), 1);
    setCompanies(arr);
    /*
    setQueryParams({
      companies: `${arr.join(',')}`,
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
          className="font-semibold text-base text-primary-1000 capitalize underline"
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

export default CarSecondarySearchOptions;
