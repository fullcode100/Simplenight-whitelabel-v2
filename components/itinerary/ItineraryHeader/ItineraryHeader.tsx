import { useTranslation } from 'react-i18next';

import PageTitle from 'components/global/PageTitle/PageTitle';
import ContinueCheckoutButtons from '../ContinueCheckoutButtons/ContinueCheckoutButtons';
import ShoppingCart from 'public/icons/assets/shopping-cart.svg';

const PRODUCTS = 2;

interface ItineraryHeaderProps {
  productsAmount: number | undefined;
}

const ItineraryHeader = ({ productsAmount }: ItineraryHeaderProps) => {
  const [t, i18next] = useTranslation('global');
  const myItinerary = t('myItinerary', 'My Itinerary');

  return (
    <section className="flex flex-col gap-4 p-5 bg-dark-100 border-b-[1px] border-dark-300">
      <PageTitle
        title={myItinerary}
        icon={<ShoppingCart />}
        productsAmount={productsAmount}
      />
      <ContinueCheckoutButtons productsAmount={productsAmount} />
    </section>
  );
};

export default ItineraryHeader;
