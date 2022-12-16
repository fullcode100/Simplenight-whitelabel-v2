import CollapseBordered from 'components/global/CollapseBordered/CollapseBordered';
import { injectProps } from 'helpers/reactUtils';
import { useCategorySlug } from 'hooks/category/useCategory';
import { useCategory } from 'hooks/categoryInjection/useCategory';
import BreakdownSummary from '../PriceBreakdownModal/components/BreakdownSummary';

const FlightCheckoutItemDisplay = ({ item }: any) => {
  const FlighttItemHeader = () => {
    const itemCategory = useCategorySlug(item.category?.toLowerCase() || '');
    const sector = useCategory('flights');
    return injectProps(sector?.checkoutDisplay, {
      item: item,
    });
  };

  const FlighttItemBreakdown = () => {
    const category = useCategory(item.category.toLowerCase());
    return injectProps(category?.breakdownDisplay, {
      item: item,
      showCollapse: false,
    });
  };

  const FlighttItemBody = () => {
    return (
      <section className="mb-6 px-4">
        <FlighttItemBreakdown />
      </section>
    );
  };

  return (
    <CollapseBordered
      title={<FlighttItemHeader />}
      body={<FlighttItemBody />}
      footer={<BreakdownSummary rate={item.booking_data.rate} />}
    />
  );
};

export default FlightCheckoutItemDisplay;
