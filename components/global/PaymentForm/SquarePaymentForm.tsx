import React, { useEffect, useState, MouseEvent } from 'react';
import { getIsPaymentLibraryLoaded } from 'store/selectors/core';
import { CustomWindow } from 'types/global/CustomWindow';
import Button from '../Button/Button';
import {
  SQUARE_SANDBOX_APP_ID,
  SQUARE_SANDBOX_LOCATION_ID,
} from 'config/paymentCredentials';

declare let window: CustomWindow;

interface PaymentFormProps {
  onPaymentToken?: (token: string) => void;
  onError?: (error: any) => void;
  applicationId?: string;
  locationId?: string;
  countryCode?: string;
  currencyCode?: string;
  amount?: number;
}

const SquarePaymentForm = ({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onPaymentToken = () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onError = () => {},
  applicationId = SQUARE_SANDBOX_APP_ID,
  locationId = SQUARE_SANDBOX_LOCATION_ID,
  countryCode = 'US',
  currencyCode = 'USD',
  amount = 0,
}: PaymentFormProps) => {
  const isPaymentLibraryLoaded = getIsPaymentLibraryLoaded();
  const [cardLoaded, setCardLoaded] = useState(false);
  const [card, setCard] = useState<any>(null);
  const [googlePay, setGooglePay] = useState<any>(null);

  const initializePaymentForm = async () => {
    const payments = await window.Square?.payments(applicationId, locationId);

    initializeGooglePay(payments);

    payments.card().then((newCard: any) => {
      newCard.attach('#card-container').then(() => {
        setCard(newCard);
        setCardLoaded(true);
      });
    });
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
    if (!isPaymentLibraryLoaded) return;
    reloadGooglePay();
  }, [amount, currencyCode, countryCode]);

  useEffect(() => {
    if (!isPaymentLibraryLoaded) return;
    initializePaymentForm();
  }, [isPaymentLibraryLoaded]);

  const handlePayClick = async (
    event: MouseEvent<HTMLButtonElement>,
    paymentMethod: any,
  ) => {
    event.preventDefault();

    if (!paymentMethod) return;

    try {
      const { status, token } = await paymentMethod.tokenize();

      if (status === 'OK') {
        onPaymentToken(token);
      }
    } catch (e) {
      console.error(e);
      onError(e);
    }
  };

  return (
    <form id="payment-form px-4">
      {amount && (
        <div
          id="google-pay-button"
          className="mb-4"
          onClick={(event: any) => handlePayClick(event, googlePay)}
        ></div>
      )}
      <div id="card-container"></div>

      <Button
        id="card-button"
        onClick={(event: any) => handlePayClick(event, card)}
        value="Pay"
      />
    </form>
  );
};

export default SquarePaymentForm;
