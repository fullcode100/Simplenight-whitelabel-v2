import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

import ConfirmationBuyerInfo from '../ConfirmationBuyerInfo/ConfirmationBuyerInfo';
import ConfirmationOrderInfo from '../ConfirmationOrderInfo/ConfirmationOrderInfo';
import Disclaimer from 'components/global/Disclaimer/Disclaimer';
import { usePlural } from 'hooks/stringBehavior/usePlural';
import { Booking } from 'types/booking/bookingType';
import CircleConfirmation from 'public/icons/assets/check-round.svg';
import PageTitle from 'components/global/PageTitle/PageTitle';
import Chevron from 'public/icons/assets/chevron-down.svg';

interface ConfirmationHeaderProps {
  booking?: Booking;
  fromLookup?: boolean;
  itemsAmount: number;
}

const ConfirmationHeader = ({
  booking,
  fromLookup,
  itemsAmount,
}: ConfirmationHeaderProps) => {
  const [t, i18next] = useTranslation('global');
  const confirmationDisclaimer = t(
    'confirmationDisclaimer',
    'Supplier Reference ID and Vendor Confirmation Number Can Be Found Below.',
  );

  const LookupHeader = () => {
    const router = useRouter();
    const orderLookup = t('orderLookup', 'Order Lookup');

    return (
      <section className="flex flex-row gap-2 py-3.5 px-5 lg:px-20 border-y-[1px] border-dark-300 lg:border-t-0">
        <p
          className="text-primary-1000 text-sm leading-[22px] underline underline-offset-4 decoration-1"
          onClick={() => router.push('/lookup')}
        >
          {orderLookup}
        </p>
        <Chevron className="mt-2 -rotate-90 text-dark-1000" />
        <p className="text-dark-1000 text-sm leading-[22px]">
          {booking?.sn_order_number}
        </p>
      </section>
    );
  };

  const PageTitle = () => {
    const item = t('item', 'Item');
    const items = t('items', 'Items');
    const orderConfirmed = t('orderConfirmed', 'Order Confirmed');

    const itemsLabel = usePlural(itemsAmount, item, items);
    const showItemsAmount = !!itemsAmount && itemsAmount > 0;

    return (
      <section className="flex items-center justify-between">
        <section className="flex items-center gap-3 lg:gap-4">
          <span className=" text-primary-1000">
            <CircleConfirmation className="h-5 w-5 lg:h-[50px] lg:w-[50px]" />
          </span>
          <p className="font-semibold text-dark-800 text-lg leading-[24px] lg:text-[32px] lg:leading-[38px]">
            {orderConfirmed}
          </p>
        </section>

        {showItemsAmount && (
          <section className="block lg:hidden font-semibold text-dark-800 text-[16px] leading-[20px]">
            {itemsAmount} {itemsLabel}
          </section>
        )}
      </section>
    );
  };

  return (
    <section className="bg-dark-100 lg:flex lg:flex-col-reverse lg:mt-[125px]">
      {fromLookup && <LookupHeader />}

      <section className="p-5 lg:py-6 lg:px-20 border-b-[1px] border-dark-300">
        <section className="flex flex-col lg:flex-row justify-between gap-3 max-w-7xl mx-auto">
          <PageTitle />
          <section className="grid gap-3">
            <section className="flex flex-col lg:flex-row gap-3 lg:gap-[100px]">
              <ConfirmationBuyerInfo booking={booking} />
              <ConfirmationOrderInfo booking={booking} />
            </section>
            <Disclaimer message={confirmationDisclaimer} />
          </section>
        </section>
      </section>
    </section>
  );
};

export default ConfirmationHeader;
