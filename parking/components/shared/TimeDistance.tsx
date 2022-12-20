import LocationPinIcon from '@/icons/assets/location-pin.svg';
import { useTranslation } from 'react-i18next';
import { FC } from 'react';
import dayjs from 'dayjs';

export const TimeDistance: FC<{ distance: number }> = ({ distance }) => {
  const [t] = useTranslation('parking');
  const timeDistance = Math.round(distance / 40);
  const hours = timeDistance < 60 ? 0 : Math.round(timeDistance / 60);

  return (
    <section className="flex items-center gap-2">
      <LocationPinIcon className="text-primary-1000" />
      {hours > 0 ? (
        <span>
          {hours} {t(hours === 1 ? 'hour' : 'hours')} {t('toDestination')}
        </span>
      ) : (
        <span>
          {timeDistance} {t('minToDestination')}
        </span>
      )}
    </section>
  );
};
