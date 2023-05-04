import { Button, Paragraph } from '@simplenight/ui';
import { FlightItem } from 'flights/types/response/FlightSearchResponseMS';
import { useTranslation } from 'react-i18next';

interface Props {
  item: FlightItem;
  onClick: (flight: FlightItem) => void;
}
const Pricing = ({ item, onClick }: Props) => {
  const [t] = useTranslation('flights');
  const selectLabel = t('select', 'Select');
  const price = item?.offers?.[0].totalAmount || 0;

  return (
    <section className="flex items-center gap-4 px-4 py-3 lg:border-l lg:w-1/5 lg:justify-end lg:flex-wrap">
      <Paragraph size="medium" className="shrink-0" fontWeight={'semibold'}>
        {`US$${price}`}
      </Paragraph>

      <div className="hidden lg:block">
        <Button size="small" onClick={() => onClick(item)}>
          {selectLabel}
        </Button>
      </div>
    </section>
  );
};

export default Pricing;
