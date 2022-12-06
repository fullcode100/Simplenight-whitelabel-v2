import { Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Button from 'components/global/Button/Button';

import TrashIcon from 'public/icons/assets/small-trash.svg';
import { removeFromCart } from 'core/client/services/CartClientService';
import { ClientBookingItemRemover } from 'core/client/ClientBookingItemRemover';
import { DeleteBookingItemRequest } from 'types/confirmation/DeleteBookingRequest';

interface ThingConfirmationFooterProps {
  item: any;
  reload?: boolean;
  setReload?: Dispatch<SetStateAction<boolean>>;
}

const ThingConfirmationFooter = ({
  item,
  reload,
  setReload,
}: ThingConfirmationFooterProps) => {
  const dispatch = useDispatch();
  const [g, i18g] = useTranslation('global');

  const { item_data: itemData } = item;

  const totalAmount = itemData.rate.total;
  const cancelLabel = `${g('cancelReservation', 'Cancel Reservation')}`;

  const formatedTotalAmount = totalAmount.full?.formatted;

  const removeAllTickets = async () => {
    const itemRemover = new ClientBookingItemRemover();
    const requestData: DeleteBookingItemRequest = {
      bookingId: item?.booking_id || '',
      itemId: item?.booking_item_id || '',
    };

    await itemRemover
      .request(requestData, i18g)
      .catch((error) => console.error(error));
  };

  const handleRemoveAllTickets = () => {
    removeAllTickets();
  };

  return (
    <section className="flex flex-col gap-3 lg:flex-row items center">
      <div className="flex items-center w-full">
        <p className="w-full text-sm">Total</p>
        <p className="text-base">{formatedTotalAmount}</p>
      </div>
      <section className="flex flex-col gap-3 lg:flex-row lg:justify-end">
        <Button
          value={cancelLabel}
          size="full-sm"
          type="outlined"
          leftIcon={<TrashIcon />}
          onClick={handleRemoveAllTickets}
          className="lg:w-[170px] h-8"
        ></Button>
      </section>
    </section>
  );
};

export default ThingConfirmationFooter;
