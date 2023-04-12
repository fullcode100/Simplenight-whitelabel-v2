import { IconWrapper, Paragraph } from '@simplenight/ui';
import Divider from 'components/global/Divider/Divider';
import { FlightSegment } from 'flights/types/response/SearchResponse';
import { formatTime, getAirlineIconUrl, getDuration } from 'flights/utils';
import React from 'react';
import ClockIcon from 'public/icons/assets/clock-icon.svg';
import { useTranslation } from 'react-i18next';

const CardCollapsable = ({ collection }: { collection: FlightSegment[] }) => {
  const [t] = useTranslation('flights');
  const durationLabel = t('duration', 'Duration');
  const layoverLabel = t('layover', 'Layover');
  return (
    <section className="flex flex-col gap-4">
      <Divider />
      {collection.map((segment) => {
        const {
          marketingCarrier,
          marketingCarrierName,
          marketingFlightNumber,
          aircraftType,
          departureDateTime,
          departureAirport,
          departureAirportName,
          arrivalDateTime,
          arrivalAirport,
          arrivalAirportName,
          flightDuration,
          layoverToNextSegmentsInMinutes,
        } = segment;
        const departureTime = formatTime(departureDateTime);
        const arrivalTime = formatTime(arrivalDateTime);

        const AirlineInformation = () => {
          return (
            <div className="bg-dark-100 py-1 px-3 flex items-center gap-1 w-full lg:w-fit rounded-4">
              <img
                className="h-4"
                src={getAirlineIconUrl(marketingCarrier.toUpperCase())}
                alt={marketingCarrierName}
              />
              <Paragraph size="xxsmall">{marketingCarrierName}</Paragraph>{' '}
              <Paragraph size="xxsmall" textColor="text-dark-700">
                · Flight {marketingCarrier}
                {marketingFlightNumber}
              </Paragraph>{' '}
              <Paragraph size="xxsmall" textColor="text-dark-700">
                · {aircraftType}
              </Paragraph>
            </div>
          );
        };

        const SegmentDetailRow = ({
          time,
          airportCode,
          airportName,
          duration,
        }: {
          time: string;
          airportCode: string;
          airportName: string;
          duration?: number;
        }) => {
          const AirportLabel = () => (
            <div className="flex items-center gap-2">
              <Paragraph
                size="xxsmall"
                fontWeight="semibold"
                className="border-dark-300 rounded-4  border  px-2"
              >
                {airportCode}
              </Paragraph>{' '}
              <Paragraph size="xxsmall" fontWeight="semibold">
                {airportName}
              </Paragraph>{' '}
            </div>
          );
          return (
            <li className="mb-2 pl-5">
              <div className="absolute w-2 h-2 mt-2 bg-white rounded-full -left-1 border border-dark-700 ring-4 ring-white"></div>
              <div className="flex flex-col lg:flex-row lg:items-center gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <Paragraph
                    size="xs"
                    fontWeight="semibold"
                    textColor="text-dark-700"
                  >
                    {time}
                  </Paragraph>
                  <Paragraph textColor="text-dark-700 lg:hidden" size="xxs">
                    · Airport City
                  </Paragraph>
                </div>
                <AirportLabel />
                <Paragraph textColor="text-dark-700 hidden lg:block" size="xxs">
                  · Airport City
                </Paragraph>
              </div>
              {duration && (
                <div className="flex items-center gap-2 lg:pl-[68px] mb-3 text-dark-700 text-p-xs">
                  <IconWrapper size={12} desktop={16}>
                    <ClockIcon />
                  </IconWrapper>
                  <Paragraph
                    size="xxs"
                    fontWeight="semibold"
                    textColor="text-dark-700"
                  >
                    {getDuration(duration)} {durationLabel}
                  </Paragraph>
                </div>
              )}
            </li>
          );
        };

        const LayoverInformation = () => (
          <section className="flex gap-2 p-2 items-center text-dark-700">
            <IconWrapper size={16}>
              <ClockIcon />
            </IconWrapper>
            <Paragraph textColor="text-dark-700" fontWeight="semibold">
              {getDuration(layoverToNextSegmentsInMinutes)} {layoverLabel} ·
            </Paragraph>
            <Paragraph textColor="text-dark-700">Layover City</Paragraph>
          </section>
        );

        const SegmentsDetail = () => {
          return (
            <ol className="border-l border-dark-700 relative ml-2 my-3">
              <SegmentDetailRow
                time={departureTime}
                airportCode={departureAirport}
                airportName={departureAirportName}
                duration={flightDuration}
              />
              <SegmentDetailRow
                time={arrivalTime}
                airportCode={arrivalAirport}
                airportName={arrivalAirportName}
              />
            </ol>
          );
        };

        return (
          <section key={segment.segmentCode} className="px-4">
            <AirlineInformation />
            <SegmentsDetail />

            {layoverToNextSegmentsInMinutes > 0 && (
              <>
                <Divider />
                <LayoverInformation />
                <Divider />
              </>
            )}
          </section>
        );
      })}
    </section>
  );
};

export default CardCollapsable;
