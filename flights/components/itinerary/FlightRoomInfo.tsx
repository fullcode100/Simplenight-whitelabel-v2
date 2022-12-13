import { useTranslation } from 'react-i18next';
import RoomPriceBreakdown from '../RoomPriceBreakdown/RoomPriceBreakdown';
import { Item } from 'types/cart/CartType';

interface FlightRoomInfoProps {
  item: Item;
}

const FlightRoomInfo = ({ item }: FlightRoomInfoProps) => {
  const [t, i18next] = useTranslation('global');
  const cancellationPolicy = t('nonRefundable', 'Non refundable');
  const total = `${item?.booking_data?.offer?.totalAmound} ${item?.booking_data?.search?.currency}`;
  const taxesAndFees = `${item?.booking_data?.offer?.baseFare} ${item?.booking_data?.search?.currency}`;

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

export default FlightRoomInfo;
