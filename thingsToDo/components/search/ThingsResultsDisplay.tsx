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
import { THINGS_CATEGORY } from 'thingsToDo';
import useQuery from 'hooks/pageInteraction/useQuery';
import { formatAsSearchDate } from 'helpers/dajjsUtils';
import { ThingsSearchRequest } from 'thingsToDo/types/request/ThingsSearchRequest';
import { StringGeolocation } from 'types/search/Geolocation';
import HorizontalSkeletonList from 'components/global/HorizontalItemCard/HorizontalSkeletonList';
import { ThingsSearchItem } from 'thingsToDo/types/response/ThingsSearchResponse';

interface ThingsResultsDisplayProps {
  ThingsCategory: CategoryOption;
}

const ThingsResultsDisplay = ({
  ThingsCategory,
}: ThingsResultsDisplayProps) => {
  const [t, i18next] = useTranslation('things');
  const [loaded, setLoaded] = useState(false);
  const [entertaimentItems, setEntertaimentItems] = useState([]);
  const { ClientSearcher: Searcher } = ThingsCategory.core;
  const thingsToDoLabel = t('thingsToDo', 'Things to Do');

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
      sort: '',
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
  }, [startDate, endDate, dstGeolocation]);

  const urlDetail = (thingsItem: ThingsSearchItem) => {
    const { id } = thingsItem;
    return `/detail/${THINGS_CATEGORY}/${categoryId}?startDate=${startDate}&endDate=${endDate}&inventoryId=${id}`;
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
            rates,
            thumbnail,
          } = thingToDo;

          const url = urlDetail(thingToDo);
          return (
            <div key={id}>
              <ResultCard
                url={url}
                icon={ThingsCategory.icon}
                categoryName={thingsToDoLabel}
                item={thingToDo}
                title={name}
                images={[thumbnail]}
                className=" flex-0-0-auto"
                cancellable={
                  <ThingsCancellable
                    cancellationPolicy={cancellationPolicy as any}
                  />
                }
              />
            </div>
          );
        })}
      </ul>
    );
  };
  return (
    <div className="pt-6 px-4">
      {loaded ? <ThingsToDoList /> : <HorizontalSkeletonList />}
      <SearchViewSelectorFixed />
    </div>
  );
};

export default ThingsResultsDisplay;
