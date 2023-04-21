import useQuery from 'hooks/pageInteraction/useQuery';
import React, { useState } from 'react';
import { CategoryPageComponentProps } from 'types/global/CategoryPageComponent';
import FlightsBreadcrumbs from '../FlightsBreadcrumbs/FlightsBreadcrumbs';
import FlightDetails from '../FlightDetails/FlightDetails';
import { Pricing } from '@simplenight/ui';
import { Flight } from 'flights/types/response/SearchResponse';
import HorizontalItemCard from '../search/HorizontalItemCard/HorizontalItemCard';
import { flightsListMock } from 'flights/flightsListMock';
import Divider from 'components/global/Divider/Divider';
import Passenger from '../passenger/Passenger';

type FlightDetailDisplayProps = CategoryPageComponentProps;

const PassengerInformationDisplay = ({
  Category,
}: FlightDetailDisplayProps) => {
  const { id } = useQuery();
  const [passengerForm, setPassengerForm] = useState(2);

  const getPricing = () => (
    <Pricing>
      <Pricing.Total totalAmount="US$999.00" />
      <Pricing.TaxesAndFees />
    </Pricing>
  );

  return (
    <>
      <FlightsBreadcrumbs step={2} content={<h6>Passenger Information</h6>} />
      <section className="flex w-full justify-between max-w-7xl mx-auto mt-[64px] pt-6">
        <section>
          <FlightDetails
            key={'12345'}
            departure={'BUE'}
            arrival={'CHI'}
            dateTime="Mar 25, 2023 to Mar 31, 2023"
            type="Roundtrip"
          />
        </section>
        <section>{getPricing()}</section>
      </section>
      <section className="flex w-full max-w-7xl mx-auto mt-3">
        <ul role="list" className="w-full">
          {flightsListMock.map((flight: Flight, index: number) => (
            <HorizontalItemCard key={`flight_${index}`} item={flight} />
          ))}
        </ul>
      </section>
      <Divider className="py-12" />
      <section className="flex flex-col w-full max-w-7xl mx-auto pb-12  gap-6">
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
