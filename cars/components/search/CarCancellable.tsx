import FreeCancellation from 'components/global/FreeCancellation/FreeCancellation';
import NonRefundable from 'components/global/NonRefundable/NonRefundable';
import { Car } from 'cars/types/response/CarSearchResponse';
import { useTranslation } from 'react-i18next';

interface CarCancellableProps {
  item: Car;
}

const CarCancellable = ({ item }: CarCancellableProps) => {
  const [t, i18next] = useTranslation('global');
  const cancellable = false;
  return (
    <section className="flex justify-end items-end flex-col">
      {cancellable && <FreeCancellation cancellable={true} />}
      {!cancellable && <NonRefundable nonCancellable={true} />}
    </section>
  );
};
export default CarCancellable;
