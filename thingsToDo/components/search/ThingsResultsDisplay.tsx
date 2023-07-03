import React, { useEffect, useMemo, useState } from 'react';
import { useQuery as useReactQuery } from '@tanstack/react-query';

import PillContainer from './SubCategoryFilter/PillContainer/PillContainer';
import { useTranslation } from 'react-i18next';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import ResultCard from './ResultCard/ResultCard';
import ThingsCancellable from './ThingsCancellable/ThingsCancellable';
import useQuery from 'hooks/pageInteraction/useQuery';
import { formatAsSearchDate } from 'helpers/dajjsUtils';
import { ThingsSearchRequest } from 'thingsToDo/types/request/ThingsSearchRequest';
import { StringGeolocation } from 'types/search/Geolocation';
import HorizontalSkeletonList from 'components/global/HorizontalItemCard/HorizontalSkeletonList';
import { Category } from 'thingsToDo/types/response/ThingsSearchResponse';
import useModal from 'hooks/layoutAndUITooling/useModal';
import FilterSidebar from '../filter/FilterSidebar';
import { useCategorySlug } from 'hooks/category/useCategory';
import EmptyStateContainer from 'components/global/EmptyStateContainer/EmptyStateContainer';
import { EmptyState as EmptyStateIllustration } from '@simplenight/ui';
import FiltersIcon from 'public/icons/assets/filters.svg';

import { Paragraph } from '@simplenight/ui';
import { SearchItem } from 'thingsToDo/types/adapters/SearchItem';
import { filterByFilters } from 'thingsToDo/helpers/filterByFilters';
import getKeywordSearchList from 'thingsToDo/helpers/getKeywordSearchList';
import getFilterCount from 'thingsToDo/helpers/getFilterCount';
import { useRouter } from 'next/router';
import useMediaViewport from 'hooks/media/useMediaViewport';

interface ThingsResultsDisplayProps {
  ThingsCategory: CategoryOption;
}

interface FiltersApplied {
  keywordSearch: string;
  price: { minPrice: string; maxPrice: string };
  freeCancellation: boolean;
  starRating: { minStarRating: string; maxStarRating: string };
  sortBy: string;
}

