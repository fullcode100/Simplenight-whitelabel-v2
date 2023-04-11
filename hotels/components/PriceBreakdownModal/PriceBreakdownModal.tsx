import { MouseEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';

import FullScreenModal from '../../../components/global/NewModal/FullScreenModal';
import Divider from '../../../components/global/Divider/Divider';
import BreakdownRoomDescription from './components/BreakdownRoomDescription';
import BreakdownSubtitle from './components/BreakdownSubtitle';
import {
  Rates,
  CancellationPolicy,
  Services,
} from '../../types/response/SearchResponse';
import BreakdownSummary from './components/BreakdownSummary';
import FreeCancellationExtended from '../../../components/global/FreeCancellation/FreeCancellationExtended';
import NonRefundable from 'components/global/NonRefundable/NonRefundable';
import AmenitiesSection from '../Amenities/AmenitiesSection';
import { addToCart } from 'core/client/services/CartClientService';
import { Item } from '../../../types/cart/CartType';
import ModalHeader from '../../../components/global/NewModal/components/ModalHeader';
import BedsAmount from '../BedsAmount/BedsAmount';
import PartialRefund from 'components/global/PartialRefund/PartialRefund';
import { hasCartMode } from 'helpers/purchaseModeUtils';

const cancellableType = 'FREE_CANCELLATION';
const nonRefundableType = 'NON_REFUNDABLE';
const partialRefund = 'PARTIAL_REFUND';

interface DatePickerProps {
  showPriceBreakdown: boolean;
  onClose: (event?: MouseEvent<HTMLElement>) => void;
  description: string;
  rates: Rates;
  cancellationPolicy?: CancellationPolicy;
  features: string[];
  itemToBook: Item;
  nights: number;
  guests: number;
  services: Services;
  rooms?: number;
}

const PriceBreakdownModal = ({
  showPriceBreakdown,
  onClose,
  description,
  rates,
  cancellationPolicy,
  features,
  itemToBook,
  nights,
  guests,
  services,
  rooms,
}: DatePickerProps) => {
  const router = useRouter();

  const [t, i18next] = useTranslation('hotels');
  const roomDetailsText = t('roomDetails', 'Room Details');
  const roomAmenitiesText = t('roomAmenities', 'Room Amenities');
  const priceBreakdownText = t('priceBreakdown', 'Price Breakdown');
  const addToItineraryText = t('addToItinerary', 'Add to Itinerary');
  const bookNowText = t('bookNow', 'Book Now');
  const totalLabel = t('total', 'Total');
  const roomLabel = t('room', 'Room');
  const payNowLabel = t('payNow', 'Pay now');
  const additionalFeesLabel = t('additionalFees', 'Additional Fees');
  const payAtPropertyLabel = t('payAtProperty', 'Pay at property');
  const basePriceLabel = t('basePrice', 'Base Price');
  const estimationLabel = t(
    'estimationTax',
    'Estimation based on the current exchange rate, may change before your stay',
  );
  const approxLabel = t('approx', 'Approx');
  const showAddToItinerary = hasCartMode();

  const { total_amount: totalAmount, rate_breakdown: rateBreakdown } =
    rates.min_rate.rate;
  const { total_base_amount: totalBaseAmount, post_paid_rate: postPaidRate } =
    rateBreakdown;

  const discounts = rateBreakdown.discounts;

  let amountToApply;
  if (discounts) {
    ({ amount_to_apply: amountToApply } = discounts);
  }

  const cancellable = cancellationPolicy?.cancellation_type === cancellableType;
  const nonRefundable =
    cancellationPolicy?.cancellation_type === nonRefundableType;
  const partialRefundable =
    cancellationPolicy?.cancellation_type === partialRefund;

  let url = '/itinerary';

  const handleAction = async () => {
    await addToCart(itemToBook, i18next);
  };

  const { mutate } = useMutation(handleAction, {
    onSuccess: () => {
      router.push(url);
    },
  });

  const doubleBeds = services?.double_beds ?? 0;
  const queenBeds = services?.queen_beds ?? 0;
  const kingBeds = services?.king_beds ?? 0;
  const otherBeds = services?.other_beds ?? 0;

  const [showLocalCurrency, setShowLocalCurrency] = useState(false);
  useEffect(() => {
    setShowLocalCurrency(
      postPaidRate?.taxes[0]?.tax_amount.currency !=
        postPaidRate?.taxes[0]?.tax_original_amount?.currency,
    );
  }, [postPaidRate]);

  return (
    <FullScreenModal
      open={showPriceBreakdown}
      closeModal={onClose}
      title={roomDetailsText}
      primaryButtonText={bookNowText}
      primaryButtonAction={() => {
        url = '/checkout/client';
        mutate();
      }}
      secondaryButtonText={addToItineraryText}
      secondaryButtonAction={() => mutate()}
      footerSummary={
        <BreakdownSummary
          rate={rates}
          nights={nights}
          guests={guests}
          roomsQty={rooms}
          isPriceBase
          isAvgAmount
        />
      }
      hasMultipleActions={showAddToItinerary}
      noHeader={true}
      containerButtonsClassName="grid-cols-1"
      className={
        'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-4 shadow-full lg:max-h-[660px] lg:max-w-[842px]'
      }
    >
      <ModalHeader
        title={roomDetailsText}
        onCloseModal={onClose}
        headerClassName="bg-white"
        titleClassName="font-normal"
      />
      <section className="flex flex-col justify-between h-full px-5 overflow-y-scroll">
        <BreakdownRoomDescription value={description} />
        <Divider className="mt-2" />
        <BreakdownSubtitle
          className="mt-6 text-base font-semibold text-dark-800"
          value={roomAmenitiesText}
        />
        <AmenitiesSection amenities={features} />
        <Divider className="my-2" />
        <BedsAmount
          doubleBeds={doubleBeds}
          queenBeds={queenBeds}
          kingBeds={kingBeds}
          otherBeds={otherBeds}
        />
        <Divider className="mt-2" />
        <BreakdownSubtitle
          className="pt-6 text-lg font-semibold text-dark-800"
          value={priceBreakdownText}
        />
        <section className="flex flex-col h-full gap-6 py-6 text-start">
          <section className="space-y-4">
            <BreakdownSubtitle
              className="mt-6 text-base font-semibold text-dark-800"
              value={roomLabel}
            />
            <section className="space-y-2">
              <section className="flex items-center justify-between">
                <p className="text-sm font-semibold leading-[22px] text-dark-800">
                  {basePriceLabel}
                </p>

                <section className="text-right">
                  {rateBreakdown.discounts && !!amountToApply?.amount && (
                    <p className="text-xs font-semibold leading-5 text-green-1000">
                      <span className="mr-1 line-through text-dark-800">
                        {
                          rateBreakdown.discounts.base_amount_before_apply
                            ?.formatted
                        }
                      </span>
                      {rateBreakdown?.discounts.percentage_to_apply}
                    </p>
                  )}
                  <p className="text-sm font-semibold leading-[22px] text-dark-800">
                    {totalBaseAmount.formatted}
                  </p>
                </section>
              </section>
              {rateBreakdown.taxes.map((tax, index) => {
                const taxLabel = t(tax.type, tax.description);

                return (
                  <section
                    className="flex items-center justify-between"
                    key={tax.type + index}
                  >
                    <p className="text-sm font-semibold leading-[22px] text-dark-800">
                      {taxLabel}
                    </p>
                    <p className="text-sm font-semibold leading-[22px] text-dark-800">
                      {tax.tax_amount.formatted}
                    </p>
                  </section>
                );
              })}
              <div className="w-full h-px bg-dark-300"></div>
              <section className="flex justify-between">
                <p className="text-sm font-semibold leading-[22px] text-dark-1000">
                  {payNowLabel}
                </p>
                <p className="text-[18px] font-bold leading-[24px] text-dark-1000">
                  {totalAmount.formatted}
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
              {postPaidRate?.taxes.map((tax, index) => {
                const taxLabel = t(tax.type, tax.description);

                return (
                  <section
                    className="flex justify-between"
                    key={tax.type + index}
                  >
                    <section className="flex flex-row gap-1">
                      <section className="flex flex-row gap-1 lg:gap-3">
                        <p className="leading-lg text-xs font-semibold text-dark-1000 lg:text-sm lg:leading-[22px]">
                          {taxLabel}
                        </p>
                      </section>
                    </section>

                    <section className="text-right">
                      <section className="flex items-center text-dark-1000">
                        {showLocalCurrency && (
                          <p className="pr-1 text-[12px] leading-[15px]">
                            {approxLabel}
                          </p>
                        )}
                        <p className="leading-lg text-xs font-semibold lg:text-sm lg:leading-[22px]">
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
              })}
              {showLocalCurrency && (
                <p className="text-[12px] font-semibold leading-[15px] text-dark-700">
                  {`* ${estimationLabel}`}
                </p>
              )}
              <div className="w-full h-px bg-dark-300"></div>
              <section className="flex justify-between">
                <p className="text-sm font-semibold leading-[22px] text-dark-1000">
                  {payAtPropertyLabel}
                </p>
                <p className="text-[18px] font-bold leading-[24px] text-dark-1000">
                  {postPaidRate?.total_taxes.formatted}
                </p>
              </section>
            </section>
          </section>
          <section className="space-y-4">
            <section className="space-y-2">
              <section className="flex justify-between">
                <p className="text-sm font-semibold leading-[22px] text-dark-1000">
                  {totalLabel}
                </p>
                <p className="text-[18px] font-bold leading-[24px] text-dark-1000">
                  {rates?.min_rate?.rate.starting_room_total?.formatted}
                </p>
              </section>
            </section>
          </section>
          <section>
            {cancellable && (
              <FreeCancellationExtended
                policy={cancellationPolicy?.description}
              />
            )}
            <NonRefundable
              nonCancellable={nonRefundable}
              description={cancellationPolicy?.description}
            />
            <PartialRefund
              nonCancellable={partialRefundable}
              description={cancellationPolicy?.description}
            />
          </section>
        </section>
      </section>
    </FullScreenModal>
  );
};

export default PriceBreakdownModal;
