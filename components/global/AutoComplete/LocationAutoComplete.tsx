import { useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';

import AutoComplete from './AutoComplete';
import { getLocationsByPrefix } from '../../../apiCalls/locations';
import {
  LocationPrefix,
  LocationPrefixResponse,
} from '../../../types/search/LocationPrefixResponse';
import { getLocationText } from '../../../helpers/locationUtils';
import { AutoCompleteOption } from '../../../types/global/AutoCompleteOption';

interface LocationAutoCompleteProps {
  placeholder?: string;
  onSelect: (location?: LocationPrefix) => void;
  [key: string]: any;
}

const LocationAutoComplete = ({
  onSelect,
  placeholder,
  ...others
}: LocationAutoCompleteProps) => {
  const [options, setOptions] = useState([] as AutoCompleteOption[]);
  const [displayText, setDisplayText] = useState('');
  const [locations, setLocations] = useState([] as LocationPrefixResponse);

  const getLocationsFromApi = async (value: string) => {
    const { data: locationsFromApi } = await getLocationsByPrefix(value);
    setLocations(locationsFromApi);
  };

  const debounceGettingLocationFromApi = useCallback(() => {
    debounce(getLocationsFromApi, 10);
  }, []);

  useEffect(() => {
    const newOptions = locations.map(
      (location) =>
        ({
          value: location.location_name,
          label: getLocationText(location),
          key: getLocationText(location),
        } as AutoCompleteOption),
    );

    setOptions(newOptions);
  }, [locations]);

  const handleChange = (value: string) => {
    debugger;
    setDisplayText(value);
    getLocationsFromApi(value);
  };

  const handleSelect = (locationName: string) => {
    const selectedValue = locations.find(
      (location) => location.location_name === locationName,
    );
    onSelect(selectedValue);
  };

  return (
    <AutoComplete
      options={options}
      value={displayText}
      onChange={handleChange}
      onSelect={handleSelect}
      placeholder={placeholder}
      allowClear
    />
  );
};

export default LocationAutoComplete;
