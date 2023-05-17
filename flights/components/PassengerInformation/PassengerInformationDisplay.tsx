import React, { useEffect, useState } from 'react';
import { CategoryPageComponentProps } from 'types/global/CategoryPageComponent';
import FlightsBreadcrumbs from '../FlightsBreadcrumbs/FlightsBreadcrumbs';
import FlightDetails from '../FlightDetails/FlightDetails';
import { Button, Heading, IconWrapper, Pricing } from '@simplenight/ui';
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

import ArrowLeft from 'public/icons/assets/flights/arrow_left.svg';
import { bookingAdapter } from 'flights/adapters/booking.adapter';
import { validateBooking } from 'core/client/services/BookingService';

type FlightDetailDisplayProps = CategoryPageComponentProps;

const PassengerInformationDisplay = ({
  Category,
}: FlightDetailDisplayProps) => {
  const { id } = useQuery();
  const router = useRouter();
  const [t, i18next] = useTranslation('flights');
  const [passengerForm, setPassengerForm] = useState(1);
  const flights = useFlightsStore((state) => state.flights);
  const flight = flights[flights.length - 1];
  const { passengersQuantity, setPassengers } = usePassengersStore(
    (state) => state,
  );
  const [passengersData, setPassengerData] = useState<IPassenger[]>([]);

  useEffect(() => {
    setPassengers(passengersData);
  }, [passengersData]);

  if (!flight) {
    return null;
  }

  const getPricing = () => (
    <Pricing>
      <Pricing.Total totalAmount={`US$${flight.offer?.totalAmount || '0'}`} />
      <Pricing.TaxesAndFees />
    </Pricing>
  );

  const savePassenger = (currentData: IPassenger, passengerNumber: number) => {
    setPassengerForm(passengerForm + 1);
    const passengerIndex = passengersData.findIndex(
      (p) => p.passengerNumber === passengerNumber,
    );

    if (passengerIndex >= 0) {
      const newData = [...passengersData];
      newData[passengerIndex] = { ...currentData, passengerNumber };
      setPassengerData(newData);
      return newData;
    }
    const newItem = [...passengersData, { ...currentData, passengerNumber }];
    setPassengerData(newItem);
    return newItem;
  };

  const goCheckout = async (
    currentData: IPassenger,
    passengerNumber: number,
  ) => {
    const passengers = savePassenger(currentData, passengerNumber);

    const bookingParameters = bookingAdapter({
      flights,
      passengers,
      apiUrl: '/flights/bookings/validate',
    });

    await validateBooking(bookingParameters, i18next);

    router.push('/checkout/flights', undefined, { shallow: true });
  };

  const getPassengersInfoForms = () => {
    const passengersInfoForms = [];
    for (let i = 1; i <= passengersQuantity; i++) {
      passengersInfoForms.push(
        <Passenger
          passengerNumber={i}
          open={passengerForm === i}
          setOpen={setPassengerForm}
          onSubmit={async (...params) => {
            passengerForm === passengersQuantity
              ? await goCheckout(...params)
              : savePassenger(...params);
          }}
          pricing={getPricing()}
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
      <FlightsBreadcrumbs
        step={2}
        content={
          <div className="px-4 md:p-0 flex gap-2 items-center">
            <button className="md:hidden" onClick={() => router.back()}>
              <IconWrapper size={24}>
                <ArrowLeft />
              </IconWrapper>
            </button>
            <Heading tag="h6">Passenger Information</Heading>
          </div>
        }
      />
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
        <section className="hidden md:block">{getPricing()}</section>
      </section>
      <section className="mx-auto mt-3 max-w-7xl p-4 md:p-0">
        <ul role="list" className="w-full space-y-4 md:space-y-0">
          {flights?.map((itemFlight, index) => (
            <HorizontalItemCard key={index} item={itemFlight} />
          ))}
        </ul>
      </section>
      <Divider className="py-12" />
      <section className="flex flex-col w-full gap-6 pb-12 mx-auto max-w-7xl px-5 md:px-0 ">
        {getPassengersInfoForms()}
      </section>
    </>
  );
};

export default PassengerInformationDisplay;
