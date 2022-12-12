import { FC } from 'react';
import { Parking } from '../../types/response/ParkingSearchResponse';
import { useTranslation } from 'react-i18next';
import { Container } from './Container';
import { StyledLink } from '../../../components/global/StyledLink/StyledLink';
import { ParkingFeatures } from '../shared/Facts';
import { Capacity } from '../shared/Capacity';

interface ParkingDetailFactsProps {
  parking: Parking;
}

export const ParkingDetailFacts: FC<ParkingDetailFactsProps> = ({
  parking,
}) => {
  const [t] = useTranslation('parking');
  const info = parking.properties.static;
  const capacity = info.capacity;
  const phone = info.phone;
  return (
    <section>
      <Container>
        <section className="pt-5 pb-8 flex items-center gap-4">
          {capacity && <Capacity capacity={capacity} />}
          <ParkingFeatures parking={parking} />
          <section className="flex items-center gap-4 text-dark-1000">
            {phone && (
              <section className="flex items-center gap-2">
                <StyledLink href={`tel:${phone}`}>{phone}</StyledLink>
              </section>
            )}
          </section>
        </section>
      </Container>
    </section>
  );
};
