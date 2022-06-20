import { useTranslation } from 'react-i18next';
import { Booking } from 'types/booking/bookingType';
import CircleConfirmation from 'public/icons/assets/check-round.svg';
import PageTitle from 'components/global/PageTitle/PageTitle';
import ConfirmationBuyerInfo from '../ConfirmationBuyerInfo/ConfirmationBuyerInfo';
import ConfirmationOrderInfo from '../ConfirmationOrderInfo/ConfirmationOrderInfo';
import ConfirmationDisclaimer from '../ConfirmationDisclaimer/ConfirmationDisclaimer';

interface ConfirmationHeaderProps {
  booking?: Booking;
}

const ConfirmationHeader = ({ booking }: ConfirmationHeaderProps) => {
  const [t, i18next] = useTranslation('global');
  const orderConfirmed = t('orderConfirmed', 'Order Confirmed');
  const itemsQuantity = booking?.items.length;

  return (
    <section className="flex flex-col gap-3 p-5 bg-dark-100 border-b-[1px] border-dark-300">
      <PageTitle
        title={orderConfirmed}
        icon={<CircleConfirmation />}
        productsAmount={itemsQuantity}
      />
      <ConfirmationBuyerInfo booking={booking} />
      <ConfirmationOrderInfo booking={booking} />
      <ConfirmationDisclaimer />
    </section>
  );
};

export default ConfirmationHeader;
