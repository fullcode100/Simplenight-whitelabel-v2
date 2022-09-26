import React, { ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { WithId } from 'types/global/WithId';
import CollapseUnbordered from 'components/global/CollapseUnbordered/CollapseUnbordered';
import IconRoundedContainer from 'components/global/IconRoundedContainer/IconRoundedContainer';
import moment from 'moment';
import IconBagCabin from 'public/icons/assets/flights/bag_cabin.svg';
import IconBagChecked from 'public/icons/assets/flights/bag_checked.svg';
import IconSeat from 'public/icons/assets/flights/seat.svg';
import IconNoRefund from 'public/icons/assets/flights/no_refund.svg';
import IconNoReschedule from 'public/icons/assets/flights/no_reschedule.svg';
import IconRefund from 'public/icons/assets/flights/refund.svg';
import IconReschedule from 'public/icons/assets/flights/reschedule.svg';
import { Flight } from 'flights/types/response/SearchResponse';
import PriceBreakdownHeader from './components/PriceBreakdownHeader';
import PriceBreakdownBody from './components/PriceBreakdownBody';
import FlightDetailsModal from '../../FlightDetailsModal/FlightDetailsModal';

interface CardProps<T extends WithId> {
  key?: string;
  handleOnViewDetailClick: any;
  item: Flight;
  itemIndex: number;
  icon?: ReactNode;
  categoryName?: string;
  className?: string;
}

function HorizontalItemCard<T extends WithId>({
  handleOnViewDetailClick,
  item,
  itemIndex,
  icon,
  categoryName,
  className = '',
}: CardProps<T>) {
  const [t, i18next] = useTranslation('flights');
  const durationLabel = t('duration', 'Duration');
  const stopsLabel = t('stops', 'Stops');
  const flightDetailsLabel = t('flightDetails', 'Flight Details');
  const fromLabel = t('from', 'From');
  const [showFlightDetailsModal, setShowFlightDetailsModal] = useState(false);

  const itemFlight =
    item?.airItinerary?.originDestinationOptions?.originDestinationOption[
      itemIndex
    ];

  const CategoryTag = () => (
    <section className="absolute flex flex-row items-center gap-2 bg-dark-1000 opacity-[0.85] text-white px-2 py-1 rounded-br">
      {icon}
      <span className="font-semibold text-[14px]">{categoryName}</span>
    </section>
  );

  return (
    <li
      className={`bg-white flex flex-col border border-dark-300 rounded ${className}`}
    >
      <section className="border-b border-dark-300 flex flex-col">
        <section className="px-4 py-3">
          <section className="flex justify-between items-center">
            <section className="flex flex-row">
              {itemFlight?.flightSegment.map((segment, index) => (
                <IconRoundedContainer
                  key={`airline_${index}`}
                  className="border border-dark-300 bg-white-1000 lg:w-[3rem] lg:h-[3rem] mr-2"
                >
                  <img
                    src={`http://pics.avs.io/200/200/${segment?.operatingAirline?.code}.png`}
                    alt=""
                  />
                </IconRoundedContainer>
              ))}
            </section>
            <section className="text-right">
              <p className="text-dark-800 font-normal">{durationLabel}</p>
              <p className="text-dark-800 font-normal">
                {Math.floor(itemFlight?.elapsedTime / 60)}h{' '}
                {itemFlight?.elapsedTime -
                  Math.floor(itemFlight?.elapsedTime / 60) * 60}
                m
              </p>
            </section>
          </section>
        </section>
      </section>

      <section className="flex flex-row gap-2 px-4 py-3 lg:py-6 justify-between">
        <section className="grid place-items-center">
          <section className="border border-dark-300 rounded px-3 py-2 text-lg text-dark-1000 font-bold mb-2">
            {itemFlight?.flightSegment[0]?.departureAirport?.locationCode}
          </section>
          <p className="text-center text-base text-dark-800 font-normal p-0 m-0">
            {moment(itemFlight?.flightSegment[0]?.departureDateTime).format(
              'hh:mm A',
            )}
          </p>
          <p className="text-center text-dark-800 font-normal p-0 m-0">
            {itemFlight?.flightSegment[0]?.departureAirport?.locationCode}
          </p>
        </section>
        <section className="flex flex-col grow">
          <section className="relative w-full text-center text-dark-1000 font-normal border-b-2 border-primary-1000 py-3 whitespace-nowrap">
            {itemFlight?.flightSegment.length - 1} {stopsLabel}
            {itemFlight?.flightSegment.map(
              (segment, index) =>
                index > 0 && (
                  <section
                    key={`stop_${index}`}
                    className={`absolute bottom-[-7px] left-[calc(${
                      index * Math.floor(100 / itemFlight?.flightSegment.length)
                    }%-6px)] bg-white border-2 border-primary-1000 rounded-full w-[13px] h-[13px]`}
                  />
                ),
            )}
          </section>
        </section>
        <section className="grid place-items-center">
          <section className="border border-dark-300 rounded px-3 py-2 text-lg text-dark-1000 font-bold mb-2">
            {
              itemFlight?.flightSegment[itemFlight?.flightSegment.length - 1]
                ?.arrivalAirport?.locationCode
            }
          </section>
          <p className="text-center text-base text-dark-800 font-normal p-0 m-0">
            {moment(
              itemFlight?.flightSegment[itemFlight?.flightSegment.length - 1]
                ?.arrivalDateTime,
            ).format('hh:mm A')}
          </p>
          <p className="text-center text-dark-800 font-normal p-0 m-0">
            {
              itemFlight?.flightSegment[itemFlight?.flightSegment.length - 1]
                ?.arrivalAirport?.locationCode
            }
          </p>
        </section>
      </section>

      <section className="text-right px-4 pb-4">
        <FlightDetailsModal
          showFlightDetailsModal={showFlightDetailsModal}
          onClose={() => setShowFlightDetailsModal(false)}
          itemFlight={itemFlight}
        />
        <button
          type="button"
          onClick={() => setShowFlightDetailsModal(true)}
          className="text-sm font-normal text-primary-1000 hover:text-primary-500 focus:outline-none underline transition ease-in-out duration-150"
        >
          {flightDetailsLabel}
        </button>
      </section>

      <footer className="border-t border-dark-300 px-4 py-0 lg:py-3">
        <CollapseUnbordered
          title={<PriceBreakdownHeader item={item} />}
          body={<PriceBreakdownBody item={item} />}
        />
      </footer>
    </li>
  );
}

export default HorizontalItemCard;
