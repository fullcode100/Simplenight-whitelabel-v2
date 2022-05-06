import React, { useState } from 'react';
import type { NextPage } from 'next';
import SquarePaymentForm from 'components/global/PaymentForm/SquarePaymentForm';
import {
  SQUARE_SANDBOX_APP_ID,
  SQUARE_SANDBOX_LOCATION_ID,
} from 'config/paymentCredentials';
import BaseInput from 'components/global/Input/BaseInput';

const PaymentTest: NextPage = () => {
  const [lastUsedToken, setLastUsedToken] = useState<string | null>(null);

  const [appId, setAppId] = useState(SQUARE_SANDBOX_APP_ID);
  const [locationId, setLocationId] = useState(SQUARE_SANDBOX_LOCATION_ID);

  const handlePaymentToken = (token: string) => {
    setLastUsedToken(token);
    console.log(`Payment token is ${token}`);
  };

  const LastUsedTokenSection = () => (
    <section className="flex flex-col">
      <h2>Last used token:</h2>
      <p className="border-2 px-1 bg-dark-200">
        {lastUsedToken ?? 'No token has been generated yet'}
      </p>
    </section>
  );

  return (
    <main className="px-4 mt-20">
      <SquarePaymentForm
        applicationId={appId}
        locationId={locationId}
        onPaymentToken={handlePaymentToken}
      />
      <section className="flex flex-col text-xl mt-4">
        <LastUsedTokenSection />
        <section className="mt-4">
          <h2>Application ID:</h2>
          <BaseInput value={appId} onChange={(e) => setAppId(e.target.value)} />
        </section>
        <section className="mt-4">
          <h2>Location ID:</h2>
          <BaseInput
            value={locationId}
            onChange={(e) => setLocationId(e.target.value)}
          />
        </section>
      </section>
    </main>
  );
};

export default PaymentTest;
