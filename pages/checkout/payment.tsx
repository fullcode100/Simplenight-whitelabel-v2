/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
// Libraries
import React, { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import valid from 'card-validator';

// Credentials
import {
  SQUARE_SANDBOX_APP_ID,
  SQUARE_SANDBOX_LOCATION_ID,
} from 'config/paymentCredentials';
// Components
import Button from 'components/global/Button/Button';
// Layout Components
import CheckoutMain from 'components/checkout/CheckoutMain/CheckoutMain';
import CheckoutForm from 'components/checkout/CheckoutForm/CheckoutForm';
import CheckoutFooter from 'components/checkout/CheckoutFooter/CheckoutFooter';

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
import ExternalLink from 'components/global/ExternalLink/ExternalLink';
import { getCurrency } from 'store/selectors/core';
import useCookies from 'hooks/localStorage/useCookies';
import PaymentCart from '../../components/checkout/PaymentCart/PaymentCart';
import HelpSection from 'components/global/HelpSection/HelpSection';

const ITINERARY_URI = '/itinerary';
const CONFIRMATION_URI = '/confirmation';

const GOOGLE = 'google';

const Payment = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [t, i18next] = useTranslation('global');
  const iHaveReviewedLabel = t(
    'iHaveReviewed',
    'I have reviewed and agree to the ',
  );

  const amountForThisCardLabel = t('amountForThisCard', 'Amount For This Card');
  const fullAmountLabel = t('fullAmount', 'Full Amount');
  const checkoutLabel = t('checkoutTitle', 'Check Out');
  const backLabel = t('back', 'Back');
  const loadingLabel = t('loading', 'Loading');

  const appId = SQUARE_SANDBOX_APP_ID;
  const locationId = SQUARE_SANDBOX_LOCATION_ID;
  const payClickRef = useRef<HTMLButtonElement>(null);

  const [country, setCountry] = useState<string | null>(null);
  const [terms, setTerms] = useState(false);
  const [errorTerms, setErrorTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [acceptExpediaTerms, setAcceptExpediaTerms] = useState(false);
  const [errorExpediaTerms, setErrorExpediaTerms] = useState(false);
  const [prodExpedia, setProdExpedia] = useState(false);

  const paymentForm = useRef<HTMLDivElement>(null);
  let paymentToken: string;
  let verificationToken: string;

  const currency = getCurrency();

  const state = useSelector((state) => state);
  const storeState = {
    state,
    dispatch,
  };
  const [cart, setCart] = useState<CartObjectResponse | null>(null);
  const { getCookie } = useCookies();

  const triggerGTagEvent = (bookingId: string, referralItemId: string) => {
    const referralItem = cart?.items.find(
      (item) => item.inventory_id === referralItemId,
    );

    const totalAmount = referralItem?.last_validated_rate.total_amount;
    const value = totalAmount?.amount;
    const currency = totalAmount?.currency;

    const startDate = referralItem?.extended_data?.start_date;
    const endDate = referralItem?.extended_data?.end_date;

    return (
      <Script id="GTM-2938402">
        {`
        window.gtag('event', 'conversion', {
          send_to: 'AW-711765415/leb4CJfbwvwBEKfbstMC',
          ${value},
          ${currency},
          transaction_id: ${bookingId},
          items: [
            {
              id: ${referralItemId},
              start_date: ${startDate},
              end_date: ${endDate},
            },
          ],
        });
      `}
      </Script>
    );
  };

  const triggerEventConversion = (bookingId?: string) => {
    const referral = getCookie('referral')?.split('=');

    if (!referral || !bookingId) return;

    const referralCompany = referral[0];
    if (referralCompany === GOOGLE) {
      const referralItemId = referral[1];
      triggerGTagEvent(bookingId, referralItemId);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  const validateCard = () => {
    const validName = valid.cardholderName(card.name).isValid;
    const validNumber = valid.number(card.number).isValid;
    const validExpiration = valid.expirationDate(card.expiration).isValid;
    const validCVV = valid.cvv(card.cvv).isValid;
    setCardErrors({
      name: !validName,
      number: !validNumber,
      expiration: !validExpiration,
      cvv: !validCVV,
    });
    const cardIsValid = validName && validNumber && validExpiration && validCVV;
    if (!cardIsValid) {
      scrollToTop();
    }
    if (cardIsValid) console.log('proceed to booking');
  };

  const handleTokens = (
    newPaymentToken: string,
    newVerificationToken: string,
  ) => {
    if (expediaTerms && !acceptExpediaTerms) {
      return setErrorExpediaTerms(true);
    }
    if (!terms) {
      return setErrorTerms(true);
    }
    if (loading) return;
    setLoading(true);
    paymentToken = newPaymentToken;
    verificationToken = newVerificationToken;
    handleBooking();
  };

  const handleBooking = async () => {
    if (!paymentToken || !verificationToken || !country || !terms || !cart)
      return;

    const paymentParameters = {
      cartId: cart.cart_id,
      paymentToken,
      verificationToken,
      countryCode: country,
      ...(prodExpedia && { expediaProd: true }),
    };

    try {
      const data = await createBooking(paymentParameters, i18next);
      const bookingId = data?.booking.booking_id;
      triggerEventConversion(bookingId);
      dispatch(clearCart());
      localStorage.removeItem('cart');
      setLoading(false);
      router.push(`${CONFIRMATION_URI}?bookingId=${bookingId}`);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
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

  useEffect(() => {
    if (localStorage.getItem('prod') == 'expedia') {
      setProdExpedia(true);
    }
  }, []);

  const itemsNumber = cart?.items?.length;
  const expediaTerms = cart?.items.find(
    (item) =>
      item.extended_data?.terms_and_conditions &&
      item.extended_data?.terms_and_conditions?.length > 0,
  );
  const [card, setCard] = useState<Card>({
    number: '',
    name: '',
    expiration: '',
    cvv: '',
  });
  const [cardErrors, setCardErrors] = useState({
    number: false,
    name: false,
    expiration: false,
    cvv: false,
  });

  return (
    <>
      {/* <Script src="https://sandbox.web.squarecdn.com/v1/square.js" /> */}
      <CheckoutHeader step="payment" itemsNumber={itemsNumber} />
      {loaded ? (
        <section className="flex items-start justify-center gap-8 px-0 py-0 lg:px-20 lg:py-12">
          <section className="w-full lg:w-[840px] lg:border lg:border-dark-300 lg:rounded-4 lg:shadow-container overflow-hidden">
            <CheckoutMain>
              <CheckoutForm title={'Payment Information'}>
                <PaymentForm
                  card={card}
                  setCard={(value: Card) => setCard(value)}
                  cardErrors={cardErrors}
                />
                {/*  <InputWrapper label="Country" labelKey="country">
                  <CountrySelect value={country} onChange={setCountry} />
                </InputWrapper> */}
                {/* {cart && (
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
                )} */}
              </CheckoutForm>
              <section className="px-5 pb-6">
                <Terms
                  checkValue={terms}
                  checkboxMethod={setTerms}
                  errorTerms={errorTerms}
                  setErrorTerms={setErrorTerms}
                />
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
                        <span className="text-base leading-[22px] text-dark-1000 font-normal">
                          {iHaveReviewedLabel}
                        </span>
                        <ExternalLink
                          className="text-primary-1000 hover:text-primary-1000 font-normal text-base leading-[22px]"
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
              <section className="px-5">
                <PaymentCart items={cart?.items} customer={cart?.customer} />
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
                  value={loading ? loadingLabel : checkoutLabel}
                  disabled={loading}
                  size={'full'}
                  className="text-[18px]"
                  onClick={validateCard}
                />
              </section>
            </CheckoutFooter>
          </section>
          <section className="w-full lg:w-[405px] hidden lg:block lg:border lg:border-dark-300 lg:rounded-4 lg:shadow-container">
            <HelpSection inItinerary={true} />
          </section>
        </section>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Payment;
