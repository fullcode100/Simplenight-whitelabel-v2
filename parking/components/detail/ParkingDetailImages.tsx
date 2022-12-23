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
  const address = parking.properties.static.address;
  const title = `${address.street.formatted}, ${address.city}, ${address?.country}, ${address.postcode}`;
  const images = parking.properties.static.images?.map((img) => img.url) || [];

  return (
    <section>
      <Container>
        <ImageBox title={title} images={images} />
      </Container>
    </section>
  );
};
