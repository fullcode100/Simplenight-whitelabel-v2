import React, { useState } from 'react';
import { CategoryPageComponentProps } from 'types/global/CategoryPageComponent';
import FlightsBreadcrumbs from '../FlightsBreadcrumbs/FlightsBreadcrumbs';
import FlightDetails from '../FlightDetails/FlightDetails';
import { Pricing } from '@simplenight/ui';
import { Flight } from 'flights/types/response/FlightSearchResponse';
import HorizontalItemCard from '../search/HorizontalItemCard/HorizontalItemCard';
import Divider from 'components/global/Divider/Divider';
import Passenger from '../passenger/Passenger';
import { useSelector } from 'react-redux';
import { formatDate } from 'flights/utils';
import useQuery from 'hooks/pageInteraction/useQuery';
import { useTranslation } from 'react-i18next';
import { useFlightsStore } from 'hooks/flights/useFligthsStore';

type FlightDetailDisplayProps = CategoryPageComponentProps;

const PassengerInformationDisplay = ({
  Category,
}: FlightDetailDisplayProps) => {
  const { id } = useQuery();
  const [t, i18next] = useTranslation('flights');
  const [passengerForm, setPassengerForm] = useState(1);
  const flights = useFlightsStore((state) => state.flights);
  const flight = flights[0];
  // const { flight }: { flight?: Flight } = useSelector(
  //   ({ flights }: any) => flights,
  // );

  if (!flight) {
    return null;
  }

  const getPricing = () => (
    <Pricing>
      <Pricing.Total
        totalAmount={flight.availability.rate.total.net.formatted}
      />
      <Pricing.TaxesAndFees />
    </Pricing>
  );

  return (
    <>
      <FlightsBreadcrumbs step={2} content={<h6>Passenger Information</h6>} />
      <section className="flex w-full justify-between max-w-7xl mx-auto mt-[64px] pt-6">
        <section>
          <FlightDetails
            departure={flight.departure.iata_code}
            departureDate={formatDate(flight.availability.departure_date)}
            arrival={flight.arrival.iata_code}
            arrivaDate={formatDate(flight.availability.arrival_date)}
            type={t(id as string)}
          />
        </section>
        <section>{getPricing()}</section>
      </section>
      <section className="flex w-full mx-auto mt-3 max-w-7xl">
        <ul role="list" className="w-full">
          {flights?.map((itemFlight, index) => (
            <HorizontalItemCard key={index} item={itemFlight} />
          ))}
        </ul>
      </section>
      <Divider className="py-12" />
      <section className="flex flex-col w-full gap-6 pb-12 mx-auto max-w-7xl">
        <Passenger
          passengerNumber={1}
          open={passengerForm === 1}
          setOpen={setPassengerForm}
          onSubmit={() => setPassengerForm(2)}
        />
        <Passenger
          passengerNumber={2}
          open={passengerForm === 2}
          setOpen={setPassengerForm}
          onSubmit={() => setPassengerForm(2)}
          pricing={getPricing()}
          lastPassenger={passengerForm === 2}
        />
      </section>
    </>
  );
};

export default PassengerInformationDisplay;
