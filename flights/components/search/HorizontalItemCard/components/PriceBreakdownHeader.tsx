import { useTranslation } from 'react-i18next';
import { FlightOffer } from 'flights/types/response/SearchResponse';

interface PriceBreakdownHeaderProps {
  offer: FlightOffer;
  currency: string;
}

const PriceBreakdownHeader = ({
  offer,
  currency,
}: PriceBreakdownHeaderProps) => {
  const [t, i18next] = useTranslation('flights');
  const fromLabel = t('from', 'From');

  const amount = parseFloat(offer?.totalAmound);

  return (
    <section className="flex justify-between items-center">
      <p className="text-sm leading-[22px] text-dark-1000 font-normal font-lato m-0">
        <span className="text-dark-800">{fromLabel} </span>
        <span className="text-base text-dark-1000 font-bold">
          {amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} {currency}
        </span>
      </p>
    </section>
  );
};

export default PriceBreakdownHeader;
