import { fromUpperCaseToCapitilize } from 'helpers/stringUtils';
import { Address } from 'hotels/types/response/SearchResponse';
import LocationPin from 'public/icons/assets/location-pin.svg';
interface LocationInfoProps {
  address?: Address;
}

const LocationInfo = ({ address }: LocationInfoProps) => {
  const city = fromUpperCaseToCapitilize(address?.city);

  return (
    <section className="flex flex-row gap-2">
      <LocationPin className="h-3.5 ml-0.5 mt-1 text-primary-1000" />
      <p className="font-semibold text-xs leading-lg text-dark-1000">
        {address?.address1}, {city}, {address?.country_code},{' '}
        {address?.postal_code}
      </p>
    </section>
  );
};

export default LocationInfo;
