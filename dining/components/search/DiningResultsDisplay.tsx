/* eslint-disable camelcase */
import useQuerySetter from 'hooks/pageInteraction/useQuerySetter';
import { useQuery as useReactQuery } from '@tanstack/react-query';
import { DiningCategory } from '../../index';
import { DiningSearchRequest } from 'dining/types/request/DiningSearchRequest';
import { Dining } from 'dining/types/response/SearchResponse';
import React, { useState, useEffect } from 'react';
import useQuery from 'hooks/pageInteraction/useQuery';
import SearchViewSelectorFixed from 'components/global/SearchViewSelector/SearchViewSelectorFixed';
import HorizontalItemCard from './HorizontalItemCard';
import MapIcon from 'public/icons/assets/map-ok.svg';
import ListIcon from 'public/icons/assets/list-ok.svg';
import classnames from 'classnames';
import MapView from './MapView/MapView';
import PriceDisplay from '../PriceDisplay/PriceDisplay';
import {
  EmptyState as EmptyStateIllustration,
  IconWrapper,
} from '@simplenight/ui';
import { formatAsSearchDate } from 'helpers/dajjsUtils';
import { StringGeolocation } from 'types/search/Geolocation';
import HorizontalSkeletonList from 'components/global/HorizontalItemCard/HorizontalSkeletonList';
import { useTranslation } from 'react-i18next';
import DiningItemPriceInfo from './DiningItemPriceInfo';
import {
  AltRadioButtonGroup,
  RadioItemType,
} from 'components/global/AltRadioButton/AltRadioButton';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import { useCategorySlug } from 'hooks/category/useCategory';
import EmptyStateContainer from 'components/global/EmptyStateContainer/EmptyStateContainer';
import { SORT_BY_OPTIONS } from 'dining/constants/sortByOptions';
import FilterSidebarDining from './filters/FilterSidebarDining';
import useModal from 'hooks/layoutAndUITooling/useModal';
import FiltersIcon from 'public/icons/assets/filters.svg';

type sortByFilters = 'Best Match' | 'Rating' | 'Review Count' | 'Distance';

interface DiningResultsDisplayProps {
  Category: CategoryOption;
}

