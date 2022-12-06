import { FC } from 'react';
import { Parking } from '../../types/response/ParkingSearchResponse';
import { Container } from './Container';
import { ImageBox } from './ImageBox';

interface ParkingDetailImagesProps {
  parking: Parking;
}

export const ParkingDetailImages: FC<ParkingDetailImagesProps> = ({
  parking,
}) => {
  const images = parking.properties.static.images?.map((img) => img.url) || [];

  return (
    <section>
      <Container>
        <ImageBox images={images} />
      </Container>
    </section>
  );
};
