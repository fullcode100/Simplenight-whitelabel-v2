import Email from 'public/icons/assets/email.svg';
import Phone from 'public/icons/assets/phone-call.svg';
import Customer from 'public/icons/assets/customer.svg';
import { Booking } from 'types/booking/bookingType';
import { useTranslation } from 'react-i18next';

interface ConfirmationBuyerInfoProps {
  booking?: Booking;
}

const ConfirmationBuyerInfo = ({ booking }: ConfirmationBuyerInfoProps) => {
  const firstName = booking?.primary_contact.first_name;
  const lastName = booking?.primary_contact.last_name;
  const email = booking?.primary_contact.email;
  const phoneNumber = booking?.primary_contact.phone_number;
  const phonePrefix = booking?.primary_contact.phone_prefix;

  const [t, i18next] = useTranslation('global');
  const orderName = t('orderName', 'Order Name');

  return (
    <section className="flex flex-col gap-2 lg:text-sm lg:leading-[22px]">
      <section className="flex gap-2">
        <Customer className="mt-0.5 lg:h-5 lg:w-5 text-primary-1000" />
        <section className="flex flex-col">
          <h4 className="font-semibold text-dark-700">{orderName}</h4>
          <h1 className="font-semibold text-dark-1000">
            {firstName} {lastName}
          </h1>
        </section>
      </section>
      <section className="flex gap-2 items-center">
        <Email className="mt-0.5 lg:h-5 lg:w-5 text-primary-1000 h-4" />
        <h4 className="font-semibold text-dark-1000 underline">{email}</h4>
      </section>
      <section className="flex gap-2 items-center">
        <Phone className="mt-0.5 lg:h-5 lg:w-5 text-primary-1000 h-4" />
        <h4 className="font-semibold text-dark-1000 underline">
          +{phonePrefix} {phoneNumber}
        </h4>
      </section>
    </section>
  );
};

export default ConfirmationBuyerInfo;
