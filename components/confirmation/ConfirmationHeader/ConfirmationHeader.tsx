import { useTranslation } from 'react-i18next';
import { Booking } from 'types/booking/bookingType';
import CircleConfirmation from 'public/icons/assets/check-round.svg';
import PageTitle from 'components/global/PageTitle/PageTitle';
import ConfirmationBuyerInfo from '../ConfirmationBuyerInfo/ConfirmationBuyerInfo';
import ConfirmationOrderInfo from '../ConfirmationOrderInfo/ConfirmationOrderInfo';
import Disclaimer from 'components/global/Disclaimer/Disclaimer';

interface ConfirmationHeaderProps {
  booking?: Booking;
  itemsAmount: number;
}

const ConfirmationHeader = ({
  booking,
  itemsAmount,
}: ConfirmationHeaderProps) => {
  const [t, i18next] = useTranslation('global');
  const orderConfirmed = t('orderConfirmed', 'Order Confirmed');
  const confirmationDisclaimer = t(
    'confirmationDisclaimer',
    'Supplier Reference ID and Vendor Confirmation Number Can Be Found Below.',
  );

  return (
    <section className="flex flex-col gap-3 p-5 bg-dark-100 border-b-[1px] border-dark-300">
      <PageTitle
        title={orderConfirmed}
        icon={<CircleConfirmation />}
        productsAmount={itemsAmount}
      />
      <ConfirmationBuyerInfo booking={booking} />
      <ConfirmationOrderInfo booking={booking} />
      <Disclaimer message={confirmationDisclaimer} />
    </section>
  );
};

export default ConfirmationHeader;
