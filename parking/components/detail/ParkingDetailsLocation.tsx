import React, { FC } from 'react';
import {
  Parking,
  PointGeometry,
} from '../../types/response/ParkingSearchResponse';
import { Container } from './Container';
import { DetailSectionItem } from './DetailSectionItem';
import { useTranslation } from 'react-i18next';
import LocationIcon from '@/icons/assets/location-pin.svg';
import LocationMap from '../../../components/global/LocationMap/LocationMap';
import { StyledLink } from '../../../components/global/StyledLink/StyledLink';

interface ParkingDetailsLocationProps {
  parking: Parking;
}

export const ParkingDetailsLocation: FC<ParkingDetailsLocationProps> = ({
  parking,
}) => {
  const [t] = useTranslation('parking');
  const address = parking.properties.static.address;

  const point = parking.geometry.geometries.find((geoItem) => {
    return geoItem.type === 'Point';
  }) as PointGeometry;
  const [longitude, latitude] = point.coordinates;
  const mapLink = `https://www.google.com/maps?saddr=My+Location&daddr=${latitude},${longitude}`;
  return (
    <section>
      <Container>
        <DetailSectionItem
          title={t('location')}
          icon={<LocationIcon />}
          append={
            <section className="flex flex-col items-end text-xs text-dark-1000">
              <div>{address.street.formatted}</div>
              <div>
                {address.city} {address.country} {address.postcode}
              </div>
            </section>
          }
        >
          <LocationMap
            height={400}
            center={{
              latitude,
              longitude,
            }}
            coords={[
              {
                latitude,
                longitude,
              },
            ]}
          />

          <section className="flex justify-center items-center pt-4">
            <StyledLink href={mapLink} target="_blank">
              {t('howToGetThere')}
            </StyledLink>
          </section>
        </DetailSectionItem>
      </Container>
    </section>
  );
};
