import React, { FC, useEffect, useState } from 'react';
import { CategoryOption } from '../../../types/search/SearchTypeOptions';
import EmptyState from '../../../components/global/EmptyState/EmptyState';
import EmptyStateIcon from '@/icons/assets/empty-state.svg';
import HorizontalSkeletonList from '../../../components/global/HorizontalItemCard/HorizontalSkeletonList';
import HorizontalSkeletonCard from '../../../components/global/HorizontalItemCard/HorizontalSkeletonCard';
import SearchViewSelectorFixed from '../../../components/global/SearchViewSelector/SearchViewSelectorFixed';
import { useTranslation } from 'react-i18next';
import { ParkingFilterForm } from './ParkingFilterForm';
import { SearchResultsHeader } from './SearchResultsHeader';
import { checkIfAnyNull } from '../../../helpers/arrayUtils';
import useQuery from '../../../hooks/pageInteraction/useQuery';
import {
  Parking,
  ParkingSearchResponseItemResult,
} from '../../types/response/ParkingSearchResponse';
import { ParkingMapView } from './MapView';
import { ParkingCard } from './ParkingCard';
import { useFilter } from '../../hooks/useFilter';
import {
  ParkingFilter,
  ParkingListMetaData,
  ParkingSortBy,
} from '../../types/ParkingFilter';
import { getParkingMetadata } from '../../helpers/getParkingMetadata';
import useQuerySetter from '../../../hooks/pageInteraction/useQuerySetter';
import dayjs from 'dayjs';
import { ceilToNextHalfHour } from '../../helpers/ceilToNextHalfHour';
import { ParkingFilterMobileView } from './ParkingFilterMobileView';
import { useRouter } from 'next/router';

interface ParkingResultsDisplayProps {
  parkingCategory: CategoryOption;
}

