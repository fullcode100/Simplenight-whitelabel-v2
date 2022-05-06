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
}

const SquarePaymentForm = ({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onPaymentToken = () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onError = () => {},
  applicationId = SQUARE_SANDBOX_APP_ID,
  locationId = SQUARE_SANDBOX_LOCATION_ID,
}: PaymentFormProps) => {
  const isPaymentLibraryLoaded = getIsPaymentLibraryLoaded();
  const [cardLoaded, setCardLoaded] = useState(false);
  const [card, setCard] = useState<any>(null);

  const initializePaymentForm = async () => {
    const payments = await window.Square?.payments(applicationId, locationId);
    payments.card().then((newCard: any) => {
      newCard.attach('#card-container').then(() => {
        setCard(newCard);
        setCardLoaded(true);
      });
    });
  };

  useEffect(() => {
    if (!isPaymentLibraryLoaded) return;
    initializePaymentForm();
  }, [isPaymentLibraryLoaded]);

  const handlePayClick = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!cardLoaded) return;

    try {
      const { status, token } = await card.tokenize();

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
      <div id="card-container"></div>

      <Button
        id="card-button"
        onClick={handlePayClick}
        // disabled={cardLoaded}
        value="Pay"
      />
    </form>
  );
};

export default SquarePaymentForm;
