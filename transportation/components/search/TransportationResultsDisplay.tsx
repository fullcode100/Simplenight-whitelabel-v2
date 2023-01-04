import React, { FC, useEffect, useState } from 'react';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import { TransportationFilterFormDesktop } from './TransportationFilterFormDesktop';
import { useTranslation } from 'react-i18next';
import Sort from 'public/icons/assets/sort.svg';
import { SORT_BY_OPTIONS } from 'transportation/constants/sortByOptions';
import Filter from 'public/icons/assets/filter.svg';
import Chevron from 'public/icons/assets/chevron-down-small.svg';
import useModal from 'hooks/layoutAndUITooling/useModal';
import { RadioGroup, Radio } from 'components/global/Radio/Radio';
import useQuery from '../../../hooks/pageInteraction/useQuery';
import { TransportationCard } from './TransportationCard';
import HorizontalSkeletonList from 'components/global/HorizontalItemCard/HorizontalSkeletonList';
import EmptyState from 'components/global/EmptyState/EmptyState';
import EmptyStateIcon from '@/icons/assets/empty-state.svg';
import {
  Item,
  Quote,
  Response,
  TransportationSearchResponseItemResult,
} from '../../types/response/TransportationSearchResponse';
import { useFilter } from 'transportation/hooks/useFilter';
import { getMetadata } from 'transportation/helpers/getMetadata';
import { TransportationListMetaData } from 'transportation/types/TransportationFilter';

interface TransportationResultsDisplayProps {
  TransportationCategory: CategoryOption;
}

