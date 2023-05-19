import { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import Button from 'components/global/Button/Button';
import RoomTitle from '../RoomTitle/RoomTitle';
import RoomPriceBreakdown from '../RoomPriceBreakdown/RoomPriceBreakdown';
import SupplierReference from '../SupplierReference/SupplierReference';

import { ClientBookingItemRemover } from 'core/client/ClientBookingItemRemover';
import { DeleteBookingItemRequest } from 'types/confirmation/DeleteBookingRequest';
import { diffDays } from 'helpers/dajjsUtils';
import { Item } from 'types/booking/bookingType';

interface CarRoomsInfoProps {
  item?: Item;
  loading?: boolean;
  setLoading?: Dispatch<SetStateAction<boolean>>;
}

const CarRoomsInfo = ({ item, loading, setLoading }: CarRoomsInfoProps) => {
  const router = useRouter();

  const [t, i18next] = useTranslation('global');
  const cancelLabel = t('cancelReservation', 'Cancel Reservation');

  const supplierReferenceID = item?.booking_data?.supplier_order_number;

  const total = item?.total.formatted;

  const handleItemRemoval = async () => {
    const itemRemover = new ClientBookingItemRemover();
    const requestData: DeleteBookingItemRequest = {
      bookingId: item?.booking_id || '',
      itemId: item?.booking_item_id || '',
    };

    setLoading?.(!loading);
    await itemRemover
      .request(requestData, i18next)
      .catch((error) => console.error(error));

    setLoading?.(!loading);
    router.reload();
  };

  return (
    <section className="flex flex-col gap-2 lg:gap-3 py-6 lg:pt-1 lg:pb-6">
      {supplierReferenceID && (
        <SupplierReference supplierReferenceID={supplierReferenceID} />
      )}

      <RoomPriceBreakdown total={total} />
      {/* <section className="lg:flex lg:justify-end">
        <section className="lg:w-1/4">
          <Button
            value={cancelLabel}
            size="full-sm"
            type="outlined"
            translationKey="cancelReservation"
            onClick={handleItemRemoval}
          ></Button>
        </section>
      </section> */}
    </section>
  );
};

export default CarRoomsInfo;
