/* eslint-disable camelcase */
// Libraries
import React, { ReactNode, useEffect, useState } from 'react';
// Components
import CheckoutFooter from 'components/checkout/CheckoutFooter/CheckoutFooter';
import Button from 'components/global/Button/Button';
import { useTranslation } from 'react-i18next';
// import { CartObjectResponse } from 'types/cart/CartType';
import { useRouter } from 'next/router';
import CheckoutHeader from 'components/checkout/CheckoutHeader/CheckoutHeader';
import Loader from '../../../components/global/Loader/Loader';
import { deepCopy } from 'helpers/objectUtils';
import HelpSection from 'components/global/HelpSection/HelpSection';
import FullScreenModal from 'components/global/NewModal/FullScreenModal';
import { useCustomer } from 'hooks/checkout/useCustomer';
import { ClientFormContent } from 'components/checkout/ClientForm/ClientFormContent';
import { FormProvider, useForm } from 'react-hook-form';
import {
  useCheckoutFormSchema,
  useClientQuestionsCheckoutFormSchema,
} from 'hooks/schemas/useCheckoutFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getItemQuestionSchemas } from 'thingsToDo/helpers/questions';
import FlightsCheckoutAccordion from 'flights/components/checkout/FlightsCheckoutAccordion/FlightsCheckoutAccordion';
import { useFlightsStore } from 'hooks/flights/useFligthsStore';
import BlockDivider from 'components/global/Divider/BlockDivider';
import { usePassengersStore } from 'hooks/flights/usePassengersStore';
import CheckoutSummary from 'flights/components/CheckoutSummary/CheckoutSummary';
import { Paragraph } from '@simplenight/ui';
import { IPassenger } from '../../../flights/components/passenger/inputs';

interface LayoutProps {
  children: ReactNode;
}

