import { Paragraph } from '@simplenight/ui';
import { fromUpperCaseToCapitilize } from 'helpers/stringUtils';
import { Address } from 'hotels/types/response/SearchResponse';
import LocationPin from 'public/icons/assets/location-pin.svg';
interface LocationInfoProps {
  address?: Address;
}

const LocationInfo = ({ address }: LocationInfoProps) => {
  const city = fromUpperCaseToCapitilize(address?.city);

  return (
    <section className="flex flex-row gap-2 lg:w-1/2">
      <LocationPin className="h-3.5 lg:h-5 lg:w-5 ml-0.5 lg:ml-0 mt-1 lg:mt-0 text-primary-1000" />
      <Paragraph>
        {address?.address1}, {city}, {address?.country_code},{' '}
        {address?.postal_code}
      </Paragraph>
    </section>
  );
};

export default LocationInfo;
