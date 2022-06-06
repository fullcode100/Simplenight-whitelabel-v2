import { Dispatch, SetStateAction } from 'react';
import { CartObjectResponse } from 'types/cart/CartType';
import ItineraryItem from '../ItineraryItem/ItineraryItem';

interface ItineraryItemListProps {
  cart: CartObjectResponse | undefined;
  reload: boolean;
  setReload: Dispatch<SetStateAction<boolean>>;
}

const ItineraryItemList = ({
  cart,
  reload,
  setReload,
}: ItineraryItemListProps) => {
  return (
    <section className="grid gap-3">
      {cart?.items.map((item, index) => (
        <section key={index}>
          <ItineraryItem item={item} reload={reload} setReload={setReload} />
        </section>
      ))}
    </section>
  );
};

export default ItineraryItemList;
