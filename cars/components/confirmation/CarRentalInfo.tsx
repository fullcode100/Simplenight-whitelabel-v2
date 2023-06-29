import { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import CarPriceBreakdown from '../CarPriceBreakdown/CarPriceBreakdown';
import SupplierReference from '../SupplierReference/SupplierReference';
import { ClientBookingItemRemover } from 'core/client/ClientBookingItemRemover';
import { DeleteBookingItemRequest } from 'types/confirmation/DeleteBookingRequest';
import { Item } from 'types/booking/bookingType';

interface CarRentalInfoProps {
  item?: Item;
  loading?: boolean;
  setLoading?: Dispatch<SetStateAction<boolean>>;
}

const CarRentalInfo = ({ item, loading, setLoading }: CarRentalInfoProps) => {
  const router = useRouter();

  const [t, i18next] = useTranslation('global');

  const supplierReferenceID = item?.booking_data?.supplier_order_number;

  const total = item?.booking_data?.rate.totalAmount;

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

      <CarPriceBreakdown total={total} />
    </section>
  );
};

export default CarRentalInfo;
