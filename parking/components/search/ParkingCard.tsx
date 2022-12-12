import React, { FC, memo } from 'react';
import { Parking } from '../../types/response/ParkingSearchResponse';
import HorizontalItemCard from '../../../components/global/HorizontalItemCard/HorizontalItemCard';
import { PriceDisplay } from './PriceDisplay';
import { useTranslation } from 'react-i18next';
import { ParkingCategory } from '../../index';
import useQuery from '../../../hooks/pageInteraction/useQuery';
import { Capacity } from '../shared/Capacity';
import { ParkingFeatures } from '../shared/Facts';
import { TimeDistance } from '../shared/TimeDistance';

interface ParkingCardProps {
  parkingItem: Parking;
}

export const ParkingCard: FC<ParkingCardProps> = memo(({ parkingItem }) => {
  const { slug, startDate, endDate, startTime, endTime } = useQuery();
  const urlDetail = (parking: Parking) => {
    const { id } = parking;
    return `/detail/${slug}/${id}?startDate=${startDate}&endDate=${endDate}&startTime=${startTime}&endTime=${endTime}`;
  };

  const [t] = useTranslation('parking');
  const {
    images,
    address,
    rate_tables: rateTable,
    operator,
    name,
  } = parkingItem.properties.static;

  const thumbnail = images?.find((i) => i.type === 'MAIN');
  // const formattedLocation = `${address.street.formatted}, ${address.city}, ${address?.country}, ${address.postcode}`;
  const parkingDetailsPageUrl = urlDetail(parkingItem);

  const title = operator ? operator : name ? name : address.street.formatted;

  return (
    <HorizontalItemCard
      key={parkingItem.id}
      icon={ParkingCategory.icon}
      categoryName={t('parking')}
      item={parkingItem}
      title={title}
      image={thumbnail?.url}
      url={parkingDetailsPageUrl}
      priceDisplay={rateTable && <PriceDisplay parking={parkingItem} />}
      address={<ParkingCardDetails parking={parkingItem} />}
    />
  );
});

ParkingCard.displayName = 'ParkingCard';

const ParkingCardDetails: FC<{ parking: Parking }> = ({ parking }) => {
  const details = parking.properties.static;
  const capacity = details.capacity;
  const phone = details.phone;
  const distance = details.distance;
  const street = details.address.street.formatted;

  return (
    <section className="flex flex-col justify-between gap-2">
      <section>
        <section className="text-dark-1000">
          {phone ? `${phone} | ` : null} {street}
        </section>
        <Capacity capacity={capacity} />
      </section>

      <section>
        <TimeDistance distance={distance} />
        <ParkingFeatures parking={parking} />
      </section>
    </section>
  );
};
