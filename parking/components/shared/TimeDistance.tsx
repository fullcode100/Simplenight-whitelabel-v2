import LocationPinIcon from '@/icons/assets/location-pin.svg';
import { useTranslation } from 'react-i18next';
import { FC } from 'react';

export const TimeDistance: FC<{ distance: number }> = ({ distance }) => {
  const [t] = useTranslation('parking');
  const timeDistance = Math.round(distance / 40);
  return (
    <section className="flex items-center gap-2">
      <LocationPinIcon className="text-primary-1000" />
      <span>
        {timeDistance} {t('minToDestination')}
      </span>
    </section>
  );
};
