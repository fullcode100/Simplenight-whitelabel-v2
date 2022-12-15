import CheckoutInfo from '../CheckoutInfo/CheckoutInfo';
import LocationInfo from '../LocationInfo/LocationInfo';

const DiningGeneralInfo = () => {
  return (
    <section className="flex flex-col lg:flex-row gap-2 py-4 px-4">
      <CheckoutInfo
        checkoutDate={'Nov 30 2022'}
        checkoutTime={'20:00 PM EST'}
      />
      <LocationInfo
        address={{
          city: 'Chicago',
          address1: '11 E. Walton',
          country_code: 'US',
          postal_code: '60611',
        }}
      />
    </section>
  );
};

export default DiningGeneralInfo;
