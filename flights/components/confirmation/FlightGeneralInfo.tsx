/* eslint-disable */
import React, { useState } from 'react';
import { Item } from 'types/booking/bookingType';
import { useTranslation } from 'react-i18next';
import { formatAsDisplayDate } from 'helpers/dajjsUtils';
import IconOneWay from 'public/icons/assets/flights/one_way.svg';
import IconRoundTrip from 'public/icons/assets/flights/round_trip.svg';
import IconMultiCity from 'public/icons/assets/flights/multicity.svg';
import IconLocation from 'public/icons/assets/flights/location.svg';
import IconCalendar from 'public/icons/assets/flights/calendar.svg';
import IconTravelers from 'public/icons/assets/flights/travelers.svg';
import FlightDetailsModal from 'flights/components/FlightDetailsModal/FlightDetailsModal';
import { usePlural } from 'hooks/stringBehavior/usePlural';

interface FlightGeneralInfoProps {
  item?: Item;
}

const FlightGeneralInfo = ({ item }: FlightGeneralInfoProps) => {
  const [t, i18next] = useTranslation('flights');
  const adultsLabel = t('adults', 'Adults');
  const childrenLabel = t('children', 'Children');
  const infantsLabel = t('infants', 'Infants');

  const [showFlightDetailsModal, setShowFlightDetailsModal] = useState(false);
  const flightDetailsLabel = t('flightDetails', 'Flight Details');
  const stopLabel = t('stop', 'Stop');
  const stopsLabel = t('stops', 'Stops');

  let startDates: string[] = [];
  let startAirports: string[] = [];
  let endAirports: string[] = [];
  const direction = item?.booking_data?.search?.direction;
  let directionLabel = t('one_way', 'One-way');
  if (direction === 'round_trip')
    directionLabel = t('round_trip', 'Round-trip');
  else if (direction === 'multicity') {
    directionLabel = t('multicity', 'Multi-city');
    startDates = (item?.booking_data?.search?.start_dates as string).split(',');
    startAirports = (
      item?.booking_data?.search?.start_airports as string
    ).split(',');
    endAirports = (item?.booking_data?.search?.end_airports as string).split(
      ',',
    );
  }

  return (
    <section className="flex flex-col gap-2">
      <section className="flex flex-row my-2">
        <IconTravelers className="text-primary-1000 mx-2" />
        <section className="flex flex-col">
          <section className="flex flex-row font-semibold text-dark-1000 text-[16px] leading-[18px]">
            {item?.booking_data?.search?.adults} {adultsLabel},{' '}
            {item?.booking_data?.search?.children} {childrenLabel},{' '}
            {item?.booking_data?.search?.infants} {infantsLabel}
          </section>
        </section>
      </section>

      {direction === 'one_way' && (
        <section className="flex flex-col">
          <section className="flex flex-row my-2">
            <IconLocation className="text-primary-1000 mx-2" />
            <section className="flex flex-col">
              <section className="flex flex-row font-semibold text-dark-1000 text-[16px] leading-[18px]">
                {item?.booking_data?.search?.start_airport}
                <IconOneWay className="text-dark-1000 mx-1" />
                {item?.booking_data?.search?.end_airport}
              </section>
              <section className="flex flex-row font-normal text-dark-700 text-[14px] leading-[17px]">
                {directionLabel}
              </section>
            </section>
          </section>

          {item?.booking_data?.flights[0] && (
            <section className="flex flex-row my-2 justify-between">
              <section className="flex flex-row">
                <IconCalendar className="text-primary-1000 mx-2" />
                <section className="flex flex-col">
                  <section className="flex flex-row font-semibold text-dark-1000 text-[16px] leading-[18px]">
                    {item?.booking_data?.search?.start_airport}
                    <IconOneWay className="text-dark-1000 mx-1" />
                    {item?.booking_data?.search?.end_airport}
                  </section>
                  <section className="flex flex-row font-normal text-dark-700 text-[14px] leading-[17px]">
                    {formatAsDisplayDate(
                      item?.booking_data?.search?.start_date as string,
                    )}
                    {' | '}
                    {
                      item?.booking_data?.flights[0]?.segments?.collection
                        .length
                    }{' '}
                    {
                      item?.booking_data?.flights[0]?.segments?.collection
                        .length
                    }{' '}
                    {stopsLabel}
                  </section>
                </section>
              </section>

              <section>
                <FlightDetailsModal
                  showFlightDetailsModal={showFlightDetailsModal}
                  onClose={() => setShowFlightDetailsModal(false)}
                  itemFlight={item?.booking_data?.flights[0]}
                />
                <button
                  type="button"
                  onClick={() => setShowFlightDetailsModal(true)}
                  className="text-sm font-normal text-primary-1000 hover:text-primary-500 focus:outline-none underline transition ease-in-out duration-150"
                >
                  {flightDetailsLabel}
                </button>
              </section>
            </section>
          )}
        </section>
      )}

      {direction === 'round_trip' && (
        <section className="flex flex-col">
          <section className="flex flex-row my-2">
            <IconLocation className="text-primary-1000 mx-2" />
            <section className="flex flex-col">
              <section className="flex flex-row font-semibold text-dark-1000 text-[16px] leading-[18px]">
                {item?.booking_data?.search?.start_airport}
                <IconRoundTrip className="text-dark-1000 mx-1" />
                {item?.booking_data?.search?.end_airport}
              </section>
              <section className="flex flex-row font-normal text-dark-700 text-[14px] leading-[17px]">
                {directionLabel}
              </section>
            </section>
          </section>

          {item?.booking_data?.flights[0] && (
            <section className="flex flex-row my-2 justify-between">
              <section className="flex flex-row">
                <IconCalendar className="text-primary-1000 mx-2" />
                <section className="flex flex-col">
                  <section className="flex flex-row font-semibold text-dark-1000 text-[16px] leading-[18px]">
                    {item?.booking_data?.search?.start_airport}
                    <IconOneWay className="text-dark-1000 mx-1" />
                    {item?.booking_data?.search?.end_airport}
                  </section>
                  <section className="flex flex-row font-normal text-dark-700 text-[14px] leading-[17px]">
                    {formatAsDisplayDate(
                      item?.booking_data?.search?.start_date as string,
                    )}
                    {' | '}
                    {
                      item?.booking_data?.flights[0]?.segments?.collection
                        .length
                    }{' '}
                    {
                      item?.booking_data?.flights[0]?.segments?.collection
                        .length
                    }{' '}
                    {stopsLabel}
                  </section>
                </section>
              </section>

              <section>
                <FlightDetailsModal
                  showFlightDetailsModal={showFlightDetailsModal}
                  onClose={() => setShowFlightDetailsModal(false)}
                  itemFlight={item?.booking_data?.flights[0]}
                />
                <button
                  type="button"
                  onClick={() => setShowFlightDetailsModal(true)}
                  className="text-sm font-normal text-primary-1000 hover:text-primary-500 focus:outline-none underline transition ease-in-out duration-150"
                >
                  {flightDetailsLabel}
                </button>
              </section>
            </section>
          )}

          {item?.booking_data?.flights[1] && (
            <section className="flex flex-row my-2 justify-between">
              <section className="flex flex-row">
                <IconCalendar className="text-primary-1000 mx-2" />
                <section className="flex flex-col">
                  <section className="flex flex-row font-semibold text-dark-1000 text-[16px] leading-[18px]">
                    {item?.booking_data?.search?.end_airport}
                    <IconOneWay className="text-dark-1000 mx-1" />
                    {item?.booking_data?.search?.start_airport}
                  </section>
                  <section className="flex flex-row font-normal text-dark-700 text-[14px] leading-[17px]">
                    {formatAsDisplayDate(
                      item?.booking_data?.search?.end_date as string,
                    )}
                    {' | '}
                    {
                      item?.booking_data?.flights[1]?.segments?.collection
                        .length
                    }{' '}
                    {
                      item?.booking_data?.flights[1]?.segments?.collection
                        .length
                    }{' '}
                    {stopsLabel}
                  </section>
                </section>
              </section>

              <section>
                <FlightDetailsModal
                  showFlightDetailsModal={showFlightDetailsModal}
                  onClose={() => setShowFlightDetailsModal(false)}
                  itemFlight={item?.booking_data?.flights[1]}
                />
                <button
                  type="button"
                  onClick={() => setShowFlightDetailsModal(true)}
                  className="text-sm font-normal text-primary-1000 hover:text-primary-500 focus:outline-none underline transition ease-in-out duration-150"
                >
                  {flightDetailsLabel}
                </button>
              </section>
            </section>
          )}
        </section>
      )}

      {direction === 'multicity' &&
        item?.booking_data?.search?.start_dates &&
        item?.booking_data?.search?.start_airports &&
        item?.booking_data?.search?.end_airports && (
          <section className="flex flex-col">
            <section className="flex flex-row my-2">
              <IconLocation className="text-primary-1000 mx-2" />
              <section className="flex flex-col">
                <section className="flex flex-row font-semibold text-dark-1000 text-[16px] leading-[18px]">
                  {startAirports[0]}
                  <IconMultiCity className="text-dark-1000 mx-1" />
                  {endAirports[endAirports.length - 1]}
                </section>
                <section className="flex flex-row font-normal text-dark-700 text-[14px] leading-[17px]">
                  {directionLabel}
                </section>
              </section>
            </section>

            {startDates.map(
              (date: string, index: number) =>
                item?.booking_data?.flights &&
                item?.booking_data?.flights[index] &&
                startAirports[index] &&
                endAirports[index] && (
                  <section className="flex flex-row my-2 justify-between">
                    <section className="flex flex-row">
                      <IconCalendar className="text-primary-1000 mx-2" />
                      <section className="flex flex-col">
                        <section className="flex flex-row font-semibold text-dark-1000 text-[16px] leading-[18px]">
                          {startAirports[index]}
                          <IconOneWay className="text-dark-1000 mx-1" />
                          {endAirports[index]}
                        </section>
                        <section className="flex flex-row font-normal text-dark-700 text-[14px] leading-[17px]">
                          {formatAsDisplayDate(date)}
                          {' | '}
                          {
                            item?.booking_data?.flights[index]?.segments
                              ?.collection.length
                          }{' '}
                          {
                            item?.booking_data?.flights[index]?.segments
                              ?.collection.length
                          }{' '}
                          {stopsLabel}
                        </section>
                      </section>
                    </section>

                    <section>
                      <FlightDetailsModal
                        showFlightDetailsModal={showFlightDetailsModal}
                        onClose={() => setShowFlightDetailsModal(false)}
                        itemFlight={item?.booking_data?.flights[index]}
                      />
                      <button
                        type="button"
                        onClick={() => setShowFlightDetailsModal(true)}
                        className="text-sm font-normal text-primary-1000 hover:text-primary-500 focus:outline-none underline transition ease-in-out duration-150"
                      >
                        {flightDetailsLabel}
                      </button>
                    </section>
                  </section>
                ),
            )}
          </section>
        )}
    </section>
  );
};

export default FlightGeneralInfo;
