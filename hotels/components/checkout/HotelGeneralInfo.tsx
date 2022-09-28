import { HotelCart } from 'types/cart/CartType';
import CheckinCheckoutInfo from '../CheckinCheckoutInfo/CheckinCheckoutInfo';
import LocationInfo from '../LocationInfo/LocationInfo';

interface HotelGeneralInfoProps {
  item?: HotelCart;
}

const HotelGeneralInfo = ({ item }: HotelGeneralInfoProps) => {
  const checkinDate = item?.start_date;
  const checkoutDate = item?.end_date;
  const checkinTime = item?.details?.checkin_time;
  const checkoutTime = item?.details?.checkout_time;

  return (
    <section className="flex flex-col gap-2 py-6">
      <LocationInfo address={item?.details?.address} />
      <CheckinCheckoutInfo
        checkinDate={checkinDate}
        checkoutDate={checkoutDate}
        checkinTime={checkinTime}
        checkoutTime={checkoutTime}
      />
    </section>
  );
};

export default HotelGeneralInfo;
