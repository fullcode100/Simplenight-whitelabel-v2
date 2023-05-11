import SortBy from 'components/global/Filters/SortBy';
import { Heading } from '@simplenight/ui';
import CollapseUnbordered from 'components/global/CollapseUnbordered/CollapseUnbordered';
import KeywordSearchFilter, {
  KeywordSearchFilterProps,
} from 'components/global/Filters/KeywordSearch';
import PriceRangeFilter, {
  PriceRangeFilterProps,
} from 'components/global/Filters/PriceRange';
import StarRangeFilter, {
  StarRangeFilterProps,
} from 'components/global/Filters/StarRange';
import { useTranslation } from 'react-i18next';

interface Props {
  priceRangeFilter: PriceRangeFilterProps;
  starRangeFilter: StarRangeFilterProps;
  keywordSearchFilter: KeywordSearchFilterProps;
  sortBySelect: any;
  className?: string;
}

const Divider = ({ className }: { className?: string }) => (
  <hr className={className} />
);

const FilterFormHotels = ({
  priceRangeFilter,
  starRangeFilter,
  keywordSearchFilter,
  sortBySelect,
  className,
}: Props) => {
  const [t] = useTranslation('global');
  const priceLabel = t('price', 'Price');
  const ratingLabel = t('rating', 'Rating');
  return (
    <div className={`h-full w-full overflow-hidden ${className}`}>
      <SortBy
        sortBy={sortBySelect.sortBy}
        onChangeSortBy={sortBySelect.onChangeSortBy}
      />
      <KeywordSearchFilter
        keywordSearch={keywordSearchFilter.keywordSearch}
        keywordSearchLabel={keywordSearchFilter.keywordSearchLabel}
        keywordSearchPlaceholder={keywordSearchFilter.keywordSearchPlaceholder}
        onChangeKeywordSearch={keywordSearchFilter.onChangeKeywordSearch}
        keywordSearchData={keywordSearchFilter.keywordSearchData}
      />
      <Divider className="my-6" />
      <CollapseUnbordered
        title={<Heading tag="h5">{priceLabel}</Heading>}
        body={
          <PriceRangeFilter
            onChangeMinPrice={priceRangeFilter.onChangeMinPrice}
            onChangeMaxPrice={priceRangeFilter.onChangeMaxPrice}
            minPrice={priceRangeFilter.minPrice}
            maxPrice={priceRangeFilter.maxPrice}
          />
        }
        initialState
      />
      <Divider className="my-6" />
      <CollapseUnbordered
        title={<Heading tag="h5">{ratingLabel}</Heading>}
        body={
          <StarRangeFilter
            onChangeMinRating={starRangeFilter.onChangeMinRating}
            onChangeMaxRating={starRangeFilter.onChangeMaxRating}
            minStarRating={starRangeFilter.minStarRating}
            maxStarRating={starRangeFilter.maxStarRating}
            starRatingLabel={starRangeFilter.starRatingLabel}
          />
        }
        initialState
      />
      <Divider className="my-6" />
    </div>
  );
};

export default FilterFormHotels;
