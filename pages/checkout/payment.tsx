/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
// Libraries
import React, { useEffect, useRef, useState } from 'react';
// Credentials
import {
  SQUARE_SANDBOX_APP_ID,
  SQUARE_SANDBOX_LOCATION_ID,
} from 'config/paymentCredentials';
// Types
import { Amount } from 'types/global/Amount';
import { PaymentRequest } from 'components/global/PaymentForm/GooglePayButton/types/PaymentRequest';
// Components
import Button from 'components/global/Button/Button';
// Layout Components
import CheckoutMain from 'components/checkout/CheckoutMain/CheckoutMain';
import CheckoutForm from 'components/checkout/CheckoutForm/CheckoutForm';
import CheckoutFooter from 'components/checkout/CheckoutFooter/CheckoutFooter';
// Form Components
import InputWrapper from 'components/checkout/Inputs/InputWrapper';
import SquarePaymentForm from 'components/global/PaymentForm/SquarePaymentForm';
// Footer Components
import Summary from 'components/checkout/Summary/Summary';
import Terms from 'components/checkout/Terms/Terms';
import { useTranslation } from 'react-i18next';
import CountrySelect from 'components/global/CountrySelect/CountrySelect';
import { createBooking } from 'core/client/services/BookingService';
import { getCart } from 'core/client/services/CartClientService';
import { useDispatch, useSelector } from 'react-redux';
import { CartObjectResponse } from 'types/cart/CartType';
import { useRouter } from 'next/router';
import CheckoutHeader from 'components/checkout/CheckoutHeader/CheckoutHeader';
import Loader from '../../components/global/Loader/Loader';
import { clearCart } from 'store/actions/cartActions';
import BreakdownItemList from '../../components/checkout/BreakdownItemList/BreakdownItemList';
import ExternalLink from 'components/global/ExternalLink/ExternalLink';
import { getCurrency } from 'store/selectors/core';

const test: Amount = {
  formatted: '$200.00',
  amount: 200,
  currency: 'USD',
};

const ITINERARY_URI = '/itinerary';
const CONFIRMATION_URI = '/confirmation';

