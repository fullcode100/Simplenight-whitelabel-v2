import { Dispatch, SetStateAction } from 'react';
import { CartObjectResponse } from 'types/cart/CartType';
import BreakdownItem from '../BreakdownItem/BreakdownItem';

interface CheckoutItemListProps {
  cart?: CartObjectResponse;
  reload: boolean;
  setReload: Dispatch<SetStateAction<boolean>>;
}

const CheckoutItemList = ({
  cart,
  reload,
  setReload,
}: CheckoutItemListProps) => {
  return (
    <section className="grid gap-3 p-5">
      {cart?.items.map((item, index) => (
        <section key={index}>
          <BreakdownItem item={item} reload={reload} setReload={setReload} />
        </section>
      ))}
    </section>
  );
};

export default CheckoutItemList;
