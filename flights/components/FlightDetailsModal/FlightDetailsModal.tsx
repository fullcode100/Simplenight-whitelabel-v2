import { MouseEvent } from 'react';
import FullScreenModal from 'components/global/NewModal/FullScreenModal';
import { useTranslation } from 'react-i18next';
import { FlightOption } from 'flights/types/response/SearchResponse';
import FlightSegmentDetails from './components/FlightSegmentDetails';
import FlightStopDetails from './components/FlightStopDetails';

interface FlightDetailsModalProps {
  showFlightDetailsModal: boolean;
  onClose: (event?: MouseEvent<HTMLElement>) => void;
  itemFlight: FlightOption;
}

const FlightDetailsModal = ({
  showFlightDetailsModal,
  onClose,
  itemFlight,
}: FlightDetailsModalProps) => {
  const [t] = useTranslation('flights');
  const flightDetailsLabel = t('flightDetails', 'Flight Details');

  return (
    <FullScreenModal
      open={showFlightDetailsModal}
      title={flightDetailsLabel}
      closeModal={onClose}
      primaryButtonAction={onClose}
      noFooter={true}
    >
      <section className="p-5 overflow-y-scroll flex flex-col items-center justify-between">
        <ul role="list" className="space-y-4 w-full text-left">
          {itemFlight?.flightSegment.map((segment, index) => (
            <>
              <FlightSegmentDetails
                key={'flight_segment_${index}'}
                segment={segment}
              />
              {index < itemFlight.flightSegment.length - 1 && (
                <FlightStopDetails
                  key={'flight_stop_${index}'}
                  segment1={itemFlight.flightSegment[index]}
                  segment2={itemFlight.flightSegment[index + 1]}
                />
              )}
            </>
          ))}
        </ul>
      </section>
    </FullScreenModal>
  );
};

export default FlightDetailsModal;
