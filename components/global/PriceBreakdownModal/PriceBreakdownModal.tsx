import { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

import FullScreenModal from '../NewModal/FullScreenModal';
import Divider from '../Divider/Divider';
import BreakdownRoomDescription from './components/BreakdownRoomDescription';
import BreakdownSubtitle from './components/BreakdownSubtitle';
import BreakdownRow from './components/BreakdownRow';
import {
  Rate,
  CancellationPolicy,
} from '../../../hotels/types/response/SearchResponse';
import BreakdownSummary from './components/BreakdownSummary';
import FreeCancellationExtended from '../FreeCancellation/FreeCancellationExtended';
import AmenitiesSection from '../../../hotels/components/Amenities/AmenitiesSection';
import { addToCart } from 'core/client/services/CartClientService';
import { useDispatch, useSelector } from 'react-redux';
import { Item } from '../../../types/cart/CartType';
import ModalHeader from '../NewModal/components/ModalHeader';

interface DatePickerProps {
  showPriceBreakdown: boolean;
  onClose: (event?: MouseEvent<HTMLElement>) => void;
  description: string;
  rates: Rate;
  cancellationPolicy?: CancellationPolicy;
  features: string[];
  itemToBook: Item;
}

const PriceBreakdownModal = ({
  showPriceBreakdown,
  onClose,
  description,
  rates,
  cancellationPolicy,
  features,
  itemToBook,
}: DatePickerProps) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const store = {
    state,
    dispatch,
  };
  const [t, i18next] = useTranslation('hotels');
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

  const { total_amount: totalAmount, rate_breakdown: rateBreakdown } = rates;
  const { total_base_amount: totalBaseAmount, total_taxes: totalTaxes } =
    rateBreakdown;

  return (
    <FullScreenModal
      open={showPriceBreakdown}
      closeModal={onClose}
      title={roomDetailsText}
      primaryButtonText={bookNowText}
      primaryButtonAction={() => {
        addToCart(itemToBook, i18next, store);
        onClose();
      }}
      secondaryButtonText={addToItineraryText}
      secondaryButtonAction={() => {
        addToCart(itemToBook, i18next, store);
        onClose();
      }}
      footerSummary={<BreakdownSummary rate={rates} />}
      hasMultipleActions={true}
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
          className="text-dark-800 font-semibold text-base mt-6"
          value={roomAmenitiesText}
        />
        <AmenitiesSection amenities={features} />
        <Divider className="mt-2" />
        <BreakdownSubtitle
          className="text-dark-800 font-semibold text-base mt-6"
          value={priceBreakdownText}
        />
        <BreakdownSubtitle
          className="text-primary-1000 text-base mt-6 font-semibold"
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
          className="text-primary-1000 text-base mt-6 font-semibold"
          value={additionalFeesLabel}
        />
        <BreakdownRow label={resortFeeLabel} price={totalAmount.formatted} />
        <Divider className="mt-2" />
        <BreakdownRow
          label={payAtPropertyLabel}
          price={totalAmount.formatted}
        />
        <section className="py-6">
          <FreeCancellationExtended policy={cancellationPolicy?.description} />
        </section>
      </section>
    </FullScreenModal>
  );
};

export default PriceBreakdownModal;
