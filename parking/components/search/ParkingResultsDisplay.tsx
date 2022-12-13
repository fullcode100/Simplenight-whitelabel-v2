import React, { FC, useEffect, useState } from 'react';
import { CategoryOption } from '../../../types/search/SearchTypeOptions';
import EmptyState from '../../../components/global/EmptyState/EmptyState';
import EmptyStateIcon from '@/icons/assets/empty-state.svg';
import HorizontalSkeletonList from '../../../components/global/HorizontalItemCard/HorizontalSkeletonList';
import HorizontalSkeletonCard from '../../../components/global/HorizontalItemCard/HorizontalSkeletonCard';
import SearchViewSelectorFixed from '../../../components/global/SearchViewSelector/SearchViewSelectorFixed';
import { useTranslation } from 'react-i18next';
import { ParkingFilterFormDesktop } from './ParkingFilterFormDesktop';
import { SearchResultsHeader } from './SearchResultsHeader';
import { checkIfAnyNull } from '../../../helpers/arrayUtils';
import useQuery from '../../../hooks/pageInteraction/useQuery';
import {
  Parking,
  ParkingSearchResponseItemResult,
} from '../../types/response/ParkingSearchResponse';
import { ParkingMapView } from './MapView';
import { ParkingCard } from './ParkingCard';
import { useParkingListFilter } from '../../hooks/useParkingListFilter';
import { useParkingMetaData } from '../../hooks/useParkingMetaData';
import { useSortParkingList } from '../../hooks/useSortParkingList';

interface ParkingResultsDisplayProps {
  parkingCategory: CategoryOption;
}

export const ParkingResultsDisplay: FC<ParkingResultsDisplayProps> = ({
  parkingCategory,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [counter, setCounter] = useState(0);
  const [parkingList, setParkingList] = useState<Parking[]>([]);
  const [t, i18next] = useTranslation('parking');
  const { ClientSearcher: Searcher } = parkingCategory.core;

  const parkingMetaData = useParkingMetaData(parkingList);
  const {
    filteredParkingList,
    filter,
    changeFilter,
    isFiltering,
    resetFilter,
  } = useParkingListFilter(parkingList);
  const { sortedParkingList, sortBy, setSortBy } =
    useSortParkingList(filteredParkingList);

  const { latitude, longitude, startDate, endDate, startTime, endTime, view } =
    useQuery();

  const isListView = view !== 'map';

  useEffect(() => {
    if (counter !== 0) return;
    setCounter((p) => p + 1);
    const hasEmptyValues = checkIfAnyNull([latitude, longitude]);
    if (hasEmptyValues) return;

    const params: any = {
      start_date: startDate,
      end_date: endDate,
      start_time: startTime,
      end_time: endTime,
      latitude,
      longitude,
      rsp_fields_set: 'extended',
      inventory_ids: ' ',
      apiUrl: '/categories/parking/items/details',
    };

    setLoaded(false);
    Searcher?.request(params, i18next)
      .then((results: ParkingSearchResponseItemResult) => {
        setParkingList(results.features);
        setLoaded(true);
      })
      .catch((error) => console.error(error));
  }, [latitude, longitude]);

  const ParkingList: FC<{ parkingList: Parking[] }> = ({ parkingList }) => {
    return (
      <section className="flex flex-col gap-4">
        {parkingList.map((parkingItem) => (
          <ParkingCard key={parkingItem.id} parkingItem={parkingItem} />
        ))}
      </section>
    );
  };

  return (
    <>
      <section className="lg:flex lg:w-full">
        <section className="hidden lg:block lg:min-w-[16rem] lg:max-w[18rem] lg:w-[25%] lg:mr-8">
          <ParkingFilterFormDesktop
            onFilterChange={changeFilter}
            filter={filter}
            parkingMetaData={parkingMetaData}
            onClear={resetFilter}
          />
        </section>
        <section className="relative flex-1">
          <section>
            <SearchResultsHeader
              length={sortedParkingList.length}
              isLoading={!loaded || isFiltering}
              onFilterChange={changeFilter}
              filter={filter}
              onSortChange={setSortBy}
              sortBy={sortBy}
            />
          </section>
          {loaded && sortedParkingList.length === 0 && !isFiltering ? (
            <EmptyState
              text={t('no parking spots')}
              image={<EmptyStateIcon className="mx-auto" />}
            />
          ) : (
            <section>
              {isListView && (
                <section className="w-full h-full px-4 pb-6 lg:px-0">
                  {!loaded || isFiltering ? (
                    <HorizontalSkeletonList />
                  ) : (
                    <ParkingList parkingList={sortedParkingList} />
                  )}
                </section>
              )}
              {!isListView && (
                <section className="relative w-full h-full">
                  {!loaded || isFiltering ? (
                    <div className="bg-dark-200 w-full h-[400px] lg:h-[580px] p-4 flex flex-col justify-end">
                      <HorizontalSkeletonCard />
                    </div>
                  ) : (
                    <ParkingMapView parkingList={sortedParkingList} />
                  )}
                </section>
              )}
            </section>
          )}
        </section>
      </section>
      <SearchViewSelectorFixed />
    </>
  );
};
