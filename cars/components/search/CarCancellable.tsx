import FreeCancellation from 'components/global/FreeCancellation/FreeCancellation';
import NonRefundable from 'components/global/NonRefundable/NonRefundable';
import { Car } from 'cars/types/response/SearchResponse';
import { useTranslation } from 'react-i18next';

interface CarCancellableProps {
  item: Car;
}

const CarCancellable = ({ item }: CarCancellableProps) => {
  const [t, i18next] = useTranslation('global');
  const cancellable = false;
  const notCancellableLabel = t('ourDealForYou', 'Our Deal For You');
  return (
    <section className="flex justify-end items-end flex-col">
      {cancellable && <FreeCancellation cancellable={true} />}
      {!cancellable && <NonRefundable nonCancellable={true} />}
      {!cancellable && (
        <span className="text-sm text-dark-800">{notCancellableLabel}</span>
      )}
    </section>
  );
};
export default CarCancellable;
