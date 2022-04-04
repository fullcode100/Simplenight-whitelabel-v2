import BaseInput, { BaseInputProps } from './BaseInput';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import IconInput from './IconInput';
import LocationPin from 'public/icons/assets/location-pin.svg';
import { getIsMapLoaded } from 'store/selectors/core';
import useQuerySetter from 'hooks/pageInteraction/useQuerySetter';
import { StringGeolocation } from 'types/search/Geolocation';

interface LocationInputProps {
  icon: any;
  routeParams?: string[];
  onChange?: (value: string) => void;
  onSelect?: (value: StringGeolocation) => void;
}

const LocationInput = ({
  icon,
  routeParams,
  onChange,
  onSelect,
  ...others
}: LocationInputProps & BaseInputProps) => {
  const [address, setAddress] = useState('');
  const isMapLoaded = getIsMapLoaded();
  const setQueryParam = useQuerySetter(routeParams);

  const [t, i18next] = useTranslation('global');
  const loadingMessage = t('loading', 'Loading');

  const handleChange = (newAddress: string) => {
    setAddress(newAddress);
    if (onChange) onChange(newAddress);
  };

  const handleSelect = async (newAddress: string) => {
    try {
      const results = await geocodeByAddress(newAddress);
      const latLng = await getLatLng(results[0]);

      const geolocation: StringGeolocation = `${latLng.lat},${latLng.lng}`;

      // setQueryParam('geolocation', geolocation);
      if (onSelect) onSelect(geolocation);
      console.log(latLng);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    isMapLoaded && (
      <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <section>
            <IconInput
              icon={<LocationPin className="h-5 w-5 text-dark-700" />}
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
              {...others}
            />
            <section className="autocomplete-dropdown-container">
              {loading && <section>{loadingMessage}...</section>}
              {suggestions.map((suggestion, index) => {
                const { active, description } = suggestion;
                const className = active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };

                const suggestionKey = index + suggestion.placeId;

                return (
                  <section
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                    key={suggestionKey}
                  >
                    <span>{description}</span>
                  </section>
                );
              })}
            </section>
          </section>
        )}
      </PlacesAutocomplete>
    )
  );
};

export default LocationInput;
