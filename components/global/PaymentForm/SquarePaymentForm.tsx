import React, { useEffect, useState, MouseEvent, forwardRef } from 'react';
import { CustomWindow } from 'types/global/CustomWindow';
import {
  SQUARE_SANDBOX_APP_ID,
  SQUARE_SANDBOX_LOCATION_ID,
} from 'config/paymentCredentials';
import { Customer } from 'types/cart/CartType';
import classNames from 'classnames';

declare let window: CustomWindow;

interface PaymentFormProps {
  onTokens?: (paymentToken: string, verificationToken: string) => void;
  onError?: (error: any) => void;
  applicationId?: string;
  locationId?: string;
  countryCode?: string;
  currencyCode?: string;
  customer?: Customer;
  amount?: number;
  withGooglePay?: boolean;
  noPayButton?: boolean;
}

const defaultCustomer = {
  first_name: '',
  last_name: '',
  email: '',
  country: '',
  phone_number: '',
  phone_prefix: '',
};

const SquarePaymentForm = forwardRef<HTMLButtonElement, PaymentFormProps>(
  (
    {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onTokens = () => {},
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onError = () => {},
      applicationId = SQUARE_SANDBOX_APP_ID,
      locationId = SQUARE_SANDBOX_LOCATION_ID,
      countryCode = 'US',
      currencyCode = 'USD',
      customer = defaultCustomer,
      amount = 0,
      withGooglePay = false,
      noPayButton = false,
    }: PaymentFormProps,
    ref,
  ) => {
    const [card, setCard] = useState<any>(null);
    const [payments, setPayments] = useState<any>(null);
    const [googlePay, setGooglePay] = useState<any>(null);

    const initializePaymentForm = async () => {
      const paymentsForm = await window.Square?.payments(
        applicationId,
        locationId,
      );
      if (withGooglePay) {
        withGooglePay = false;
        initializeGooglePay(paymentsForm);
      }

      paymentsForm.card().then((newCard: any) => {
        newCard.attach('#card-container').then(() => {
          setCard(newCard);
        });
      });

      setPayments(paymentsForm);
    };

    const buildPaymentRequest = (payments: any) =>
      payments.paymentRequest({
        countryCode,
        currencyCode,
        total: {
          amount: amount + '',
          label: 'Total',
        },
      });

    const initializeGooglePay = async (payments: any) => {
      const paymentRequest = buildPaymentRequest(payments);

      const newGooglePayInstance = await payments.googlePay(paymentRequest);
      await newGooglePayInstance.attach('#google-pay-button', {
        buttonSizeMode: 'fill',
      });

      setGooglePay(newGooglePayInstance);

      return newGooglePayInstance;
    };

    const reloadGooglePay = async () => {
      const payments = await window.Square?.payments(applicationId, locationId);
      initializeGooglePay(payments);
    };

    useEffect(() => {
      if (withGooglePay) reloadGooglePay();
    }, [amount, currencyCode, countryCode]);

    useEffect(() => {
      initializePaymentForm();
    }, []);

    const getVerificationToken = async (paymentToken: any) => {
      const {
        first_name: firstName,
        last_name: lastName,
        email,
        country,
        phone_number: phoneNumber,
      } = customer;

      const verificationDetails = {
        amount: amount.toString(),
        billingContact: {
          addressLines: [],
          familyName: lastName,
          givenName: firstName,
          email,
          country: country.toUpperCase(),
          phone: phoneNumber,
          region: '',
          city: '',
        },
        currencyCode,
        intent: 'CHARGE',
      };

      try {
        const verificationResults = await payments.verifyBuyer(
          paymentToken,
          verificationDetails,
        );

        return verificationResults.token;
      } catch (e) {
        console.error(e);
        onError(e);
      }
    };

    const handlePayClick = async (
      event: MouseEvent<HTMLButtonElement> | MouseEvent<HTMLDivElement>,
      paymentMethod: any,
    ) => {
      event.preventDefault();

      if (!paymentMethod) return;

      try {
        const { status, token: paymentToken } = await paymentMethod.tokenize();

        if (status === 'OK') {
          const verificationToken = await getVerificationToken(paymentToken);

          onTokens(paymentToken, verificationToken);
        }
      } catch (e) {
        console.error(e);
        onError(e);
      }
    };

    return (
      <form id="payment-form px-4">
        {amount && withGooglePay && (
          <div
            id="google-pay-button"
            className="mb-4"
            onClick={(event) => handlePayClick(event, googlePay)}
          ></div>
        )}
        <div id="card-container"></div>

        <button
          id="card-button"
          onClick={(event) => handlePayClick(event, card)}
          value="Pay"
          ref={ref}
          className={classNames({
            hidden: noPayButton,
          })}
        />
      </form>
    );
  },
);

SquarePaymentForm.displayName = 'SquarePaymentForm';

export default SquarePaymentForm;
