import { useTranslation } from 'react-i18next';

import CancelledItemList from '../CancelledItemList/CancelledItemList';
import Disclaimer from 'components/global/Disclaimer/Disclaimer';
import { Booking } from 'types/booking/bookingType';

interface ConfirmationCancelledProps {
  booking: Booking;
  cancelledAmount: number;
}

const ConfirmationCancelled = ({
  booking,
  cancelledAmount,
}: ConfirmationCancelledProps) => {
  const [t, i18next] = useTranslation('global');
  const cancelledItems = t('cancelledItems', 'Cancelled Items');
  const item = t('item', 'Item');
  const items = t('items', 'Items');
  const cancelledDisclaimer = t(
    'cancelledDisclaimer',
    'Refunds typically take 2 to 7 business days to be returned to your bank.',
  );

  const cancelledItemsAmountLabel = cancelledAmount == 1 ? item : items;

  return (
    <section className="flex flex-col px-5 py-6 border-b border-dark-300">
      <section className="grid gap-2">
        <section className="flex items-center justify-between">
          <h1 className="font-semibold text-dark-800 text-lg leading-[24px]">
            {cancelledItems}
          </h1>
          <p className="font-semibold text-dark-800 text-xs leading-lg">
            {cancelledAmount} {cancelledItemsAmountLabel}
          </p>
        </section>
        <CancelledItemList booking={booking} />
      </section>
      <Disclaimer message={cancelledDisclaimer} />
    </section>
  );
};

export default ConfirmationCancelled;
