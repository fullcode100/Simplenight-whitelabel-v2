import { BaseInputProps } from './BaseInput';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { useTranslation } from 'react-i18next';
import IconInput from './IconInput';
import CloseIcon from 'public/icons/assets/close.svg';
import LocationPin from 'public/icons/assets/location-pin.svg';
import { latLngProp } from 'types/search/Geolocation';
import classnames from 'classnames';
import useQuery from 'hooks/pageInteraction/useQuery';
import { useState } from 'react';
import { getIsMapLoaded } from 'store/selectors/core';

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
  onClear,
  ...others
}: LocationInputProps & BaseInputProps) => {
  const params = useQuery();
  const param = params[routeParams?.[0] || 'address'];
  const [address, setAddress] = useState<string | undefined>(
    param ? decodeURIComponent(param as string) : '',
  );
  const isMapLoaded = getIsMapLoaded();

  const [t, i18next] = useTranslation('global');
  const loadingMessage = t('loading', 'Loading');

  const handleChange = (newAddress: string) => {
    setAddress(newAddress);
    if (onChange) onChange(newAddress);
  };

  const clearLocationHandler = () => {
    setAddress('');
    onClear?.();
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
    <>
      {isMapLoaded && (
        <PlacesAutocomplete
          value={address}
          onChange={handleChange}
          onSelect={handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div className="relative lg:w-full">
              {address && (
                <section
                  className="absolute z-10 right-3 top-8"
                  onClick={() => setAddress('')}
                >
                  <CloseIcon className="text-dark-700 cursor-pointer" />
                </section>
              )}
              <section className="relative lg:w-full">
                <IconInput
                  icon={
                    icon ? (
                      icon
                    ) : (
                      <LocationPin className="w-5 h-5 text-dark-700" />
                    )
                  }
                  customInputClassName="pr-9 truncate"
                  {...getInputProps({
                    placeholder: locationPlaceholder,
                    className: 'location-search-input',
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
            </div>
          )}
        </PlacesAutocomplete>
      )}
    </>
  );
};

export default LocationInput;
