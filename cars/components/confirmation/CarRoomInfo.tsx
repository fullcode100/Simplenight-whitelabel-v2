import { useTranslation } from 'react-i18next';
import RoomPriceBreakdown from '../CarPriceBreakdown/CarPriceBreakdown';
import Button from 'components/global/Button/Button';

import { Item } from 'types/booking/bookingType';

interface CarRoomInfoProps {
  item: Item;
}

const CarRoomInfo = ({ item }: CarRoomInfoProps) => {
  const [t] = useTranslation('global');
  const cancelLabel = t('cancelReservation', 'Cancel Reservation');
  const total = `${item?.booking_data?.car.VehAvailCore.TotalCharge['@RateTotalAmount']} ${item?.booking_data?.car.VehAvailCore.TotalCharge['@CurrencyCode']}`;

  return (
    <section className="flex flex-col gap-2 border-t border-dark-300 py-6">
      <RoomPriceBreakdown total={total} />
      <Button
        value={cancelLabel}
        size="full-sm"
        type="outlined"
        translationKey="cancelReservation"
      ></Button>
    </section>
  );
};

export default CarRoomInfo;
