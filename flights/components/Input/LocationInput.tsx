import { BaseInputProps } from 'components/global/Input/BaseInput';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { useTranslation } from 'react-i18next';
import IconInput from 'components/global/Input/IconInput';
import CloseIcon from 'public/icons/assets/close.svg';
import LocationPin from 'public/icons/assets/location-pin.svg';
import { latLngProp } from 'types/search/Geolocation';
import classnames from 'classnames';
import { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { getIsMapLoaded } from 'store/selectors/core';

interface LocationInputProps {
  icon: any;
  routeParams?: string[];
  onChange?: (value: string) => void;
  onSelect?: (value: latLngProp, address: string, shortName: string) => void;
  defaultAddress?: string;
  clearShortNames?: () => void;
  filter?: (description: string) => boolean;
}

interface LocationInputRef {
  getAddress: () => string | undefined;
  setNewAddress: (address: string) => void;
}

const LocationInput = forwardRef<
  LocationInputRef,
  LocationInputProps & BaseInputProps
>(
  (
    { onChange, onSelect, defaultAddress, clearShortNames, filter, ...others },
    ref,
  ) => {
    const [address, setAddress] = useState(defaultAddress);
    const isMapLoaded = getIsMapLoaded();

    const [t] = useTranslation('global');
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

        if (onSelect)
          onSelect(
            latLng,
            results[0].formatted_address,
            results[0].address_components[0].short_name,
          );
      } catch (error) {
        console.error(error);
      }
    };

    useImperativeHandle(ref, () => ({
      getAddress: () => {
        return address;
      },
      setNewAddress: (newAddress) => {
        setAddress(newAddress);
        if (onChange) onChange(newAddress);
        handleSelect(newAddress);
      },
    }));

    useEffect(() => {
      setAddress(defaultAddress);
    }, [defaultAddress]);

    return (
      <>
        {isMapLoaded && (
          <PlacesAutocomplete
            value={address}
            onChange={handleChange}
            onSelect={handleSelect}
            searchOptions={{ types: ['airport'] }}
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
                    className=" absolute right-3 top-8 z-20 rounded bg-white w-[30px] flex justify-end"
                    onClick={() => {
                      setAddress('');
                      clearShortNames?.();
                    }}
                  >
                    <CloseIcon className="text-dark-700" />
                  </section>
                )}
                <section className="relative lg:w-full">
                  <IconInput
                    {...getInputProps({
                      placeholder: t(
                        'locationInputPlaceholder',
                        'Pick your destination',
                      ),
                      className: 'location-search-input',
                    })}
                    {...others}
                    icon={<LocationPin className="w-5 h-5 text-dark-700" />}
                  />
                  <section
                    className={classnames(
                      'autocomplete-dropdown-container rounded absolute z-20 w-full block',
                      {
                        'shadow-md': suggestions[0],
                      },
                    )}
                  >
                    {loading && <section>{loadingMessage}...</section>}
                    {suggestions.map((suggestion, index) => {
                      if (filter && filter(suggestion.description)) {
                        return null;
                      }
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
  },
);

LocationInput.displayName = 'LocationInput';

export default LocationInput;
