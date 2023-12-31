import Email from 'public/icons/assets/email.svg';
import Phone from 'public/icons/assets/phone-call.svg';
import Customer from 'public/icons/assets/customer.svg';
import { Booking } from 'types/booking/bookingType';
import { useTranslation } from 'react-i18next';

interface ConfirmationBuyerInfoProps {
  booking?: Booking;
  className?: string;
}

const ConfirmationBuyerInfo = ({
  booking,
  className,
}: ConfirmationBuyerInfoProps) => {
  const firstName = booking?.primary_contact.first_name;
  const lastName = booking?.primary_contact.last_name;
  const email = booking?.primary_contact.email;
  const phoneNumber = booking?.primary_contact.phone_number;
  const phonePrefix = booking?.primary_contact.phone_prefix;

  const [t, i18next] = useTranslation('global');
  const orderName = t('orderName', 'Order Name');

  return (
    <section
      className={`flex flex-col gap-2 lg:text-sm lg:leading-[22px] ${className}`}
    >
      <section className="flex gap-2">
        <Customer className="mt-0.5 lg:h-5 lg:w-5 text-primary-1000" />
        <section className="flex flex-col">
          <p className="font-semibold text-dark-700">{orderName}</p>
          <p className="font-semibold text-dark-1000">
            {firstName} {lastName}
          </p>
        </section>
      </section>
      <section className="flex items-center gap-2">
        <Email className="mt-0.5 lg:h-5 lg:w-5 text-primary-1000 h-4" />
        <p className="font-semibold underline text-dark-1000 cursor-pointer">
          {email}
        </p>
      </section>
      <section className="flex gap-2 items-center">
        <Phone className="mt-0.5 lg:h-5 lg:w-5 text-primary-1000 h-4" />
        <p className="font-semibold underline text-dark-1000 cursor-pointer">
          +{phonePrefix} {phoneNumber}
        </p>
      </section>
    </section>
  );
};

export default ConfirmationBuyerInfo;
