import { fromUpperCaseToCapitilize } from 'helpers/stringUtils';
import { Address } from 'hotels/types/response/SearchResponse';
import LocationPin from 'public/icons/assets/location-pin.svg';
interface LocationInfoProps {
  address?: Partial<Address>;
}

const LocationInfo = ({ address }: LocationInfoProps) => {
  const {
    address1,
    city,
    state,
    country_code: countryCode,
    postal_code: postalCode,
  } = address ?? {};
  const formattedLocation = `${[address1, city]
    .filter((item) => item)
    .join(' - ')}${[state, countryCode].some((item) => item) ? ',' : ''} ${[
    state,
    countryCode,
    postalCode,
  ]
    .filter((item) => item)
    .join(', ')}`;

  return (
    <section className="flex flex-row gap-2 lg:w-1/2">
      <LocationPin className="h-3.5 lg:h-5 lg:w-5 ml-0.5 lg:ml-0 mt-1 lg:mt-0 text-primary-1000" />
      <p className="font-semibold text-xs lg:text-sm leading-lg lg:leading-[22px] text-dark-1000">
        {formattedLocation}
      </p>
    </section>
  );
};

export default LocationInfo;
