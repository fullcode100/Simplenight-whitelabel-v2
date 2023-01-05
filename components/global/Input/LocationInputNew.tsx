import { FC, useState } from 'react';
import { latLngProp } from '../../../types/search/Geolocation';
import { BaseInputProps } from './BaseInput';
import useQuery from '../../../hooks/pageInteraction/useQuery';
import { getIsMapLoaded } from '../../../store/selectors/core';
import { useTranslation } from 'react-i18next';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
  Suggestion,
} from 'react-places-autocomplete';
import CloseIcon from '@/icons/assets/close.svg';
import IconInput from './IconInput';
import LocationPin from '@/icons/assets/location-pin.svg';
import classnames from 'classnames';

interface LocationInputProps {
  icon: any;
  routeParams?: string[];
  onChange?: (value: string) => void;
  onSelect?: (value: latLngProp, address: string, types?: string[]) => void;
  types?: LocationType[];
  addressOnly?: boolean;
}

type LocationType = 'airport' | 'street_address' | 'street_number';

export const LocationInput: FC<LocationInputProps & BaseInputProps> = ({
  icon,
  routeParams,
  onChange,
  onSelect,
  onClear,
  types,
  addressOnly,
  ...others
}) => {
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

      setAddress(newAddress);

      if (onSelect) onSelect(latLng, newAddress, results[0].types);
    } catch (error) {
      console.error(error);
    }
  };

  const locationPlaceholder = t(
    'locationInputPlaceholder',
    'Pick your destination',
  );

  const filterFn = (i: Suggestion) => {
    if (!addressOnly) return true;
    return !i.types.includes('political');
  };

  return (
    <>
      {isMapLoaded && (
        <PlacesAutocomplete
          value={address}
          onChange={handleChange}
          onSelect={handleSelect}
          searchOptions={{
            types,
          }}
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
                  {suggestions.filter(filterFn).map((suggestion, index) => {
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
