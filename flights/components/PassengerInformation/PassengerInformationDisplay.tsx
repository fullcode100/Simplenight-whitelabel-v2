import React, { useEffect, useState } from 'react';
import { CategoryPageComponentProps } from 'types/global/CategoryPageComponent';
import FlightsBreadcrumbs from '../FlightsBreadcrumbs/FlightsBreadcrumbs';
import FlightDetails from '../FlightDetails/FlightDetails';
import { Button, Pricing } from '@simplenight/ui';
import HorizontalItemCard from '../search/HorizontalItemCard/HorizontalItemCard';
import Divider from 'components/global/Divider/Divider';
import Passenger from '../passenger/Passenger';
import { formatDate } from 'flights/utils';
import useQuery from 'hooks/pageInteraction/useQuery';
import { useTranslation } from 'react-i18next';
import { useFlightsStore } from 'hooks/flights/useFligthsStore';
import { usePassengersStore } from 'hooks/flights/usePassengersStore';
import { IPassenger } from '../passenger/inputs';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

type FlightDetailDisplayProps = CategoryPageComponentProps;

const PassengerInformationDisplay = ({
  Category,
}: FlightDetailDisplayProps) => {
  const { id } = useQuery();
  const router = useRouter();
  const [t, i18next] = useTranslation('flights');
  const [tg] = useTranslation('global');
  const bookNowLabel = tg('bookNow', 'Book now');
  const [passengerForm, setPassengerForm] = useState(1);
  const flights = useFlightsStore((state) => state.flights);
  const flight = flights[flights.length - 1];
  const { passengersQuantity, setPassengers, passengers } = usePassengersStore(
    (state) => state,
  );
  const [passengersData, setPassengerData] = useState<IPassenger[]>([]);

  useEffect(() => {
    setPassengers(passengersData);
    console.log(passengersData);
  }, [passengersData]);

  if (!flight) {
    return null;
  }

  const getPricing = () => (
    <Pricing>
      <Pricing.Total totalAmount={flight.offers?.[0].totalAmount || '0'} />
      <Pricing.TaxesAndFees />
    </Pricing>
  );

  const savePassenger = (currentData: IPassenger) => {
    console.log(currentData);
    setPassengerForm(passengerForm + 1);
    setPassengerData((data) => [...data, currentData]);
  };

  const goCheckout = (currentData: IPassenger) => {
    savePassenger(currentData);
    router.replace('/checkout/flights');
  };

  const getPassengersInfoForms = () => {
    const passengersInfoForms = [];
    for (let i = 1; i <= passengersQuantity; i++) {
      passengersInfoForms.push(
        <Passenger
          passengerNumber={i}
          open={passengerForm === i}
          setOpen={setPassengerForm}
          onSubmit={
            passengerForm === passengersQuantity ? goCheckout : savePassenger
          }
          pricing={getPricing()}
          /* lastPassenger={passengerForm === passengersQuantity} */
          passengersData={passengersData}
          passengersQuantity={passengersQuantity}
        />,
      );
    }
    return passengersInfoForms;
  };

  const firstSegment = flight.segments.collection?.[0];
  const lastSegment =
    flight.segments.collection?.[flight.segments.collection.length - 1];

  return (
    <>
      <FlightsBreadcrumbs step={2} content={<h6>Passenger Information</h6>} />
      <section className="flex w-full justify-between max-w-7xl mx-auto mt-[64px] pt-6">
        <section>
          <FlightDetails
            departure={firstSegment?.departureAirport || ''}
            departureDate={formatDate(firstSegment?.departureDateTime || '')}
            arrival={lastSegment?.arrivalAirport || ''}
            arrivaDate={formatDate(lastSegment?.arrivalDateTime || '')}
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
        {getPassengersInfoForms()}
      </section>
    </>
  );
};

export default PassengerInformationDisplay;
