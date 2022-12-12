import React, { useState } from 'react';
import type { NextPage } from 'next';
import SquarePaymentForm from 'components/global/PaymentForm/SquarePaymentForm';
import {
  SQUARE_SANDBOX_APP_ID,
  SQUARE_SANDBOX_LOCATION_ID,
} from 'config/paymentCredentials';
import BaseInput from 'components/global/Input/BaseInput';
import NumberInput from 'components/global/Input/NumberInput';
import GooglePayButton from 'components/global/PaymentForm/GooglePayButton/GooglePayButton';
import { PaymentRequest } from 'components/global/PaymentForm/GooglePayButton/types/PaymentRequest';
import Button from 'components/global/Button/Button';
import { copy } from 'helpers/stringUtils';

const PaymentTest: NextPage = () => {
  const [lastUsedToken, setLastUsedToken] = useState<string | null>(null);

  const initialAmount = 100;
  const initialCurrencyCode = 'USD';
  const initialCountryCode = 'US';

  const [appId, setAppId] = useState(SQUARE_SANDBOX_APP_ID);
  const [locationId, setLocationId] = useState(SQUARE_SANDBOX_LOCATION_ID);

  const [amount, setAmount] = useState(1);
  const [currencyCode, setCurrencyCode] = useState('USD');
  const [countryCode, setCountryCode] = useState('US');

  const handlePaymentToken = (token: string) => {
    setLastUsedToken(token);
  };

  const handlePaymentRequest = (paymentRequest: PaymentRequest) => {
    const { paymentMethodData } = paymentRequest;
    const { tokenizationData } = paymentMethodData;
    const { token } = tokenizationData;

    setLastUsedToken(token);
  };

  const LastUsedTokenSection = () => (
    <section className="flex flex-col h-auto">
      <h2>Last used token:</h2>
      <p className="px-1 border-2 bg-dark-200 overflow-clip">
        {lastUsedToken ?? 'No token has been generated yet'}
      </p>
      <Button
        value="Copy"
        className="mt-2"
        size="full"
        onClick={() => copy(lastUsedToken ?? '')}
      />
    </section>
  );

  const FormRow = ({
    label,
    value,
    setter,
  }: {
    label: string;
    value: any;
    setter: (value: any) => void;
  }) => (
    <section className="mt-4">
      <h2>{label}</h2>
      <BaseInput placeholder={value} onChange={(e) => setter(e.target.value)} />
    </section>
  );

  const NumberFormRow = ({
    label,
    value,
    setter,
  }: {
    label: string;
    value: any;
    setter: (value: any) => void;
  }) => (
    <section className="mt-4">
      <NumberInput
        placeholder={value}
        label={label}
        onChange={(e) => setter(e)}
      />
    </section>
  );

  const Title = ({ label }: { label: string }) => (
    <h2 className="mb-2 text-xl font-semibold">{label}</h2>
  );

  return (
    <main className="px-4 mt-40 mb-8">
      <Title label="Google Pay Payment Form" />
      <GooglePayButton
        merchantId={appId}
        gatewayMerchantId={locationId}
        onLoadPaymentData={handlePaymentRequest}
        className="w-full mb-4"
      />
      <Title label="Square Payment Form" />
      <SquarePaymentForm
        applicationId={appId}
        locationId={locationId}
        onTokens={handlePaymentToken}
        amount={amount}
        countryCode={countryCode}
        currencyCode={currencyCode}
      />
      <section className="flex flex-col mt-4 text-xl">
        <LastUsedTokenSection />

        <NumberFormRow
          label="Amount"
          value={initialAmount}
          setter={setAmount}
        />
        <FormRow
          label="Currency"
          value={initialCurrencyCode}
          setter={setCurrencyCode}
        />
        <FormRow
          label="Country"
          value={initialCountryCode}
          setter={setCountryCode}
        />
        <FormRow label="Application ID" value={appId} setter={setAppId} />
        <FormRow
          label="Location ID"
          value={locationId}
          setter={setLocationId}
        />
      </section>
    </main>
  );
};

export default PaymentTest;
