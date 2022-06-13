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

  const [appId, setAppId] = useState(SQUARE_SANDBOX_APP_ID);
  const [locationId, setLocationId] = useState(SQUARE_SANDBOX_LOCATION_ID);
  const payClickRef = useRef<HTMLButtonElement>(null);

  const [token, setToken] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);
  const [nameOnCard, setNameOnCard] = useState('');
  const [terms, setTerms] = useState(false);
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

    createBooking(paymentParameters, i18next).then((response) => {
      const bookingId = response?.booking.booking_id;
      dispatch(clearCart());
      router.push(`${CONFIRMATION_URI}?bookingId=${bookingId}`);
    });
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
        <>
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
            Detail section - both shares margins
          </CheckoutMain>
          <CheckoutFooter type="payment">
            <Terms checkValue={terms} checkboxMethod={setTerms} />
            {cart && <Summary amount={cart.total_amount} />}
            <Button
              value="Back"
              onClick={() => router.back()}
              size={'full'}
              color="outlined"
              className="text-[18px] hover:text-white hover:bg-primary-800"
            />
            <Button
              value="Check Out"
              size={'full'}
              className="text-[18px]"
              onClick={handleBooking}
            />
          </CheckoutFooter>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Payment;
