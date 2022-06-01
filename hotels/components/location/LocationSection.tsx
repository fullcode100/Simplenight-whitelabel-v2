/* eslint-disable camelcase */
import IconRoundedContainer from 'components/global/IconRoundedContainer/IconRoundedContainer';
import LocationMap from 'components/global/LocationMap/LocationMap';
import hotelMock from 'hotels/hotelMock';
import LocationPin from 'public/icons/assets/location-pin.svg';
import { RefObject } from 'react';
import { useTranslation } from 'react-i18next';

const LocationSection = () => {
  const [t, i18n] = useTranslation('hotels');
  const mapLabel = t('map', 'Map');
  const {
    details: { address },
  } = hotelMock[0];
  const { coordinates, address1, country, country_code, postal_code } = address;

  return (
    <section className="p-6">
      <section className="flex justify-between place-items-center gap-3 py-2 mb-3">
        <p className="flex items-center gap-3">
          <IconRoundedContainer className="bg-primary-1000">
            <LocationPin className="text-white" />
          </IconRoundedContainer>
          <span className="h4 text-dark-800">{mapLabel}</span>
        </p>
        <p className="text-dark-1000 text-right">
          <p>{address1}</p>
          <p>
            {country}
            {country_code && `, ${country_code}`}
            {postal_code && `, ${postal_code} `}
          </p>
        </p>
      </section>

      <LocationMap
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
