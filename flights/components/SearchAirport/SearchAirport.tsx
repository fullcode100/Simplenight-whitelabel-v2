/* This example requires Tailwind CSS v2.0+ */
import { useEffect, useState } from 'react';
import SearchInput, { OptionItem } from '../SearchInput/SearchInput';
import LocationPin from 'public/icons/assets/location-pin.svg';
import { useDebounce } from 'hooks/debounce/useDebounce';
import { AirportItem } from 'flights/types/response/AirportResponse';
import { getAirports } from 'flights/core/airport/services/AirportService';
import { useTranslation } from 'react-i18next';
import { fromUpperCaseToCapitilize } from 'helpers/stringUtils';

interface SearchAirportProps {
  defaultValue: string;
  label?: string;
  onSelect: (value: AirportItem | null) => void;
  placeholder?: string;
}

const SearchAirportProps = ({
  defaultValue,
  label,
  placeholder,
  onSelect,
}: SearchAirportProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [results, setResults] = useState<AirportItem[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm, 500);

  const [t, i18next] = useTranslation('global');
  const loadingMessage = t('loading', 'Loading');

  const handleSelect = (value: OptionItem | null) => {
    onSelect(value as AirportItem);
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      getAirports(debouncedSearchTerm, i18next).then((results) => {
        setIsSearching(false);
        setResults(results.data);
      });
    } else {
      setResults([]);
    }
  }, [debouncedSearchTerm]);

  return (
    <SearchInput
      options={results.map((item) => {
        return {
          ...item,
          name: `${fromUpperCaseToCapitilize(item.address.cityName)} (${
            item.iataCode
          } - ${fromUpperCaseToCapitilize(item.name)})`,
        };
      })}
      label={label}
      value={defaultValue ? { id: '0', name: defaultValue } : null}
      onSelect={handleSelect}
      onChange={setSearchTerm}
      icon={
        <LocationPin
          className="h-5 w-5 text-dark-700 lg:w-full"
          aria-hidden="true"
        />
      }
      loading={isSearching}
      loadingMessage={loadingMessage}
      placeholder={placeholder}
    />
  );
};

export default SearchAirportProps;
