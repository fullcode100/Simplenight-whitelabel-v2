import React from 'react';
import FullScreenModal from 'components/global/NewModal/FullScreenModal';
import ModalHeader from 'components/global/NewModal/components/ModalHeader';
import BreakdownSubtitle from './components/BreakdownSubtitle';
import { Rates } from '../../types/response/SearchResponse';
import { useTranslation } from 'react-i18next';
import FreeCancellationExtended from 'components/global/FreeCancellation/FreeCancellationExtended';
import NonRefundable from 'components/global/NonRefundable/NonRefundable';

interface Props {
  onClose: () => void;
  isOpen: boolean;
  rate?: Rates;
}

const RoomPriceBreakdownModal = ({ isOpen, onClose, rate }: Props) => {
  const cancellable =
    rate?.min_rate.cancellation_policy?.cancellation_type ===
    'FREE_CANCELLATION';
  const nonRefundable =
    rate?.min_rate.cancellation_policy?.cancellation_type === 'NON_REFUNDABLE';
  const [t] = useTranslation('hotels');
  const priceBreakdownLabel = t('priceBreakdown', 'Price Breakdown');
  const roomLabel = t('room', 'Room');
  const resortFeeLabel = t('resortFee', 'Resort Fee');
  const taxesLabel = t('taxes', 'Taxes');
  const totalLabel = t('payNow', 'Pay now');
  const additionalFeesLabel = t('additionalFees', 'Additional Fees');
  const payAtPropertyLabel = t('payAtProperty', 'Pay at property');
  const basePriceLabel = t('basePrice', 'Base Price');

  return (
    <FullScreenModal
      open={isOpen}
      closeModal={onClose}
      noFooter={true}
      noHeader={true}
      title={priceBreakdownLabel}
    >
      <ModalHeader
        title={priceBreakdownLabel}
        onCloseModal={onClose}
        headerClassName="bg-white"
        titleClassName="font-normal"
      />
      <section className="flex flex-col h-full px-5 py-6 overflow-y-scroll text-start gap-6">
        <section className="space-y-4">
          <BreakdownSubtitle
            className="mt-6 text-base font-semibold text-dark-800"
            value={roomLabel}
          />
          <section className="space-y-2">
            <section className="flex justify-between items-center">
              <p className="font-semibold text-sm leading-[22px] text-dark-800">
                {basePriceLabel}
              </p>

              <section className="text-right">
                <p className="font-semibold text-xs leading-5 text-green-1000">
                  <span className="line-through text-dark-800 mr-1">
                    {
                      rate?.min_rate.rate?.rate_breakdown.discounts
                        .total_amount_before_apply.formatted
                    }
                  </span>
                  {
                    rate?.min_rate.rate?.rate_breakdown.discounts
                      .percentage_to_apply
                  }
                </p>
                <p className="font-semibold text-sm leading-[22px] text-dark-800">
                  {
                    rate?.min_rate.rate?.rate_breakdown.total_base_amount
                      .formatted
                  }
                </p>
              </section>
            </section>
            <section className="flex justify-between items-center">
              <p className="font-semibold text-sm leading-[22px] text-dark-800">
                {taxesLabel}
              </p>
              <p className="font-semibold text-sm leading-[22px] text-dark-800">
                {rate?.min_rate.rate?.rate_breakdown.total_taxes.formatted}
              </p>
            </section>
            <div className="h-px bg-dark-300 w-full"></div>
            <section className="flex justify-between">
              <p className="font-semibold text-sm leading-[22px] text-dark-1000">
                {totalLabel}
              </p>
              <p className="font-bold text-[18px] leading-[24px] text-dark-1000">
                {rate?.min_rate.rate?.total_amount.formatted}
              </p>
            </section>
          </section>
        </section>
        <section className="space-y-4">
          <BreakdownSubtitle
            className="text-base font-semibold text-dark-800"
            value={additionalFeesLabel}
          />
          <section className="space-y-2">
            <section className="flex justify-between items-center">
              <p className="font-semibold text-sm leading-[22px] text-dark-800">
                {resortFeeLabel}
              </p>
              <p className="font-semibold text-sm leading-[22px] text-dark-800">
                {
                  rate?.min_rate.rate?.rate_breakdown.post_paid_rate
                    ?.total_taxes.formatted
                }
              </p>
            </section>
            <div className="h-px bg-dark-300 w-full"></div>
            <section className="flex justify-between">
              <p className="font-semibold text-sm leading-[22px] text-dark-1000">
                {payAtPropertyLabel}
              </p>
              <p className="font-bold text-[18px] leading-[24px] text-dark-1000">
                {
                  rate?.min_rate.rate?.rate_breakdown.post_paid_rate
                    ?.total_taxes.formatted
                }
              </p>
            </section>
          </section>
        </section>
        <section>
          {cancellable && (
            <FreeCancellationExtended
              policy={rate?.min_rate.cancellation_policy?.description}
            />
          )}
          <NonRefundable nonCancellable={nonRefundable} />
        </section>
      </section>
    </FullScreenModal>
  );
};

export default RoomPriceBreakdownModal;
