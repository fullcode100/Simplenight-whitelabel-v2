import { useTranslation } from 'react-i18next';

import PageTitle from 'components/global/PageTitle/PageTitle';
import ShoppingCart from 'public/icons/assets/shopping-cart.svg';

interface ItineraryHeaderProps {
  productsAmount: number | undefined;
}

const ItineraryHeader = ({ productsAmount }: ItineraryHeaderProps) => {
  const [t, i18next] = useTranslation('global');
  const myItinerary = t('myItinerary', 'My Itinerary');

  return (
    <section className="flex flex-col gap-4 p-5 lg:py-6 lg:px-20 bg-dark-100 border-b-[1px] border-dark-300">
      <PageTitle
        title={myItinerary}
        icon={<ShoppingCart />}
        productsAmount={productsAmount}
      />
    </section>
  );
};

export default ItineraryHeader;
