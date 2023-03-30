import React, { useEffect, useState } from 'react';
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
import Sort from 'public/icons/assets/sort.svg';
import Chevron from 'public/icons/assets/chevron-down-small.svg';
import Filter from 'public/icons/assets/filter.svg';
import { RadioGroup, Radio } from 'components/global/Radio/Radio';
import { SORT_BY_OPTIONS } from 'thingsToDo/constants/sortByOptions';
import FilterModal from '../filter/FilterModal';
import useModal from 'hooks/layoutAndUITooling/useModal';
import FilterSidebar from '../filter/FilterSidebar';
import { sortByAdapter } from 'thingsToDo/adapters/sort-by.adapter';
import { cancellationTypeAdapter } from 'thingsToDo/adapters/cancellation-type.adapter';
import { useCategorySlug } from 'hooks/category/useCategory';
import useKeywordFilter from 'thingsToDo/hooks/useKeywordFilter';
import EmptyStateContainer from 'components/global/EmptyStateContainer/EmptyStateContainer';
import { EmptyState as EmptyStateIllustration } from '@simplenight/ui';

import { Paragraph } from '@simplenight/ui';
import { SearchItem } from 'thingsToDo/types/adapters/SearchItem';

interface ThingsResultsDisplayProps {
  ThingsCategory: CategoryOption;
}

const ThingsResultsDisplay = ({
  ThingsCategory,
}: ThingsResultsDisplayProps) => {
  const [isOpen, onOpen, onClose] = useModal();
  const [t, i18next] = useTranslation('things');
  const [tg] = useTranslation('global');

  const [entertainmentItems, setEntertainmentItems] = useState<SearchItem[]>(
    [],
  );

  const [showSortModal, setShowSortModal] = useState(false);
  const [sortBy, setSortBy] = useState<string>('recommended');
  const { ClientSearcher: Searcher } = ThingsCategory.core;
  const { slug } = useQuery();
  const apiUrl = useCategorySlug(slug as string)?.apiUrl ?? '';

  const thingsToDoLabel = t('thingsToDo', 'Things to Do');
  const sortLabel = tg('sort', 'Sort');
  const filterLabel = tg('filter', 'Filter');
  const resultsLabel = tg('results', 'Results');
  const noResultsLabel = tg('noResultsSearch', 'No Results Match Your Search');

  const categoryFilters: Category[] = [];
  const [appliedCategoryFilters, setAppliedCategoryFilters] = useState<
    string[]
  >([]);

  const {
    startDate,
    endDate,
    latitude,
    longitude,
    keywordSearch,
    paymentTypes,
    minPrice,
    maxPrice,
    isTotalPrice,
    minRating,
    maxRating,
  } = useQuery();
  const dstGeolocation = `${latitude},${longitude}`;

  const getAllCategories = (
    items: SearchItem[],
    mappedCategories: Category[],
  ) => {
    items.forEach((item) =>
      item.categories.forEach((category) => {
        if (
          !mappedCategories.some(
            (mappedCategory) => mappedCategory.id === category.id,
          )
        ) {
          mappedCategories.push(category);
        }
      }),
    );
  };

  const orderFiltersAlphabetically = (categories: Category[]) => {
    categories.sort((a: Category, b: Category) => {
      return a.label.localeCompare(b.label);
    });
  };

  const mapCategoryFilters = (items: SearchItem[]) => {
    if (items) {
      getAllCategories(items, categoryFilters);
      orderFiltersAlphabetically(categoryFilters);
    }
  };

  const filterResultsByCategory = () => {
    const items: SearchItem[] = [];
    data.forEach((item: SearchItem) => {
      if (
        item.categories.some((category) =>
          appliedCategoryFilters.some(
            (appliedCategoryFilter) => category.id === appliedCategoryFilter,
          ),
        )
      ) {
        items.push(item);
      }
    });

    setEntertainmentItems(items);
  };
  useEffect(() => {
    if (appliedCategoryFilters.length > 0) {
      filterResultsByCategory();
    } else {
      setEntertainmentItems(data);
    }
  }, [appliedCategoryFilters]);

  const memoizedEntertainmentItems = useKeywordFilter(
    entertainmentItems,
    keywordSearch as string,
  );

  const params: ThingsSearchRequest = {
    start_date: formatAsSearchDate(startDate as string),
    end_date: formatAsSearchDate(endDate as string),
    dst_geolocation: dstGeolocation as StringGeolocation,
    rsp_fields_set: 'basic',
    ...(sortBy != 'recommended' && { sort: sortByAdapter(sortBy) }),
    ...(minPrice && { min_price: minPrice as string }),
    ...(maxPrice && { max_price: maxPrice as string }),
    ...(minRating && { min_rating: minRating as string }),
    ...(maxRating && { max_rating: maxRating as string }),
    ...(isTotalPrice && { is_total_price: maxRating as string }),
    cancellation_type: cancellationTypeAdapter(paymentTypes as string),
    supplier_ids: '',
    apiUrl,
  };

  const fetchThingsToDo = async () => {
    try {
      return await Searcher?.request?.(params, i18next);
    } catch (e) {
      console.error(e);
    }
  };

  const { data, isLoading } = useReactQuery(
    ['thingstodo-search', params],
    fetchThingsToDo,
    { retry: false, staleTime: Infinity, refetchOnWindowFocus: false },
  );

  mapCategoryFilters(data);

  useEffect(() => {
    if (data) {
      setEntertainmentItems(data);
    }
  }, [data]);

  const urlDetail = (thingsItem: SearchItem) => {
    const { id } = thingsItem;
    return `/detail/${slug}/${id}?startDate=${startDate}&endDate=${endDate}`;
  };

  const noResults = memoizedEntertainmentItems?.length === 0;

  const ResultsAmountSort = () => {
    return (
      <>
        <section
          className={`absolute z-10 border border-dark-300 rounded shadow-container top-12 bg-white w-[335px] right-5 lg:right-20 transition-all duration-500 text-dark-1000 ${
            !showSortModal && 'opacity-0 invisible'
          }`}
        >
          <RadioGroup onChange={setSortBy} value={sortBy} gap="gap-0">
            {SORT_BY_OPTIONS.map((option, i) => (
              <Radio
                key={i}
                value={option?.value}
                containerClass={`px-3 py-2 ${
                  i < SORT_BY_OPTIONS.length - 1 && 'border-b border-dark-200'
                }`}
              >
                {tg(option.label)}
              </Radio>
            ))}
          </RadioGroup>
        </section>
        <section className="flex items-center justify-between px-5 pt-3 pb-3 lg:mt-12 lg:pb-0">
          <Paragraph
            size="sm-lg"
            fontWeight="semibold"
          >{`${memoizedEntertainmentItems?.length} ${resultsLabel}`}</Paragraph>
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
      </>
    );
  };

  const ThingsToDoList = () => {
    return (
      <ul className="flex flex-col gap-3 px-5 py-6">
        {memoizedEntertainmentItems?.map((thingToDo: SearchItem) => {
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
      <FilterModal isOpen={isOpen} onClose={onClose} />
      <section className="hidden lg:block lg:min-w-[16rem] lg:max-w[18rem] lg:w-[25%] lg:mr-8 lg:mt-12">
        <FilterSidebar />
      </section>
      {!isLoading && !noResults && (
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
      {!isLoading && noResults && (
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