const Client = () => {
  const router = useRouter();
  const [t, i18n] = useTranslation('global');

  const [travelersFormSchema, setTravelersFormSchema] = useState<any>();
  const [isRemoved, setIsRemoved] = useState(false);
  const { checkOutFormSchema } = useCheckoutFormSchema();

  const flights = useFlightsStore((state) => state.flights);
  const passengers = usePassengersStore((state) => state.passengers);

  const passengerOptions = passengers.map((pass) => ({
    label: `${pass.firstName} ${pass.lastName}`,
    value: `${pass.firstName}${pass.lastName}`,
  }));

  const [selectedPassenger, setSelectedPassenger] = useState<IPassenger | null>(
    null,
  );

  const flight = flights[flights.length - 1];

  const [cart, setCart] = useState<any>();
  const schemas = cart?.items?.map((item: any) => {
    return getItemQuestionSchemas(item);
  });
  const baseValidationSchema = useClientQuestionsCheckoutFormSchema(schemas);

  const formSchema = checkOutFormSchema.merge(baseValidationSchema);
  type CheckoutFormSchema = z.infer<typeof formSchema>;
  const methods = useForm<CheckoutFormSchema>({
    resolver: zodResolver(formSchema),
    mode: 'onSubmit',
  });
  const { setValue } = methods;

  useEffect(() => {
    if (selectedPassenger) {
      setValue('firstName', selectedPassenger.firstName);
      setValue('lastName', selectedPassenger.lastName);
    }
  }, [selectedPassenger]);

  const handleChangePassenger = (selected: string) => {
    const selectedPassenger = passengers.find(
      ({ firstName, lastName }) => `${firstName}${lastName}` === selected,
    );
    setSelectedPassenger(selectedPassenger || null);
  };

  const [customer, updateCustomer] = useCustomer((state) => [
    state.customer,
    state.updateCustomer,
  ]);

  const [reload, setReload] = useState(false);
  const [loaded, setLoaded] = useState(true);

  const primaryContactText = t('passengerName', 'Passenger Name');
  const cancelButton = t('cancel', 'Cancel');
  const continueButton = t('continue', 'Continue');
  const continueShoppingText = t('continueShopping', 'Continue Shopping');

  const redirectToItinerary = () => {
    router.back();
  };

  const getAddCustomerRequestBody = (primaryContactData: any) => {
    const primaryContactCopy = deepCopy(primaryContactData);
    const request: any = { customer: primaryContactCopy };
    const phone = JSON?.parse?.(primaryContactCopy.phoneNumber || '{}');
    request.customer.phone_number =
      phone?.phone_number || customer?.phone_number;
    request.customer.phone_prefix =
      phone?.phone_prefix || customer?.phone_prefix;
    request.customer.country = phone?.country || customer?.country;

    delete request.customer.phone;
    delete request.customer.primary_contact;
    delete request.customer.phoneNumber;

    return { ...request };
  };

  const continueToPayment = async (values: any) => {
    const requestBody = getAddCustomerRequestBody(values);
    const customer = {
      country: requestBody.customer.country,
      email: requestBody.customer.email,
      first_name: requestBody.customer.firstName,
      last_name: requestBody.customer.lastName,
      phone_number: requestBody.customer.phone_number,
      phone_prefix: requestBody.customer.phone_prefix,
    };
    updateCustomer(customer);

    router.push('/checkout/flights/payment');
  };

  const Title = ({ children }: LayoutProps) => (
    <p className="px-5 mt-3 mb-2 text-lg lg:mt-0 lg:text-2xl text-dark-800 lg:bg-dark-100 lg:py-6 lg:border-b lg:font-semibold">
      {children}
    </p>
  );

  const continueShopping = () => {
    router.push('/');
  };

  const InactiveCartMessage = () => (
    <FullScreenModal
      open={!isValidData()}
      title={continueShoppingText}
      primaryButtonText={continueShoppingText}
      primaryButtonAction={continueShopping}
      closeModal={continueShopping}
    >
      <section className="p-8 text-2xl text-error-400 font-bold w-full text-center h-[90vh] grid content-center">
        The booking must start again
      </section>
    </FullScreenModal>
  );

  const isValidData = () => {
    const currentFlights = flights || [];
    const currentPassengers = passengers || [];
    return currentFlights.length > 0 && currentPassengers.length > 0;
  };

  const itemsNumber = cart?.items?.length;

  useEffect(() => {
    if (cart?.customer && travelersFormSchema) {
      const newTravelersFormSchema = travelersFormSchema;
      Object.entries(cart.customer)
        .filter(
          ([prop]) =>
            prop != 'id' &&
            prop != 'extra_fields' &&
            prop != 'phone_prefix' &&
            prop != 'country',
        )
        .map(([prop, value]) => {
          if (prop == 'phone_number') {
            newTravelersFormSchema.properties['phone'] = {
              ...newTravelersFormSchema.properties['phone'],
              defaultCode: cart.customer.country,
              default: value,
            };
          } else {
            newTravelersFormSchema.properties[prop] = {
              ...newTravelersFormSchema.properties[prop],
              default: value,
            };
          }
        });
      setTravelersFormSchema(newTravelersFormSchema);
    }
  }, [cart, travelersFormSchema]);

  return (
    <div className="pt-[60px]">
      <CheckoutHeader step="client" itemsNumber={itemsNumber} />
      {loaded ? (
        <section className="lg:px-20 lg:py-12">
          <section className="mx-auto lg:flex lg:gap-8 lg:justify-start max-w-7xl">
            <section className="lg:w-[68%] pt-6 lg:pt-0">
              <InactiveCartMessage />
              <Card>
                <Title>{primaryContactText}</Title>
                <section className=" px-4 pt-6">
                  <Paragraph fontWeight="semibold">
                    Use the information of the following passenger in the Order
                    Name:
                  </Paragraph>
                  <select
                    className="block w-full border-gray-300 rounded shadow-sm resize-none  focus:ring-0 focus:outline-0 focus:border-primary-1000 text-dark-1000 text-base h-11"
                    onChange={(e) => handleChangePassenger(e.target.value)}
                  >
                    <option value=""></option>
                    {passengerOptions.map(({ value, label }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </section>
                <section className="p-4">
                  <FormProvider {...methods}>
                    <ClientFormContent passenger={selectedPassenger} />
                    <BlockDivider className="mt-5" />
                    <section className="py-4">
                      {isValidData() && (
                        <FlightsCheckoutAccordion
                          key={flight?.legId}
                          flights={flights}
                          passengers={passengers}
                        />
                      )}
                    </section>
                    <CheckoutFooter type="client">
                      <CheckoutSummary
                        total={`US$${flight?.offer?.totalFareAmount || '0'}`}
                      />
                      <Button
                        value={cancelButton}
                        size={'full'}
                        onClick={redirectToItinerary}
                        color="outlined"
                        className="lg:w-[35%] text-[18px] bg-white border border-dark-1000 text-dark-1000 font-normal hover:text-white hover:bg-dark-1000"
                      />
                      <Button
                        value={continueButton}
                        size={'full'}
                        className="lg:w-[35%] text-[18px] font-normal"
                        onClick={methods.handleSubmit(continueToPayment)}
                      />
                    </CheckoutFooter>
                  </FormProvider>
                </section>
              </Card>
            </section>
            <section className="hidden lg:block lg:w-[32%]">
              <HelpSection inItinerary={true} />
            </section>
          </section>
        </section>
      ) : (
        <Loader />
      )}
    </div>
  );
};

const Card = ({ children }: LayoutProps) => (
  <section className="lg:border lg:rounded-md lg:shadow-sm">{children}</section>
);

export default Client;
