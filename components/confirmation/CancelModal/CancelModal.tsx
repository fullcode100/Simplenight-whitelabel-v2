import { MouseEvent, Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

import FullScreenModal from 'components/global/ModalNew/FullScreenModal';
import Disclaimer from 'components/global/Disclaimer/Disclaimer';
import ConfirmationItemList from '../ConfirmationItemList/ConfirmationItemList';
import CardLogo from '../CardLogo/CardLogo';

import { Item, Payment } from 'types/booking/bookingType';

interface CancelModalProps {
  open: boolean;
  onClose: (event?: MouseEvent<HTMLElement>) => void;
  bookingItemsList: Item[];
  payment?: Payment;
  handleCancel: () => void;
  loading?: boolean;
  setLoading?: Dispatch<SetStateAction<boolean>>;
  isCancelOrder?: boolean;
}

const CancelModal = ({
  open,
  onClose,
  bookingItemsList,
  payment,
  handleCancel,
  loading = false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setLoading = () => {},
  isCancelOrder,
}: CancelModalProps) => {
  const [t, i18next] = useTranslation('global');
  const cancelOrder = t('cancelOrder', 'Cancel Order');
  const cancelReservation = t('cancelReservation', 'Cancel Reservation');
  const cancelTitle = isCancelOrder ? cancelOrder : cancelReservation;

  const questionOrder = t(
    'doYouWishToCancelYourOrder',
    'Do You Wish To Cancel Your Order?',
  );
  const questionReservation = t(
    'doYouWishToCancelYourReservation',
    'Do You Wish To Cancel Your Reservation?',
  );
  const questionCancel = isCancelOrder ? questionOrder : questionReservation;

  const close = t('close', 'Close');
  const cancelledDisclaimer = t(
    'cancelledDisclaimer',
    'Refunds typically take 2 to 7 business days to be returned to your bank.',
  );

  const RefundInfo = () => {
    const refundTitle = t('youWillBeRefunded', 'You Will Be Refunded');

    const cardBrand = payment?.card_brand || '';
    const cardLastFour = payment?.last_four || '';

    return (
      <section className="flex flex-col gap-3">
        <p className="text-sm font-semibold text-dark-700 leading-sm">
          {refundTitle}
        </p>
        <section className="flex items-center justify-between">
          <section className="flex flex-row gap-3 p-2 border rounded bg-dark-100 border-dark-300">
            <p className="text-sm leading-[22px] font-semibold text-dark-1000">
              ···· ···· ···· {cardLastFour}
            </p>
            <CardLogo cardBrand={cardBrand} />
          </section>
          <p className="text-sm leading-[22px] font-semibold text-dark-1000">
            $0.00
          </p>
        </section>
      </section>
    );
  };

  return (
    <FullScreenModal
      open={open}
      onClose={onClose}
      title={cancelTitle}
      primaryButtonText={cancelTitle}
      primaryButtonAction={handleCancel}
      secondaryButtonText={close}
      secondaryButtonAction={onClose}
    >
      <section className="grid gap-6 p-5">
        <p className="text-dark-1000 text-lg leading-[26px] font-normal">
          {questionCancel}
        </p>

        <section className="px-6 border bg-dark-100 border-dark-300">
          <ConfirmationItemList
            bookingItemsList={bookingItemsList}
            payment={payment}
            loading={loading}
            setLoading={setLoading}
          />
        </section>

        <RefundInfo />

        <Disclaimer message={cancelledDisclaimer} />
      </section>
    </FullScreenModal>
  );
};

export default CancelModal;
