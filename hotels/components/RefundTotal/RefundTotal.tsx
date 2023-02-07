import { useTranslation } from 'react-i18next';
import { Refund } from 'types/booking/bookingType';

interface RefundTotalProps {
  refund?: Refund;
}

const RefundTotal = ({ refund }: RefundTotalProps) => {
  const [t, i18next] = useTranslation('global');
  const totalRefundLabel = t('totalRefund', 'Total Refund');

  return (
    <section className="flex justify-between">
      <p className="font-semibold text-xs leading-lg text-dark-1000 lg:text-sm lg:leading-[22px]">
        {totalRefundLabel}
      </p>
      <p className="font-semibold text-[18px] leading-[24px] text-dark-1000">
        {refund?.formatted}
      </p>
    </section>
  );
};

export default RefundTotal;
