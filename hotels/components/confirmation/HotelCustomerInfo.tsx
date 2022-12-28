import { Item } from 'types/booking/bookingType';
import Buyer from 'public/icons/assets/buyer-user.svg';
import Email from 'public/icons/assets/email.svg';
import Phone from 'public/icons/assets/phone-call.svg';
import { useTranslation } from 'react-i18next';

interface HotelCustomerInfoProps {
  item?: Item;
}

const HotelCustomerInfo = ({ item }: HotelCustomerInfoProps) => {
  const [t, i18next] = useTranslation('global');
  const orderName = t('orderName', 'Order Name');

  const customer = item?.customer;

  const email = customer?.email;
  const phoneNumber = customer?.phone_number;
  const phonePrefix = customer?.phone_prefix;
  const firstName = customer?.first_name;
  const lastName = customer?.last_name;

  return (
    <section className="flex p-3 mt-6 border rounded bg-primary-100 lg:mt-3 border-primary-300">
      <Buyer className="text-primary-1000 h-5 w-5 mr-2.5" />
      <section className="flex flex-col lg:flex-row lg:grid lg:grid-cols-2 lg:w-full">
        <section className="mb-1">
          <h6 className="text-dark-700 font-semibold text-xs leading-lg lg:text-sm lg:leading-[22px]">
            {orderName}
          </h6>
          <h6 className="text-dark-1000 font-semibold text-xs leading-lg lg:text-sm leading-[22px]">
            {firstName} {lastName}
          </h6>
        </section>
        <section className="flex flex-col gap-0.5 lg:gap-2.5">
          <section className="flex items-center gap-2">
            <Email className="text-primary-1000 h-2.5 lg:h-5 lg:w-5" />
            <h6 className="text-dark-1000 font-semibold text-xs leading-lg lg:text-sm leading-[22px] underline cursor-pointer">
              {email}
            </h6>
          </section>
          <section className="flex items-center gap-2">
            <Phone className="h-3 text-primary-1000 lg:h-5 lg:w-5" />
            <h6 className="text-dark-1000 font-semibold text-xs leading-lg lg:text-sm leading-[22px] underline cursor-pointer">
              +{phonePrefix} {phoneNumber}
            </h6>
          </section>
        </section>
      </section>
    </section>
  );
};

export default HotelCustomerInfo;
