import { useTranslation } from 'react-i18next';

export interface ClearFilterButtonProps {
  handleClearFilters: () => void;
}

const ClearFilterButton = ({ handleClearFilters }: ClearFilterButtonProps) => {
  const [t] = useTranslation('global');
  const clearFiltersText = t('clearFilters', 'Clear Filters');

  return (
    <button
      className="text-sm font-semibold underline text-primary-1000"
      onClick={handleClearFilters}
    >
      {clearFiltersText}
    </button>
  );
};

export default ClearFilterButton;
