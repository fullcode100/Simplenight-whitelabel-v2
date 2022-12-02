/* eslint-disable camelcase */
import { useCategory } from 'hooks/categoryInjection/useCategory';
import { injectProps } from 'helpers/reactUtils';
import CollapseBordered from 'components/global/CollapseBordered/CollapseBordered';
import BreakdownSummary from 'hotels/components/PriceBreakdownModal/components/BreakdownSummary';
import { useCategorySlug } from 'hooks/category/useCategory';

const PaymentCartItem = ({ item, customer }: any) => {
  const CartItemHeader = () => {
    const sector = useCategory(item.sector.toLowerCase());
    return injectProps(sector?.checkoutDisplay, {
      item: item,
    });
  };

  const CartItemBreakdown = () => {
    const sector = useCategory(item.sector.toLowerCase());
    return injectProps(sector?.breakdownDisplay, {
      customer: customer,
      item: item,
      showCollapse: false,
    });
  };

  /* const { check_in_instructions: checkInInstructions } = item.extended_data; */

  const CartItemBody = () => {
    return (
      <section className="mb-6 px-4">
        <CartItemBreakdown />
      </section>
    );
  };

  const CartItemDetail = () => {
    const itemCategory = useCategorySlug(item.sector?.toLowerCase() || '');
    const sector = useCategory(itemCategory?.type || '');
    return injectProps(sector?.checkoutItemDisplay, {
      item: item,
      customer: customer,
    });
  };

  return (
    <section className="space-y-5 py-6">
      <CartItemDetail />
    </section>
  );
};

export default PaymentCartItem;
