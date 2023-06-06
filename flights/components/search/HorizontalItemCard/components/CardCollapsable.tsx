import { IconWrapper, Paragraph } from '@simplenight/ui';
import Divider from 'components/global/Divider/Divider';
import { formatTime, getAirlineIconUrl, getDuration } from 'flights/utils';
import React from 'react';
import ClockIcon from 'public/icons/assets/clock-icon.svg';
import { useTranslation } from 'react-i18next';
import { SegmentCollection } from 'flights/types/response/FlightSearchResponseMS';

const CardCollapsable = ({ segments }: { segments: SegmentCollection[] }) => {
  const [t] = useTranslation('flights');
  const durationLabel = t('duration', 'Duration');
  const layoverLabel = t('layover', 'Layover');
  return (
    <section className="flex flex-col gap-4">
      <Divider />
      {segments.map((item) => {
        const {
          operatingCarrier: carrier,
          marketingCarrierName: carrierName,
          marketingFlightNumber: flightNumber,
          aircraftType: aircraft,
          departureDateTime,
          departureAirport,
          departureAirportName,
          arrivalDateTime,
          arrivalAirport,
          arrivalAirportName,
          flightDuration,
          layoverToNextSegmentsInMinutes,
        } = item;
        const departureTime = formatTime(departureDateTime);
        const arrivalTime = formatTime(arrivalDateTime);

        const AirlineInformation = () => {
          return (
            <div className="flex items-center w-full gap-1 px-3 py-1 bg-dark-100 lg:w-fit rounded-4">
              <img
                className="h-4"
                src={getAirlineIconUrl(carrier?.toUpperCase() || '')}
                alt={carrierName}
              />
              <Paragraph size="xxsmall">{carrierName}</Paragraph>{' '}
              <Paragraph size="xxsmall" textColor="text-dark-700">
                · Flight {carrier}
                {flightNumber}
              </Paragraph>{' '}
              <Paragraph size="xxsmall" textColor="text-dark-700">
                · {aircraft}
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
                className="px-2 border border-dark-300 rounded-4"
              >
                {airportCode}
              </Paragraph>{' '}
              <Paragraph size="xxsmall" fontWeight="semibold">
                {airportName}
              </Paragraph>{' '}
            </div>
          );
          return (
            <li className="pl-5 mb-2">
              <div className="absolute w-2 h-2 mt-2 bg-white border rounded-full -left-1 border-dark-700 ring-4 ring-white"></div>
              <div className="flex flex-col gap-2 mb-3 lg:flex-row lg:items-center">
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
              {!!duration && (
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
          <section className="flex items-center gap-2 p-2 text-dark-700">
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
            <ol className="relative my-3 ml-2 border-l border-dark-700">
              <SegmentDetailRow
                time={departureTime}
                airportCode={departureAirport}
                airportName={departureAirportName}
                duration={+flightDuration}
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
          <section key={item.segmentCode} className="px-4">
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
