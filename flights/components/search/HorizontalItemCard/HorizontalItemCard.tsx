import React, { ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { WithId } from 'types/global/WithId';
import CollapseUnbordered from 'components/global/CollapseUnbordered/CollapseUnbordered';
import IconRoundedContainer from 'components/global/IconRoundedContainer/IconRoundedContainer';
import moment from 'moment';

interface CardProps<T extends WithId> {
  key?: string;
  handleOnViewDetailClick: any;
  item: Object;
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

  const itemFlight = item?.airItinerary?.originDestinationOptions?.originDestinationOption[itemIndex];

  const CategoryTag = () => (
    <section className="absolute flex flex-row items-center gap-2 bg-dark-1000 opacity-[0.85] text-white px-2 py-1 rounded-br">
      {icon}
      <span className="font-semibold text-[14px]">{categoryName}</span>
    </section>
  );

  interface PriceBreakdownHeaderProps {
    item: Object;
  }

  const PriceBreakdownHeader = ({ item }: PriceBreakdownHeaderProps) => {
    const amount = item?.airItineraryPricingInfo[0]?.itinTotalFare?.totalFare?.amount;
    const currency = item?.airItineraryPricingInfo[0]?.itinTotalFare?.totalFare?.currencyCode;
    return (
      <section className="flex justify-between items-center">
        <p className="text-sm leading-[22px] text-dark-1000 font-normal font-lato m-0">
          <span className="text-dark-800">{fromLabel} </span>
          <span className="text-base text-dark-1000 font-bold">{amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} {currency}</span>
        </p>
      </section>
    );
  };

  interface PriceBreakdownBodyProps {
    item: Object;
  }

  const PriceBreakdownBody = ({ item }: PriceBreakdownBodyProps) => {
    return (
      <section className="grid mb-6">
        aaa
      </section>
    );
  };

  return (
    <li className={`bg-white flex flex-col border border-dark-300 rounded ${className}`}>
      <section className="border-b border-dark-300 flex flex-col">
        <section className="px-4 py-3">
          <section className="flex justify-between items-center">
            <section className="flex flex-row">
              {itemFlight?.flightSegment.map((segment, index) => (
                <IconRoundedContainer key={`airline_${index}`} className="border border-dark-300 bg-white-1000 lg:w-[3rem] lg:h-[3rem] mr-2">
                  <img src={`http://pics.avs.io/200/200/${segment?.operatingAirline?.code}.png`} alt="" />
                </IconRoundedContainer>
              ))}
            </section>
            <section className="text-right">
              <p className="text-dark-800 font-normal">{durationLabel}</p>
              <p className="text-dark-800 font-normal">{Math.floor(itemFlight?.elapsedTime / 60)}h {itemFlight?.elapsedTime - Math.floor(itemFlight?.elapsedTime / 60) * 60}m</p>
            </section>
          </section>
        </section>
      </section>

      <section className="flex flex-row gap-2 px-4 py-3 lg:py-6 justify-between">
        <section className="grid place-items-center">
          <section className="border border-dark-300 rounded px-3 py-2 text-lg text-dark-1000 font-bold mb-2">{itemFlight?.flightSegment[0]?.departureAirport?.locationCode}</section>
          <p className="text-center text-base text-dark-800 font-normal p-0 m-0">{moment(itemFlight?.flightSegment[0]?.departureDateTime).format('hh:mm A')}</p>
          <p className="text-center text-dark-800 font-normal p-0 m-0">{itemFlight?.flightSegment[0]?.departureAirport?.locationCode}</p>
        </section>
        <section className="flex flex-col grow">
          <section className="relative text-center text-dark-1000 font-normal border-b-2 border-primary-1000 py-3 whitespace-nowrap">
            {itemFlight?.flightSegment.length - 1} {stopsLabel}
            {itemFlight?.flightSegment.map((segment, index) => index > 0 && (
              <section key={`stop_${index}`} className={`absolute bottom-[-7px] left-[calc(${index * Math.floor(100 / itemFlight?.flightSegment.length)}%-6px)] bg-white border-2 border-primary-1000 rounded-full w-[13px] h-[13px]`} />
            ))}
          </section>
        </section>
        <section className="grid place-items-center">
          <section className="border border-dark-300 rounded px-3 py-2 text-lg text-dark-1000 font-bold mb-2">{itemFlight?.flightSegment[itemFlight?.flightSegment.length - 1]?.arrivalAirport?.locationCode}</section>
          <p className="text-center text-base text-dark-800 font-normal p-0 m-0">{moment(itemFlight?.flightSegment[itemFlight?.flightSegment.length - 1]?.arrivalDateTime).format('hh:mm A')}</p>
          <p className="text-center text-dark-800 font-normal p-0 m-0">{itemFlight?.flightSegment[itemFlight?.flightSegment.length - 1]?.arrivalAirport?.locationCode}</p>
        </section>
      </section>

      <section className="text-right px-4 pb-4">
        <p className="text-primary-1000 font-normal underline cursor-pointer">{flightDetailsLabel}</p>
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
