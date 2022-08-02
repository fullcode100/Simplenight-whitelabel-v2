import { useTranslation } from 'react-i18next';
import PriceDisplay from 'hotels/components/PriceDisplay/PriceDisplay';
import HotelCancellable from './HotelCancellable';
import { MinRate } from 'hotels/types/response/SearchResponse';

interface HotelItemRateInfoProps {
  minRate: MinRate;
}

const HotelItemRateInfo = ({ minRate }: HotelItemRateInfoProps) => {
  const [t, i18next] = useTranslation('global');
  const fromLabel = t('from', 'From');

  const { rate } = minRate;

  return (
    <section className="flex justify-between items-center border-t border-dark-300 py-2 px-4">
      <HotelCancellable minRate={minRate} />
      <PriceDisplay rate={rate} totalLabel={fromLabel} />
    </section>
  );
};

export default HotelItemRateInfo;
