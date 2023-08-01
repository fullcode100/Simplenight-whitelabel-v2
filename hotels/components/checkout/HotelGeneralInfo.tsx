import { useCustomer } from 'hooks/checkout/useCustomer';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { ItemData } from '../../types/response/CartHotels';
import CheckinCheckoutInfo from '../CheckinCheckoutInfo/CheckinCheckoutInfo';
import InstructionsModal from '../Instructions/InstructionsModal';
import LocationInfo from '../LocationInfo/LocationInfo';
import Buyer from 'public/icons/assets/buyer-user.svg';
import EmailIcon from 'public/icons/assets/Envelope.svg';
import PhoneIcon from 'public/icons/assets/Phone.svg';
import EditIcon from 'public/icons/assets/editNoFrame.svg';

interface HotelGeneralInfoProps {
  item?: ItemData;
}

const HotelGeneralInfo = ({ item }: HotelGeneralInfoProps) => {
  const checkinDate = item?.start_date;
  const checkoutDate = item?.end_date;
  const checkinTime = item?.details?.checkin_time;
  const checkoutTime = item?.details?.checkout_time;
  const modalData = {
    checkin_time: checkinDate,
    checkout_time: checkoutDate,
    fees: item?.details.fees,
    policies: item?.details.policies,
    check_in_instructions: item?.details.check_in_instructions,
  };
  const [t] = useTranslation('global');
  const [customer] = useCustomer((state) => [state.customer]);
  const router = useRouter();
  const isCheckoutPayment = router.pathname === '/checkout/payment';
  const orderName = t('orderName', 'Order Name');

  const ContactInfoItem = ({
    Icon,
    label,
    className,
  }: {
    Icon: React.ElementType;
    label?: string | undefined;
    className?: string;
  }) => {
    return (
      <section className={`flex flex-1 gap-1 ${className}`}>
        <Icon className="text-primary-1000 h-5 w-5" />
        <label>{label}</label>
      </section>
    );
  };
  const OrderName = () => {
    if (!isCheckoutPayment) {
      return null;
    }
    return (
      <section className="bg-teal-100 p-4 flex flex-col gap-4 rounded">
        <section className="flex justify-between">
          <label>{orderName}</label>
          <EditIcon
            className="lg:hidden text-primary-1000 w-4 h-4"
            onClick={() => router.back()}
          />
        </section>

        <section className="flex flex-col lg:flex-row gap-2 lg:gap-6 ">
          <ContactInfoItem
            Icon={Buyer}
            label={`${customer?.first_name} ${customer?.last_name}`}
          />
          <ContactInfoItem Icon={EmailIcon} label={customer?.email} />
          <ContactInfoItem Icon={PhoneIcon} label={customer?.phone_number} />
          <EditIcon
            className="hidden lg:block text-primary-1000 w-5 h-5"
            onClick={() => router.back()}
          />
        </section>
      </section>
    );
  };
  return (
    <section className="flex flex-col gap-2 py-6 px-4">
      <CheckinCheckoutInfo
        checkinDate={checkinDate}
        checkoutDate={checkoutDate}
        checkinTime={checkinTime}
        checkoutTime={checkoutTime}
      />
      <LocationInfo address={item?.details?.address} />
      <InstructionsModal item={modalData} />
      <OrderName />
    </section>
  );
};

export default HotelGeneralInfo;
