import { useTranslation } from 'react-i18next';

import AmountDetailItem from './components/AmountDetailItem';
import ExtraDetailItem from './components/ExtraDataItem';
import AdultChildrenAmount from '../AdultChildrenAmount/AdultChildrenAmount';

interface RoomPriceBreakdownProps {
  total?: string;
  taxesAndFees?: string;
  resortFees?: string;
  cancellationPolicy?: string;
  amenities?: string;
  adultsCount?: number;
  childrenCount?: number;
  infantsCount?: number;
}

const RoomPriceBreakdown = ({
  total,
  taxesAndFees,
  resortFees,
  cancellationPolicy,
  amenities,
  adultsCount = 2,
  childrenCount = 0,
  infantsCount = 0,
}: RoomPriceBreakdownProps) => {
  const [t, i18next] = useTranslation('flights');
  const resortFeeLabel = t('resortFee', 'Resort Fee');
  const taxesAndFeesLabel = t('taxesAndFees', 'Taxes And Fees');
  const totalLabel = t('total', 'Total');
  const priceIncludesLabel = t('priceIncludes', 'Price Includes');
  const cancellationPolicyLabel = t(
    'cancellationPolicy',
    'Cancellation Policy',
  );

  return (
    <>
      <AdultChildrenAmount adults={adultsCount} child={childrenCount} infant={infantsCount} />

      <AmountDetailItem amount={resortFees} label={resortFeeLabel} />
      <AmountDetailItem amount={taxesAndFees} label={taxesAndFeesLabel} />

      <div className="border-t border-dark-200"></div>

      <section className="flex justify-between">
        <p className="font-semibold text-xs lg:text-sm leading-lg lg:leading-[22px] text-dark-1000">
          {totalLabel}
        </p>
        <p className="font-bold text-[18px] leading-[24px] text-dark-1000">
          {total}
        </p>
      </section>

      <ExtraDetailItem detail={amenities} label={priceIncludesLabel} />
      <ExtraDetailItem
        detail={cancellationPolicy}
        label={cancellationPolicyLabel}
      />
    </>
  );
};

export default RoomPriceBreakdown;
