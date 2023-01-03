import { Item } from '../../types/response/CartHotels';
import CheckinCheckoutInfo from '../CheckinCheckoutInfo/CheckinCheckoutInfo';
import InstructionsModal, {
  InstructionProps,
} from '../Instructions/InstructionsModal';
import LocationInfo from '../LocationInfo/LocationInfo';

interface HotelGeneralInfoProps {
  item?: Item;
}

const HotelGeneralInfo = ({ item }: HotelGeneralInfoProps) => {
  const checkinDate = item?.item_data.start_date;
  const checkoutDate = item?.item_data.end_date;
  const checkinTime = item?.item_data.details.checkin_time;
  const checkoutTime = item?.item_data.details.checkout_time;

  return (
    <section className="flex flex-col gap-2 py-4 px-4">
      <LocationInfo address={item?.item_data.details.address} />
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
