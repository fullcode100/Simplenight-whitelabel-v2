import React, { useState } from 'react';
import FullScreenModal from 'components/global/NewModal/FullScreenModal';
import FilterForm from './FilterForm';
import ClearFilterButton from 'components/global/Filters/ClearFilterButton';
import { useRouter } from 'next/router';
import useQuerySetter from 'hooks/pageInteraction/useQuerySetter';
import { useTranslation } from 'react-i18next';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const FilterModal = ({ isOpen, onClose }: Props) => {
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
  const applyFiltersLabel = t('applyFilters', 'Apply Filters');

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

  const priceRangeFilter = {
    minPrice,
    maxPrice,
    onChangeMinPrice: setMinPrice,
    onChangeMaxPrice: setMaxPrice,
  };
  const paymentFilter = {
    freeCancellation,
    onChangeFreeCancellation: setFreeCancellation,
  };
  const starRangeFilter = {
    minStarRating,
    maxStarRating,
    onChangeMinRating: setMinStarRating,
    onChangeMaxRating: setMaxStarRating,
    starRatingLabel: starRatingLabel,
  };
  const keywordSearchFilter = {
    keywordSearchLabel: keywordSearchLabel,
    keywordSearch,
    setKeywordSearch,
    keywordSearchPlaceholder: searchKeywordPlaceholder,
  };

  const handleDispatchFilters = () => {
    onClose();
    setQueryParams({
      ...queryFilter,
      ...(keywordSearch && { keywordSearch }),
      ...(freeCancellation && { paymentTypes: 'freeCancellation' }),
      ...(minPrice && { minPrice }),
      ...(maxPrice && { maxPrice }),
      ...(minStarRating && { minRating: minStarRating }),
      ...(maxStarRating && { maxRating: maxStarRating }),
      ...((minPrice || maxPrice) && { isTotalPrice: 'false' }),
    });
  };

  return (
    <FullScreenModal
      open={isOpen}
      closeModal={onClose}
      title="Filters"
      primaryButtonText={applyFiltersLabel}
      primaryButtonAction={handleDispatchFilters}
      headerAction={
        <ClearFilterButton handleClearFilters={handleClearFilters} />
      }
    >
      <FilterForm
        priceRangeFilter={priceRangeFilter}
        paymentFilter={paymentFilter}
        starRangeFilter={starRangeFilter}
        keywordSearchFilter={keywordSearchFilter}
        className="px-5 py-6"
      />
    </FullScreenModal>
  );
};

export default FilterModal;
