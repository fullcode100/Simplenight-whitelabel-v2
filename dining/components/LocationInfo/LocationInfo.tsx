import { fromUpperCaseToCapitilize } from 'helpers/stringUtils';
import LocationPin from 'public/icons/assets/location-pin.svg';

interface LocationInfoProps {
  address?: string;
}

const LocationInfo = ({ address }: LocationInfoProps) => {
  return (
    <section className="flex flex-row gap-2 lg:w-1/2">
      <LocationPin className="h-3.5 lg:h-5 lg:w-5 ml-0.5 lg:ml-0 mt-1 lg:mt-0 text-primary-1000" />
      <p className="font-semibold text-xs lg:text-sm leading-lg lg:leading-[22px] text-dark-1000">
        {address}
      </p>
    </section>
  );
};

export default LocationInfo;
