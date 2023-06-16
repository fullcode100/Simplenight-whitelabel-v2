import CollapseBordered from 'components/global/CollapseBordered/CollapseBordered';
import { injectProps } from 'helpers/reactUtils';
import { useCategorySlug } from 'hooks/category/useCategory';
import { useCategory } from 'hooks/categoryInjection/useCategory';
import BreakdownSummary from '../PriceBreakdownModal/components/BreakdownSummary';
import { Rates } from '../../types/response/SearchResponse';
import HotelGeneralInfo from './HotelGeneralInfo';

const HotelCheckoutItemDisplay = (item: any) => {
  const selectedRoom = item.item?.item_data?.room;
  const breakDownInfo: Rates = selectedRoom.rates;
  const CartItemHeader = () => {
    const itemCategory = useCategorySlug(
      item.item.category?.toLowerCase() || '',
    );
    const sector = useCategory(itemCategory?.type || '');
    return injectProps(sector?.checkoutDisplay, {
      item: item.item,
    });
  };

  const CartItemBreakdown = () => {
    const category = useCategory(item.item.category.toLowerCase());
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

  return (
    <>
      <section className="overflow-hidden border rounded-t-lg border-dark-300">
        <section className="border-b border-dark-300 flex justify-between py-4 px-5border-b border-dark-300 flex justify-between py-4 px-5">
          <CartItemHeader />
        </section>
        <HotelGeneralInfo item={item.item?.item_data} />
      </section>
      <CollapseBordered
        title={<h4>Price Breakdown</h4>}
        body={<CartItemBody />}
        footer={<BreakdownSummary rate={breakDownInfo} showTotal={true} />}
      />
    </>
  );
};

export default HotelCheckoutItemDisplay;
