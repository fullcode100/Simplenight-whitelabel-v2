import { useTranslation } from 'react-i18next';

import PageTitle from 'components/global/PageTitle/PageTitle';
import ContinueCheckoutButtons from '../ContinueCheckoutButtons/ContinueCheckoutButtons';
import ShoppingCart from 'public/icons/assets/shopping-cart.svg';

const PRODUCTS = 2;

const ItineraryHeader = () => {
  const [t, i18next] = useTranslation('global');
  const myItinerary = t('myItinerary', 'My Itinerary');

  return (
    <section className="flex flex-col gap-4 p-5 bg-dark-100 border-b-[1px] border-dark-300">
      <PageTitle
        title={myItinerary}
        icon={<ShoppingCart />}
        productsAmount={PRODUCTS}
      />
      <ContinueCheckoutButtons productsAmount={PRODUCTS} />
    </section>
  );
};

export default ItineraryHeader;
