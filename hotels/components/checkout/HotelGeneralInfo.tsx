import { ItemData } from '../../types/response/CartHotels';
import CheckinCheckoutInfo from '../CheckinCheckoutInfo/CheckinCheckoutInfo';
import InstructionsModal from '../Instructions/InstructionsModal';
import LocationInfo from '../LocationInfo/LocationInfo';

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
  return (
    <section className="flex flex-col gap-2 py-6 px-4">
      <LocationInfo address={item?.details?.address} />
      <CheckinCheckoutInfo
        checkinDate={checkinDate}
        checkoutDate={checkoutDate}
        checkinTime={checkinTime}
        checkoutTime={checkoutTime}
      />
      <InstructionsModal item={modalData} />
    </section>
  );
};

export default HotelGeneralInfo;
