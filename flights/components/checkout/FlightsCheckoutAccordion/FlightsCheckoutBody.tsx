import { IconWrapper, Paragraph } from '@simplenight/ui';
import React, { ReactComponentElement } from 'react';
import { useTranslation } from 'react-i18next';
import IconOneWay from 'public/icons/assets/flights/one_way.svg';
import IconMultiCity from 'public/icons/assets/flights/multicity.svg';
import IconRoundTrip from 'public/icons/assets/flights/round_trip.svg';
import IconTravelers from 'public/icons/assets/flights/travelers.svg';
import IconLocation from 'public/icons/assets/flights/location.svg';
import IconCalendar from 'public/icons/assets/flights/calendar.svg';
import PlusIcon from 'public/icons/assets/Plus.svg';
import Divider from 'components/global/Divider/Divider';
import { Flight } from 'flights/types/response/FlightSearchResponse';
import dayjs from 'dayjs';
import { Search } from 'hooks/flights/useSearchStore';
import { usePlural } from 'hooks/stringBehavior/usePlural';

interface Props {
  flight: Flight;
  search: Search;
}
const FlightsCheckoutBody = ({ flight, search }: Props) => {
  const [t] = useTranslation('flights');
  const stops =
    flight.availability.outbound.stops + flight.availability.inbound.stops;
  const stopsLabel = usePlural(stops, t('stop', 'Stop'), t('stops', 'Stops'));

  const payNowLabel = t('payNow', 'Pay Now');

  const { direction, startAirport, endAirport, adults, children, infants } =
    search;

  const totalFlightAmount = flight.availability.rate.total.full.formatted;

  const adultsAmount = Number(adults);
  const adultsText = usePlural(
    adultsAmount,
    t('adult', 'Adult'),
    t('adults', 'Adults'),
  );
  const childrenAmount = Number(children);
  const childrenText = usePlural(
    childrenAmount,
    t('child', 'Child'),
    t('children', 'Children'),
  );
  const infantsAmount = Number(infants);
  const infantsText = usePlural(
    infantsAmount,
    t('infant', 'Infant'),
    t('infants', 'Infants'),
  );
  const tickets = adultsAmount + childrenAmount + infantsAmount;

  const getPaxMixLabel = () => {
    const adultsLabel = `${adultsAmount} ${adultsText}`;
    const childrenLabel =
      childrenAmount > 0 ? `, ${childrenAmount} ${childrenText}` : '';
    const infantsLabel =
      infantsAmount > 0 ? `, ${infantsAmount} ${infantsText}` : '';

    return adultsLabel + childrenLabel + infantsLabel;
  };
  const paxMix = getPaxMixLabel();

  const directionMapper = {
    one_way: {
      icon: <IconOneWay />,
      label: t('one_way', 'One-way'),
    },
    multicity: {
      icon: <IconMultiCity />,
      label: t('multicity', 'Multi-city'),
    },
    round_trip: {
      icon: <IconRoundTrip />,
      label: t('round_trip', 'Round-Trip'),
    },
  };

  console.log(flight);

  const FlightItinerary = () => {
    const departureLabel = t('departure', 'Departure');
    const returnLabel = t('return', 'Return');
    const departureDate = dayjs(flight.availability.departure_date).format(
      'MMM D, YYYY',
    );
    const departureTime = dayjs(flight.availability.departure_date).format(
      'HH:MM A',
    );
    const arrivalDate = dayjs(flight.availability.arrival_date).format(
      'MMM D, YYYY',
    );
    const arrivalTime = dayjs(flight.availability.arrival_date).format(
      'HH:MM A',
    );
    return (
      <div className="space-y-2">
        <IconAndLabel
          Icon={IconCalendar}
          label={`${departureDate} at ${departureTime} `}
          sublabel={departureLabel}
        />
        {direction === 'round_trip' && (
          <IconAndLabel
            Icon={IconCalendar}
            label={`${arrivalDate} at ${arrivalTime} `}
            sublabel={returnLabel}
          />
        )}
      </div>
    );
  };

  interface IconsAndLabelProps {
    Icon: any;
    label: string;
    sublabel?: string;
  }

  const IconAndLabel = ({ Icon, label, sublabel }: IconsAndLabelProps) => {
    return (
      <section className="flex gap-2">
        <IconWrapper size={20}>
          <Icon className="text-primary-1000" />
        </IconWrapper>
        <section>
          {sublabel && (
            <Paragraph fontWeight="semibold" textColor="text-dark-700">
              {sublabel}
            </Paragraph>
          )}
          <Paragraph size="small">{label}</Paragraph>
        </section>
      </section>
    );
  };

  interface PricingProps {
    fullAmount?: string;
    percentageOff?: string;
    totalAmount: string;
  }

  const Pricing = ({
    fullAmount,
    percentageOff,
    totalAmount,
  }: PricingProps) => {
    return (
      <div className="text-right">
        {fullAmount && percentageOff && (
          <div className="flex gap-1">
            <Paragraph textColor="text-dark-700" className="line-through">
              {fullAmount}
            </Paragraph>
            <Paragraph className="text-green-1000" fontWeight="semibold">
              {percentageOff} Off
            </Paragraph>
          </div>
        )}
        <Paragraph size="small" fontWeight="semibold">
          {totalAmount}
        </Paragraph>
      </div>
    );
  };

  return (
    <div className="px-5 py-4 space-y-4">
      <Paragraph size="medium" fontWeight="semibold">
        {tickets}x {directionMapper[direction].label}
      </Paragraph>
      <IconAndLabel Icon={IconTravelers} label={paxMix} />

      <section className="flex gap-2 ">
        <IconWrapper size={20}>
          <IconLocation className="text-primary-1000" />
        </IconWrapper>
        <section className="w-full">
          <section className="flex flex-row gap-1">
            <Paragraph size="small">{startAirport}</Paragraph>
            <IconWrapper size={20}>
              {directionMapper[direction].icon}
            </IconWrapper>
            <Paragraph size="small">{endAirport}</Paragraph>
          </section>
          <Paragraph
            size="small"
            fontWeight="semibold"
            textColor="text-dark-800"
          >
            {stops} {stopsLabel}
          </Paragraph>
        </section>
        {/* TO DO : MODAL  Flight Details */}
      </section>
      <FlightItinerary />

      {/*  Currently we are not receiveing rates per fare or additional fares (ie: Special Baggage)  
      when we do we can use the components commented below
      */}
      {/*     
      <section className="space-y-2">
        <section className="flex justify-between">
          <IconAndLabel
            Icon={PlusIcon}
            label={fare}
            sublabel={departureFlightLabel}
          />
          <Pricing
            totalAmount={totalFareAmount}
            percentageOff={hasDiscount ? percentageOff : undefined}
            fullAmount={fullFareAmount}
          />
        </section>
        <section className="flex justify-between">
          <IconAndLabel Icon={PlusIcon} label={specialBaggage} />
          <Pricing totalAmount={fullFareAmount} />
        </section>
      </section> */}
      <Divider></Divider>
      <section className="flex justify-between pt-2">
        <Paragraph size="small" fontWeight="semibold">
          {payNowLabel}
        </Paragraph>
        <Pricing totalAmount={totalFlightAmount} />
      </section>
    </div>
  );
};

export default FlightsCheckoutBody;
