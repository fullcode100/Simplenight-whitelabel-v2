import { useTranslation } from 'react-i18next';

import AmountDetailItem from './components/AmountDetailItem';
import ExtraDetailItem from './components/ExtraDataItem';
import AdultChildrenAmount from '../AdultChildrenAmount/AdultChildrenAmount';
import ExternalLink from 'components/global/ExternalLink/ExternalLink';
import { Rate } from '../../../types/booking/bookingType';
import PlusIcon from 'public/icons/assets/Plus.svg';

interface RoomPriceBreakdownProps {
  total?: string;
  taxesAndFees?: string;
  resortFees?: string;
  cancellationPolicy?: string;
  amenities?: string;
  adultsCount?: number;
  childrenCount?: number;
  childrenAges?: string[];
  instructions?: React.ReactNode;
  termsOfService?: string | null;
  rate?: Rate;
  startingRoomTotal?: string;
}

const RoomPriceBreakdown = ({
  total,
  taxesAndFees,
  resortFees,
  cancellationPolicy,
  amenities,
  adultsCount = 2,
  childrenCount = 0,
  childrenAges = [],
  instructions,
  termsOfService,
  rate,
  startingRoomTotal,
}: RoomPriceBreakdownProps) => {
  const [t, i18next] = useTranslation('hotels');
  const resortFeeLabel = t('resortFee', 'Resort Fee');
  const taxesLabel = t('taxes', 'Taxes');
  const payNowLabel = t('payNow', 'Pay now');
  const priceIncludesLabel = t('priceIncludes', 'Price Includes');
  const otherFeesLabel = t('otherFees', 'Other Fees');
  const payAtPropertyLabel = t('payAtProperty', 'Pay at property');
  const basePriceLabel = t('basePrice', 'Base Price');
  const cancellationPolicyLabel = t(
    'cancellationPolicy',
    'Cancellation Policy',
  );
  const totalLabel = t('total', 'Total');

  const BasePrice = () => (
    <section className="flex justify-between">
      <section className="flex flex-row gap-1">
        <section className="flex flex-row gap-1 lg:gap-3">
          <PlusIcon className="h-3.5 lg:h-4 lg:w-4 ml-0.5 mr-1 mt-1 text-primary-1000" />
          <p className="font-semibold text-xs lg:text-sm leading-lg lg:leading-[22px] text-dark-1000">
            {basePriceLabel}
          </p>
        </section>
      </section>

      <section className="text-right">
        <p className="font-semibold text-xs lg:text-sm leading-lg lg:leading-[22px] text-green-1000">
          <span className="line-through text-dark-800 mr-1">
            {rate?.rate_breakdown.discounts.total_amount_before_apply.formatted}
          </span>
          {rate?.rate_breakdown.discounts.percentage_to_apply}
        </p>
        <p className="font-semibold text-xs lg:text-sm leading-lg lg:leading-[22px] text-dark-1000">
          {rate?.rate_breakdown.total_base_amount.formatted}
        </p>
      </section>
    </section>
  );

  return (
    <>
      <AdultChildrenAmount
        adults={adultsCount}
        child={childrenCount}
        childrenAges={childrenAges}
      />

      <BasePrice />
      <AmountDetailItem amount={taxesAndFees} label={taxesLabel} />
      <AmountDetailItem amount={taxesAndFees} label={otherFeesLabel} />
      <div className="border-t border-dark-200"></div>
      <section className="flex justify-between mb-5">
        <p className="font-semibold text-xs lg:text-sm leading-lg lg:leading-[22px] text-dark-1000">
          {payNowLabel}
        </p>
        <p className="font-semibold text-[18px] leading-[24px] text-dark-1000">
          {total}
        </p>
      </section>

      <AmountDetailItem amount={resortFees} label={resortFeeLabel} />
      <div className="border-t border-dark-200"></div>
      <section className="flex justify-between mb-5">
        <p className="font-semibold text-xs lg:text-sm leading-lg lg:leading-[22px] text-dark-1000">
          {payAtPropertyLabel}
        </p>
        <p className="font-semibold text-[18px] leading-[24px] text-dark-1000">
          {resortFees}
        </p>
      </section>

      {startingRoomTotal && (
        <section className="flex justify-between mb-2">
          <p className="font-semibold text-xs lg:text-sm leading-lg lg:leading-[22px] text-dark-1000">
            {totalLabel}
          </p>
          <p className="font-semibold text-[18px] leading-[24px] text-dark-1000">
            {startingRoomTotal}
          </p>
        </section>
      )}

      <ExtraDetailItem detail={amenities} label={priceIncludesLabel} />
      {instructions && instructions}
      <ExtraDetailItem
        detail={cancellationPolicy}
        label={cancellationPolicyLabel}
      />
      {termsOfService && (
        <ExternalLink
          className="text-primary-1000 hover:text-primary-1000 font-semibold text-[14px] leading-tight"
          href={termsOfService}
        >
          Supplier Terms and Conditions
        </ExternalLink>
      )}
    </>
  );
};

export default RoomPriceBreakdown;
