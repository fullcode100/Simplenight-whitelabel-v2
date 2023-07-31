import SortBy from './SortBy';
import { Heading } from '@simplenight/ui';
import CollapseUnbordered from 'components/global/CollapseUnbordered/CollapseUnbordered';
import PriceRangeFilter from './PriceRangeFilter';
import { SortBySelect } from 'dining/constants/sortByOptions';
import { useFilterDining } from 'dining/hooks/useFilterDining';
import { useTranslation } from 'react-i18next';
import MultipleCheckboxdFilter from './MultipleCheckboxdFilter';
import useQuery from 'hooks/pageInteraction/useQuery';
import useQuerySetter from 'hooks/pageInteraction/useQuerySetter';

interface Props {
  sortBySelect: SortBySelect;
  className?: string;
}

const Divider = ({ className }: { className?: string }) => (
  <hr className={className} />
);

const FilterFormDining = ({ sortBySelect, className }: Props) => {
  const [t] = useTranslation('dining');
  const priceLabel = t('price', 'Price');
  const pickupLabel = t('pickup');
  const deliveryLabel = t('delivery');
  const acceptsReservationLabel = t('acceptsReservation');
  const openNowLabel = t('openNow');
  const burgerLabel = t('burger');
  const chineseLabel = t('chinese');
  const italianLabel = t('italian');
  const japaneseLabel = t('japanese');
  const mexicanLabel = t('mexican');
  const thaiLabel = t('thai');
  const suggestedLabel = t('suggested');
  const restaurantTypeLabel = t('restaurantType');
  const { changePrice, minPrice, maxPrice } = useFilterDining();
  const { categories_list, attributes } = useQuery();
  const setQueryParams = useQuerySetter();

  const currentSuggested = attributes as string;
  const currentCategories = categories_list as string;

  const suggestedList = [
    { value: 'restaurants_takeout', label: pickupLabel },
    { value: 'restaurants_delivery', label: deliveryLabel },
    { value: 'reservation', label: acceptsReservationLabel },
    { value: 'open_now', label: openNowLabel },
  ];

  const restaurantTypeList = [
    { value: 'delivery', label: deliveryLabel },
    { value: 'burgers', label: burgerLabel },
    { value: 'chinese', label: chineseLabel },
    { value: 'italian', label: italianLabel },
    { value: 'japanese', label: japaneseLabel },
    { value: 'mexican', label: mexicanLabel },
    { value: 'thai', label: thaiLabel },
  ];

  const onChangeSuggestions = (list: string[]) => {
    setQueryParams({ attributes: list.join(',') });
  };

  const onChangeRestaurantTypes = (list: string[]) => {
    setQueryParams({ categories_list: list.join(',') });
  };

  return (
    <div className={`h-full w-full overflow-hidden ${className}`}>
      <SortBy
        sortBy={sortBySelect.sortBy ?? ''}
        onChangeSortBy={sortBySelect.onChangeSortBy}
      />
      <Divider className="my-6" />
      <CollapseUnbordered
        title={<Heading tag="h5">{priceLabel}</Heading>}
        body={
          <PriceRangeFilter
            onChangeMinPrice={(value: string) => changePrice(value)}
            onChangeMaxPrice={(value: string) => changePrice(minPrice, value)}
            minPrice={minPrice}
            maxPrice={maxPrice}
          />
        }
        initialState
      />
      <Divider className="my-6" />
      <CollapseUnbordered
        title={<Heading tag="h5">{suggestedLabel}</Heading>}
        body={
          <MultipleCheckboxdFilter
            onChangeSelection={onChangeSuggestions}
            list={suggestedList}
            selected={currentSuggested ? currentSuggested.split(',') : []}
          />
        }
        initialState
      />
      <Divider className="my-6" />
      <CollapseUnbordered
        title={<Heading tag="h5">{restaurantTypeLabel}</Heading>}
        body={
          <MultipleCheckboxdFilter
            onChangeSelection={onChangeRestaurantTypes}
            list={restaurantTypeList}
            selected={
              currentCategories ? currentCategories.split(',') : ['restaurant']
            }
          />
        }
        initialState
      />
    </div>
  );
};

export default FilterFormDining;