const Payment = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [t, i18next] = useTranslation('global');
  const iHaveReviewedLabel = t(
    'iHaveReviewed',
    'I have reviewed and agree to the ',
  );
  const priceBreakdownLabel = t('priceBreakdown', 'Price Breakdown');
  const amountForThisCardLabel = t('amountForThisCard', 'Amount For This Card');
  const fullAmountLabel = t('fullAmount', 'Full Amount');
  const checkoutLabel = t('checkoutTitle', 'Check Out');
  const backLabel = t('back', 'Back');

  const [appId, setAppId] = useState(SQUARE_SANDBOX_APP_ID);
  const [locationId, setLocationId] = useState(SQUARE_SANDBOX_LOCATION_ID);
  const payClickRef = useRef<HTMLButtonElement>(null);

  const [country, setCountry] = useState<string | null>(null);
  const [terms, setTerms] = useState(false);
  const [reload, setReload] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [acceptExpediaTerms, setAcceptExpediaTerms] = useState(false);
  const [errorExpediaTerms, setErrorExpediaTerms] = useState(false);

  let paymentToken: string;
  let verificationToken: string;

  const currency = getCurrency();

  const state = useSelector((state) => state);
  const storeState = {
    state,
    dispatch,
  };
  const [cart, setCart] = useState<CartObjectResponse | null>(null);

  const triggerFormTokenGeneration = () => payClickRef.current?.click();

  const handleTokens = (
    newPaymentToken: string,
    newVerificationToken: string,
  ) => {
    if (expediaTerms && !acceptExpediaTerms) {
      return setErrorExpediaTerms(true);
    }
    paymentToken = newPaymentToken;
    verificationToken = newVerificationToken;
    handleBooking();
  };

  const handleBooking = () => {
    if (!paymentToken || !verificationToken || !country || !terms || !cart)
      return;

    const paymentParameters = {
      cartId: cart.cart_id,
      paymentToken,
      verificationToken,
      countryCode: country,
    };

    createBooking(paymentParameters, i18next)
      .then((response) => {
        const bookingId = response?.booking.booking_id;
        dispatch(clearCart());
        localStorage.removeItem('cart');
        router.push(`${CONFIRMATION_URI}?bookingId=${bookingId}`);
      })
      .catch((error) => console.error(error));
  };

  const redirectToItinerary = () => {
    router.push(ITINERARY_URI);
  };

  useEffect(() => {
    getCart(i18next, storeState)
      .then((returnedCart) => {
        if (!returnedCart) {
          redirectToItinerary();
          throw new Error('No active cart');
        }

        setCart(returnedCart);
        setLoaded(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [reload, currency]);

  const itemsNumber = cart?.items?.length;
  const expediaTerms = cart?.items.find(
    (item) =>
      item.extended_data?.terms_and_conditions &&
      item.extended_data?.terms_and_conditions?.length > 0,
  );

  return (
    <>
      <CheckoutHeader step="payment" itemsNumber={itemsNumber} />
      {loaded ? (
        <section className="flex items-start justify-center gap-8 px-0 py-0 lg:px-20 lg:py-12">
          <section className="w-full lg:w-[840px] lg:border lg:border-dark-300 lg:rounded-4 lg:shadow-container overflow-hidden">
            <CheckoutMain>
              <CheckoutForm title={'Payment Information'}>
                <InputWrapper label="Country" labelKey="country">
                  <CountrySelect value={country} onChange={setCountry} />
                </InputWrapper>
                {cart && (
                  <>
                    <SquarePaymentForm
                      applicationId={appId}
                      locationId={locationId}
                      onTokens={handleTokens}
                      customer={cart.customer}
                      amount={cart.total_amount.amount}
                      currencyCode={cart.total_amount.currency}
                      ref={payClickRef}
                    />

                    <InputWrapper
                      label={amountForThisCardLabel}
                      labelKey={'amountForThisCard'}
                      subLabel={fullAmountLabel}
                      subLabelKey={'fullAmount'}
                      value={cart?.total_amount.formatted}
                      disabled={true}
                    />
                  </>
                )}
              </CheckoutForm>
              <section className="px-5 pb-6">
                <Terms checkValue={terms} checkboxMethod={setTerms} />
                {expediaTerms && (
                  <>
                    <section className="flex items-center w-full gap-3 mt-2">
                      <input
                        type="checkbox"
                        name="expedia"
                        id="expedia"
                        checked={acceptExpediaTerms}
                        onChange={() =>
                          setAcceptExpediaTerms(!acceptExpediaTerms)
                        }
                      />
                      <label htmlFor="expedia">
                        <span>{iHaveReviewedLabel}</span>
                        <ExternalLink
                          className="text-primary-1000 hover:text-primary-1000 font-semibold text-[14px] leading-tight"
                          href={
                            expediaTerms.extended_data?.terms_and_conditions!
                          }
                        >
                          Supplier Terms and Conditions
                        </ExternalLink>
                      </label>
                    </section>
                    {errorExpediaTerms && (
                      <p className="text-red-500">
                        Please accept the supplier terms and conditions
                      </p>
                    )}
                  </>
                )}
              </section>
            </CheckoutMain>
            <CheckoutFooter type="payment">
              {cart && (
                <Summary cart={cart} reload={reload} setReload={setReload} />
              )}
              <section className="w-full lg:w-[145px]">
                <Button
                  value={backLabel}
                  onClick={() => router.back()}
                  size={'full'}
                  color="outlined"
                  className="text-[18px] bg-white border border-dark-1000 text-dark-1000 font-normal hover:text-white hover:bg-dark-1000"
                />
              </section>
              <section className="w-full lg:w-[145px]">
                <Button
                  value={checkoutLabel}
                  size={'full'}
                  className="text-[18px]"
                  onClick={triggerFormTokenGeneration}
                />
              </section>
            </CheckoutFooter>
          </section>
          {cart && (
            <section className="w-full lg:w-[405px] hidden lg:block lg:border lg:border-dark-300 lg:rounded-4 lg:shadow-container">
              <h2 className="px-5 py-6 text-lg font-semibold leading-6 bg-white text-dark-800 lg:bg-dark-100">
                {priceBreakdownLabel}
              </h2>
              <BreakdownItemList
                cart={cart}
                reload={reload}
                setReload={setReload}
              />
            </section>
          )}
        </section>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Payment;
