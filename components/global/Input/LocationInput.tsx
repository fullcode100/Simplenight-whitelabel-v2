import { BaseInputProps } from './BaseInput';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { useTranslation } from 'react-i18next';
import IconInput from './IconInput';
import LocationPin from 'public/icons/assets/location-pin.svg';
import { getIsMapLoaded } from 'store/selectors/core';
import { latLngProp } from 'types/search/Geolocation';
import classnames from 'classnames';
import useQuery from 'hooks/pageInteraction/useQuery';
import { useState } from 'react';

interface LocationInputProps {
  icon: any;
  routeParams?: string[];
  onChange?: (value: string) => void;
  onSelect?: (value: latLngProp, address: string) => void;
}

const LocationInput = ({
  icon,
  routeParams,
  onChange,
  onSelect,
  ...others
}: LocationInputProps & BaseInputProps) => {
  const params = useQuery();
  const defaultAddress = params?.address?.toString() || '';
  const [address, setAddress] = useState(defaultAddress);
  const isMapLoaded = getIsMapLoaded();

  const [t, i18next] = useTranslation('hotels');
  const loadingMessage = t('loading', 'Loading');

  const handleChange = (newAddress: string) => {
    setAddress(newAddress);
    if (onChange) onChange(newAddress);
  };

  const handleSelect = async (newAddress: string) => {
    try {
      const results = await geocodeByAddress(newAddress);
      const latLng = await getLatLng(results[0]);

      setAddress(results[0].formatted_address);

      if (onSelect) onSelect(latLng, results[0].formatted_address);
    } catch (error) {
      console.error(error);
    }
  };

  const locationPlaceholder = t(
    'locationInputPlaceholder',
    'Pick your destination',
  );

  return (
    isMapLoaded && (
      <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <section className="relative lg:w-full">
            <IconInput
              icon={<LocationPin className="h-5 w-5 text-dark-700" />}
              {...getInputProps({
                placeholder: locationPlaceholder,
                className: 'location-search-input overflow-y-scroll',
              })}
              {...others}
            />
            <section
              className={classnames(
                'autocomplete-dropdown-container rounded absolute z-10 w-full block',
                {
                  'shadow-md': suggestions[0],
                },
              )}
            >
              {loading && <section>{loadingMessage}...</section>}
              {suggestions.map((suggestion, index) => {
                const { active, description } = suggestion;
                const className = classnames(
                  'py-2 px-4 flex justify-between suggestion-item',
                  {
                    'suggestion-item--active': active,
                  },
                );
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
