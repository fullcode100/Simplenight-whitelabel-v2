import CheckoutInfo from '../CheckoutInfo/CheckoutInfo';
import LocationInfo from '../LocationInfo/LocationInfo';

const DiningGeneralInfo = ({
  date,
  time,
}: {
  date?: string;
  time?: string;
}) => {
  return (
    <section className="flex flex-col gap-2 px-4 py-4 lg:flex-row">
      <CheckoutInfo checkoutDate={date || ''} checkoutTime={time || ''} />
      {/* <LocationInfo
        address={{
          city: 'Chicago',
          address1: '11 E. Walton',
          country_code: 'US',
          postal_code: '60611',
        }}
      /> */}
    </section>
  );
};

export default DiningGeneralInfo;
