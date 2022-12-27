import { Address } from 'dining/types/response/SearchResponse';
import CheckoutInfo from '../CheckoutInfo/CheckoutInfo';
import LocationInfo from '../LocationInfo/LocationInfo';

const DiningGeneralInfo = ({
  date,
  time,
  address,
}: {
  date?: string;
  time?: string;
  address?: Partial<Address>;
}) => {
  return (
    <section className="gap-2 px-4 py-4">
      <CheckoutInfo checkoutDate={date || ''} checkoutTime={time || ''} />
      {address ? <LocationInfo address={address} /> : null}
    </section>
  );
};

export default DiningGeneralInfo;
