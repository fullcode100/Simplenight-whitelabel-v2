import React, { useState } from 'react';
import { CategoryPageComponentProps } from 'types/global/CategoryPageComponent';
import FlightsBreadcrumbs from '../FlightsBreadcrumbs/FlightsBreadcrumbs';
import FlightDetails from '../FlightDetails/FlightDetails';
import {
  Button,
  Heading,
  IconWrapper,
  Paragraph,
  Pricing,
} from '@simplenight/ui';
import HorizontalItemCard from '../search/HorizontalItemCard/HorizontalItemCard';
import Divider from 'components/global/Divider/Divider';
import Passenger from '../passenger/Passenger';
import { formatDate } from 'flights/utils';
import useQuery from 'hooks/pageInteraction/useQuery';
import { useTranslation } from 'react-i18next';
import { useFlightsStore } from 'hooks/flights/useFligthsStore';
import { usePassengersStore } from 'hooks/flights/usePassengersStore';
import { GenderEnum, IPassenger } from '../passenger/inputs';
import { useRouter } from 'next/router';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';

import ArrowLeft from 'public/icons/assets/flights/arrow_left.svg';
import { bookingAdapter } from 'flights/adapters/booking.adapter';
import { validateBooking } from 'core/client/services/BookingService';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePassengerSchema } from 'flights/hooks/usePassengerSchema';

type FlightDetailDisplayProps = CategoryPageComponentProps;

const PassengerInformationDisplay = ({
  Category,
}: FlightDetailDisplayProps) => {
  const { id } = useQuery();
  const router = useRouter();
  const [t, i18next] = useTranslation('flights');
  const [passengerForm, setPassengerForm] = useState<number | null>(0);

  const flights = useFlightsStore((state) => state.flights);
  const flight = flights[flights.length - 1];
  const { passengersQuantity, setPassengers } = usePassengersStore(
    (state) => state,
  );

  const [isLoading, setIsLoading] = useState(false);

  const getDefaultPassengersInfo = () => {
    const defaultValues: IPassenger[] = [];
    const defaultPassengerObject: IPassenger = {
      firstName: '',
      middleName: '',
      lastName: '',
      dateOfBirth: new Date(),
      countryOfResidence: '',
      loyaltyProgram: '',
      loyaltyNumber: '',
      gender: GenderEnum.male,
      passportIdNumber: '',
      country: '',
      expiration: new Date(),
      wheelChair: false,
      vaccinationRecords: false,
      knownTravelerNumber: false,
      passengerNumber: 0,
    };
    for (let i = 0; i < passengersQuantity; i++) {
      defaultPassengerObject.passengerNumber = i;
      defaultValues.push(defaultPassengerObject);
    }
    return defaultValues;
  };

  const { passengerFormSchema } = usePassengerSchema();

  const methods = useForm({
    defaultValues: {
      passengers: getDefaultPassengersInfo(),
    },
    resolver: zodResolver(passengerFormSchema),
    mode: 'all',
  });

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = methods;

  const { fields } = useFieldArray({
    control,
    name: 'passengers',
  });

  if (!flight) {
    return null;
  }

  const getPricing = () => (
    <Pricing>
      <Pricing.Total
        totalAmount={`US$${flight.offer?.totalFareAmount || '0'}`}
      />
      <Pricing.TaxesAndFees />
    </Pricing>
  );

  const handlePassengerAccordion = (i: number) => {
    if (passengerForm !== null && passengerForm === i) {
      setPassengerForm(null);
    } else {
      setPassengerForm(i);
    }
  };

  const goToCheckout = async (data: { passengers: IPassenger[] }) => {
    const { passengers } = data;
    setPassengers(passengers);
    const bookingParameters = bookingAdapter({
      flights,
      passengers,
      apiUrl: '/flights/bookings/validate',
    });

    setIsLoading(true);
    await validateBooking(bookingParameters, i18next);
    setIsLoading(false);

    router.push('/checkout/flights', undefined, { shallow: true });
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
      <FormProvider {...methods}>
        <form className="flex flex-col w-full gap-6 pb-12 mx-auto max-w-7xl px-5 md:px-0 ">
          {fields.map((field, index) => (
            <Passenger
              key={field.id}
              passengerNumber={index}
              open={passengerForm === index}
              toggleOpen={(passengerNumber) =>
                handlePassengerAccordion(passengerNumber)
              }
              passengersQuantity={passengersQuantity}
            />
          ))}
          {passengerForm === passengersQuantity - 1 && (
            <section className="flex flex-col gap-2 md:flex-row md:justify-end md:gap-6">
              <div className="flex justify-between ">
                <Paragraph className="md:hidden">Total</Paragraph>
                {getPricing()}
              </div>
              <Button
                loading={isLoading}
                disabled={!isValid}
                onClick={handleSubmit((data) => goToCheckout(data))}
              >
                Book now
              </Button>
            </section>
          )}
        </form>
      </FormProvider>
    </>
  );
};

export default PassengerInformationDisplay;