export const ParkingResultsDisplay: FC<ParkingResultsDisplayProps> = ({
  parkingCategory,
}) => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [counter, setCounter] = useState(0);
  const [parkingList, setParkingList] = useState<Parking[]>([]);
  const [metadata, setMetadata] = useState<ParkingListMetaData>({
    minPrice: 0,
    maxPrice: 100,
    currencySymbol: '$',
    currency: 'USD',
    heightRestrictionsList: [0, 1000],
  });

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const { filteredList, filter, updateFilter } = useFilter(
    parkingList,
    metadata,
  );

  const cachedViewType = localStorage.getItem('view') || '';
  const [view, setView] = useState(
    ['list', 'map'].includes(cachedViewType) ? cachedViewType : 'list',
  );
  const viewChangeHandler = (view: string) => {
    setView(view);
    localStorage.setItem('view', view);
  };

  const [highAvailability, setHighAvailability] = useState(
    filter.highAvailability,
  );
  const [surfaceType, setSurfaceType] = useState(filter.surfaceType);
  const [features, setFeatures] = useState(filter.features);
  const [minPrice, setMinPrice] = useState(filter.minPrice);
  const [maxPrice, setMaxPrice] = useState(filter.maxPrice);
  const [minHeight, setMinHeight] = useState(filter.minHeight);
  const [maxHeight, setMaxHeight] = useState(filter.maxHeight);

  const [parkingType, setParkingType] = useState(filter.parkingType);
  const [sortBy, setSortBy] = useState<ParkingSortBy>(filter.sortBy);

  const onHighAvailabilityChange = (highAvailability: boolean) => {
    setHighAvailability(highAvailability);
    updateFilter({ highAvailability });
  };

  const onSurfaceTypeChange = (surfaceType: string[]) => {
    setSurfaceType(surfaceType);
    updateFilter({ surfaceType });
  };

  const onFeaturesChange = (features: string[]) => {
    setFeatures(features);
    updateFilter({ features });
  };

  const onMinMaxPriceChange = ([minPrice, maxPrice]: [number, number]) => {
    setMinPrice(minPrice);
    setMaxPrice(maxPrice);
  };

  const onMinMaxPriceAfterChange = ([minPrice, maxPrice]: [number, number]) => {
    updateFilter({ minPrice, maxPrice });
  };

  const onMinMaxHeightChange = ([minHeight, maxHeight]: [number, number]) => {
    setMinHeight(minHeight);
    setMaxHeight(maxHeight);
  };

  const onMinMaxHeightAfterChange = ([minHeight, maxHeight]: [
    number,
    number,
  ]) => {
    updateFilter({ minHeight, maxHeight });
  };

  const onParkingTypeChange = (parkingType: string) => {
    setParkingType(parkingType);
    updateFilter({ parkingType });
  };

  const onSortByChange = (sortBy: ParkingSortBy) => {
    setSortBy(sortBy);
    updateFilter({ sortBy });
  };

  const onFilterChangeHandler = (value: ParkingFilter) => {
    updateFilter(value);
    setFeatures(value.features);
    setHighAvailability(value.highAvailability);
    setMinHeight(value.minHeight);
    setMaxHeight(value.maxHeight);
    setMinPrice(value.minPrice);
    setMaxPrice(value.maxPrice);
    setSurfaceType(value.surfaceType);
  };

  const onReset = () => {
    setHighAvailability(false);
    setSurfaceType([]);
    setFeatures([]);
    setMinPrice(metadata.minPrice);
    setMaxPrice(metadata.maxPrice);
    setMinHeight(0);
    setMaxHeight(
      metadata.heightRestrictionsList[
        metadata.heightRestrictionsList.length - 1
      ],
    );
    setParkingType('ALL');
    setSortBy('distanceASC');

    updateFilter({
      minPrice: metadata.minPrice,
      maxPrice: metadata.maxPrice,
      maxHeight:
        metadata.heightRestrictionsList[
          metadata.heightRestrictionsList.length - 1
        ],
      surfaceType: [],
      minHeight: 0,
      features: [],
      highAvailability: false,
      parkingType: 'ALL',
      sortBy: 'distanceASC',
    });
  };

  const [t, i18next] = useTranslation('parking');
  const { ClientSearcher: Searcher } = parkingCategory.core;

  const {
    latitude,
    longitude,
    startDate,
    endDate,
    startTime,
    endTime,
    view: viewParam,
  } = useQuery();

  const setQueryParam = useQuerySetter();

  const isListView = view !== 'map';

  const getCachedParkingResponse = (): Parking[] | null => {
    const parkingList = localStorage.getItem('parking');
    if (parkingList) {
      try {
        return JSON.parse(parkingList);
      } catch (err) {
        console.error(err);
        return null;
      }
    }

    return null;
  };

  useEffect(() => {
    if (counter !== 0) return;
    setCounter((p) => p + 1);
    const hasEmptyValues = checkIfAnyNull([
      latitude,
      longitude,
      startDate,
      endDate,
      startTime,
      endTime,
    ]);

    const TIME_SELECTION_FORMAT = 'hh:mm A';
    if (!startTime || !endTime) {
      const thirtyMinutesFromNow = ceilToNextHalfHour(
        dayjs().add(30, 'minutes'),
      );
      const anotherThirtyMinutes = thirtyMinutesFromNow.add(30, 'minutes');
      const start = thirtyMinutesFromNow.format(TIME_SELECTION_FORMAT);
      const end = anotherThirtyMinutes.format(TIME_SELECTION_FORMAT);
      setQueryParam({
        startTime: (startTime as string) || start,
        endTime: (endTime as string) || end,
      });
    }

    if (hasEmptyValues) return;

    const params: any = {
      start_date: startDate,
      end_date: endDate,
      start_time: dayjs(startTime as string, TIME_SELECTION_FORMAT).format(
        'HHmm',
      ),
      end_time: dayjs(endTime as string, TIME_SELECTION_FORMAT).format('HHmm'),
      latitude,
      longitude,
      rsp_fields_set: 'extended',
      inventory_ids: ' ',
      apiUrl: '/categories/parking/items/details',
    };

    const cachedParkingList = getCachedParkingResponse();

    if (cachedParkingList) {
      const metadata = getParkingMetadata(cachedParkingList);
      setParkingList(cachedParkingList);
      setMetadata(metadata);

      const maxHeight =
        metadata.heightRestrictionsList[
          metadata.heightRestrictionsList.length - 1
        ];

      updateFilter({
        maxHeight,
        minPrice: metadata.minPrice,
        maxPrice: metadata.maxPrice,
      });
      setMinPrice(metadata.minPrice);
      setMaxPrice(metadata.maxPrice);
      setMaxHeight(maxHeight);
      setLoaded(true);
      return;
    }

    setLoaded(false);
    Searcher?.request(params, i18next)
      .then((results: ParkingSearchResponseItemResult) => {
        localStorage.setItem('parking', JSON.stringify(results.features));
        const metadata = getParkingMetadata(results.features);
        setParkingList(results.features);
        setMetadata(metadata);

        const maxHeight =
          metadata.heightRestrictionsList[
            metadata.heightRestrictionsList.length - 1
          ];

        updateFilter({
          maxHeight,
          minPrice: metadata.minPrice,
          maxPrice: metadata.maxPrice,
        });
        setMinPrice(metadata.minPrice);
        setMaxPrice(metadata.maxPrice);
        setMaxHeight(maxHeight);
        setLoaded(true);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoaded(true));

    localStorage.setItem('parkingLastSearch', router.asPath || '/');
  }, [latitude, longitude]);

  useEffect(() => {
    if (typeof viewParam === 'string' && ['map', 'list'].includes(viewParam)) {
      viewChangeHandler(viewParam);
    }
  }, [viewParam]);

  return (
    <>
      <section className="lg:flex lg:w-full pt-4">
        <section className="hidden lg:block lg:min-w-[16rem] lg:max-w[18rem] lg:w-[25%] lg:mr-8 shrink-0">
          <ParkingFilterForm
            handleReset={onReset}
            filter={{
              highAvailability,
              surfaceType,
              features,
              minPrice,
              maxPrice,
              minHeight,
              maxHeight,
              parkingType: filter.parkingType,
              sortBy: filter.sortBy,
            }}
            parkingMetaData={metadata}
            onFeaturesChange={onFeaturesChange}
            onHighAvailabilityChange={onHighAvailabilityChange}
            onMinMaxHeightAfterChange={onMinMaxHeightAfterChange}
            onMinMaxHeightChange={onMinMaxHeightChange}
            onMinMaxPriceAfterChange={onMinMaxPriceAfterChange}
            onMinMaxPriceChange={onMinMaxPriceChange}
            onSurfaceTypeChange={onSurfaceTypeChange}
          />
        </section>
        <section className="relative flex-1">
          <section>
            <SearchResultsHeader
              length={filteredList.length}
              isLoading={!loaded}
              sortBy={sortBy}
              parkingType={parkingType}
              onParkingTypeChange={onParkingTypeChange}
              onSortByChange={onSortByChange}
              view={view}
              onViewChange={viewChangeHandler}
              setMobileFilterOpen={setMobileFilterOpen}
            />
          </section>
          {loaded && filteredList.length === 0 ? (
            <EmptyState
              text={t('no parking spots')}
              image={<EmptyStateIcon className="mx-auto" />}
            />
          ) : (
            <section>
              {isListView && (
                <section className="w-full h-full px-4 pb-6 lg:px-0">
                  {!loaded ? (
                    <HorizontalSkeletonList />
                  ) : (
                    <ParkingList parkingList={filteredList} />
                  )}
                </section>
              )}
              {!isListView && (
                <section className="relative w-full h-full">
                  {!loaded ? (
                    <div className="bg-dark-200 w-full h-[400px] lg:h-[580px] p-4 flex flex-col justify-end">
                      <HorizontalSkeletonCard />
                    </div>
                  ) : (
                    <ParkingMapView parkingList={filteredList} />
                  )}
                </section>
              )}
            </section>
          )}
        </section>
      </section>
      {mobileFilterOpen && (
        <ParkingFilterMobileView
          onClose={() => setMobileFilterOpen(false)}
          handleReset={onReset}
          filter={{
            highAvailability,
            surfaceType,
            features,
            minPrice,
            maxPrice,
            minHeight,
            maxHeight,
            parkingType: filter.parkingType,
            sortBy: filter.sortBy,
          }}
          parkingMetaData={metadata}
          onChange={onFilterChangeHandler}
        />
      )}
      <SearchViewSelectorFixed />
    </>
  );
};

const ParkingList: FC<{ parkingList: Parking[] }> = ({ parkingList }) => {
  return (
    <section className="flex flex-col gap-4">
      {parkingList.map((parkingItem) => (
        <ParkingCard key={parkingItem.id} parkingItem={parkingItem} />
      ))}
    </section>
  );
};
