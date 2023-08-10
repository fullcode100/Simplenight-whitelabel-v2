import { IconWrapper, Paragraph } from '@simplenight/ui';
import React from 'react';
import { useTranslation } from 'react-i18next';
import IconOneWay from 'public/icons/assets/flights/one_way.svg';
import IconMultiCity from 'public/icons/assets/flights/multicity.svg';
import IconRoundTrip from 'public/icons/assets/flights/round_trip.svg';
import IconTravelers from 'public/icons/assets/flights/travelers.svg';
import IconLocation from 'public/icons/assets/flights/location.svg';
import IconCalendar from 'public/icons/assets/flights/calendar.svg';
import Divider from 'components/global/Divider/Divider';
import dayjs from 'dayjs';
import { Search } from 'hooks/flights/useSearchStore';
import { usePlural } from 'hooks/stringBehavior/usePlural';
import { FlightItem } from 'flights/types/response/FlightSearchResponseMS';
import { PlusIcon } from '@heroicons/react/outline';
import { IPassenger } from 'flights/components/passenger/inputs';

interface Props {
  flights: FlightItem[];
  passengers: IPassenger[];
}
const FlightsCheckoutBody = ({ flights, passengers }: Props) => {
  const [t] = useTranslation('flights');
  const segmentsLength = flights[0].segments.collection.length;
  const stops = segmentsLength - 1;
  const stopsLabel = usePlural(stops, t('stop', 'Stop'), t('stops', 'Stops'));
  const departureFlightLabel = t('departureFlight', 'Departure Flight');
  const returnFlightLabel = t('returnFlight', 'Return Flight');
  const directLabel = t('directLabel', 'Direct');

  const payNowLabel = t('payNow', 'Pay Now');
  const taxesLabel = t('taxes', 'Taxes');
  const otherFeesLabel = t('otherFees', 'Other Fees');

  const adults = passengers.filter(
    (v: any) => v.passengerType === 'ADT',
  ).length;
  const children = passengers.filter(
    (v: any) => v.passengerType === 'CNN',
  ).length;
  const infants = passengers.filter(
    (v: any) => v.passengerType === 'INF',
  ).length;

  const direction = flights.length === 1 ? 'one_way' : 'round_trip';

  const firstFlight = flights[0].segments;
  const lastFlight = flights[flights.length - 1].segments;
  const startAirport = firstFlight.collection[0].departureAirport;
  const endAirport =
    direction === 'round_trip'
      ? lastFlight.collection[0].departureAirport
      : lastFlight.collection[0].arrivalAirport;

  const totalFlightAmount =
    flights[flights.length - 1].offer?.totalFareAmount || '0';

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

  const firstFlightOffer = flights[0].offer;
  const firstFlightTax = Number(firstFlightOffer.totalTaxAmount);
  const firstFlightFare =
    Number(firstFlightOffer.totalFareAmount) - firstFlightTax;
  const lastFlightOffer = flights[flights.length - 1].offer;
  const lastFlightTax =
    Number(lastFlightOffer.totalTaxAmount) -
    Number(firstFlightOffer.totalTaxAmount);
  const lastFlightFare =
    Number(lastFlightOffer.totalFareAmount) -
    Number(firstFlightOffer.totalFareAmount) -
    lastFlightTax;
  const totalTaxes = lastFlightOffer.totalTaxAmount;
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
    <div className="space-y-4">
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
            {stops ? `${stops} ${stopsLabel}` : directLabel}
          </Paragraph>
        </section>
        {/* TO DO : MODAL  Flight Details */}
      </section>
      <section className="flex justify-between">
        <IconAndLabel
          Icon={PlusIcon}
          label={flights[0].offer.cabinName}
          sublabel={departureFlightLabel}
        />
        <Pricing totalAmount={`US$${firstFlightFare.toFixed(2)}`} />
      </section>
      {flights.length === 2 ? (
        <section className="flex justify-between">
          <IconAndLabel
            Icon={PlusIcon}
            label={flights[0].offer.cabinName}
            sublabel={returnFlightLabel}
          />
          <Pricing totalAmount={`US$${lastFlightFare.toFixed(2)}`} />
        </section>
      ) : null}

      <section className="flex justify-between">
        <IconAndLabel Icon={PlusIcon} label={taxesLabel} />
        <Pricing totalAmount={`US$${totalTaxes}`} />
      </section>
      <section className="flex justify-between">
        <IconAndLabel Icon={PlusIcon} label={otherFeesLabel} />
        <Pricing totalAmount={'US$0.00'} />
      </section>

      <Divider></Divider>
      <section className="flex justify-between py-2">
        <Paragraph size="small" fontWeight="semibold">
          {payNowLabel}
        </Paragraph>
        <Pricing totalAmount={`US$${totalFlightAmount}`} />
      </section>
    </div>
  );
};

export default FlightsCheckoutBody;
