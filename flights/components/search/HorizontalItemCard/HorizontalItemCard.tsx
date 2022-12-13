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
import { Flight, FlightOffer } from 'flights/types/response/SearchResponse';
import PriceBreakdownHeader from './components/PriceBreakdownHeader';
import PriceBreakdownBody from './components/PriceBreakdownBody';
import FlightDetailsModal from '../../FlightDetailsModal/FlightDetailsModal';
import { Item } from 'types/cart/CartType';

interface CardProps<T extends WithId> {
  key?: string;
  handleFlightClick: any;
  item: Flight;
  currency: string;
  icon?: ReactNode;
  categoryName?: string;
  className?: string;
  showAllOffers: boolean;
  cartItem: Item;
}

function HorizontalItemCard<T extends WithId>({
  handleFlightClick,
  item,
  currency,
  icon,
  categoryName,
  className = '',
  showAllOffers,
  cartItem,
}: CardProps<T>) {
  const [t, i18next] = useTranslation('flights');
  const durationLabel = t('duration', 'Duration');
  const stopsLabel = t('stops', 'Stops');
  const flightDetailsLabel = t('flightDetails', 'Flight Details');
  const fromLabel = t('from', 'From');
  const [showFlightDetailsModal, setShowFlightDetailsModal] = useState(false);

  const itemFlight = item;
  let totalFlightTimeInMinutes = itemFlight?.segments?.totalFlightTimeInMinutes
    ? itemFlight?.segments?.totalFlightTimeInMinutes
    : 0;
  if (
    !totalFlightTimeInMinutes &&
    itemFlight?.segments?.collection[0]?.flightDurationInMinutes
  )
    totalFlightTimeInMinutes =
      itemFlight?.segments?.collection[0]?.flightDurationInMinutes;

  const CategoryTag = () => (
    <section className="absolute flex flex-row items-center gap-2 bg-dark-1000 opacity-[0.85] text-white px-2 py-1 rounded-br">
      {icon}
      <span className="font-semibold text-[14px]">{categoryName}</span>
    </section>
  );

  return (
    <li
      className={`flex flex-col border rounded ${className} flex-0-0-auto cursor-pointer`}
    >
      <section
        className="border-b border-dark-300 flex flex-col"
        onClick={handleFlightClick}
      >
        <section className="px-4 py-3">
          <section className="flex justify-between items-center">
            <section className="flex flex-row">
              {itemFlight?.segments?.collection.map((segment, index) => (
                <IconRoundedContainer
                  key={`airline_${index}`}
                  className="border border-dark-300 bg-white-1000 lg:w-[3rem] lg:h-[3rem] mr-2"
                >
                  <img
                    src={`http://pics.avs.io/200/200/${segment?.marketingCarrier}.png`}
                    alt={segment?.marketingCarrierName}
                  />
                </IconRoundedContainer>
              ))}
            </section>
            <section className="text-right">
              <p className="text-dark-800 font-normal">{durationLabel}</p>
              <p className="text-dark-800 font-normal">
                {Math.floor(totalFlightTimeInMinutes / 60)}h{' '}
                {totalFlightTimeInMinutes -
                  Math.floor(totalFlightTimeInMinutes / 60) * 60}
                m
              </p>
            </section>
          </section>
        </section>
      </section>

      <section
        className="flex flex-row gap-2 px-4 py-3 lg:py-6 justify-between"
        onClick={handleFlightClick}
      >
        <section className="grid place-items-center w-[40%]">
          <section className="border border-dark-300 rounded px-3 py-2 text-lg text-dark-1000 font-bold mb-2">
            {itemFlight?.segments?.collection[0]?.departureAirport}
          </section>
          <p className="text-center text-base text-dark-800 font-normal p-0 m-0">
            {moment(
              itemFlight?.segments?.collection[0]?.departureDateTime,
            ).format('hh:mm A')}
          </p>
          <p className="text-center text-dark-800 font-normal p-0 m-0">
            {itemFlight?.segments?.collection[0]?.departureAirportName}
          </p>
        </section>
        <section className="flex flex-col grow w-[20%]">
          <section className="relative w-full text-center text-dark-1000 font-normal border-b-2 border-primary-1000 py-3 whitespace-nowrap">
            {itemFlight?.segments?.collection.length - 1} {stopsLabel}
            {itemFlight?.segments?.collection.map(
              (segment, index) =>
                index > 0 && (
                  <section
                    key={`stop_${index}`}
                    className={`absolute bottom-[-7px] left-[calc(${
                      index *
                      Math.floor(100 / itemFlight?.segments?.collection.length)
                    }%-6px)] bg-white border-2 border-primary-1000 rounded-full w-[13px] h-[13px]`}
                  />
                ),
            )}
          </section>
        </section>
        <section className="grid place-items-center w-[40%]">
          <section className="border border-dark-300 rounded px-3 py-2 text-lg text-dark-1000 font-bold mb-2">
            {
              itemFlight?.segments?.collection[
                itemFlight?.segments?.collection.length - 1
              ]?.arrivalAirport
            }
          </section>
          <p className="text-center text-base text-dark-800 font-normal p-0 m-0">
            {moment(
              itemFlight?.segments?.collection[
                itemFlight?.segments?.collection.length - 1
              ]?.arrivalDateTime,
            ).format('hh:mm A')}
          </p>
          <p className="text-center text-dark-800 font-normal p-0 m-0">
            {
              itemFlight?.segments?.collection[
                itemFlight?.segments?.collection.length - 1
              ]?.arrivalAirportName
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
          title={
            <PriceBreakdownHeader offer={item.offers[0]} currency={currency} />
          }
          body={
            <PriceBreakdownBody
              cartItem={cartItem}
              item={item}
              offers={item.offers}
              currency={currency}
              showAllOffers={showAllOffers}
              handleFlightClick={handleFlightClick}
            />
          }
        />
      </footer>
    </li>
  );
}

export default HorizontalItemCard;
