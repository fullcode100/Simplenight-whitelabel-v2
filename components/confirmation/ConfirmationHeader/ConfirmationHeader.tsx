import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

import PageTitle from 'components/global/PageTitle/PageTitle';
import ConfirmationBuyerInfo from '../ConfirmationBuyerInfo/ConfirmationBuyerInfo';
import ConfirmationOrderInfo from '../ConfirmationOrderInfo/ConfirmationOrderInfo';
import Disclaimer from 'components/global/Disclaimer/Disclaimer';
import { Booking } from 'types/booking/bookingType';
import CircleConfirmation from 'public/icons/assets/check-round.svg';
import PageTitle from 'components/global/PageTitle/PageTitle';
import ConfirmationBuyerInfo from '../ConfirmationBuyerInfo/ConfirmationBuyerInfo';
import ConfirmationOrderInfo from '../ConfirmationOrderInfo/ConfirmationOrderInfo';
import Disclaimer from 'components/global/Disclaimer/Disclaimer';
import { Booking } from 'types/booking/bookingType';

import CircleConfirmation from 'public/icons/assets/check-round.svg';
import Chevron from 'public/icons/assets/chevron-down.svg';

import CircleConfirmation from 'public/icons/assets/check-round.svg';
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
  const orderConfirmed = t('orderConfirmed', 'Order Confirmed');
  const confirmationDisclaimer = t(
    'confirmationDisclaimer',
    'Supplier Reference ID and Vendor Confirmation Number Can Be Found Below.',
  );

  const LookupHeader = () => {
    const router = useRouter();

    const orderLookup = t('orderLookup', 'Order Lookup');

    return (
      <section className="flex flex-row gap-2 py-3.5 px-5 border-y-[1px] border-dark-300">
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

  return (
    <section className="bg-dark-100">
      {fromLookup && <LookupHeader />}

      <section className="flex flex-col gap-3 p-5 border-b-[1px] border-dark-300">
        <PageTitle
          title={orderConfirmed}
          icon={<CircleConfirmation />}
          productsAmount={itemsAmount}
        />
        <ConfirmationBuyerInfo booking={booking} />
        <ConfirmationOrderInfo booking={booking} />
        <Disclaimer message={confirmationDisclaimer} />
      </section>
    </section>
  );
};

export default ConfirmationHeader;
