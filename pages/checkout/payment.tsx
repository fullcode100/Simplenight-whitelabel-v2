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

  const priceBreakdownLabel = t('priceBreakdown', 'Price Breakdown');

  const [appId, setAppId] = useState(SQUARE_SANDBOX_APP_ID);
  const [locationId, setLocationId] = useState(SQUARE_SANDBOX_LOCATION_ID);
  const payClickRef = useRef<HTMLButtonElement>(null);

  const [token, setToken] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);
  const [nameOnCard, setNameOnCard] = useState('');
  const [terms, setTerms] = useState(false);
  const [reload, setReload] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const storeState = useSelector((state) => state);
  const [cart, setCart] = useState<CartObjectResponse | null>(null);

  const triggerPaymentFormTokenGeneration = () => payClickRef.current?.click();

  const handlePaymentRequest = (paymentRequest: PaymentRequest) => {
    const { paymentMethodData } = paymentRequest;
    const { tokenizationData } = paymentMethodData;
    const { token: newToken } = tokenizationData;

    setToken(newToken);
  };

  const handlePaymentToken = (newToken: string) => {
    setToken(newToken);
    handleBooking();
  };

  const handleBooking = () => {
    if (!token) {
      triggerPaymentFormTokenGeneration();
      return;
    }
    if (!token || !country || !terms || !cart) return;

    const paymentParameters = {
      cartId: cart.cart_id,
      paymentToken: token,
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
  }, [reload]);

  const storeState = useSelector((state) => state);
  const [cart, setCart] = useState<CartObjectResponse | null>(null);

  const triggerPaymentFormTokenGeneration = () => payClickRef.current?.click();

  const handlePaymentRequest = (paymentRequest: PaymentRequest) => {
    const { paymentMethodData } = paymentRequest;
    const { tokenizationData } = paymentMethodData;
    const { token: newToken } = tokenizationData;

    setToken(newToken);
  };

  const handlePaymentToken = (newToken: string) => {
    setToken(newToken);
    handleBooking();
  };

  const handleBooking = () => {
    if (!token) {
      triggerPaymentFormTokenGeneration();
      return;
    }
    if (!token || !country || !terms || !cart) return;

    const paymentParameters = {
      cartId: cart.cart_id,
      paymentToken: token,
      countryCode: country,
    };
    createBooking(paymentParameters, i18next);
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
  }, []);

  return (
    <>
      {/* <section className="bg-dark-100 h-[100px] w-full grid place-items-center">
        Header Wizzard
      </section> */}
      <CheckoutHeader step="payment" />
      {loaded ? (
        <section className="px-0 py-0 lg:px-20 lg:py-12 flex gap-8 items-start">
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
                      onPaymentToken={handlePaymentToken}
                      amount={cart.total_amount.amount}
                      currencyCode={cart.total_amount.currency}
                      ref={payClickRef}
                    />

                    <InputWrapper
                      label={'Amount For This Card'}
                      labelKey={'amountForThisCard'}
                      subLabel={'Full Amount'}
                      subLabelKey={'fullAmount'}
                      value={cart?.total_amount.formatted}
                      disabled={true}
                    />
                  </>
                )}
              </CheckoutForm>
              <section className="px-5 pb-6">
                <Terms checkValue={terms} checkboxMethod={setTerms} />
              </section>
            </CheckoutMain>
            <CheckoutFooter type="payment">
              {cart && (
                <Summary cart={cart} reload={reload} setReload={setReload} />
              )}
              <section className="w-full lg:w-[145px]">
                <Button
                  value="Back"
                  onClick={() => router.back()}
                  size={'full'}
                  color="outlined"
                  className="text-[18px] hover:text-white hover:bg-primary-800"
                />
              </section>
              <section className="w-full lg:w-[145px]">
                <Button
                  value="Check Out"
                  size={'full'}
                  className="text-[18px]"
                  onClick={handleBooking}
                />
              </section>
            </CheckoutFooter>
          </section>
          {cart && (
            <section className="w-full lg:w-[405px] hidden lg:block lg:border lg:border-dark-300 lg:rounded-4 lg:shadow-container">
              <h2 className="text-lg leading-6 text-dark-800 font-semibold lg:bg-dark-100 bg-white px-5 py-6">
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
