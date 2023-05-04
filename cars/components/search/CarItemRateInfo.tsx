import { useTranslation } from 'react-i18next';
import PriceDisplay from 'cars/components/PriceDisplay/PriceDisplay';
import CarCancellable from './CarCancellable';
import { Car } from 'cars/types/response/CarSearchResponse';

interface CarItemRateInfoProps {
  item: Car;
}

const CarItemRateInfo = ({ item }: CarItemRateInfoProps) => {
  const [t, i18next] = useTranslation('global');
  const fromLabel = t('from', 'From');

  return (
    <section className="flex justify-between items-center border-t border-dark-300 py-2 px-4">
      <CarCancellable item={item} />
      <PriceDisplay item={item} totalLabel={fromLabel} isSearch={true} />
    </section>
  );
};

export default CarItemRateInfo;
