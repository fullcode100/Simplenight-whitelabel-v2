import { MouseEvent } from 'react';
import FullScreenModal from 'components/global/NewModal/FullScreenModal';
import { useTranslation } from 'react-i18next';
import { Flight } from 'flights/types/response/SearchResponse';
import FlightSegmentDetails from './components/FlightSegmentDetails';
import FlightStopDetails from './components/FlightStopDetails';

interface FlightDetailsModalProps {
  showFlightDetailsModal: boolean;
  onClose: (event?: MouseEvent<HTMLElement>) => void;
  itemFlight: Flight;
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
          {itemFlight?.segments?.collection.map((segment, index) => (
            <>
              <FlightSegmentDetails
                key={'flight_segment_${index}'}
                segment={segment}
              />
              {index < itemFlight.segments.collection.length - 1 && (
                <FlightStopDetails
                  key={'flight_stop_${index}'}
                  segment1={itemFlight.segments.collection[index]}
                  segment2={itemFlight.segments.collection[index + 1]}
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
