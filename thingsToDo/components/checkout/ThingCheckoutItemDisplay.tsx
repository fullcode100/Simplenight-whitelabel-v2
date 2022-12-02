import CollapseBordered from 'components/global/CollapseBordered/CollapseBordered';
import { injectProps } from 'helpers/reactUtils';
import { useCategorySlug } from 'hooks/category/useCategory';
import { useCategory } from 'hooks/categoryInjection/useCategory';
import { Customer, Item } from 'types/cart/CartType';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import ThingItineraryFooter from '../itinerary/ThingItineraryFooter';

interface Props {
  Category: CategoryOption;
  item?: Item;
  customer?: Customer;
}
const ThingCheckoutItemDisplay = ({ Category, item, customer }: Props) => {
  const CartItemHeader = () => {
    return injectProps(Category.checkoutDisplay, {
      item: item,
    });
  };

  const CartItemBreakdown = () => {
    return injectProps(Category.breakdownDisplay, {
      item: item,
      showCollapse: false,
      customer: customer,
    });
  };

  const CartItemBody = () => {
    return (
      <section className="mb-6 px-4">
        <CartItemBreakdown />
      </section>
    );
  };

  return (
    <CollapseBordered
      title={<CartItemHeader />}
      body={<CartItemBody />}
      footer={
        <ThingItineraryFooter
          item={item}
          /*  reload={reload}
          setReload={setReload} */
        />
      }
    />
  );
};

export default ThingCheckoutItemDisplay;
