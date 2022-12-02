import Divider from 'components/global/Divider/Divider';
import { Customer, Item } from 'types/cart/CartType';
import BlockDivider from 'components/global/Divider/BlockDivider';
import PaymentCartItem from './PaymentCartItem';

interface ClientCartProps {
  items?: Item[];
  customer?: Customer;
}

const PaymentCart = ({ items, customer }: ClientCartProps) => {
  return (
    <>
      {items && <BlockDivider className="mt-6" />}
      {items?.map?.((item: Item, index: number) => {
        const showDivider = index !== items.length - 1;
        return (
          <section key={index}>
            <PaymentCartItem item={item} customer={customer} />
            {showDivider && <Divider />}
          </section>
        );
      })}
    </>
  );
};

export default PaymentCart;
