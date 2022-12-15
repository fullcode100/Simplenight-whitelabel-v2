import { useCategory } from 'hooks/categoryInjection/useCategory';
import DiningResultsDisplay from 'dining/components/search/DiningResultsDisplay';

interface SearchResultDisplayProps {
  searchType: string;
}

const SearchResultDisplay = ({ searchType }: SearchResultDisplayProps) => {
  const category = useCategory(searchType);
  if (!category) {
    return <DiningResultsDisplay />;
  }

  return category?.resultsDisplay ?? null;
};

export default SearchResultDisplay;
