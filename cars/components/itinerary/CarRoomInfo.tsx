import RoomPriceBreakdown from '../CarPriceBreakdown/CarPriceBreakdown';
import { Item } from 'types/cart/CartType';

interface CarRoomInfoProps {
  item: Item;
}

const CarRoomInfo = ({ item }: CarRoomInfoProps) => {
  const total = `${item?.booking_data?.car.VehAvailCore.TotalCharge['@RateTotalAmount']} ${item?.booking_data?.car.VehAvailCore.TotalCharge['@CurrencyCode']}`;

  return (
    <section className="flex flex-col gap-2 border-t border-dark-300 py-4 px-4">
      <RoomPriceBreakdown total={total} />
    </section>
  );
};

export default CarRoomInfo;
