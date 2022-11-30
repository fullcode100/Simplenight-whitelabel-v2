import CollapseBordered from 'components/global/CollapseBordered/CollapseBordered';
import { injectProps } from 'helpers/reactUtils';
import { useCategorySlug } from 'hooks/category/useCategory';
import { useCategory } from 'hooks/categoryInjection/useCategory';
import BreakdownSummary from '../PriceBreakdownModal/components/BreakdownSummary';

const HotelCheckoutItemDisplay = ({ item }: any) => {
  const CartItemHeader = () => {
    const itemCategory = useCategorySlug(item.category?.toLowerCase() || '');
    const sector = useCategory(itemCategory?.type || '');
    return injectProps(sector?.checkoutDisplay, {
      item: item,
    });
  };

  const CartItemBreakdown = () => {
    const category = useCategory(item.category.toLowerCase());
    return injectProps(category?.breakdownDisplay, {
      item: item,
      showCollapse: false,
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
      footer={<BreakdownSummary rate={item.rate} showTotal={true} />}
    />
  );
};

export default HotelCheckoutItemDisplay;
