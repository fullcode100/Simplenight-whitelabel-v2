import { Item, PrimaryContact } from 'types/booking/bookingType';
import Buyer from 'public/icons/assets/buyer-user.svg';
import Email from 'public/icons/assets/email.svg';
import Phone from 'public/icons/assets/phone-call.svg';
import { useTranslation } from 'react-i18next';

interface HotelCustomerInfoProps {
  item?: Item;
  primaryContact?: PrimaryContact;
}

const HotelCustomerInfo = ({
  item,
  primaryContact,
}: HotelCustomerInfoProps) => {
  const [t, i18next] = useTranslation('global');
  const reservationName = t('reservationName', 'Reservation Name');

  const email = primaryContact?.email;
  const phoneNumber = primaryContact?.phone_number;
  const phonePrefix = primaryContact?.phone_prefix;
  const firstName = primaryContact?.first_name;
  const lastName = primaryContact?.last_name;

  return (
    <section className="bg-primary-100 mt-6 flex p-3 border rounded border-primary-300">
      <Buyer className="text-primary-1000 h-5 w-5 mr-2.5" />
      <section className="flex flex-col">
        <section className="mb-1">
          <h6 className="text-dark-700 font-semibold text-xs">
            {reservationName}
          </h6>
          <h6 className="text-dark-1000 font-semibold text-xs">
            {firstName} {lastName}
          </h6>
        </section>
        <section className="flex gap-2 items-center">
          <Email className="text-primary-1000 h-2.5" />
          <h6 className="text-dark-1000 font-semibold text-xs underline">
            {email}
          </h6>
        </section>
        <section className="flex gap-2 items-center">
          <Phone className="text-primary-1000 h-3" />
          <h6 className="text-dark-1000 font-semibold text-xs underline">
            +{phonePrefix} {phoneNumber}
          </h6>
        </section>
      </section>
    </section>
  );
};

export default HotelCustomerInfo;
