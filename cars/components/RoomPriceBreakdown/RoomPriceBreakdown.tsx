import { useTranslation } from 'react-i18next';

import AmountDetailItem from './components/AmountDetailItem';
import ExtraDetailItem from './components/ExtraDataItem';
import { Paragraph, Pricing } from '@simplenight/ui';

interface RoomPriceBreakdownProps {
  total?: string;
}

const RoomPriceBreakdown = ({ total }: RoomPriceBreakdownProps) => {
  const [t, i18next] = useTranslation('flights');
  const basePriceLabel = t('basePrice', 'Base Price');
  const taxesLabel = t('taxes', 'Taxes');
  const otherFeesLabel = t('otherFees', 'Other Fees');
  const payNowLabel = t('payNow', 'Pay now');

  return (
    <>
      <AmountDetailItem amount={total} label={basePriceLabel} />
      <AmountDetailItem amount={'$0.00'} label={taxesLabel} />
      <AmountDetailItem amount={'$0.00'} label={otherFeesLabel} />
      <div className="border-t border-dark-200"></div>
      <section className="mb-5 flex justify-between">
        <p className="font-bold text-xs lg:text-sm leading-lg lg:leading-[22px] text-dark-1000">
          {payNowLabel}
        </p>
        <Pricing>
          <Pricing.Total totalAmount={total as string} />
        </Pricing>
      </section>
    </>
  );
};

export default RoomPriceBreakdown;
