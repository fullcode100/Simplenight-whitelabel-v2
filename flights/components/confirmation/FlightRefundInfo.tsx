import RoomTitle from '../RoomTitle/RoomTitle';
import AdultChildrenAmount from '../AdultChildrenAmount/AdultChildrenAmount';
import SupplierReference from '../SupplierReference/SupplierReference';
import RefundTotal from '../RefundTotal/RefundTotal';
import { Item } from 'types/booking/bookingType';

interface FlightRefundInfoProps {
  item?: Item;
}

const FlightRefundInfo = ({ item }: FlightRefundInfoProps) => {
  const supplierReferenceID = item?.supplier_order_number;
  const roomDetail = item?.extra_data?.rooms?.[0];
  const roomName = roomDetail?.name;

  return (
    <section className="flex flex-col gap-2 border-t border-dark-300 py-6 lg:gap-3 lg:pt-6 lg:pb-0">
      <RoomTitle roomName={roomName} roomQty={item?.room_qty} />

      {supplierReferenceID && (
        <SupplierReference supplierReferenceID={supplierReferenceID} />
      )}

      <AdultChildrenAmount
        adults={item?.booking_data?.adults}
        child={item?.booking_data?.children}
      />

      <div className="border-t border-dark-200"></div>

      <RefundTotal />
    </section>
  );
};

export default FlightRefundInfo;
