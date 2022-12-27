/* eslint-disable camelcase */
import { useCategory } from 'hooks/categoryInjection/useCategory';
import { injectProps } from 'helpers/reactUtils';

const PaymentCartItem = ({ item, customer }: any) => {
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
    if (sectorName === 'accommodations') {
      sectorName = 'hotels';
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
