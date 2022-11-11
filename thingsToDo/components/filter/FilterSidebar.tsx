import React, { useState } from 'react';
import FilterForm from './FilterForm';
import ClearFilterButton from 'components/global/Filters/ClearFilterButton';
import { useRouter } from 'next/router';
import useQuerySetter from 'hooks/pageInteraction/useQuerySetter';
import FilterContainer from 'components/global/Filters/FilterContainer';
import { useTranslation } from 'react-i18next';

const FilterSidebar = () => {
  const [t] = useTranslation('global');
  const router = useRouter();
  const [queryFilter, setQueryFilters] = useState(router.query);
  const setQueryParams = useQuerySetter();
  const starRatingLabel = t('customerRating', 'Customer Rating');
  const keywordSearchLabel = t('keywordSearch', 'Keyword Search');
  const searchKeywordPlaceholder = t('searchKeywordPlaceholder', 'Venue Name');

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

  const handleClearFilters = () => {
    setQueryParams({
      paymentTypes: '',
      minRating: '',
      maxRating: '',
      isTotalPrice: '',
      minPrice: '',
      maxPrice: '',
      keywordSearch: '',
    });
  };

  const onChangeMinPrice = (value: string) => {
    setMinPrice(value);
    setQueryParams({
      minPrice: value,
      ...((minPrice || maxPrice) && { isTotalPrice: 'false' }),
    });
  };

  const onChangeMaxPrice = (value: string) => {
    setMaxPrice(value);
    setQueryParams({
      maxPrice: value,
      ...((minPrice || maxPrice) && { isTotalPrice: 'false' }),
    });
  };

  const onChangeMinRating = (value: string) => {
    setMinStarRating(value);
    setQueryParams({
      minRating: value,
    });
  };

  const onChangeMaxRating = (value: string) => {
    setMaxStarRating(value);
    setQueryParams({
      maxRating: value,
    });
  };

  const onChangeFreeCancellation = (value: boolean) => {
    const paymentTypes = [];
    if (value) paymentTypes.push('freeCancellation');
    setFreeCancellation(value);
    setQueryParams({
      paymentTypes: paymentTypes.join('-'),
    });
  };

  const priceRangeFilter = {
    minPrice,
    maxPrice,
    onChangeMinPrice,
    onChangeMaxPrice,
  };
  const paymentFilter = {
    freeCancellation,
    onChangeFreeCancellation,
  };
  const starRangeFilter = {
    minStarRating,
    maxStarRating,
    onChangeMinRating,
    onChangeMaxRating,
    starRatingLabel: starRatingLabel,
  };
  const keywordSearchFilter = {
    keywordSearchLabel: keywordSearchLabel,
    keywordSearch,
    setKeywordSearch,
    keywordSearchPlaceholder: searchKeywordPlaceholder,
  };

  return (
    <section className="mt-3">
      <FilterContainer>
        <section className="flex items-center justify-between">
          <p className="text-lg font-semibold text-dark-1000">Filters</p>
          <ClearFilterButton handleClearFilters={handleClearFilters} />
        </section>
      </FilterContainer>
      <FilterForm
        priceRangeFilter={priceRangeFilter}
        paymentFilter={paymentFilter}
        starRangeFilter={starRangeFilter}
        keywordSearchFilter={keywordSearchFilter}
        className="py-6"
      />
    </section>
  );
};

export default FilterSidebar;
