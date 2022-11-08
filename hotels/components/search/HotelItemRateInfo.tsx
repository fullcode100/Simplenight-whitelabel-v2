import { useTranslation } from 'react-i18next';
import PriceDisplay from 'hotels/components/PriceDisplay/PriceDisplay';
import HotelCancellable from './HotelCancellable';
import { Rates } from 'hotels/types/response/SearchResponse';

interface HotelItemRateInfoProps {
  minRate: Rates;
}

const HotelItemRateInfo = ({ minRate }: HotelItemRateInfoProps) => {
  const [t, i18next] = useTranslation('global');
  const fromLabel = t('from', 'From');

  return (
    <section className="flex justify-between items-center border-t border-dark-300 py-2 px-4">
      <HotelCancellable minRate={minRate.min_rate} />
      <PriceDisplay
        rate={minRate}
        totalLabel={fromLabel}
        isStartingTotal={true}
        isPriceBase
        isAvgAmount
      />
    </section>
  );
};

export default HotelItemRateInfo;
