import LocationMap from 'components/global/LocationMap/LocationMap';
import SectionTitle from 'components/global/SectionTitleIcon/SectionTitle';
import LocationPin from 'public/icons/assets/location-pin.svg';
import React from 'react';
import { useTranslation } from 'react-i18next';

const CarLocationDetail = ({ lat, long }: { lat: number; long: number }) => {
  const [t] = useTranslation('cars');
  return (
    <section className="flex-1 pt-12 pb-4 text-center">
      <SectionTitle
        className="pb-4"
        title={t('location', 'Location')}
        icon={<LocationPin />}
      />
      <LocationMap
        center={{
          latitude: lat,
          longitude: long,
        }}
        coords={[
          {
            latitude: lat,
            longitude: long,
          },
        ]}
        height={334}
      />
    </section>
  );
};

export default CarLocationDetail;
