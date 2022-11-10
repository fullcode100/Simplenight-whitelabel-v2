// Libraries
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
// models
import { CategoryOption } from 'types/search/SearchTypeOptions';
// components
import ResultCard from './ResultCard/ResultCard';
// mocks
import { thingToDo } from '../../mocks/thingToDoMock';
import ThingsCancellable from './ThingsCancellable/ThingsCancellable';
import PriceDisplay from '../PriceDisplay/PriceDisplay';
import SearchViewSelectorFixed from 'components/global/SearchViewSelector/SearchViewSelectorFixed';
import useQuery from 'hooks/pageInteraction/useQuery';
import { formatAsSearchDate } from 'helpers/dajjsUtils';
import { ThingsSearchRequest } from 'thingsToDo/types/request/ThingsSearchRequest';
import { StringGeolocation } from 'types/search/Geolocation';
import HorizontalSkeletonList from 'components/global/HorizontalItemCard/HorizontalSkeletonList';
import { ThingsSearchItem } from 'thingsToDo/types/response/ThingsSearchResponse';
import Sort from 'public/icons/assets/sort.svg';
import Chevron from 'public/icons/assets/chevron-down-small.svg';
import { RadioGroup, Radio } from 'components/global/Radio/Radio';
import { SORT_BY_OPTIONS } from 'thingsToDo/constants/sortByOptions';

interface ThingsResultsDisplayProps {
  ThingsCategory: CategoryOption;
}

const ThingsResultsDisplay = ({
  ThingsCategory,
}: ThingsResultsDisplayProps) => {
  const [t, i18next] = useTranslation('things');
  const [tg] = useTranslation('global');
  const [loaded, setLoaded] = useState(false);
  const [entertaimentItems, setEntertaimentItems] = useState([]);
  const [showSortModal, setShowSortModal] = useState(false);
  const [sortBy, setSortBy] = useState<string>('recommended');
  const { ClientSearcher: Searcher } = ThingsCategory.core;
  const { slug } = useQuery();
  const thingsToDoLabel = t('thingsToDo', 'Things to Do');
  const sortLabel = tg('sort', 'Sort');
  const resultsLabel = tg('results', 'Results');

  const categoryId = '97807fd1-6561-4f3b-a798-42233d9e2b09';
  const resultsMock = [thingToDo];
  const { startDate, endDate, latitude, longitude } = useQuery();
  const dstGeolocation = `${latitude},${longitude}`;

  useEffect(() => {
    const params: ThingsSearchRequest = {
      start_date: formatAsSearchDate(startDate as string),
      end_date: formatAsSearchDate(endDate as string),
      dst_geolocation: dstGeolocation as StringGeolocation,
      rsp_fields_set: 'extended',
      ...(sortBy != 'recommended' && { sort: sortBy }),
      cancellation_type: '',
      min_price: '',
      max_price: '',
      is_total_price: '',
      supplier_ids: '',
    };
    setLoaded(false);
    Searcher?.request?.(params, i18next)
      .then(({ items: entertaimentResults }) => {
        setEntertaimentItems(entertaimentResults);
      })
      .catch((error) => console.error(error))
      .then(() => setLoaded(true));
  }, [startDate, endDate, dstGeolocation, sortBy]);

  const urlDetail = (thingsItem: ThingsSearchItem) => {
    const { id } = thingsItem;
    return `/detail/${slug}/${categoryId}?startDate=${startDate}&endDate=${endDate}&inventoryId=${id}`;
  };

  const ThingsToDoList = () => {
    return (
      <ul className="flex flex-col gap-3">
        {entertaimentItems?.map((thingToDo: ThingsSearchItem) => {
          const {
            id,
            name,
            address,
            cancellation_policy: cancellationPolicy,
            rate,
            thumbnail,
            extra_data: extraData,
          } = thingToDo;

          const url = urlDetail(thingToDo);
          return (
            <div key={id}>
              <ResultCard
                url={url}
                icon={ThingsCategory.icon}
                categoryName={thingsToDoLabel}
                item={thingToDo}
                rating={extraData.avg_rating}
                description={extraData.description}
                reviewsAmount={extraData.review_amount}
                title={name}
                image={thumbnail}
                priceDisplay={
                  <p className="text-base font-semibold text-dark-1000">
                    {rate.total.full.formatted}
                  </p>
                }
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
    <div className="relative">
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
        <p className="text-sm leading-5 lg:text-[20px] lg:leading-[24px] font-semibold">
          {entertaimentItems.length} {resultsLabel}
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
          <p className="lg:hidden">Filter</p>
        </section>
      </section>
      <div className="block w-full h-px lg:hidden bg-dark-300" />
      <section className="px-5 pt-6">
        {loaded ? <ThingsToDoList /> : <HorizontalSkeletonList />}
        <SearchViewSelectorFixed />
      </section>
    </div>
  );
};

export default ThingsResultsDisplay;
