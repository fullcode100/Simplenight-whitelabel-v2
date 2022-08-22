import { Dispatch, SetStateAction } from 'react';
import { CartObjectResponse } from 'types/cart/CartType';
import BreakdownItem from '../BreakdownItem/BreakdownItem';

interface CheckoutItemListProps {
  cart?: CartObjectResponse;
  reload: boolean;
  setReload: Dispatch<SetStateAction<boolean>>;
  className?: string;
}

const CheckoutItemList = ({
  cart,
  reload,
  setReload,
  className,
}: CheckoutItemListProps) => {
  return (
    <section className={`grid divide-y divide-dark-300 px-5 ${className}`}>
      {cart?.items.map((item, index) => (
        <section key={index}>
          <BreakdownItem item={item} reload={reload} setReload={setReload} />
        </section>
      ))}
    </section>
  );
};

export default CheckoutItemList;
