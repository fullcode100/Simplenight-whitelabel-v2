// Libraries
import React, { useState } from 'react';

// Components
import { Button } from '@simplenight/ui';
// Layout Components
import CheckoutMain from 'components/checkout/CheckoutMain/CheckoutMain';
import CheckoutForm from 'components/checkout/CheckoutForm/CheckoutForm';
import CheckoutFooter from 'components/checkout/CheckoutFooter/CheckoutFooter';

// Footer Components
import Summary from 'components/checkout/Summary/Summary';
import Terms from 'components/checkout/Terms/Terms';
import { useTranslation } from 'react-i18next';
import { createBooking } from 'core/client/services/BookingService';
import { useRouter } from 'next/router';
import CheckoutHeader from 'components/checkout/CheckoutHeader/CheckoutHeader';
import Loader from '../../components/global/Loader/Loader';
import HelpSection from 'components/global/HelpSection/HelpSection';
import PaymentForm from 'components/global/PaymentForm/PaymentForm';
import BillingAddressForm from 'components/checkout/BillingAddressForm/BillingAddressForm';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { usePaymentFormSchema } from 'hooks/schemas/usePaymentFormSchema';
import { SelectOption } from '../../components/checkout/Select/Select';
import { Container, FormField, TextInput } from '@simplenight/ui';
import { useCustomer } from 'hooks/checkout/useCustomer';
import { useFlightsStore } from 'hooks/flights/useFligthsStore';
import FlightsCheckoutAccordion from 'flights/components/checkout/FlightsCheckoutAccordion/FlightsCheckoutAccordion';
import Divider from 'components/global/Divider/Divider';
import { useSearchStore } from 'hooks/flights/useSearchStore';
import FullScreenModal from 'components/global/NewModal/FullScreenModal';

const CONFIRMATION_URI = '/confirmation';

const Payment = () => {
  const router = useRouter();

  const [t, i18next] = useTranslation('global');
  const iHaveReviewedLabel = t(
    'iHaveReviewed',
    'I have reviewed and agree to the ',
  );
  const { paymentFormSchema } = usePaymentFormSchema();

  const amountForThisCardLabel = t('amountForThisCard', 'Amount For This Card');
  const fullAmountLabel = t('fullAmount', 'Full Amount');
  const checkoutLabel = t('checkoutTitle', 'Check Out');
  const backLabel = t('back', 'Back');
  const loadingLabel = t('loading', 'Loading');

  const [terms, setTerms] = useState(false);
  const [errorTerms, setErrorTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState<SelectOption | undefined>();

  const flights = useFlightsStore((state) => state.flights);
  const search = useSearchStore((state) => state.search);

  type PaymentFormSchema = z.infer<typeof paymentFormSchema>;
  const methods = useForm<PaymentFormSchema>({
    resolver: zodResolver(paymentFormSchema),
  });

  const onSubmit = (data: PaymentFormSchema) => {
    if (!terms) {
      return setErrorTerms(true);
    }
    if (loading) return;
    setLoading(true);

    bookItem(data);
  };

  const [customer] = useCustomer((state) => [state.customer]);

  const bookItem = async (paymentFormData: PaymentFormSchema) => {
    const countryCode = country?.value || customer?.country;
    if (!country || !terms) {
      return;
    }

    const {
      address1,
      address2,
      city,
      state,
      postalCode,
      creditCardName,
      creditCardNumber,
      creditCardExpiration,
      creditCardCVV,
    } = paymentFormData;
    const bookingParameters = {
      payment_request: {
        name_on_card: creditCardName,
        credit_card_number: creditCardNumber,
        cvv: creditCardCVV,
        expiry_date: creditCardExpiration,
        billing_address: {
          address2: address1,
          address3: address2,
          city: city,
          province: state,
          postal_code: postalCode,
          country: countryCode,
        },
      },
    };

    try {
      const data = await createBooking(bookingParameters, i18next);
      const bookingId = data?.booking.booking_id;
      localStorage.removeItem('cart');
      setLoading(false);
      router.push(`${CONFIRMATION_URI}?bookingId=${bookingId}`);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  if (loading) return <Loader />;

  const InactiveCartMessage = () => {
    const continueShoppingText = t('continueShopping', 'Continue Shopping');
    const continueShopping = () => {
      router.push('/');
    };
    return (
      <FullScreenModal
        open={!search || !flights}
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
  };

  return (
    <>
      <InactiveCartMessage />
      <CheckoutHeader step="payment" />
      <Container>
        <main className="flex items-start justify-center gap-8 px-0 py-0">
          <section className="w-full lg:w-[840px] lg:border lg:border-dark-300 lg:rounded-4 lg:shadow-container overflow-hidden">
            <CheckoutMain>
              <CheckoutForm title={'Payment Information'}>
                <FormProvider {...methods}>
                  <form>
                    <PaymentForm />
                    <section className="mt-4">
                      <FormField
                        label={amountForThisCardLabel}
                        required={{ required: true, label: fullAmountLabel }}
                      >
                        <TextInput value={'$120'} state="disabled" />
                      </FormField>
                    </section>

                    <BillingAddressForm setCountry={setCountry} />
                  </form>
                </FormProvider>
              </CheckoutForm>
              <section className="px-5 pb-6">
                <Terms
                  checkValue={terms}
                  checkboxMethod={setTerms}
                  errorTerms={errorTerms}
                  setErrorTerms={setErrorTerms}
                />
              </section>
              <Divider />
              <section className="px-5 py-4">
                {flights &&
                  search &&
                  flights.map((flight) => (
                    <FlightsCheckoutAccordion
                      key={flight.departure.iata_code}
                      flight={flight}
                      search={search}
                    />
                  ))}
              </section>
            </CheckoutMain>
            <CheckoutFooter type="payment">
              {/* {cart && (
                <Summary cart={cart} reload={reload} setReload={setReload} />
              )} */}
              <section className="w-full lg:w-[145px]">
                <Button type="outlined" onClick={() => router.back()}>
                  {backLabel}
                </Button>
              </section>
              <section className="w-full lg:w-[145px]">
                <Button
                  loading={loading}
                  onClick={methods.handleSubmit(onSubmit)}
                >
                  {checkoutLabel}
                </Button>
              </section>
            </CheckoutFooter>
          </section>
          <section className="w-full lg:w-[405px] hidden lg:block lg:border lg:border-dark-300 lg:rounded-4 lg:shadow-container">
            <HelpSection inItinerary={true} />
          </section>
        </main>
      </Container>
    </>
  );
};

export default Payment;
