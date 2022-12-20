import CollapseBordered from 'components/global/CollapseBordered/CollapseBordered';
import { injectProps } from 'helpers/reactUtils';
import { Dispatch, SetStateAction } from 'react';
import { Payment, Item } from 'types/booking/bookingType';
import { Customer } from 'types/cart/CartType';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import ThingConfirmationFooter from './ThingConfirmationFooter';

interface Props {
  Category: CategoryOption;
  item?: Item;
  customer?: Customer;
  payment?: Payment;
  reload?: boolean;
  setReload?: Dispatch<SetStateAction<boolean>>;
}
const ThingConfirmationItemDisplay = ({
  Category,
  item,
  customer,
  payment,
  reload,
  setReload,
}: Props) => {
  const CartItemHeader = () => {
    return injectProps(Category.checkoutDisplay, {
      item: item,
    });
  };

  const CartItemBreakdown = () => {
    return injectProps(Category.confirmationBreakdownDisplay, {
      item: item,
      showCollapse: false,
      customer: customer,
    });
  };

  const CartItemBody = () => {
    return (
      <section className="px-4 mb-6">
        <CartItemBreakdown />
      </section>
    );
  };

  return (
    <CollapseBordered
      title={<CartItemHeader />}
      body={<CartItemBody />}
      footer={
        item && (
          <ThingConfirmationFooter
            item={item}
            reload={reload}
            setReload={setReload}
            Category={Category}
            customer={customer}
            payment={payment}
          />
        )
      }
    />
  );
};

export default ThingConfirmationItemDisplay;
