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
import { Item } from 'types/booking/bookingType';
import SupplierReference from 'flights/components/SupplierReference/SupplierReference';

interface Props {
  item?: Item;
}
const FlightsConfirmationBody = ({ item }: Props) => {
  const [t] = useTranslation('flights');
  const flights = item?.item_data.booking.segments;
  const segmentsLength = flights[0].collection.length;
  const stops = segmentsLength - 1;
  const stopsLabel = usePlural(stops, t('stop', 'Stop'), t('stops', 'Stops'));
  const basePriceLabel = t('basePrice', 'Base Price');
  const directLabel = t('directLabel', 'Direct');

  const payNowLabel = t('payNow', 'Pay Now');
  const taxesLabel = t('taxes', 'Taxes');
  const otherFeesLabel = t('otherFees', 'Other Fees');

  const supplierReferenceID = item?.supplier_order_number;

  const direction =
    item?.item_data.booking.segments.lenght === 1 ? 'one_way' : 'round_trip';
  const firstFlight = flights[0];
  const lastFlight = flights[flights.length - 1];
  const startAirport = firstFlight.collection[0].departureAirport;
  const endAirport = lastFlight.collection[0].arrivalAirport;

  const totalFlightAmount = item?.rate.total.full;
  const totalFlightTaxes = item?.rate.taxes.full.amount;
  const offer = item?.item_data.booking.offer;

  let infants = 0;

  const adults = item?.item_data.booking.passengers.filter((v: any) => {
    const isAdult = v.type === 'ADT';
    if (isAdult && v.lapInfant) {
      infants++;
    }
    return isAdult;
  }).length;
  const children = item?.item_data.booking.passengers.filter(
    (v: any) => v.type === 'CNN',
  ).length;

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
      {supplierReferenceID && (
        <SupplierReference supplierReferenceID={supplierReferenceID} />
      )}
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
        <IconAndLabel Icon={PlusIcon} label={basePriceLabel} />
        <Pricing
          totalAmount={`${totalFlightAmount.currency}${totalFlightAmount.formatted}`}
        />
      </section>
      <section className="flex justify-between">
        <IconAndLabel Icon={PlusIcon} label={taxesLabel} />
        <Pricing
          totalAmount={`${totalFlightTaxes.currency}${totalFlightTaxes.formatted}`}
        />
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
        <Pricing
          totalAmount={`${totalFlightAmount.currency}${totalFlightAmount.formatted}`}
        />
      </section>
    </div>
  );
};

export default FlightsConfirmationBody;
