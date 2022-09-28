import Divider from 'components/global/Divider/Divider';
import { Item } from 'types/cart/CartType';
import BlockDivider from 'components/global/Divider/BlockDivider';
import PaymentCartItem from './PaymentCartItem';

interface ClientCartProps {
  items?: Item[];
}

const PaymentCart = ({ items }: ClientCartProps) => {
  return (
    <>
      {items && <BlockDivider className="mt-6" />}
      {items?.map?.((item: Item, index: number) => {
        const showDivider = index !== items.length - 1;
        return (
          <section key={index}>
            <PaymentCartItem item={item} />
            {showDivider && <Divider />}
          </section>
        );
      })}
    </>
  );
};

export default PaymentCart;
