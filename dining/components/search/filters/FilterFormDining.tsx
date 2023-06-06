import SortBy from './SortBy';
import { Heading } from '@simplenight/ui';
import CollapseUnbordered from 'components/global/CollapseUnbordered/CollapseUnbordered';
import PriceRangeFilter from './PriceRangeFilter';
import { SortBySelect } from 'dining/constants/sortByOptions';
import { useFilterDining } from 'dining/hooks/useFilterDining';
import { useTranslation } from 'react-i18next';

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
  const { changePrice, minPrice, maxPrice } = useFilterDining();

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
    </div>
  );
};

export default FilterFormDining;
