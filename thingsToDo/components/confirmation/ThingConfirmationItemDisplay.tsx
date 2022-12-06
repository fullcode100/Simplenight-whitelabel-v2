import CollapseBordered from 'components/global/CollapseBordered/CollapseBordered';
import { injectProps } from 'helpers/reactUtils';
import { Customer, Item } from 'types/cart/CartType';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import ThingConfirmationFooter from './ThingConfirmationFooter';

interface Props {
  Category: CategoryOption;
  item?: Item;
  customer?: Customer;
}
const ThingConfirmationItemDisplay = ({ Category, item, customer }: Props) => {
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
        <ThingConfirmationFooter
          item={item}
          /*  reload={reload}
          setReload={setReload} */
        />
      }
    />
  );
};

export default ThingConfirmationItemDisplay;
