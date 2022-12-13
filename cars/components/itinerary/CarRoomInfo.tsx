import { useTranslation } from 'react-i18next';
import RoomPriceBreakdown from '../RoomPriceBreakdown/RoomPriceBreakdown';
import { Item } from 'types/cart/CartType';

interface CarRoomInfoProps {
  item: Item;
}

const CarRoomInfo = ({ item }: CarRoomInfoProps) => {
  const [t, i18next] = useTranslation('global');
  const cancellationPolicy = t('nonRefundable', 'Non refundable');
  const total = `${item?.booking_data?.car.VehAvailCore.TotalCharge['@RateTotalAmount']} ${item?.booking_data?.car.VehAvailCore.TotalCharge['@CurrencyCode']}`;
  const taxesAndFees = '';

  return (
    <section className="flex flex-col gap-2 border-t border-dark-300 py-4 px-4">
      <RoomPriceBreakdown
        total={total}
        taxesAndFees={taxesAndFees}
        cancellationPolicy={cancellationPolicy}
      />
    </section>
  );
};

export default CarRoomInfo;
