import CheckoutInfo from '../CheckoutInfo/CheckoutInfo';
import LocationInfo from '../LocationInfo/LocationInfo';

const ShowsGeneralInfo = () => {
  return (
    <section className="flex flex-col lg:flex-row gap-2 py-4 px-4">
      <CheckoutInfo
        checkoutDate={'Feb 25 2022'}
        checkoutTime={'11:59 PM EST'}
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

export default ShowsGeneralInfo;
