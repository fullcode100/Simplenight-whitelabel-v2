import { useTranslation } from 'react-i18next';

import AmountDetailItem from './components/AmountDetailItem';
import PersonsIcon from 'public/icons/assets/multiple-persons.svg';
import ExtraDetailItem from './components/ExtraDataItem';

interface RoomPriceBreakdownProps {
  total?: string;
  taxesAndFees?: string;
  resortFees?: string;
  cancellationPolicy?: string;
  amenities?: string;
  adultsCount?: number;
  childrenCount?: number;
}

const RoomPriceBreakdown = ({
  total,
  taxesAndFees,
  resortFees,
  cancellationPolicy,
  amenities,
  adultsCount = 2,
  childrenCount = 0,
}: RoomPriceBreakdownProps) => {
  const [t, i18next] = useTranslation('hotels');
  const adultsLabel = t('adults', 'Adults');
  const childrenLabel = t('children', 'Children');
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
      <section className="flex flex-row gap-1">
        <PersonsIcon className="h-3.5 mt-1 text-primary-1000" />
        <p className="font-semibold text-xs leading-lg text-dark-1000">
          {adultsCount} {adultsLabel}, {childrenCount} {childrenLabel}
        </p>
      </section>

      <AmountDetailItem amount={resortFees} label={resortFeeLabel} />
      <AmountDetailItem amount={taxesAndFees} label={taxesAndFeesLabel} />

      <div className="border-t border-dark-200"></div>

      <section className="flex justify-between">
        <p className="font-semibold text-xs leading-lg text-dark-1000">
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