const TransportationResultsDisplay: FC<TransportationResultsDisplayProps> = ({
  TransportationCategory,
}) => {
  const { ClientSearcher: Searcher } = TransportationCategory.core;
  const [t, i18next] = useTranslation('ground-transportation');
  const [tg] = useTranslation('global');
  const [isOpen, onOpen, onClose] = useModal();
  const [showSortModal, setShowSortModal] = useState(false);
  const [transportationList, setTransportationList] = useState<Quote[]>([]);
  const resultsLabel = tg('results', 'Results');
  const sortLabel = tg('sort', 'Sort');
  const filterLabel = tg('filter', 'Filter');
  const [loaded, setLoaded] = useState(false);
  const [quoteRequestId, setQuoteRequestId] = useState<string>('');
  const [metadata, setMetadata] = useState<TransportationListMetaData>({
    minPrice: 0,
    maxPrice: 0,
    minPassengers: 0,
    maxPassengers: 0,
    carType: [],
    minRating: 0,
    maxRating: 0,
  });

  const { onFilterValuesChanged, filteredList, filter } = useFilter(
    transportationList,
    metadata,
  );
  const [sortBy, setSortBy] = useState(filter.sortBy);

  const {
    latitude,
    longitude,
    startDate,
    endDate,
    startTime,
    endTime,
    latitude2,
    longitude2,
    address,
    address2,
    trip,
    passengers,
  } = useQuery();

  useEffect(() => {
    if (!address2) {
      setLoaded(true);
      return;
    }
    const params = {
      pickup_datetime: `${startDate}T${startTime}`,
      ...(trip === 'roundTrip' && { return_datetime: `${endDate}T${endTime}` }),
      pickup_context: address?.includes('Airport' || 'Terminal')
        ? 'airport-terminal'
        : 'Address',
      pickup_location: `${latitude},${longitude}`,
      return_context: address2?.includes('Airport' || 'Terminal')
        ? 'airport-terminal'
        : 'Address',
      return_location: `${latitude2},${longitude2}`,
      currency: 'USD',
      include_return_trip: trip === 'roundTrip' ? true : false,
      passenger_count: passengers,
      from_description: `${address}`,
      to_description: `${address2}`,
      rsp_fields_set: 'extended',
      inventory_ids: ' ',
      apiUrl: '/categories/ground-transportation/items/details',
    };

    setLoaded(false);
    Searcher?.request(params, i18next)
      .then((results: Item) => {
        setLoaded(true);
        const metadata = getMetadata(results?.response?.results?.quotes);
        setTransportationList(results?.response?.results?.quotes);
        setQuoteRequestId(results?.response?.quote_request_id);
        setMetadata(metadata);
        onFilterValuesChanged({
          minPrice: metadata.minPrice,
          maxPrice: metadata.maxPrice,
          minPassengers: metadata.minPassengers,
          maxPassengers: metadata.maxPassengers,
          carType: metadata.carType,
          minRating: metadata.minRating,
          maxRating: metadata.maxRating,
        });
      })
      .catch((error) => {
        setLoaded(true);
        console.error(error);
      });
  }, [latitude, longitude]);

  const TransportationList: FC<{ transportationList: Quote[] }> = ({
    transportationList,
  }) => {
    return (
      <section className="flex flex-col gap-4">
        {transportationList?.map((transportationItem) => (
          <TransportationCard
            key={transportationItem?.quote_id}
            transportationItem={transportationItem}
            quoteRequestId={quoteRequestId}
          />
        ))}
      </section>
    );
  };

  const onSortByChange = (sortBy: string) => {
    setSortBy(sortBy);
    onFilterValuesChanged({ sortBy });
  };

  return (
    <section className="mt-16 lg:flex lg:w-full">
      <section className="hidden lg:block lg:min-w-[16rem] lg:max-w[18rem] lg:w-[25%] lg:mr-8">
        <TransportationFilterFormDesktop
          filterValuesChanged={onFilterValuesChanged}
          filter={filter}
          transportationMetaData={metadata}
        />
      </section>
      <section className="relative lg:flex-1 lg:w-[75%] h-full lg:mt-0">
        <section
          className={`absolute z-10 border border-dark-300 rounded shadow-container lg:top-16 bg-white right-4 w-[256px] transition-all duration-500 text-dark-1000 ${
            !showSortModal && 'opacity-0 invisible'
          } top-12`}
        >
          <RadioGroup onChange={onSortByChange} value={sortBy} gap="gap-0">
            {SORT_BY_OPTIONS.map((option, i) => (
              <Radio
                key={i}
                value={option?.value}
                containerClass={`px-3 py-2 ${
                  i < SORT_BY_OPTIONS.length - 1 && 'border-b border-dark-200'
                }`}
              >
                <p className={'hover:cursor-pointer'}>{tg(option.label)}</p>
              </Radio>
            ))}
          </RadioGroup>
        </section>
        <section className="flex items-center justify-between px-5 pt-3 pb-3 lg:mt-6 lg:pb-0">
          <p className="text-sm leading-5 lg:text-[20px] lg:leading-[24px] font-semibold">
            {filteredList?.length} {resultsLabel}
          </p>
          <section className="relative flex items-center gap-2 px-2 py-1 rounded bg-primary-100 lg:px-0 lg:bg-white">
            <button
              className="flex items-center gap-1"
              onClick={() => setShowSortModal(!showSortModal)}
              onBlur={() => setShowSortModal(false)}
            >
              <span className="text-primary-1000">
                <Sort />
              </span>
              <span className="text-xs font-semibold text-dark-1000 lg:hidden">
                {sortLabel}
              </span>
              <span className="hidden text-xs font-semibold text-dark-1000 lg:flex">
                {tg(
                  SORT_BY_OPTIONS.find((option) => option.value == sortBy)
                    ?.label ?? '',
                )}
              </span>
              <span className="text-dark-800">
                <Chevron />
              </span>
            </button>
            <button
              onClick={onOpen}
              className="flex items-center gap-1 lg:hidden"
            >
              <span className="text-primary-1000">
                <Filter />
              </span>
              <span className="text-xs font-semibold text-dark-1000 lg:hidden">
                {filterLabel}
              </span>
            </button>
          </section>
        </section>
        <section className="px-5 py-6">
          <section className="relative w-full h-full">
            {loaded && filteredList?.length === 0 ? (
              <EmptyState
                text={t('No Results Match Your Search.')}
                image={<EmptyStateIcon className="mx-auto" />}
              />
            ) : (
              <section>
                <section className="w-full h-full px-5 pb-6 lg:px-0">
                  {!loaded ? (
                    <HorizontalSkeletonList />
                  ) : (
                    <TransportationList transportationList={filteredList} />
                  )}
                </section>
              </section>
            )}
          </section>
        </section>
      </section>
    </section>
  );
};

export default TransportationResultsDisplay;
