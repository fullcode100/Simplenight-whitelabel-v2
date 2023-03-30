/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
// Libraries
import React, { useEffect, useState } from 'react';
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
import { createBooking } from 'core/client/services/BookingService';
import { getCart } from 'core/client/services/CartClientService';
import { CartObjectResponse } from 'types/cart/CartType';
import { useRouter } from 'next/router';
import CheckoutHeader from 'components/checkout/CheckoutHeader/CheckoutHeader';
import Loader from '../../components/global/Loader/Loader';
import ExternalLink from 'components/global/ExternalLink/ExternalLink';
import { getCurrency } from 'store/selectors/core';
import useCookies from 'hooks/localStorage/useCookies';
import PaymentCart from '../../components/checkout/PaymentCart/PaymentCart';
import HelpSection from 'components/global/HelpSection/HelpSection';
import { Card } from 'types/global/Card';
import PaymentForm from 'components/global/PaymentForm/PaymentForm';
import InputWrapper from 'components/checkout/Inputs/InputWrapper';
import BillingAddressForm from 'components/checkout/BillingAddressForm/BillingAddressForm';
import { BillingAddress } from '../../components/global/PaymentForm/GooglePayButton/types/PaymentRequest';
import useBog from 'hooks/bog/useBog';

const ITINERARY_URI = '/itinerary';
const CONFIRMATION_URI = '/confirmation';

const GOOGLE = 'google';
const MICROSOFT = 'microsoft';
const WEGO = 'wego';
type ScriptProps = {
  value: number | undefined;
  bookingId: string;
  referralItemId: string;
  startDate: string | undefined;
  endDate: string | undefined;
  currency: string | undefined;
};

const Payment = () => {
  const router = useRouter();

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

  const [terms, setTerms] = useState(false);
  const [errorTerms, setErrorTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [acceptExpediaTerms, setAcceptExpediaTerms] = useState(false);
  const [errorExpediaTerms, setErrorExpediaTerms] = useState(false);
  const [prodExpedia, setProdExpedia] = useState(false);
  const { isBog } = useBog();
  const currency = getCurrency();

  const [cart, setCart] = useState<CartObjectResponse | null>(null);
  const { getCookie } = useCookies();
  const GoogleScript = (scriptData: ScriptProps) => {
    const { value, bookingId, referralItemId, startDate, endDate } = scriptData;
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

  const MicrosoftScript = (scriptData: ScriptProps) => {
    const { value, bookingId, referralItemId, startDate, endDate } = scriptData;
    return (
      <Script id="microsoft-uet">
        {`
      window.uetq = window.uetq || [];
      window.gtag('event', 'conversion', {
        event_value:${value},
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

  const WegoScript = (
    referralItemId: string,
    currency: any,
    bookingId: string,
    value: any,
  ) => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      return (
        <img
          src={`https://srv.wegostaging.com/analytics/v2/conversions?conversion_id=c-wego-simplenight.com&click_id=${referralItemId}&comm_currency_code=${currency}&bv_currency_code=${currency}&transaction_id=${bookingId}&total_booking_value=${value}&status=confirmed`}
          width="1"
          height="1"
          alt=""
        />
      );
    } else {
      return (
        <img
          src={`
            https://srv.wego.com/analytics/v2/conversions?conversion_id=c-wego-simplenight.com&click_id=${referralItemId}&comm_currency_code=${currency}&bv_currency_code=${currency}&transaction_id=${bookingId}&total_booking_value=${value}&status=confirmed
          `}
          width="1"
          height="1"
          alt=""
        />
      );
    }
  };

  const triggerGTagEvent = (
    bookingId: string,
    referralItemId: string,
    referralCompany: string,
  ) => {
    const referralItem = cart?.items.find(
      (item) => item.inventory_id === referralItemId,
    );
    // be aware that referralItemId will contain wego's click ID
    const totalAmount = cart?.total_amount;

    const value = totalAmount?.amount;
    const currency = totalAmount?.currency;
    const startDate = referralItem?.extended_data?.start_date;
    const endDate = referralItem?.extended_data?.end_date;
    const scriptData = {
      value,
      bookingId,
      referralItemId,
      startDate,
      endDate,
      currency,
    };
    if (referralCompany === GOOGLE) GoogleScript(scriptData);
    if (referralCompany === MICROSOFT) MicrosoftScript(scriptData);
    if (referralCompany === WEGO)
      WegoScript(referralItemId, currency, bookingId, value);
  };

  const triggerEventConversion = (bookingId?: string) => {
    const referral = getCookie('referral')?.split('=');
    if (!referral || !bookingId) return;
    const referralCompany = referral[0];
    const referralItemId = referral[1];
    triggerGTagEvent(bookingId, referralItemId, referralCompany);
  };
  const dateIsInCorrectFormat = (val: string) => {
    const datePattern = /\d\d\/\d\d/;
    return datePattern.test(val);
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
    const validExpiration =
      valid.expirationDate(card.expiration).isValid &&
      dateIsInCorrectFormat(card.expiration);
    const validCVV = valid.cvv(card.cvv).isValid;
    setCardErrors({
      name: !validName,
      number: !validNumber,
      expiration: !validExpiration,
      cvv: !validCVV,
    });
    const cardIsValid = validName && validNumber && validExpiration && validCVV;
    return cardIsValid;
  };

  const handleBooking = () => {
    const cardIsValid = validateCard();
    if (!cardIsValid) {
      return scrollToTop();
    }
    if (expediaTerms && !acceptExpediaTerms) {
      return setErrorExpediaTerms(true);
    }
    if (!terms) {
      return setErrorTerms(true);
    }
    if (loading) return;
    setLoading(true);

    bookItem();
  };
  const bookItem = async () => {
    const country = cart?.customer.country;
    const referral = getCookie('referral')?.split('=') || 'no-refferal';
    const referralCompany = referral[0];
    if (!country || !terms || !cart) {
      return;
    }

    const { address1, address2, city, state, postalCode, countryCode } =
      billingAddress;
    const bookingParameters = {
      cart_id: cart?.cart_id,
      referral: referralCompany,
      payment_request: {
        payment_method: 'CARD',
        name_on_card: card.name,
        credit_card_number: card.number,
        cvv: card.cvv,
        expiry_date: card.expiration,
        billing_address: {
          address2: address1,
          address3: address2,
          city: city,
          province: state,
          postal_code: postalCode,
          country: countryCode,
        },
      },
      ...(prodExpedia && { expedia_prod: true }),
    };

    try {
      const data = await createBooking(bookingParameters, i18next);
      const bookingId = data?.booking.booking_id;
      if (isBog) {
        triggerEventConversion(bookingId);
      }
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
    getCart(i18next)
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

  const [billingAddress, setBillingAddress] = useState<BillingAddress>({
    address1: '',
    address2: '',
    countryCode: cart?.customer.country || '',
    state: '',
    city: '',
    postalCode: '',
  });

  useEffect(() => {
    if (cart) {
      setBillingAddress({
        ...billingAddress,
        countryCode: cart?.customer.country,
      });
    }
  }, [cart]);
  return (
    <>
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

                <InputWrapper
                  label={amountForThisCardLabel}
                  labelKey={'amountForThisCard'}
                  subLabel={fullAmountLabel}
                  subLabelKey={'fullAmount'}
                  value={cart?.total_amount.formatted}
                  disabled={true}
                />
                <BillingAddressForm
                  billingAddress={billingAddress}
                  setBillingAddress={setBillingAddress}
                />
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
                  onClick={handleBooking}
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
