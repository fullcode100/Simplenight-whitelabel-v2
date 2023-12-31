import { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

import FullScreenModal from '../../../components/global/NewModal/FullScreenModal';
import Divider from '../../../components/global/Divider/Divider';
import BreakdownRoomDescription from './components/BreakdownRoomDescription';
import BreakdownSubtitle from './components/BreakdownSubtitle';
import BreakdownRow from './components/BreakdownRow';
import { Rate, CancellationPolicy } from '../../types/response/SearchResponse';
import BreakdownSummary from './components/BreakdownSummary';
import FreeCancellationExtended from '../../../components/global/FreeCancellation/FreeCancellationExtended';
import AmenitiesSection from '../Amenities/AmenitiesSection';
import { addToCart } from 'core/client/services/CartClientService';
import { Item } from '../../../types/cart/CartType';
import ModalHeader from '../../../components/global/NewModal/components/ModalHeader';
import { hasCartMode } from 'helpers/purchaseModeUtils';

const RESORT_FEES = 'RESORT_FEES';

interface DatePickerProps {
  showPriceBreakdown: boolean;
  onClose: (event?: MouseEvent<HTMLElement>) => void;
  description: string;
  rates: Rate;
  cancellationPolicy?: CancellationPolicy;
  features: string[];
  itemToBook: Item;
  nights: number;
  guests: number;
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
}: DatePickerProps) => {
  const [t, i18next] = useTranslation('flights');
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

  const { total_amount: totalAmount, rate_breakdown: rateBreakdown } = rates;
  const {
    total_base_amount: totalBaseAmount,
    total_taxes: totalTaxes,
    post_paid_rate: postPaidRate,
  } = rateBreakdown;

  const resortFees = postPaidRate?.taxes.find(
    (tax) => tax.description === RESORT_FEES,
  );
  const resortFeesFormatted = resortFees?.tax_amount.formatted ?? '$0.00';

  return (
    <FullScreenModal
      open={showPriceBreakdown}
      closeModal={onClose}
      title={roomDetailsText}
      primaryButtonText={bookNowText}
      primaryButtonAction={() => {
        addToCart(itemToBook, i18next);
        onClose();
      }}
      secondaryButtonText={addToItineraryText}
      secondaryButtonAction={() => {
        addToCart(itemToBook, i18next);
        onClose();
      }}
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
        <BreakdownRow label={taxesLabel} price={totalTaxes.formatted} />
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
        <BreakdownRow label={resortFeeLabel} price={resortFeesFormatted} />
        <Divider className="mt-2" />
        <BreakdownRow label={payAtPropertyLabel} price={resortFeesFormatted} />
        <section className="py-6">
          <FreeCancellationExtended policy={cancellationPolicy?.description} />
        </section>
      </section>
    </FullScreenModal>
  );
};

export default PriceBreakdownModal;
