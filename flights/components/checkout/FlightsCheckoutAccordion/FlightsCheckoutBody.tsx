import { IconWrapper, Paragraph } from '@simplenight/ui';
import React from 'react';
import { useTranslation } from 'react-i18next';
import IconTravelers from 'public/icons/assets/flights/travelers.svg';
import IconLocation from 'public/icons/assets/flights/location.svg';
import Divider from 'components/global/Divider/Divider';
import { PlusIcon } from '@heroicons/react/outline';
import { useFlights } from 'flights/hooks/useFlights/useFlights';

const FlightsCheckoutBody = () => {
  const [t] = useTranslation('flights');
  const departureFlightLabel = t('departureFlight', 'Departure Flight');
  const returnFlightLabel = t('returnFlight', 'Return Flight');

  const payNowLabel = t('payNow', 'Pay Now');
  const taxesLabel = t('taxes', 'Taxes');
  const otherFeesLabel = t('otherFees', 'Other Fees');
  const offLabel = t('off', 'Off');

  const { flightInfo, isRoundTrip } = useFlights();

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
              {percentageOff} {offLabel}
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
      <IconAndLabel Icon={IconTravelers} label={flightInfo.paxMixLabel} />

      <section className="flex gap-2 ">
        <IconWrapper size={20}>
          <IconLocation className="text-primary-1000" />
        </IconWrapper>
        <section className="w-full">
          <section className="flex flex-row gap-1">
            <Paragraph size="small">{flightInfo.startAirport}</Paragraph>
            <IconWrapper size={20}>{flightInfo.directionIcon}</IconWrapper>
            <Paragraph size="small">{flightInfo.endAirport}</Paragraph>
          </section>
          <Paragraph
            size="small"
            fontWeight="semibold"
            textColor="text-dark-800"
          >
            {flightInfo.stopsText}
          </Paragraph>
        </section>
        {/* TO DO : MODAL  Flight Details */}
      </section>
      <section className="flex justify-between">
        <IconAndLabel
          Icon={PlusIcon}
          label={flightInfo.startCabinName}
          sublabel={departureFlightLabel}
        />
        <Pricing totalAmount={flightInfo.startFlightFareAmount} />
      </section>
      {isRoundTrip ? (
        <section className="flex justify-between">
          <IconAndLabel
            Icon={PlusIcon}
            label={flightInfo.endCabinName}
            sublabel={returnFlightLabel}
          />
          <Pricing totalAmount={flightInfo.endFlightFareAmount} />
        </section>
      ) : null}

      <section className="flex justify-between">
        <IconAndLabel Icon={PlusIcon} label={taxesLabel} />
        <Pricing totalAmount={flightInfo.totalTaxesAmount} />
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
        <Pricing totalAmount={flightInfo.totalAmount} />
      </section>
    </div>
  );
};

export default FlightsCheckoutBody;