const ThingsResultsDisplay = ({
  ThingsCategory,
}: ThingsResultsDisplayProps) => {
  const [isOpen, onOpen, onClose] = useModal();
  const [t, i18next] = useTranslation('things');
  const [tg] = useTranslation('global');

  const [keywordSearchData, setKeywordSearchData] = useState({});

  const [filtersCount, setFiltersCount] = useState(0);

  const { ClientSearcher: Searcher } = ThingsCategory.core;
  const { slug } = useQuery();
  const apiUrl = useCategorySlug(slug as string)?.apiUrl ?? '';

  const thingsToDoLabel = t('thingsToDo', 'Things to Do');
  const resultsLabel = tg('results', 'Results');
  const noResultsLabel = tg('noResultsSearch', 'No Results Match Your Search');

  const [categoryFilters, setCategoryFilters] = useState<Array<Category>>([]);
  const [appliedCategoryFilters, setAppliedCategoryFilters] = useState<
    string[]
  >([]);

  const initialFiltersApplied = {
    keywordSearch: '',
    price: { minPrice: '0', maxPrice: '5000' },
    freeCancellation: false,
    starRating: { minStarRating: '1', maxStarRating: '5' },
    sortBy: 'recommended',
  };

  const [appliedSearchFilters, setAppliedSearchFilters] =
    useState<FiltersApplied>(initialFiltersApplied);

  const router = useRouter();
  const [queryFilter, setQueryFilters] = useState(router.query);
  const [minPrice, setMinPrice] = useState(
    (queryFilter?.minPrice as string) || '0',
  );
  const [maxPrice, setMaxPrice] = useState(
    (queryFilter?.maxPrice as string) || '5000',
  );
  const [freeCancellation, setFreeCancellation] = useState(
    queryFilter?.paymentTypes?.includes('freeCancellation') || false,
  );
  const [minStarRating, setMinStarRating] = useState<string>(
    (queryFilter.minRating as string) || '1',
  );
  const [maxStarRating, setMaxStarRating] = useState<string>(
    (queryFilter.maxRating as string) || '5',
  );
  const [keywordSearch, setKeywordSearch] = useState<string>(
    (queryFilter?.keywordSearch as string) || '',
  );
  const [sortBy, setSortBy] = useState<string>('recommended');

  const { startDate, endDate, latitude, longitude } = useQuery();
  const dstGeolocation = `${latitude},${longitude}`;

  const params: ThingsSearchRequest = {
    start_date: formatAsSearchDate(startDate as string),
    end_date: formatAsSearchDate(endDate as string),
    dst_geolocation: dstGeolocation as StringGeolocation,
    rsp_fields_set: 'basic',
    supplier_ids: '',
    apiUrl,
  };

  const fetchThingsToDo = async () => {
    try {
      const response = await Searcher?.request?.(params, i18next);

      if (response.items) {
        localStorage.setItem('timezone', JSON.stringify(response.timezone));
      }
      return response;
    } catch (e) {
      console.error(e);
    }
  };

  const { data, isLoading } = useReactQuery(
    ['thingstodo-search', params],
    fetchThingsToDo,
    {
      retry: false,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    },
  );

  const entertainmentItems = useMemo(() => {
    let result: SearchItem[] = data;
    if (appliedCategoryFilters.length > 0) {
      result = data.filter((item: SearchItem) => {
        return item.categories.some((category) =>
          appliedCategoryFilters.some(
            (appliedFilter) => category.id === appliedFilter,
          ),
        );
      });
    }

    return filterByFilters(result, appliedSearchFilters);
  }, [data, appliedCategoryFilters, appliedSearchFilters]);

  useEffect(() => {
    const items: Array<SearchItem> = data;
    let categories: Array<Category> = [];
    if (items?.length > 0) {
      const uniqueIds = new Set();
      categories = items
        .reduce((acum, item) => {
          item.categories.forEach((category) => {
            if (!uniqueIds.has(category.id)) {
              uniqueIds.add(category.id);
              acum.push(category);
            }
          });

          return acum;
        }, [] as Array<Category>)
        .sort((a: Category, b: Category) => {
          return a.label.localeCompare(b.label);
        });
    }

    setCategoryFilters(categories);
  }, [data]);

  useEffect(() => {
    if (data) getKeywordSearchList(data.items, setKeywordSearchData);
  }, [data]);

  const urlDetail = (thingsItem: SearchItem) => {
    const { id } = thingsItem;
    return `/detail/${slug}/${id}?startDate=${startDate}&endDate=${endDate}&mainCategory=${thingsItem.mainCategory}`;
  };

  const { isDesktop } = useMediaViewport();

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    if (isDesktop) setIsFilterOpen(true);
  }, [isDesktop]);

  useEffect(() => {
    setFiltersCount(getFilterCount(appliedSearchFilters));
  }, [appliedCategoryFilters, appliedSearchFilters, data]);

  const ResultsAmountSort = () => {
    return (
      <>
        <section className="flex items-center justify-between px-5 pt-3 pb-3 lg:mt-12 lg:pb-0">
          <section className="flex align-baseline">
            {!isFilterOpen && (
              <button
                className="p-2 mx-2 border-2 rounded-full hover:bg-primary-800 hover:text-white text-primary-1000 border-primary-100"
                onClick={() => {
                  setIsFilterOpen(true);
                  onOpen();
                }}
              >
                <FiltersIcon />
              </button>
            )}
            <section className="flex items-center">
              <Paragraph size="sm-lg" fontWeight="semibold">{`${
                entertainmentItems?.length === undefined
                  ? ''
                  : entertainmentItems?.length
              } ${resultsLabel}`}</Paragraph>
            </section>
          </section>
        </section>
      </>
    );
  };

  const ThingsToDoList = () => {
    return (
      <ul className="flex flex-col gap-3 px-5 py-6">
        {entertainmentItems?.map((thingToDo: SearchItem) => {
          const {
            id,
            name,
            cancellationPolicy,
            thumbnail,
            description,
            rating,
            rate,
            reviewAmount,
          } = thingToDo;

          const url = urlDetail(thingToDo);
          return (
            <div key={id}>
              <ResultCard
                url={url}
                icon={ThingsCategory.icon}
                categoryName={thingsToDoLabel}
                item={thingToDo}
                rating={rating}
                description={description}
                reviewsAmount={reviewAmount}
                title={name}
                image={thumbnail}
                rate={rate}
                className=" flex-0-0-auto"
                cancellable={
                  cancellationPolicy.cancellation_type ==
                    'FREE_CANCELLATION' && (
                    <ThingsCancellable
                      cancellationPolicy={cancellationPolicy as any}
                    />
                  )
                }
              />
            </div>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="relative lg:flex lg:w-full">
      {isFilterOpen && (
        <section>
          <FilterSidebar
            isOpen={isOpen}
            onClose={onClose}
            keywordSearchData={keywordSearchData}
            setAppliedFilters={setAppliedSearchFilters}
            setIsOpen={setIsFilterOpen}
            filtersCount={filtersCount}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            freeCancellation={freeCancellation}
            setFreeCancellation={setFreeCancellation}
            minStarRating={minStarRating}
            setMinStarRating={setMinStarRating}
            maxStarRating={maxStarRating}
            setMaxStarRating={setMaxStarRating}
            keywordSearch={keywordSearch}
            setKeywordSearch={setKeywordSearch}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </section>
      )}

      {!isLoading && !(data.items?.length === 0) && (
        <section className="relative lg:flex-1 lg:w-[75%] h-full lg:mt-0">
          <ResultsAmountSort />

          <div className="block w-full h-px lg:hidden bg-dark-300" />
          {!isLoading && (
            <PillContainer
              options={categoryFilters}
              appliedFilters={appliedCategoryFilters}
              setAppliedFilters={setAppliedCategoryFilters}
              limit={5}
            />
          )}
          <ThingsToDoList />
        </section>
      )}
      {isLoading && (
        <section className="w-full px-5 py-6">
          <HorizontalSkeletonList />
        </section>
      )}
      {!isLoading && data.items?.length === 0 && (
        <EmptyStateContainer
          text={noResultsLabel}
          Icon={EmptyStateIllustration}
          width={114}
          desktopWidth={223}
        />
      )}
      <div className="block w-full h-px lg:hidden bg-dark-300" />
    </div>
  );
};

export default ThingsResultsDisplay;
