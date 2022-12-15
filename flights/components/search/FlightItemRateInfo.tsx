import { useTranslation } from 'react-i18next';
import PriceDisplay from 'flights/components/PriceDisplay/PriceDisplay';
import FlightCancellable from './FlightCancellable';
import { MinRate } from 'flights/types/response/SearchResponse';

interface FlightItemRateInfoProps {
  minRate: MinRate;
}

const FlightItemRateInfo = ({ minRate }: FlightItemRateInfoProps) => {
  const [t, i18next] = useTranslation('global');
  const fromLabel = t('from', 'From');

  const { rate } = minRate;

  return (
    <section className="flex justify-between items-center border-t border-dark-300 py-2 px-4">
      <FlightCancellable minRate={minRate} />
      <PriceDisplay rate={rate} totalLabel={fromLabel} />
    </section>
  );
};

export default FlightItemRateInfo;
