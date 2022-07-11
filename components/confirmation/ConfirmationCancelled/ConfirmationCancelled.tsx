import { useTranslation } from 'react-i18next';

import CancelledItemList from '../CancelledItemList/CancelledItemList';
import Disclaimer from 'components/global/Disclaimer/Disclaimer';
import { usePlural } from 'hooks/stringBehavior/usePlural';
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

  const cancelledItemsAmountLabel = usePlural(cancelledAmount, item, items);

  return (
    <section className="flex flex-col px-5 py-6 border-b border-dark-300 lg:px-0 lg:py-0 lg:w-[845px] lg:shadow-container lg:border lg:rounded lg:border-dark-300">
      <section className="grid gap-2 lg:gap-0">
        <section className="flex items-center justify-between lg:p-6 lg:bg-dark-100 lg:border-b lg:border-dark-300">
          <h1 className="font-semibold text-dark-800 text-lg leading-[24px] lg:text-2xl lg:leading-[29px]">
            {cancelledItems}
          </h1>
          <p className="font-semibold text-dark-800 text-xs leading-lg lg:text-sm lg:leading-[22px]">
            {cancelledAmount} {cancelledItemsAmountLabel}
          </p>
        </section>
        <CancelledItemList booking={booking} />
      </section>
      <section className="lg:p-6 lg:pt-0">
        <Disclaimer message={cancelledDisclaimer} />
      </section>
    </section>
  );
};

export default ConfirmationCancelled;
