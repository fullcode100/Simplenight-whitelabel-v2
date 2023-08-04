import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, IconWrapper, Paragraph } from '@simplenight/ui';
import Divider from 'components/global/Divider/Divider';
import useMediaViewport from 'hooks/media/useMediaViewport';
import ChevronDownIcon from 'public/icons/assets/chevron-down.svg';

import CardCollapsable from './components/CardCollapsable';
import classnames from 'classnames';
import FlightAirlines from './components/FlightAirilines';
import TimeAndAirports from './components/TimeAndAirports';
import DurationAndStops from './components/DurationAndStops';
import InclusionsAndExclusions from './components/InclusionsAndExclusions';
import Pricing from './components/Pricing';
import { FlightItem } from 'flights/types/response/FlightSearchResponseMS';
import FlightDepartureIcon from 'public/icons/assets/flights/flight-departure.svg';
import CloseIcon from 'public/icons/assets/close.svg';
import dayjs from 'dayjs';
import { FLIGHT_DEBUG } from 'flights';

interface CardProps {
  item: FlightItem;
  price?: string;
  selectFlight?: (flight: FlightItem) => void;
  directionLabel?: string;
  onClose?: () => void;
  basic?: boolean;
  newPrice?: string;
}

const HorizontalItemCard = ({
  item,
  price,
  selectFlight,
  directionLabel,
  onClose,
  basic,
  newPrice,
}: CardProps) => {
  const { isDesktop } = useMediaViewport();
  const [isExpanded, setIsExpanded] = useState(false);
  const segments = item.segments.collection || [];

  const onSelectFlight = () => {
    if (selectFlight) {
      selectFlight(item);
    }
  };

  const DesktopCard = () => {
    return (
      <section onClick={() => setIsExpanded((expanded) => !expanded)}>
        <section className="flex">
          {/* TODO: for debug and testing  */}
          {FLIGHT_DEBUG && `#${item.legId}`}
          <div className="flex flex-1 gap-4 px-4 py-2 overflow-hidden">
            <FlightAirlines segments={segments} />
            <TimeAndAirports segments={segments} />
            {!basic && (
              <>
                <DurationAndStops item={item} />
                <InclusionsAndExclusions item={item.segments} />
              </>
            )}
          </div>
          {selectFlight && <Pricing price={price} onClick={onSelectFlight} />}
          {!!newPrice && (
            <div className="flex items-center">
              <span className="text-error-1000 line-through pr-3">{price}</span>
              {newPrice !== '0.00' && (
                <span className="text-green-1000 text-[18px] pr-3">
                  {`US$${newPrice}`}
                </span>
              )}
            </div>
          )}
        </section>
        {isExpanded && <CardCollapsable segments={segments} />}
      </section>
    );
  };
  const MobileCard = () => {
    const [t] = useTranslation('flights');
    const selectLabel = t('select', 'Select');
    return (
      <section>
        <section
          className={classnames({
            'flex p-3  gap-2 border-b border-dark-300': directionLabel,
            hidden: !directionLabel,
            'relative pr-12': onClose,
          })}
        >
          <IconWrapper size={16}>
            <FlightDepartureIcon />
          </IconWrapper>
          <Paragraph fontWeight="semibold" className="w-full">
            {directionLabel}
          </Paragraph>
          <Paragraph className="shrink-0">
            {dayjs(item.segments.collection[0].departureDateTime).format(
              'MMM D, YYYY',
            )}
          </Paragraph>
          {onClose && (
            <section
              className="absolute right-2 inset-y-0 flex items-center z-10 w-[30px]"
              onClick={onClose}
            >
              <CloseIcon className="text-dark-700" />
            </section>
          )}
        </section>
        <section
          className="flex flex-col w-full"
          onClick={() => setIsExpanded((expanded) => !expanded)}
        >
          <section className="flex items-center gap-2 p-4 ">
            <div className="flex items-start grow">
              <FlightAirlines segments={segments} />
            </div>
            <DurationAndStops item={item} />
            <ChevronDownIcon
              className={classnames(
                'text-dark-700 h-6 transition-all',
                isExpanded && 'rotate-180',
              )}
            />
          </section>
          <Divider className="w-full" />
          {isExpanded ? (
            <CardCollapsable segments={segments} />
          ) : (
            <section className="p-4">
              <TimeAndAirports segments={segments} />
            </section>
          )}

          <Divider className="w-full" />
          <section className="flex items-center justify-between p-4">
            <div
              className={
                directionLabel
                  ? 'flex flex-row justify-between w-full'
                  : 'space-y-1'
              }
            >
              <Paragraph size="xxsmall" textColor="text-dark-700">
                Includes
              </Paragraph>
              <InclusionsAndExclusions item={item.segments} />
            </div>
            {selectFlight && <Pricing price={price} onClick={onSelectFlight} />}
          </section>
          {isExpanded && selectFlight && (
            <section className="flex items-center justify-between p-4">
              <Button size="small" onClick={onSelectFlight}>
                {selectLabel}
              </Button>
            </section>
          )}
        </section>
      </section>
    );
  };

  return (
    <>
      <li
        className={classnames(
          'border rounded cursor-pointer ',
          isExpanded && 'border-primary-1000',
        )}
      >
        {isDesktop ? <DesktopCard /> : <MobileCard />}
      </li>
    </>
  );
};

export default HorizontalItemCard;
