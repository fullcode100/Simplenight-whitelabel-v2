import { CartObjectResponse } from 'types/cart/CartType';
import ItineraryItem from '../ItineraryItem/ItineraryItem';

interface ItineraryItemListProps {
  cart: CartObjectResponse | undefined;
}

const ItineraryItemList = ({ cart }: ItineraryItemListProps) => {
  return (
    <section className="grid gap-3">
      {cart?.items.map((item, index) => (
        <section key={index}>
          <ItineraryItem item={item} />
        </section>
      ))}
    </section>
  );
};

export default ItineraryItemList;
