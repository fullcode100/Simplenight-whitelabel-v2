/* eslint-disable camelcase */
import IconRoundedContainer from 'components/global/IconRoundedContainer/IconRoundedContainer';
import LocationMap from 'components/global/LocationMap/LocationMap';
import { Address } from 'hotels/types/adapters/DetailItem';
import LocationPin from 'public/icons/assets/location-pin.svg';
import { useTranslation } from 'react-i18next';

interface LocationSectionProps {
  fullAddress: Address;
}

const LocationSection = ({ fullAddress }: LocationSectionProps) => {
  const [t, i18n] = useTranslation('hotels');
  const locationLabel = t('location', 'Location');
  const { coordinates, address, country, countryCode, postalCode } =
    fullAddress;
  const locations = [
    {
      latitude: fullAddress.coordinates.latitude,
      longitude: fullAddress.coordinates.longitude,
    },
  ];
  return (
    <section className="px-5 py-6 lg:px-0 lg:py-0">
      <section className="flex justify-between mb-5 place-items-center lg:mb-8">
        <p className="flex items-center gap-3">
          <IconRoundedContainer isLarge className="bg-primary-1000">
            <LocationPin className="text-white h-5 w-5 lg:h-[30px] lg:w-[30px]" />
          </IconRoundedContainer>
          <span className="font-semibold text-dark-800 text-lg leading-[24px] lg:text-[32px] lg:leading-[38px]">
            {locationLabel}
          </span>
        </p>
        <p className="text-right text-dark-1000">
          <p>{address}</p>
          <p>
            {country}
            {countryCode && `, ${countryCode}`}
            {postalCode && `, ${postalCode} `}
          </p>
        </p>
      </section>

      <LocationMap
        locations={locations}
        height={400}
        center={{
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
        }}
        coords={[
          {
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
          },
        ]}
      />
    </section>
  );
};

export default LocationSection;
