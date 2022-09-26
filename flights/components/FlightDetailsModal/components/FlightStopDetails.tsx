import { useTranslation } from 'react-i18next';
import { FlightSegment } from 'flights/types/response/SearchResponse';
import IconArrowBottom from 'public/icons/assets/flights/arrow_bottom.svg';
import IconTime from 'public/icons/assets/flights/time.svg';
import moment from 'moment';

interface FlightStopDetailsProps {
  key: string;
  segment1: FlightSegment;
  segment2: FlightSegment;
}

const FlightStopDetails = ({
  key,
  segment1,
  segment2,
}: FlightStopDetailsProps) => {
  const [t] = useTranslation('flights');
  const layoverLabel = t('layover', 'Layover');
  const arrivalDate = moment(segment1?.arrivalDateTime);
  const departureDate = moment(segment2?.departureDateTime);
  const layoverTime = departureDate.diff(arrivalDate, 'minutes');

  return (
    <>
      <li
        key={'${key}_sep_1'}
        className={'bg-white flex items-center justify-center py-2'}
      >
        <IconArrowBottom className="text-primary-1000 self-center" />
      </li>
      <li
        key={'${key}_stop'}
        className={
          'bg-dark-100 flex flex-row items-center border border-dark-300 rounded px-3 py-2'
        }
      >
        <IconTime className="w-[20px] h-[20px] text-dark-1000 mr-3" />
        <section className="">
          <p className="text-dark-1000 font-bold text-sm">
            {Math.floor(layoverTime / 60)}h{' '}
            {layoverTime - Math.floor(layoverTime / 60) * 60}m {layoverLabel}
          </p>
          <p className="text-dark-700">
            {segment1?.arrivalAirport?.locationCode}
          </p>
        </section>
      </li>
      <li
        key={'${key}_sep_2'}
        className={'bg-white flex items-center justify-center py-2'}
      >
        <IconArrowBottom className="text-primary-1000 self-center" />
      </li>
    </>
  );
};

export default FlightStopDetails;
