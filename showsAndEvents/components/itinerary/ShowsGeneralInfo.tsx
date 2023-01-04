import CheckoutInfo from '../CheckoutInfo/CheckoutInfo';
import LocationInfo from '../LocationInfo/LocationInfo';
import { Item } from 'types/cart/CartType';

interface ShowsGeneralInfoProps {
  item: Item;
}

const ShowsGeneralInfo = ({ item }: ShowsGeneralInfoProps) => {
  return (
    <section className="flex flex-col lg:flex-row gap-2 py-4 px-4">
      <CheckoutInfo checkoutDateTime={item.item_data?.extra_data.starts_at} />
      <LocationInfo
        address={{
          city: item.item_data?.address.city,
          address1: item.item_data?.address.address1,
          country_code: item.item_data?.address.country_code,
          postal_code: item.item_data?.address.postal_code,
          state: item.item_data?.address.state,
        }}
      />
    </section>
  );
};

export default ShowsGeneralInfo;
