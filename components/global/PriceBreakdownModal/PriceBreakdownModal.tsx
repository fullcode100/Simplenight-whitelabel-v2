import { MouseEvent } from 'react';

import FullScreenModal from '../NewModal/FullScreenModal';
import Divider from '../Divider/Divider';
import BreakdownRoomDescription from './components/BreakdownRoomDescription';
import BreakdownSubtitle from './components/BreakdownSubtitle';
import BreakdownRow from './components/BreakdownRow';
import { Room } from '../../../hotels/types/response/SearchResponse';
import BreakdownSummary from './components/BreakdownSummary';

interface DatePickerProps {
  showPriceBreakdown: boolean;
  onClose: (event?: MouseEvent<HTMLElement>) => void;
  room: Room;
}

const PriceBreakdownModal = ({
  showPriceBreakdown,
  onClose,
  room,
}: DatePickerProps) => {
  return (
    <FullScreenModal
      open={showPriceBreakdown}
      closeModal={onClose}
      title="Room Details"
      primaryButtonText="Book Now"
      primaryButtonAction={onClose}
      secondaryButtonText="Add To Itinerary"
      secondaryButtonAction={onClose}
      footerSummary={<BreakdownSummary />}
      hasMultipleActions={true}
    >
      <section className="flex flex-col justify-between px-5">
        <section>
          <BreakdownRoomDescription value="Superior King" />
          <Divider className="mt-6 mb-8" />
          {/* TODO: Amenities component */}
          <Divider className="mt-6 mb-8" />
          <BreakdownSubtitle
            className="text-dark-800 text-base mt-12"
            value="Price Breakdown"
          />
          <BreakdownSubtitle
            className="text-primary-1000 text-base mt-6"
            value="Base Price"
          />
          <BreakdownRow label="Room" price="$145.00" />
          <BreakdownRow label="Taxes" price="$5.00" />
          <Divider className="mt-2" />
          <BreakdownRow label="Pay Now" price="$5.00" />
          <BreakdownSubtitle
            className="text-primary-1000 text-base mt-6"
            value="Additional Fees"
          />
          <BreakdownRow label="Resort Fees" price="$25.00" />
          <Divider className="mt-2" />
          <BreakdownRow label="Pay At Property" price="$25.00" />
          {/* TODO: Free Cancellation component */}
        </section>
      </section>
    </FullScreenModal>
  );
};

export default PriceBreakdownModal;
