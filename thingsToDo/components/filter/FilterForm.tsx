import CollapseUnbordered from 'components/global/CollapseUnbordered/CollapseUnbordered';
import KeywordSearchFilter, {
  KeywordSearchFilterProps,
} from 'components/global/Filters/KeywordSearch';
import PaymentFilter, {
  PaymentFilterProps,
} from 'components/global/Filters/PaymentTypes';
import PriceRangeFilter, {
  PriceRangeFilterProps,
} from 'components/global/Filters/PriceRange';
import StarRangeFilter, {
  StarRangeFilterProps,
} from 'components/global/Filters/StarRange';
import { Heading } from '@simplenight/ui';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  priceRangeFilter: PriceRangeFilterProps;
  paymentFilter: PaymentFilterProps;
  starRangeFilter: StarRangeFilterProps;
  keywordSearchFilter: KeywordSearchFilterProps;
  className?: string;
}

const FilterForm = ({
  priceRangeFilter,
  paymentFilter,
  starRangeFilter,
  keywordSearchFilter,
  className,
}: Props) => {
  const [t] = useTranslation('global');
  const priceLabel = t('price', 'Price');
  const ratingLabel = t('rating', 'Rating');
  const paymentTypeLabel = t('paymentType', 'Payment Type');

  return (
    <div className={`h-full overflow-y-hidden ${className}`}>
      <KeywordSearchFilter
        keywordSearch={keywordSearchFilter.keywordSearch}
        keywordSearchLabel={keywordSearchFilter.keywordSearchLabel}
        keywordSearchPlaceholder={keywordSearchFilter.keywordSearchPlaceholder}
        onChangeKeywordSearch={keywordSearchFilter.onChangeKeywordSearch}
      />
      <div className="w-full h-px bg-dark-300" />

      <CollapseUnbordered
        title={<Heading tag="h5">{priceLabel}</Heading>}
        body={
          <PriceRangeFilter
            minPrice={priceRangeFilter.minPrice}
            maxPrice={priceRangeFilter.maxPrice}
            onChangeMinPrice={priceRangeFilter.onChangeMinPrice}
            onChangeMaxPrice={priceRangeFilter.onChangeMaxPrice}
          />
        }
        initialState
      />
      <div className="w-full h-px bg-dark-300" />
      <CollapseUnbordered
        title={<Heading tag="h5">{paymentTypeLabel}</Heading>}
        body={
          <PaymentFilter
            freeCancellation={paymentFilter.freeCancellation}
            onChangeFreeCancellation={paymentFilter.onChangeFreeCancellation}
          />
        }
        initialState
      />
      <div className="w-full h-px bg-dark-300" />
      <CollapseUnbordered
        title={<Heading tag="h5">{ratingLabel}</Heading>}
        body={
          <StarRangeFilter
            minStarRating={starRangeFilter.minStarRating}
            maxStarRating={starRangeFilter.maxStarRating}
            onChangeMinRating={starRangeFilter.onChangeMinRating}
            onChangeMaxRating={starRangeFilter.onChangeMaxRating}
            starRatingLabel={starRangeFilter.starRatingLabel}
          />
        }
        initialState
      />
    </div>
  );
};

export default FilterForm;
