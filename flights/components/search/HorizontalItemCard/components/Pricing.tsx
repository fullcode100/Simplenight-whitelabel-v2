import { Button, Paragraph } from '@simplenight/ui';
import { Flight } from 'flights/types/response/SearchResponse';
import { useTranslation } from 'react-i18next';

interface Props {
  item: Flight;
  onClick: (flight: Flight) => void;
}
const Pricing = ({ item, onClick }: Props) => {
  const [t] = useTranslation('flights');
  const selectLabel = t('select', 'Select');

  return (
    <section className="lg:border-l px-4 py-3 flex items-center gap-4 lg:w-1/4 lg:justify-end lg:flex-wrap">
      <Paragraph size="medium" className="shrink-0" fontWeight={'semibold'}>
        US$
        {parseFloat(item.offers[0]?.totalAmound)
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, '$&,')}{' '}
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
