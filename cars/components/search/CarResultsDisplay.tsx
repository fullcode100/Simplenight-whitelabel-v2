import { formatAsDateAndTime, formatAsSearchDate } from 'helpers/dajjsUtils';
import useQuery from 'hooks/pageInteraction/useQuery';
import { useQuery as useReactQuery } from '@tanstack/react-query';
import { CarSearchRequest } from 'cars/types/request/CarSearchRequest';
import { Car, CarSearchResponse } from 'cars/types/response/CarSearchResponse';
import React, { ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import HorizontalItemCard from './HorizontalItemCard/HorizontalItemCard';
import { useRouter } from 'next/router';
import CarMapView from './CarResultsMapView';
import { haveKeyword } from 'helpers/stringUtils';
import { StringGeolocation } from 'types/search/Geolocation';
import { CustomWindow } from 'types/global/CustomWindow';
import CarItemRateInfo from './CarItemRateInfo';
import classnames from 'classnames';
import useQuerySetter from 'hooks/pageInteraction/useQuerySetter';
import CarFilterFormDesktop from './CarFilterFormDesktop';
import PriceDisplay from 'cars/components/PriceDisplay/PriceDisplay';
import CarCancellable from './CarCancellable';
import CarFeatures from './CarFeatures';
import HorizontalSkeletonCard from 'components/global/HorizontalItemCard/HorizontalSkeletonCard';
import HorizontalSkeletonList from 'components/global/HorizontalItemCard/HorizontalSkeletonList';
import Button from 'components/global/Button/Button';
import { Item } from 'types/cart/CartType';
import {
  AltRadioButtonGroup,
  RadioItemType,
} from 'components/global/AltRadioButton/AltRadioButton';
import MapIcon from 'public/icons/assets/map-ok.svg';
import ListIcon from 'public/icons/assets/list-ok.svg';
import SearchViewSelectorFixed from 'components/global/SearchViewSelector/SearchViewSelectorFixed';
import CarSecondarySearchOptions from './CarSecondarySearchOptions';
import Sort from '@/icons/assets/sort.svg';
import Chevron from '@/icons/assets/chevron-down-small.svg';
import { Radio, RadioGroup } from 'components/global/Radio/Radio';
import classNames from 'classnames';
import EmptyStateContainer from 'components/global/EmptyStateContainer/EmptyStateContainer';
import { EmptyState, IconWrapper } from '@simplenight/ui';
import { useCategorySlug } from 'hooks/category/useCategory';
import { defaultDriverAge } from './CarSearchForm';
import { useCarsStore } from 'hooks/cars/useCarsStore';
import { useCoreStore } from 'hooks/core/useCoreStore';

declare let window: CustomWindow;

interface CarResultsDisplayProps {
  CarCategory: CategoryOption;
}

interface ViewButtonProps {
  children: ReactNode;
  viewParam: 'list' | 'map';
}

type FetchCars = () => Promise<CarSearchResponse>;

const DEFAULT_START_TIME = '7:00 AM';
const DEFAULT_END_TIME = '7:00 AM';

const CarResultsDisplay = ({ CarCategory }: CarResultsDisplayProps) => {
  const { ClientSearcher: Searcher } = CarCategory.core;
  const [t, i18next] = useTranslation('cars');
  const carsFoundLabel = t('carsFound', 'Cars Found');
  const carsFoundLabelDesktop = t('results', 'Results');
  const noResultsLabel = t('noResultsSearch', 'No Results Match Your Search.');
  const loadMoreLabel = t('loadMore', 'Load More');
  const router = useRouter();
  const setQueryParams = useQuerySetter();

  const setCarStore = useCarsStore((state) => state.setCar);

  const pageItems = 10;
  const [page, setPage] = useState<number>(1);

  const {
    startDate,
    endDate,
    startTime,
    endTime,
    latitude,
    longitude,
    latitude2,
    longitude2,
    address,
    address2,
    driverAge,

    keywordSearch,
    // sortBy,
    types,
    companies,
    passengers,
    minPrice,
    maxPrice,
  } = useQuery();

  useEffect(() => {
    if (startTime && endTime) return;
    setQueryParams({
      startTime: DEFAULT_START_TIME,
      endTime: DEFAULT_END_TIME,
    });
  }, []);

  useEffect(() => {
    if (latitude2 && longitude2) return;
    setQueryParams({
      latitude2: latitude as unknown as string,
      longitude2: longitude as unknown as string,
    });
  }, []);

  const { slug } = useQuery();
  const apiUrl = useCategorySlug(slug as string)?.apiUrl ?? '';

  const [sortBy, setSortBy] = useState<string>('sortByPriceAsc');
  const [showSortingDropdown, setShowSortingDropdown] = useState(false);

  const onSortByChange = (_sortBy: string) => {
    setSortBy(_sortBy);
  };

  const [carsFiltered, setCarsFiltered] = useState<Car[]>([]);
  const currency = useCoreStore((state) => state.currency);

  const geolocation = `${latitude},${longitude}`;
  const geolocation2 = `${latitude2},${longitude2}`;

  const params: CarSearchRequest = {
    pickup_datetime: formatAsDateAndTime(
      startDate as unknown as string,
      startTime as unknown as string,
    ),
    return_datetime: formatAsDateAndTime(
      endDate as unknown as string,
      endTime as unknown as string,
    ),
    pickup_context: 'GEO',
    pickup_location: geolocation as unknown as StringGeolocation,
    return_context: 'GEO',
    return_location: geolocation2 as unknown as StringGeolocation,
    driver_age: parseInt(driverAge as string) || defaultDriverAge,
    apiUrl,
  };

  const fetchCars: FetchCars = async () => {
    try {
      return await Searcher?.request?.(params, i18next);
    } catch (e) {
      console.error(e);
    }
  };

  const { data, isLoading } = useReactQuery(
    ['cars-search', params],
    fetchCars,
    { retry: false, staleTime: Infinity, refetchOnWindowFocus: false },
  );

  useEffect(() => {
    if (data) {
      setCarsFiltered(data.items);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      filterCars(data.items);
    }
  }, [
    keywordSearch,
    sortBy,
    types,
    companies,
    passengers,
    minPrice,
    maxPrice,
    currency,
  ]);

  const filterCars = (_cars: Car[]) => {
    const _carsFiltered: Car[] = [];

    _cars.forEach((item: Car, index: number) => {
      let valid = true;
      // price
      const amount = parseFloat(item.rate.totalAmount);
      if (minPrice && parseInt(minPrice as string) > amount) valid = false;
      if (maxPrice && parseInt(maxPrice as string) < amount) valid = false;
      // type
      const type = item.car_model;
      if (types && types.toString().split(',').indexOf(type) < 0) valid = false;
      // company
      const company = item.company_short_name;
      if (companies && companies.toString().split(',').indexOf(company) < 0)
        valid = false;
      // passengers
      const itemPassengers = parseInt(item.passenger_quantity);
      if (passengers) {
        const _passengers = passengers.toString().split(',');
        if (_passengers[0] && parseInt(_passengers[0]) > itemPassengers)
          valid = false;
        if (
          _passengers[1] &&
          parseInt(_passengers[1]) < 6 &&
          parseInt(_passengers[1]) < itemPassengers
        )
          valid = false;
      }
      // keyword
      if (keywordSearch) {
        const keyword = keywordSearch as string;
        if (
          haveKeyword(item.company_short_name, keyword) &&
          haveKeyword(item.car_model, keyword) &&
          haveKeyword(item.transmission_type, keyword) &&
          haveKeyword(item.address_line, keyword)
        )
          valid = false;
      }
      if (valid) _carsFiltered.push(item);
    });

    // sort by price
    if (sortBy && sortBy === 'sortByPriceDesc')
      _carsFiltered.sort((a, b) =>
        parseFloat(a.rate.totalAmount) > parseFloat(b.rate.totalAmount)
          ? -1
          : Number(
              parseFloat(a.rate.totalAmount) < parseFloat(b.rate.totalAmount),
            ),
      );
    else
      _carsFiltered.sort((a, b) =>
        parseFloat(a.rate.totalAmount) < parseFloat(b.rate.totalAmount)
          ? -1
          : Number(
              parseFloat(a.rate.totalAmount) > parseFloat(b.rate.totalAmount),
            ),
      );

    setCarsFiltered(_carsFiltered);
  };

  const goToDetailPage = (carItem: Car) => {
    const updatedCarItem = {
      ...carItem,
      startDate: formatAsSearchDate(startDate as unknown as string),
      endDate: formatAsSearchDate(endDate as unknown as string),
    };
    setCarStore(updatedCarItem);
    router.push('/detail/car-rental/info');
  };

  const CarList = () => (
    <ul role="list" className="space-y-4">
      {carsFiltered.map((car: Car, index: number) => {
        const title = car.car_model;
        const companyName = car.company_short_name;
        const companyImage = car.company_picture.svg_url;
        const image = car.picture_url;
        const address = car.address_line;

        const geolocation = `${latitude},${longitude}`;
        const geolocation2 = `${latitude2},${longitude2}`;
        const cartItem: Item = {
          category: 'CAR-RENTAL',
          sector: 'other',
          booking_data: {
            inventory_id: '7e6cfd32:7264P3',
            search: {
              start_date: formatAsSearchDate(startDate as unknown as string),
              end_date: formatAsSearchDate(endDate as unknown as string),
              start_time: startTime as unknown as string,
              end_time: endTime as unknown as string,
              geolocation: geolocation as unknown as StringGeolocation,
              geolocation2: geolocation2 as unknown as StringGeolocation,
              currency: currency as unknown as string,
            },
            car: car,
            rate: {
              total: {
                prepaid: {
                  amount: parseFloat(car.rate.totalAmount as string),
                  currency: car.rate.currencyCode ?? 'USD',
                },
              },
            },
          },
        };

        if (index < page * pageItems)
          return (
            <HorizontalItemCard
              key={`car_${index}`}
              title={title}
              subtitle={
                <img
                  src={companyImage}
                  alt={companyName}
                  style={{ maxWidth: '70px', maxHeight: '25px' }}
                />
              }
              image={image}
              price={<CarItemRateInfo item={car} />}
              className=" flex-0-0-auto"
              item={car}
              onClick={goToDetailPage}
              priceDisplay={<PriceDisplay item={car} isSearch={true} />}
              cancellable={<CarCancellable item={car} />}
              features={<CarFeatures item={car} />}
              address={address}
            />
          );
      })}
      {carsFiltered.length > page * pageItems && (
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

  const handleViewTypeChange = (value: string) => {
    setQueryParams({
      view: value,
    });
  };

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
        className={classnames('h-[2rem] w-[2rem] grid place-content-center', {
          'bg-white-100 text-dark-1000': !active,
          'bg-primary-100 text-primary-1000 border border-primary-1000': active,
        })}
      >
        {children}
      </button>
    );
  };

  const ViewActions = () => {
    return (
      <section className="flex rounded-4 overflow-hidden w-[5.5rem]">
        <ViewButton viewParam="list">
          <ListIcon className="w-[1.3rem] h-[1.3rem]" />
        </ViewButton>
        <ViewButton viewParam="map">
          <MapIcon className="w-[1.3rem] h-[1.3rem]" />
        </ViewButton>
      </section>
    );
  };

  const hasNoCars = carsFiltered.length === 0;

  const viewTypeFilterItems: RadioItemType[] = [
    {
      value: 'list',
      label: (
        <IconWrapper size={24}>
          <ListIcon />
        </IconWrapper>
      ),
    },
    {
      value: 'map',
      label: (
        <IconWrapper size={24}>
          <MapIcon />
        </IconWrapper>
      ),
    },
  ];

  return (
    <>
      <section className="lg:flex lg:w-full">
        <section className="hidden lg:block lg:min-w-[16rem] lg:max-w[18rem] lg:w-[25%] lg:mr-8">
          <CarFilterFormDesktop cars={data?.items || []} />
        </section>
        <section className="relative lg:flex-1 lg:w-[75%] h-full">
          {!isLoading && hasNoCars ? (
            <div>
              <EmptyStateContainer
                text={noResultsLabel}
                Icon={EmptyState}
                width={114}
                desktopWidth={223}
              />
            </div>
          ) : (
            <>
              <div
                className={classNames(
                  'flex justify-between items-center lg:mb-0 bg-white relative lg:z-[9]',
                  {
                    'mb-0 px-5 lg:px-0 w-[100%]': isListView,
                    'lg:absolute lg:m-4 lg:rounded] px-5 lg:px-4 w-[100%] lg:w-[96%]':
                      !isListView,
                  },
                )}
              >
                <section className="py-6 text-dark-1000 font-semibold text-[20px] leading-[24px] lg:flex lg:justify-between lg:items-center">
                  {!isLoading ? (
                    <span>
                      {carsFiltered.length}
                      <span className="lg:hidden"> {carsFoundLabel}</span>
                      <span className="hidden lg:inline">
                        {' '}
                        {carsFoundLabelDesktop}
                      </span>
                    </span>
                  ) : (
                    <div className="w-40 h-8 rounded bg-dark-200 animate-pulse"></div>
                  )}
                </section>
                <section className="relative flex gap-1 px-3 py-1 rounded bg-primary-100 lg:bg-transparent lg:px-0 lg:mr-0">
                  <section className="relative flex items-center justify-start w-auto">
                    <button
                      className="flex items-center h-6 gap-2 mr-2 lg:h-10"
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
                        <span className="inline lg:hidden">{t('sort')}</span>
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

                  <section
                    style={{ width: 110, height: 32 }}
                    className="flex items-center justify-start hidden w-auto lg:block"
                  >
                    <AltRadioButtonGroup
                      items={viewTypeFilterItems}
                      value={view as string}
                      onChange={handleViewTypeChange}
                      name="viewType"
                    />
                  </section>

                  <CarSecondarySearchOptions />
                </section>
              </div>

              {isListView && (
                <section className="w-full h-full px-5 pb-6 lg:px-0">
                  {!isLoading ? <CarList /> : <HorizontalSkeletonList />}
                </section>
              )}

              {!isListView && (
                <section className="relative w-full h-full">
                  {!isLoading ? (
                    <CarMapView
                      CarCategory={CarCategory}
                      items={carsFiltered}
                      onClick={goToDetailPage}
                    />
                  ) : (
                    <div className="bg-dark-200 w-full h-[400px] lg:h-[580px] p-4 flex flex-col justify-end">
                      <HorizontalSkeletonCard />
                    </div>
                  )}
                </section>
              )}
            </>
          )}
        </section>
      </section>
      <SearchViewSelectorFixed />
    </>
  );
};

export default CarResultsDisplay;
