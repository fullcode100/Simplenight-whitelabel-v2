import { useTranslation } from 'react-i18next';
import { FlightSegment } from 'flights/types/response/SearchResponse';
import IconRoundedContainer from 'components/global/IconRoundedContainer/IconRoundedContainer';
import IconFlight from 'public/icons/categories/Category-Flights.svg';
import IconArrowRight from 'public/icons/assets/flights/arrow_right.svg';
import moment from 'moment';

interface FlightSegmentDetailsProps {
  key: string;
  segment: FlightSegment;
}

const FlightSegmentDetails = ({ key, segment }: FlightSegmentDetailsProps) => {
  const [t] = useTranslation('flights');
  const terminalLabel = t('terminal', 'Terminal');
  const flightDurationInMinutes: number = segment?.flightDurationInMinutes
    ? segment?.flightDurationInMinutes
    : 0;

  return (
    <li
      key={'${key}'}
      className={'bg-white flex flex-col border border-dark-300 rounded'}
    >
      <section className="text-sm bg-primary-100 border-b border-dark-300 px-3 py-3">
        {moment(segment?.departureDateTime).format('MMM DD, YYYY')}
      </section>

      <section className="flex flex-row items-center px-3 pt-2">
        <IconRoundedContainer className="border border-dark-300 bg-white-1000 lg:w-[3rem] lg:h-[3rem] mr-3">
          <img
            src={`http://pics.avs.io/200/200/${segment?.marketingCarrier}.png`}
            alt={segment?.marketingCarrierName}
          />
        </IconRoundedContainer>
        <section className="font-bold text-base self-center">
          {segment?.marketingCarrierName}
        </section>
      </section>
      <section className="border-b border-dark-300 flex px-3 py-3">
        <section className="w-full border border-dark-300 rounded flex flex-row items-center justify-center px-3 py-1">
          <IconFlight className="w-[16px] h-[16px] text-dark-700 mr-3" />
          <section className="text-dark-700 self-center">
            Flight {segment?.marketingFlightNumber}
          </section>
        </section>
      </section>

      <section className="flex flex-row gap-2 px-4 py-3 lg:py-6 justify-between">
        <section className="grid place-items-center w-[40%]">
          <section className="border border-dark-300 rounded px-3 py-2 text-lg text-dark-1000 font-bold mb-2">
            {segment?.departureAirport}
          </section>
          <p className="text-center text-base text-dark-800 font-normal p-0 m-0">
            {moment(segment?.departureDateTime).format('hh:mm A')}
          </p>
          <p className="text-center text-dark-800 font-normal p-0 m-0">
            {segment?.departureAirportName}{' '}
            {segment?.departureTerminal
              ? `${terminalLabel} ${segment?.departureTerminal}`
              : ''}
          </p>
        </section>
        <section className="flex flex-col grow w-[20%]">
          <section className="w-full flex flex-col items-center justify-center">
            <p className="text-dark-1000 font-normal py-3 whitespace-nowrap text-center">
              {Math.floor(flightDurationInMinutes / 60)}h{' '}
              {flightDurationInMinutes -
                Math.floor(flightDurationInMinutes / 60) * 60}
              m
            </p>
            <IconArrowRight className="text-primary-1000 self-center" />
          </section>
        </section>
        <section className="grid place-items-center w-[40%]">
          <section className="border border-dark-300 rounded px-3 py-2 text-lg text-dark-1000 font-bold mb-2">
            {segment?.arrivalAirport}
          </section>
          <p className="text-center text-base text-dark-800 font-normal p-0 m-0">
            {moment(segment?.arrivalDateTime).format('hh:mm A')}
          </p>
          <p className="text-center text-dark-800 font-normal p-0 m-0">
            {segment?.arrivalAirportName}{' '}
            {segment?.arrivalTerminal
              ? `${terminalLabel} ${segment?.arrivalTerminal}`
              : ''}
          </p>
        </section>
      </section>
    </li>
  );
};

export default FlightSegmentDetails;