const DiningResultsDisplay = ({ Category }: DiningResultsDisplayProps) => {
  const [t, i18next] = useTranslation('dining');
  const [isOpen, onOpen, onClose] = useModal();
  const [filtersCount, setFiltersCount] = useState(0);
  const noResultsLabel = t('noResultsSearch');
  const sortByBestMatch = t('sortByBestMatch', 'Best Match');
  const sortByRating = t('sortByRating', 'Rating');
  const sortByReviewCount = t('sortByReviewCount', 'Review Count');
  const sortByDistance = t('sortByDistance', 'Distance');
  const setQueryParams = useQuerySetter();
  const {
    lang,
    covers,
    startDate,
    endDate,
    latitude,
    longitude,
    price,
    sort_by,
    slug,
    keyword,
  } = useQuery();
  const apiUrl = useCategorySlug(slug as string)?.apiUrl ?? '';
  const [sortByVal, setSortByVal] = useState(
    sort_by
      ? SORT_BY_OPTIONS.find((o) => o.param == sort_by)?.label
      : sortByBestMatch,
  );
  const [restaurants, setRestaurants] = useState<Dining[]>([]);
  const { ClientSearcher: Searcher } = Category.core;

  const params: DiningSearchRequest = {
    covers: '2',
    start_date: formatAsSearchDate(startDate as unknown as string),
    end_date: formatAsSearchDate(endDate as unknown as string),
    dst_geolocation: `${latitude},${longitude}` as unknown as StringGeolocation,
    rsp_fields_set: 'basic',
    limit: 50,
    sort_by: sort_by as sortByFilters,
    price: price as string,
    cancellation_type: '',
    supplier_ids: '',
    apiUrl,
    time: '21:00',
    keyword: keyword as string,
  };

  const fetchDining = async () => {
    try {
      return await Searcher?.request?.(params, i18next);
    } catch (e) {
      console.error(e);
    }
  };
  const { data, isLoading } = useReactQuery(
    ['dining-search', params],
    fetchDining,
    { retry: false, staleTime: Infinity, refetchOnWindowFocus: false },
  );

  useEffect(() => {
    if (data) {
      setRestaurants(data.items);
    }
  }, [data]);

  const { view = 'list' } = useQuery();
  const isListView = view === 'list';

  const handleViewTypeChange = (value: string) =>
    setQueryParams({ view: value });

  const urlDetail = (dining: Dining) => {
    const { id } = dining;
    return `/detail/${slug}/${id}?covers=${params.covers}&time=${params.time}&startDate=${startDate}&geolocation=${latitude},${longitude}`;
  };

  const onChangeSortBy = (value: string) => {
    setSortByVal(value);
    const typedValue: sortByFilters = value as sortByFilters;
    switch (typedValue) {
      case sortByBestMatch:
        setQueryParams({ sort_by: 'best_match' });
        break;
      case sortByRating:
        setQueryParams({ sort_by: 'rating' });
        break;
      case sortByReviewCount:
        setQueryParams({ sort_by: 'review_count' });
        break;
      case sortByDistance:
        setQueryParams({ sort_by: 'distance' });
        break;
      default:
        break;
    }
  };

  const DiningData = () => (
    <ul role="list" className="space-y-4">
      {restaurants.map((dining, index) => {
        const {
          id,
          name,
          location: { address },
          review_count,
          rating,
          phone,
          image,
          categories,
        } = dining;

        const itemKey = id + index;
        const url = urlDetail(dining);

        return (
          <HorizontalItemCard
            key={itemKey}
            icon={DiningCategory.icon}
            categoryName={'dining'}
            categoryTags={categories}
            item={dining}
            title={name}
            image={image}
            address={address}
            phone={phone}
            className="flex-0-0-auto"
            rating={rating}
            url={url}
            price={<DiningItemPriceInfo />}
            ratingCount={review_count}
            priceDisplay={<PriceDisplay price={t('free')} />}
            priceNumber={dining.price?.length}
          />
        );
      })}
    </ul>
  );

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

  const hasNoRestaurants = restaurants.length === 0;

  const sortBySelect = {
    sortBy: sortByVal,
    onChangeSortBy: onChangeSortBy,
  };

  useEffect(() => {
    if (price) setFiltersCount(1);
  }, [price]);

  return (
    <>
      <section className="lg:flex lg:w-full">
        {isOpen && (
          <section>
            <FilterSidebarDining
              filtersCount={filtersCount}
              onClose={onClose}
              isOpen={isOpen}
              sortBySelect={sortBySelect}
            />
          </section>
        )}
        <section className="relative h-full lg:mt-6 lg:w-[75%] lg:flex-1">
          {!isLoading && hasNoRestaurants ? (
            <EmptyStateContainer
              text={noResultsLabel}
              Icon={EmptyStateIllustration}
              width={114}
              desktopWidth={223}
            />
          ) : (
            <>
              <section
                className={classnames(
                  'relative z-[9] flex items-center justify-between bg-white lg:mb-0',
                  {
                    'mb-0 w-[100%] px-5 lg:px-0': isListView,
                    'lg:rounded] w-[100%] px-5 lg:absolute lg:m-4 lg:w-[96%] lg:px-4':
                      !isListView,
                  },
                )}
              >
                <section className="py-6 text-[20px] font-semibold leading-[24px] text-dark-1000 lg:flex lg:items-center lg:justify-between">
                  {data ? (
                    <>
                      {!isOpen && (
                        <button
                          className="p-2 mx-2 border-2 rounded-full hover:bg-primary-800 hover:text-white text-primary-1000 border-primary-100"
                          onClick={() => {
                            onOpen();
                          }}
                        >
                          <FiltersIcon />
                        </button>
                      )}
                      <span>
                        {restaurants.length}{' '}
                        <span className="lg:hidden">{t('results')}</span>
                        <span className="hidden lg:inline">
                          {' '}
                          {t('results')}
                        </span>
                      </span>
                    </>
                  ) : (
                    <div className="w-40 h-8 rounded animate-pulse bg-dark-200"></div>
                  )}
                </section>
                <section className="relative flex gap-1 px-3 py-1 rounded bg-primary-100 lg:mr-0 lg:bg-transparent lg:px-0">
                  <section className="flex items-center gap-4">
                    <section className="hidden h-[32px] w-[110px] items-center justify-start lg:flex">
                      <AltRadioButtonGroup
                        items={viewTypeFilterItems}
                        value={view as string}
                        onChange={handleViewTypeChange}
                        name="viewType"
                        square={true}
                      />
                    </section>
                  </section>
                </section>
              </section>
              {isListView && (
                <section className="w-full h-full px-5 pb-6 lg:px-0">
                  {data ? <DiningData /> : <HorizontalSkeletonList />}
                </section>
              )}
              {!isListView && (
                <section className="relative w-full h-full">
                  <MapView items={restaurants} createUrl={urlDetail} />
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

export default DiningResultsDisplay;
