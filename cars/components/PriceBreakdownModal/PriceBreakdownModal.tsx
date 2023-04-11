import { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

import FullScreenModal from '../../../components/global/NewModal/FullScreenModal';
import Divider from '../../../components/global/Divider/Divider';
import BreakdownRoomDescription from './components/BreakdownRoomDescription';
import BreakdownSubtitle from './components/BreakdownSubtitle';
import BreakdownRow from './components/BreakdownRow';
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
import { Item } from 'types/cart/CartType';
import ModalHeader from '../../../components/global/NewModal/components/ModalHeader';
import BedsAmount from '../BedsAmount/BedsAmount';
import TaxesAndFeesPopover from '../TaxesAndFeesPopover/TaxesAndFeesPopover';
import { hasCartMode } from 'helpers/purchaseModeUtils';

const RESORT_FEES = 'RESORT_FEES';

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
}: DatePickerProps) => {
  const router = useRouter();

  const [t, i18next] = useTranslation('cars');
  const roomLabel = t('room', 'Room');
  const taxesLabel = t('taxes', 'Taxes');
  const payNowLabel = t('payNow', 'Pay Now');
  const additionalFeesLabel = t('additionalFees', 'Additional Fees');
  const resortFeeLabel = t('resortFee', 'Resort Fees');
  const payAtPropertyLabel = t('payAtProperty', 'Pay At Property');
  const roomDetailsText = t('roomDetails', 'Room Details');
  const roomAmenitiesText = t('roomAmenities', 'Room Amenities');
  const priceBreakdownText = t('priceBreakdown', 'Price Breakdown');
  const addToItineraryText = t('addToItinerary', 'Add to Itinerary');
  const bookNowText = t('bookNow', 'Book Now');
  const showAddToItinerary = hasCartMode();

  const rateBreakdown = rates?.min_rate?.rate?.rate_breakdown;
  const totalAmount = rates?.min_rate?.rate?.total_amount;
  const {
    total_base_amount: totalBaseAmount,
    total_taxes: totalTaxes,
    post_paid_rate: postPaidRate,
  } = rateBreakdown;

  const resortFees = postPaidRate?.taxes.find(
    (tax) => tax.description === RESORT_FEES,
  );
  const resortFeesFormatted = resortFees?.tax_amount.formatted ?? '$0.00';
  const payAtPropertyFormatted =
    postPaidRate?.total_amount.formatted ?? '$0.00';

  const cancellableType = 'FREE_CANCELLATION';
  const nonRefundableType = 'NON_REFUNDABLE';

  const cancellable = cancellationPolicy?.cancellation_type === cancellableType;
  const nonRefundable =
    cancellationPolicy?.cancellation_type === nonRefundableType;

  const handleAction = async (url: string) => {
    await addToCart(itemToBook, i18next);
    router.replace(url);
  };
  const {
    double_beds: doubleBeds,
    queen_beds: queenBeds,
    king_beds: kingBeds,
    other_beds: otherBeds,
  } = services;

  return (
    <FullScreenModal
      open={showPriceBreakdown}
      closeModal={onClose}
      title={roomDetailsText}
      primaryButtonText={bookNowText}
      primaryButtonAction={() => handleAction('/checkout/client')}
      secondaryButtonText={addToItineraryText}
      secondaryButtonAction={() => handleAction('/itinerary')}
      footerSummary={
        <BreakdownSummary rate={rates} nights={nights} guests={guests} />
      }
      hasMultipleActions={showAddToItinerary}
      noHeader={true}
      containerButtonsClassName="grid-cols-1"
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
          className="mt-6 text-base font-semibold text-dark-800"
          value={priceBreakdownText}
        />
        <BreakdownSubtitle
          className="mt-6 text-base font-semibold text-primary-1000"
          value="Base Price"
        />
        <BreakdownRow label={roomLabel} price={totalBaseAmount.formatted} />

        <section className="flex items-start justify-between w-full mt-1 text-base">
          <section className="flex flex-row gap-1">
            <span>{taxesLabel}</span>
            <TaxesAndFeesPopover />
          </section>
          {totalTaxes.formatted}
        </section>

        <Divider className="mt-2" />
        <BreakdownRow
          label={payNowLabel}
          price={totalAmount.formatted}
          priceClassName="font-semibold text-lg"
        />
        <BreakdownSubtitle
          className="mt-6 text-base font-semibold text-primary-1000"
          value={additionalFeesLabel}
        />

        <section className="flex items-start justify-between w-full mt-1 text-base">
          <section className="flex flex-row gap-1">
            <span>{resortFeeLabel}</span>
            <TaxesAndFeesPopover />
          </section>
          {payAtPropertyFormatted}
        </section>

        <Divider className="mt-2" />
        <BreakdownRow
          label={payAtPropertyLabel}
          price={payAtPropertyFormatted}
        />
        <section className="py-6">
          {cancellable && (
            <FreeCancellationExtended
              policy={cancellationPolicy?.description}
            />
          )}
          <NonRefundable
            nonCancellable={nonRefundable}
            description={cancellationPolicy?.description}
          />
        </section>
      </section>
    </FullScreenModal>
  );
};

export default PriceBreakdownModal;
