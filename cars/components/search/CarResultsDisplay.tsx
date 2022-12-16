import { formatAsSearchDate } from 'helpers/dajjsUtils';
import useQuery from 'hooks/pageInteraction/useQuery';
import { CarSearchRequest } from 'cars/types/request/CarSearchRequest';
import {
  Car,
  CarSearchResponse,
  MinRate,
  Rates,
} from 'cars/types/response/SearchResponse';
import React, { createRef, ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import HorizontalItemCard from './HorizontalItemCard/HorizontalItemCard';
import { useRouter } from 'next/router';
import CarMapView from './CarResultsMapView';
import EmptyState from '../../../components/global/EmptyState/EmptyState';
import EmptyStateIcon from 'public/icons/assets/empty-state.svg';
import { checkIfAnyNull } from 'helpers/arrayUtils';
import { getChildrenAges, parseQueryNumber } from 'helpers/stringUtils';
import { StringGeolocation } from 'types/search/Geolocation';
import { useSelector } from 'react-redux';
import { CustomWindow } from 'types/global/CustomWindow';
import Loader from '../../../components/global/Loader/Loader';
import { Room, createRoom } from 'cars/helpers/room';
import CarItemRateInfo from './CarItemRateInfo';
import { sortByAdapter } from 'cars/adapters/sort-by.adapter';
import { cancellationTypeAdapter } from 'cars/adapters/cancellation-type.adapter';
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
import MapIcon from 'public/icons/assets/map.svg';
import ListIcon from 'public/icons/assets/list.svg';
import SortIcon from 'public/icons/assets/sort.svg';
import FilterIcon from 'public/icons/assets/filter.svg';
import Dropdown from 'components/global/Dropdown/Dropdown';
import SearchViewSelectorFixed from 'components/global/SearchViewSelector/SearchViewSelectorFixed';
import CarSecondarySearchOptions from './CarSecondarySearchOptions';

declare let window: CustomWindow;

interface CarResultsDisplayProps {
  CarCategory: CategoryOption;
}

interface ViewButtonProps {
  children: ReactNode;
  viewParam: 'list' | 'map';
}

const CarResultsDisplay = ({ CarCategory }: CarResultsDisplayProps) => {
  const [loaded, setLoaded] = useState(false);
  const { ClientSearcher: Searcher } = CarCategory.core;
  const [t, i18next] = useTranslation('cars');
  const carsFoundLabel = t('carsFound', 'Cars Found');
  const carsFoundLabelDesktop = t('results', 'Results');
  const carLabel = t('carRental', 'Car Rental');
  const noResultsLabel = t('noResultsSearch', 'No Results Match Your Search.');
  const fromLabel = t('from', 'From');
  const loadMoreLabel = t('loadMore', 'Load More');
  const { language } = i18next;
  const router = useRouter();
  const setQueryParams = useQuerySetter();

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
    keywordSearch,
    // sortBy,
    types,
    companies,
    passengers,
    minPrice,
    maxPrice,
  } = useQuery();

  const [sortBy, setSortBy] = useState<string>('sortByPriceAsc');

  const [cars, setCars] = useState<Car[]>([]);
  const [carsFiltered, setCarsFiltered] = useState<Car[]>([]);
  // It could be useful
  // const { memoizedFilterCars } = useFilter(cars, keywordSearch as string);

  const [currency, setCurrency] = useState<string>(window.currency);
  const storeCurrency = useSelector((state: any) => state.core.currency);

  const doSearch = () => {
    // console.log('Search Cars');
    const hasEmptyValues = checkIfAnyNull([
      startDate,
      endDate,
      startTime,
      endTime,
      latitude,
      longitude,
      latitude2,
      longitude2,
    ]);
    if (hasEmptyValues) return;

    const geolocation = `${latitude},${longitude}`;
    const geolocation2 = `${latitude2},${longitude2}`;

    const params: CarSearchRequest = {
      start_date: formatAsSearchDate(startDate as unknown as string),
      end_date: formatAsSearchDate(endDate as unknown as string),
      start_time: startTime as unknown as string,
      end_time: endTime as unknown as string,
      geolocation: geolocation as unknown as StringGeolocation,
      geolocation2: geolocation2 as unknown as StringGeolocation,
    };

    if (
      // sortBy ||
      keywordSearch ||
      minPrice ||
      maxPrice ||
      passengers ||
      types ||
      companies
    ) {
      // if (filters changed) use last cached API search response
      const response = JSON.parse(
        localStorage.getItem('CarSearchResponse') as string,
      );
      if (response && response.cars) {
        setCars(response.cars);
        filterCars(response.cars);
      }
      setLoaded(true);
    } else {
      // new API search
      Searcher?.request(params, i18next)
        .then((response: CarSearchResponse) => {
          localStorage.setItem('CarSearchResponse', JSON.stringify(response));
          if (response && response.cars) {
            setCars(response.cars);
            filterCars(response.cars);
          }
        })
        .catch((error) => console.error(error))
        .then(() => setLoaded(true));
    }
  };

  useEffect(() => {
    if (currency !== storeCurrency) setCurrency(storeCurrency);
  }, [storeCurrency]);

  useEffect(() => {
    doSearch();
  }, [
    startDate,
    endDate,
    startTime,
    endTime,
    latitude,
    longitude,
    latitude2,
    longitude2,

    keywordSearch,
    sortBy,
    types,
    companies,
    passengers,
    minPrice,
    maxPrice,

    currency,
  ]);

  useEffect(() => {
    // doSearch();
  }, []);

  const filterCars = (_cars: Car[]) => {
    const _carsFiltered: Car[] = [];

    _cars.forEach((item: Car, index: number) => {
      let valid = true;
      // price
      const amount = parseFloat(
        item.VehAvailCore.TotalCharge['@RateTotalAmount'],
      );
      if (minPrice && parseInt(minPrice as string) > amount) valid = false;
      if (maxPrice && parseInt(maxPrice as string) < amount) valid = false;
      // type
      const type = item.VehAvailCore.Vehicle.VehMakeModel['@Name'];
      if (types && types.toString().split(',').indexOf(type) < 0) valid = false;
      // company
      const company = item.Vendor['@CompanyShortName'];
      if (companies && companies.toString().split(',').indexOf(company) < 0)
        valid = false;
      // passengers
      const itemPassengers = parseInt(
        item.VehAvailCore.Vehicle['@PassengerQuantity'],
      );
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
          item.Vendor['@CompanyShortName']
            .toLowerCase()
            .indexOf(keyword.toLowerCase()) < 0 &&
          item.VehAvailCore.Vehicle.VehMakeModel['@Name']
            .toLowerCase()
            .indexOf(keyword.toLowerCase()) < 0 &&
          item.VehAvailCore.Vehicle['@TransmissionType']
            .toLowerCase()
            .indexOf(keyword.toLowerCase()) < 0 &&
          item.Info.LocationDetails['@Name'] &&
          item.Info.LocationDetails['@Name']
            .toLowerCase()
            .indexOf(keyword.toLowerCase()) < 0 &&
          item.Info.LocationDetails.Address.AddressLine &&
          item.Info.LocationDetails.Address.AddressLine.toLowerCase().indexOf(
            keyword.toLowerCase(),
          ) < 0
        )
          valid = false;
      }
      if (valid) _carsFiltered.push(item);
    });

    // sort by price
    if (sortBy && sortBy === 'sortByPriceDesc')
      _carsFiltered.sort((a, b) =>
        parseFloat(a.VehAvailCore.TotalCharge['@RateTotalAmount']) >
        parseFloat(b.VehAvailCore.TotalCharge['@RateTotalAmount'])
          ? -1
          : Number(
              parseFloat(a.VehAvailCore.TotalCharge['@RateTotalAmount']) <
                parseFloat(b.VehAvailCore.TotalCharge['@RateTotalAmount']),
            ),
      );
    else
      _carsFiltered.sort((a, b) =>
        parseFloat(a.VehAvailCore.TotalCharge['@RateTotalAmount']) <
        parseFloat(b.VehAvailCore.TotalCharge['@RateTotalAmount'])
          ? -1
          : Number(
              parseFloat(a.VehAvailCore.TotalCharge['@RateTotalAmount']) >
                parseFloat(b.VehAvailCore.TotalCharge['@RateTotalAmount']),
            ),
      );

    setCarsFiltered(_carsFiltered);
  };

  const urlDetail = (car: Car) => {
    const { id } = car;
    return `/detail/car-rental/${id}?startDate=${startDate}&endDate=${endDate}&startTime=${startTime}&endTime=${endTime}&geolocation=${latitude},${longitude}&geolocation2=${latitude2},${longitude2}`;
  };

  const CarList = () => (
    <ul role="list" className="space-y-4">
      {carsFiltered.map((car: Car, index: number) => {
        const url = urlDetail(car);
        const title = car.VehAvailCore.Vehicle.VehMakeModel['@Name'];
        const companyName = car.Vendor['@CompanyShortName'];
        const companyImage = car.Info.TPA_Extensions.VendorPictureURL['#text'];
        const image = car.VehAvailCore.Vehicle.PictureURL;
        const address = car.Info.LocationDetails
          ? `${car.Info.LocationDetails['@Name']}, ${car.Info.LocationDetails.Address.AddressLine}`
          : '';

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
                  amount: parseFloat(
                    car?.VehAvailCore?.TotalCharge[
                      '@RateTotalAmount'
                    ] as string,
                  ),
                  currency:
                    car?.VehAvailCore?.TotalCharge['@CurrencyCode'] ?? 'USD',
                },
              },
            },
          },
        };

        if (index < page * pageItems)
          return (
            <HorizontalItemCard
              cartItem={cartItem}
              key={`car_${index}`}
              icon={CarCategory.icon}
              categoryName={carLabel}
              item={car}
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
              url={url}
              priceDisplay={
                <PriceDisplay
                  item={car}
                  totalLabel={fromLabel}
                  isSearch={true}
                />
              }
              cancellable={<CarCancellable item={car} />}
              features={<CarFeatures item={car} />}
              address={address}
            />
          );
      })}
      {carsFiltered.length > page * pageItems && (
        <section className="flex w-full justify-center">
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
      label: <ListIcon />,
    },
    {
      value: 'map',
      label: <MapIcon />,
    },
  ];

  return (
    <>
      <section className="lg:flex lg:w-full">
        <section className="hidden lg:block lg:min-w-[16rem] lg:max-w[18rem] lg:w-[25%] lg:mr-8">
          <CarFilterFormDesktop cars={cars} />
        </section>
        <section className="relative lg:flex-1 lg:w-[75%] h-full">
          {loaded && hasNoCars ? (
            <EmptyState
              text={noResultsLabel}
              image={<EmptyStateIcon className="mx-auto" />}
            />
          ) : (
            <>
              <section
                className={`absolute z-2 ${
                  isListView ? 'right-0 top-6' : 'hidden'
                }`}
              >
                <section className="flex gap-1">
                  <section
                    style={{ width: 140, height: 32 }}
                    className="w-auto flex justify-start items-center"
                  >
                    <Dropdown
                      title={t(sortBy)}
                      leftIcon={<SortIcon />}
                      options={[
                        {
                          value: t('sortByPriceAsc'),
                          checkboxName: 'sorting',
                          selected: sortBy === 'sortByPriceAsc',
                          checkboxValue: sortBy === 'sortByPriceAsc',
                          checkboxMethod: () => setSortBy('sortByPriceAsc'),
                        },
                        {
                          value: t('sortByPriceDesc'),
                          checkboxName: 'sorting',
                          selected: sortBy === 'sortByPriceDesc',
                          checkboxValue: sortBy === 'sortByPriceDesc',
                          checkboxMethod: () => setSortBy('sortByPriceDesc'),
                        },
                      ]}
                    />
                  </section>
                  <section
                    style={{ width: 110, height: 32 }}
                    className="hidden lg:block w-auto flex justify-start items-center"
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
              </section>
              {isListView && (
                <section className="w-full h-full px-5 pb-6 lg:px-0">
                  <section className="py-6 text-dark-1000 font-semibold text-[20px] leading-[24px] lg:flex lg:justify-between lg:items-center">
                    {loaded ? (
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
                  {loaded ? <CarList /> : <HorizontalSkeletonList />}
                </section>
              )}
              {!isListView && (
                <section className="relative w-full h-full">
                  {loaded ? (
                    <CarMapView
                      CarCategory={CarCategory}
                      items={carsFiltered}
                      createUrl={urlDetail}
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
