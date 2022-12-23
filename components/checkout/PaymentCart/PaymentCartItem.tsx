/* eslint-disable camelcase */
import { useCategory } from 'hooks/categoryInjection/useCategory';
import { injectProps } from 'helpers/reactUtils';
import CollapseBordered from 'components/global/CollapseBordered/CollapseBordered';
import BreakdownSummary from 'hotels/components/PriceBreakdownModal/components/BreakdownSummary';
import { Item } from 'types/cart/CartType';
import { useCategorySlug } from 'hooks/category/useCategory';

interface PaymentCartItemProps {
  item: Item;
}

const PaymentCartItem = ({ item, customer }: any) => {
  const categoryLowerCase = item.category
    ? item.category.toLowerCase()
    : 'no category';
  const CartItemHeader = () => {
    const category = useCategory(
      item.category.toLowerCase() === 'car-rental'
        ? 'cars'
        : item.category.toLowerCase(),
    );
    return injectProps(category?.checkoutDisplay, {
      item: item,
    });
  };

  const CartItemBreakdown = () => {
    const category = useCategory(
      item.category.toLowerCase() === 'car-rental'
        ? 'cars'
        : item.category.toLowerCase(),
    );
    return injectProps(category?.breakdownDisplay, {
      item: item,
      showCollapse: false,
    });
  };

  const CartItemBody = () => {
    return (
      <section className="px-4 mb-6">
        <CartItemBreakdown />
      </section>
    );
  };

  const CartItemDetail = () => {
    let sectorName = item.sector?.toLowerCase();
    const categoryName = item.category?.toLowerCase();
    if (categoryName === 'shows-events') sectorName = 'shows-events';
    if (sectorName === 'flights' || categoryName === 'flights')
      sectorName = 'flights';
    if (
      sectorName === 'cars' ||
      sectorName === 'car-rental' ||
      categoryName === 'cars' ||
      categoryName === 'car-rental'
    )
      sectorName = 'car-rental';
    if (sectorName === 'food-beverage') {
      sectorName = 'dining';
    }
    const sector = useCategory(sectorName || '');
    return injectProps(sector?.checkoutItemDisplay, {
      item: item,
      customer: customer,
    });
  };

  return (
    <section className="py-6 space-y-5">
      <CartItemDetail />
    </section>
  );
};

export default PaymentCartItem;
