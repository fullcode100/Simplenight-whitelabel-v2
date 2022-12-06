import React, { FC } from 'react';
import { Parking } from '../../types/response/ParkingSearchResponse';
import { Container } from './Container';
import { useTranslation } from 'react-i18next';
import { OpenIndicator } from '../shared/OpenIndicator';

interface ParkingDetailHeaderProps {
  parking: Parking;
}

export const ParkingDetailHeader: FC<ParkingDetailHeaderProps> = ({
  parking,
}) => {
  const [t] = useTranslation('parking');
  const address = parking.properties.static.address;
  const title = `${address.street.formatted}, ${address.city}, ${address?.country}, ${address.postcode}`;

  return (
    <header className="pt-8 pb-3">
      <Container>
        <h3 className="text-3xl pb-3 text-dark-1000">{title}</h3>
        <section className="flex items-center gap-4">
          <span className="text-dark-800 text-[16px]">{t('parking')}</span>

          <OpenIndicator parking={parking} />
        </section>
      </Container>
    </header>
  );
};
