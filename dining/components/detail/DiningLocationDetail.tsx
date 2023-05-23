import LocationMap from 'components/global/LocationMap/LocationMap';
import SectionTitle from 'components/global/SectionTitleIcon/SectionTitle';
import React from 'react';
import { useTranslation } from 'react-i18next';
import DiningLearnMore from './DiningLearnMore';
import LocationPin from 'public/icons/assets/location-pin.svg';

const DiningLocationDetail = ({ lat, long }: { lat: number; long: number }) => {
  const [t] = useTranslation('dining');
  return (
    <section className="flex-1 py-12 text-center">
      <SectionTitle
        className="pb-4"
        title={t('location')}
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
      <DiningLearnMore
        className="mt-4"
        label={t('howToGetThere')}
        href={`https://www.google.com/maps/search/?api=1&query=${lat},${long}`}
      />
    </section>
  );
};

export default DiningLocationDetail;
