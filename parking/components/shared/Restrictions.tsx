import React, { FC } from 'react';
import { Highlighted } from '../../../components/global/Highlighted/Highlighted';
import { Parking } from '../../types/response/ParkingSearchResponse';
import ExclamationIcon from '@/icons/assets/exclamation2.svg';
import { useTranslation } from 'react-i18next';

interface RestrictionsProps {
  parking: Parking;
}

export const Restrictions: FC<RestrictionsProps> = ({ parking }) => {
  const [t] = useTranslation('parking');
  const restrictions = parking.properties.static.restrictions;
  return (
    <section className="flex flex-col items-end gap-2">
      {restrictions?.map((restriction) => (
        <Highlighted key={`restriction-${restriction}`} color="warning">
          <ExclamationIcon />
          <span>{t(restriction)}</span>
        </Highlighted>
      ))}
    </section>
  );
};
