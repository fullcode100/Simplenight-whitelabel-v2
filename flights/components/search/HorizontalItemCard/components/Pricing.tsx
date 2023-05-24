import { Button, Paragraph } from '@simplenight/ui';
import { FlightItem } from 'flights/types/response/FlightSearchResponseMS';
import { useTranslation } from 'react-i18next';

interface Props {
  price?: string;
  onClick: () => void;
}
const Pricing = ({ price, onClick }: Props) => {
  const [t] = useTranslation('flights');
  const selectLabel = t('select', 'Select');

  return (
    <section className="flex items-center gap-4 px-4 py-3 lg:border-l lg:w-1/5 lg:justify-end lg:flex-wrap">
      <Paragraph size="medium" className="shrink-0" fontWeight={'semibold'}>
        {price}
      </Paragraph>

      <div
        className="hidden lg:block"
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        <Button size="small">{selectLabel}</Button>
      </div>
    </section>
  );
};

export default Pricing;
