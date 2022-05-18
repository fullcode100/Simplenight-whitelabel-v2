// Libraries
import React, { useState } from 'react';
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
import GooglePayButton from 'components/global/PaymentForm/GooglePayButton/GooglePayButton';
import Summary from 'components/checkout/Summary/Summary';
import Terms from 'components/checkout/Terms/Terms';

const test: Amount = {
  formatted: '$200.00',
  amount: 200,
  currency: 'USD',
};

const Payment = () => {
  // Square Credentials
  const [appId, setAppId] = useState(SQUARE_SANDBOX_APP_ID);
  const [locationId, setLocationId] = useState(SQUARE_SANDBOX_LOCATION_ID);
  // Form
  const [token, setToken] = useState<string | null>(null);
  const [nameOnCard, setNameOnCard] = useState('');
  const [discountVoucher, setDiscountVoucher] = useState('second');
  const [terms, setTerms] = useState(false);

  const handlePaymentRequest = (paymentRequest: PaymentRequest) => {
    const { paymentMethodData } = paymentRequest;
    const { tokenizationData } = paymentMethodData;
    const { token: newToken } = tokenizationData;

    setToken(newToken);
  };

  const handlePaymentToken = (newToken: string) => {
    setToken(newToken);
  };

  return (
    <>
      <section className="bg-dark-100 h-[100px] w-full grid place-items-center">
        Header Wizzard
      </section>
      <CheckoutMain>
        <CheckoutForm title={'Payment Information'}>
          <InputWrapper
            label={'Name On Card'}
            labelKey={'nameOnCard'}
            subLabel={'Required'}
            subLabelKey={'required'}
            value={nameOnCard.toUpperCase()}
            setter={setNameOnCard}
          />
          <SquarePaymentForm
            applicationId={appId}
            locationId={locationId}
            onPaymentToken={handlePaymentToken}
            amount={test.amount}
            currencyCode={test.currency}
            withGooglePay
          />
          <InputWrapper
            label={'Amount For This Card'}
            labelKey={'amountForThisCard'}
            subLabel={'Full Amount'}
            subLabelKey={'fullAmount'}
            value={test.formatted}
            disabled={true}
          />
        </CheckoutForm>
        Detail section - both shares margins
      </CheckoutMain>
      <CheckoutFooter type="payment">
        <Terms checkValue={terms} checkboxMethod={setTerms} />
        <Summary amount={test} />
        <Button
          value="Back"
          size={'full'}
          color="outlined"
          className="text-[18px] hover:text-white hover:bg-primary-800"
        />
        <Button value="Check Out" size={'full'} className="text-[18px]" />
      </CheckoutFooter>
    </>
  );
};

export default Payment;
