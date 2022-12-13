import { Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import RoomPriceBreakdown from '../RoomPriceBreakdown/RoomPriceBreakdown';
import RoomTitle from '../RoomTitle/RoomTitle';
import Button from 'components/global/Button/Button';

import { Item } from 'types/cart/CartType';
import { diffDays } from 'helpers/dajjsUtils';

import TrashIcon from 'public/icons/assets/small-trash.svg';
import { removeFromCart } from 'core/client/services/CartClientService';

interface CarRoomInfoProps {
  item?: Item;
  reload?: boolean;
  setReload?: Dispatch<SetStateAction<boolean>>;
}

const CarRoomInfo = ({ item, reload, setReload }: CarRoomInfoProps) => {
  const dispatch = useDispatch();

  const [t, i18next] = useTranslation('global');
  const removeLabel = t('remove', 'Remove');

  const cancellationPolicy = t('nonRefundable', 'Non refundable');
  const total = `${item?.booking_data?.car.VehAvailCore.TotalCharge['@RateTotalAmount']} ${item?.booking_data?.car.VehAvailCore.TotalCharge['@CurrencyCode']}`;
  const taxesAndFees = '';

  const handleRemoveRoom = () => {
    if (item) {
      const roomToRemove = {
        cartId: item.cart_id,
        itemId: item.cart_item_id,
      };
      removeFromCart(i18next, roomToRemove, dispatch)
        .then(() => setReload?.(!reload))
        .catch((error) => console.error(error));
    }
  };

  return (
    <section className="flex flex-col gap-2 border-t border-dark-300 py-6">
      <RoomPriceBreakdown
        total={total}
        taxesAndFees={taxesAndFees}
        cancellationPolicy={cancellationPolicy}
      />
      <Button
        value={removeLabel}
        size="full-sm"
        type="outlined"
        translationKey="remove"
        leftIcon={<TrashIcon />}
        onClick={handleRemoveRoom}
      ></Button>
    </section>
  );
};

export default CarRoomInfo;
