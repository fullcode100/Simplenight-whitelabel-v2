import { IconWrapper, Paragraph } from '@simplenight/ui';
import React, { ReactComponentElement } from 'react';
import { useTranslation } from 'react-i18next';
import IconOneWay from 'public/icons/assets/flights/one_way.svg';
import IconMultiCity from 'public/icons/assets/flights/multi_city.svg';
import IconRoundTrip from 'public/icons/assets/flights/round_trip.svg';
import IconTravelers from 'public/icons/assets/flights/travelers.svg';
import IconLocation from 'public/icons/assets/flights/location.svg';
import IconCalendar from 'public/icons/assets/flights/calendar.svg';
import PlusIcon from 'public/icons/assets/Plus.svg';
import Divider from 'components/global/Divider/Divider';
import { Flight } from 'flights/types/response/FlightSearchResponse';
import dayjs from 'dayjs';

const FlightsCheckoutBody = ({ flight }: { flight: Flight }) => {
  const [t] = useTranslation('flights');
  const stopsLabel = t('stops', 'Stops');
  const departureLabel = t('departure', 'Departure');
  const departureFlightLabel = t('departureFlight', 'Departure Flight');
  const payNowLabel = t('payNow', 'Pay Now');

  const startAirport = flight.departure.iata_code;
  const endAirport = flight.arrival.iata_code;
  const stops = flight.availability.outbound.stops;
  const departureDate = dayjs(flight.availability.departure_date).format(
    'MMM D, YYYY',
  );
  const departureTime = dayjs(flight.availability.departure_date).format(
    'HH:MM A',
  );
  const hasDiscount =
    flight.availability.rate.discounts.amount_to_apply.amount > 0;
  const percentageOff =
    flight.availability.rate.discounts.amount_to_apply.formatted;
  const totalFlightAmount = flight.availability.rate.total.full.formatted;

  // TODO: Replace mocked data

  const direction = 'one_way';
  // should be updated once valdimirs pr is ready

  const tickets = 2;
  // should be updated once alejandros pr which saves passenger info in zustand is done

  const fullFareAmount = 'US$160.00';
  const totalFareAmount = 'US$145.00';

  const fare = 'Classic Fare';
  const specialBaggage = '2x Special Baggage';

  const directionMapper = {
    one_way: {
      icon: <IconOneWay />,
      label: t('one_way', 'One-way'),
    },
    multi_city: {
      icon: <IconMultiCity />,
      label: t('multi_city', 'Multi-city'),
    },
    round_trip: {
      icon: <IconRoundTrip />,
      label: t('round_trip', 'Round-Trip'),
    },
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
      <IconAndLabel Icon={IconTravelers} label={`${tickets} tickets`} />
      {/* TODO: we should displpay ageband ie(adults,children, infants) instead of "tickets" once we gather that info */}
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
      <IconAndLabel
        Icon={IconCalendar}
        label={`${departureDate} at ${departureTime} EST`}
        sublabel={departureLabel}
      />
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
