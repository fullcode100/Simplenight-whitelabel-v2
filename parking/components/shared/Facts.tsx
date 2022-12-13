import { FC } from 'react';
import { Parking } from '../../types/response/ParkingSearchResponse';
import ChargingPlugIcon from '@/icons/assets/charging-plug.svg';
import WheelChairIcon from '@/icons/assets/wheelChair.svg';
import CarHeightIcon from '@/icons/assets/car-height.svg';
import { useTranslation } from 'react-i18next';

interface FeaturesProps {
  parking: Parking;
}

export const ParkingFeatures: FC<FeaturesProps> = ({ parking }) => {
  const [t] = useTranslation('parking');
  const info = parking.properties.static;
  const accessible = info.features?.find((f) => f === 'DISABLED_SPACES');
  const heightRestricted = !!info.height?.restricted;
  const heightRestriction = (info.height?.max_cms || 0) / 100; // cm to m

  const electricCars = info.features?.includes('ELECTRIC_CAR_CHARGING');

  return (
    <section className="flex items-center gap-4 text-dark-1000 flex-wrap">
      {electricCars && (
        <section className="flex items-center gap-2">
          <ChargingPlugIcon className="text-primary-1000" />
          <span>{t('electric')}</span>
        </section>
      )}

      {accessible && (
        <section className="flex items-center gap-2">
          <WheelChairIcon className="text-primary-1000" />
          <span>{t('accessibility')}</span>
        </section>
      )}

      {heightRestricted && !!heightRestriction && (
        <section className="flex items-center gap-2">
          <CarHeightIcon className="text-primary-1000" />
          <span>{heightRestriction + 'm'}</span>
        </section>
      )}
    </section>
  );
};
