import React, { useEffect, useState } from 'react';
import FullScreenModal from 'components/global/NewModal/FullScreenModal';
import ModalHeader from 'components/global/NewModal/components/ModalHeader';
import BreakdownSubtitle from './components/BreakdownSubtitle';
import { Rates } from '../../types/response/SearchResponse';
import { useTranslation } from 'react-i18next';
import FreeCancellationExtended from 'components/global/FreeCancellation/FreeCancellationExtended';
import NonRefundable from 'components/global/NonRefundable/NonRefundable';
import PartialRefund from 'components/global/PartialRefund/PartialRefund';
import Paragraph from 'components/global/Typography/Paragraph';
import { usePlural } from 'hooks/stringBehavior/usePlural';

interface Props {
  onClose: () => void;
  isOpen: boolean;
  rate?: Rates;
  nights?: number;
  roomsQty?: number;
}

const RoomPriceBreakdownModal = ({
  isOpen,
  onClose,
  rate,
  nights = 0,
  roomsQty = 0,
}: Props) => {
  const cancellable =
    rate?.min_rate.cancellation_policy?.cancellation_type ===
    'FREE_CANCELLATION';
  const nonRefundable =
    rate?.min_rate.cancellation_policy?.cancellation_type === 'NON_REFUNDABLE';
  const partialRefundable =
    rate?.min_rate.cancellation_policy?.cancellation_type === 'PARTIAL_REFUND';
  const totalPrice = rate?.min_rate?.rate.starting_room_total;
  const [t] = useTranslation('hotels');
  const [tg] = useTranslation('global');
  const totalLabel = t('total', 'Total');
  const priceBreakdownLabel = t('priceBreakdown', 'Price Breakdown');
  const roomLabel = t('room', 'Room');
  const payNowLabel = t('payNow', 'Pay now');
  const additionalFeesLabel = t('additionalFees', 'Additional Fees');
  const payAtPropertyLabel = t('payAtProperty', 'Pay at property');
  const basePriceLabel = t('basePrice', 'Base Price');
  const tRoom = tg('room', 'Room');
  const tRooms = tg('rooms', 'Rooms');
  const ROOM_TEXT = usePlural(roomsQty, tRoom, tRooms);
  const tNight = tg('night', 'Night');
  const tNights = tg('nights', 'Nights');
  const NIGHT_TEXT = usePlural(nights, tNight, tNights);
  const estimationLabel = t(
    'estimationTax',
    'Estimation based on the current exchange rate, may change before your stay',
  );
  const approxLabel = t('approx', 'Approx');

  const [showLocalCurrency, setShowLocalCurrency] = useState(false);
  useEffect(() => {
    setShowLocalCurrency(
      rate?.min_rate.rate.rate_breakdown.post_paid_rate?.taxes[0]?.tax_amount
        .currency !=
        rate?.min_rate.rate.rate_breakdown.post_paid_rate?.taxes[0]
          ?.tax_original_amount?.currency,
    );
  }, [rate?.min_rate.rate]);

  const rateBreakdownDiscounts = rate?.min_rate.rate.rate_breakdown.discounts;
  const baseAmountBeforeApply =
    rateBreakdownDiscounts?.base_amount_before_apply;
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
                <Paragraph size="small" fontWeight="normal">
                  {`${roomsQty} ${ROOM_TEXT}, ${nights} ${NIGHT_TEXT}`}
                </Paragraph>
              </p>

              <section className="text-right">
                {rate?.min_rate.rate?.rate_breakdown.discounts && (
                  <p className="font-semibold text-xs leading-5 text-green-1000">
                    <span className="line-through text-dark-800 mr-1">
                      {baseAmountBeforeApply?.formatted}
                    </span>
                    {rateBreakdownDiscounts?.percentage_to_apply}
                  </p>
                )}
                <p className="font-semibold text-sm leading-[22px] text-dark-800">
                  {
                    rate?.min_rate.rate?.rate_breakdown.total_base_amount
                      .formatted
                  }
                </p>
              </section>
            </section>
            {rate?.min_rate.rate.rate_breakdown.taxes.map((tax, index) => {
              const taxLabel = t(tax.type, tax.description);

              return (
                <section
                  className="flex justify-between items-center"
                  key={tax.type + index}
                >
                  <p className="font-semibold text-sm leading-[22px] text-dark-800">
                    {taxLabel}
                  </p>
                  <p className="font-semibold text-sm leading-[22px] text-dark-800">
                    {tax.tax_amount.formatted}
                  </p>
                </section>
              );
            })}
            <div className="h-px bg-dark-300 w-full"></div>
            <section className="flex justify-between">
              <p className="font-semibold text-sm leading-[22px] text-dark-1000">
                {payNowLabel}
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
            {rate?.min_rate.rate.rate_breakdown.post_paid_rate?.taxes.map(
              (tax, index) => {
                const taxLabel = t(tax.type, tax.description);

                return (
                  <section
                    className="flex justify-between"
                    key={tax.type + index}
                  >
                    <section className="flex flex-row gap-1">
                      <section className="flex flex-row gap-1 lg:gap-3">
                        <p className="font-semibold text-xs lg:text-sm leading-lg lg:leading-[22px] text-dark-1000">
                          {taxLabel}
                        </p>
                      </section>
                    </section>

                    <section className="text-right">
                      <section className="flex items-center text-dark-1000">
                        {showLocalCurrency && (
                          <p className="text-[12px] leading-[15px] pr-1">
                            {approxLabel}
                          </p>
                        )}
                        <p className="font-semibold text-xs lg:text-sm leading-lg lg:leading-[22px]">
                          {`${tax.tax_amount?.formatted}${
                            showLocalCurrency ? '*' : ''
                          }`}
                        </p>
                      </section>
                      {showLocalCurrency && (
                        <p className="text-[12px] leading-[15px]">
                          {tax.tax_original_amount?.formatted}
                        </p>
                      )}
                    </section>
                  </section>
                );
              },
            )}
            {showLocalCurrency && (
              <p className="text-[12px] leading-[15px] font-semibold text-dark-700">
                {`* ${estimationLabel}`}
              </p>
            )}
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
        <section className="space-y-4">
          <section className="space-y-2">
            <section className="flex justify-between">
              <p className="font-semibold text-sm leading-[22px] text-dark-1000">
                {totalLabel}
              </p>
              <p className="font-bold text-[18px] leading-[24px] text-dark-1000">
                {totalPrice?.formatted}
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
          <NonRefundable
            nonCancellable={nonRefundable}
            description={rate?.min_rate.cancellation_policy?.description}
          />
          <PartialRefund
            nonCancellable={partialRefundable}
            description={rate?.min_rate.cancellation_policy?.description}
          />
        </section>
      </section>
    </FullScreenModal>
  );
};

export default RoomPriceBreakdownModal;
