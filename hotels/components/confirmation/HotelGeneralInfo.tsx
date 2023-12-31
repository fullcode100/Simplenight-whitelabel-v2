import CheckinCheckoutInfo from '../CheckinCheckoutInfo/CheckinCheckoutInfo';
import LocationInfo from '../LocationInfo/LocationInfo';
import { Item } from 'types/booking/bookingType';
import InstructionsModal, {
  InstructionProps,
} from '../Instructions/InstructionsModal';

interface HotelGeneralInfoProps {
  item?: Item;
}

const HotelGeneralInfo = ({ item }: HotelGeneralInfoProps) => {
  const checkinDate = item?.item_data?.start_date;
  const checkoutDate = item?.item_data?.end_date;
  const checkinTime = item?.item_data?.details?.checkin_time;
  const checkoutTime = item?.item_data?.details?.checkout_time;
  return (
    <section className="flex flex-col gap-2 py-4 mb-2 lg:gap-3">
      <LocationInfo address={item?.item_data?.details?.address} />
      <CheckinCheckoutInfo
        checkinDate={checkinDate}
        checkoutDate={checkoutDate}
        checkinTime={checkinTime}
        checkoutTime={checkoutTime}
      />
      <InstructionsModal item={item?.item_data?.details as InstructionProps} />
    </section>
  );
};

export default HotelGeneralInfo;
