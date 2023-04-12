import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flight } from 'flights/types/response/SearchResponse';

import { Button, Paragraph } from '@simplenight/ui';
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

interface CardProps {
  item: Flight;
  selectFlight: (flight: Flight) => void;
}

const HorizontalItemCard = ({ item, selectFlight }: CardProps) => {
  const { isDesktop } = useMediaViewport();
  const [isExpanded, setIsExpanded] = useState(false);

  const DesktopCard = () => {
    return (
      <section onClick={() => setIsExpanded((expanded) => !expanded)}>
        <section className="flex">
          <div className="flex gap-4 px-4 py-2 flex-1 overflow-hidden">
            <FlightAirlines item={item} />
            <TimeAndAirports item={item} />
            <DurationAndStops item={item} />
            <InclusionsAndExclusions item={item} />
          </div>
          <Pricing item={item} onClick={selectFlight} />
        </section>
        {isExpanded && (
          <CardCollapsable collection={item.segments.collection} />
        )}
      </section>
    );
  };
  const MobileCard = () => {
    const [t] = useTranslation('flights');
    const selectLabel = t('select', 'Select');
    return (
      <section
        className="flex flex-col w-full"
        onClick={() => setIsExpanded((expanded) => !expanded)}
      >
        <section className="p-4 flex items-center gap-2 ">
          <div className="grow flex items-start">
            <FlightAirlines item={item} />
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
          <CardCollapsable collection={item.segments.collection} />
        ) : (
          <section className="p-4">
            <TimeAndAirports item={item} />
          </section>
        )}

        <Divider className="w-full" />
        <section className="p-4 flex justify-between items-center">
          <div className="space-y-1">
            <Paragraph size="xxsmall" textColor="text-dark-700">
              Includes
            </Paragraph>
            <InclusionsAndExclusions item={item} />
          </div>
          <Pricing item={item} onClick={selectFlight} />
        </section>
        {isExpanded && (
          <section className="p-4 flex justify-between items-center">
            <Button size="small" onClick={() => selectFlight(item)}>
              {selectLabel}
            </Button>
          </section>
        )}
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
