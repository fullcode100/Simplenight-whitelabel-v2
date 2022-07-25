import CheckinCheckoutInfo from '../CheckinCheckoutInfo/CheckinCheckoutInfo';
import LocationInfo from '../LocationInfo/LocationInfo';
import { Item } from 'types/booking/bookingType';

interface HotelGeneralInfoProps {
  item?: Item;
}

const HotelGeneralInfo = ({ item }: HotelGeneralInfoProps) => {
  const checkinDate = item?.extra_data.start_date;
  const checkoutDate = item?.extra_data.end_date;
  const checkinTime = item?.extra_data.details?.checkin_time;
  const checkoutTime = item?.extra_data.details?.checkout_time;

  return (
    <section className="flex flex-col gap-2 py-4 mb-2">
      <CheckinCheckoutInfo
        checkinDate={checkinDate}
        checkoutDate={checkoutDate}
        checkinTime={checkinTime}
        checkoutTime={checkoutTime}
      />
      <LocationInfo address={item?.extra_data.details?.address} />
    </section>
  );
};

export default HotelGeneralInfo;
