import React, { useState } from 'react';
import BaseInput from 'components/global/Input/BaseInput';
import InputWrapper from 'components/checkout/Inputs/InputWrapper';
import { useTranslation } from 'react-i18next';
import { Card } from 'types/global/Card';

interface CardErrors {
  name: boolean;
  number: boolean;
  expiration: boolean;
  cvv: boolean;
}

interface PaymentProps {
  card: Card;
  setCard: (value: Card) => void;
  cardErrors: CardErrors;
}
const PaymentForm = ({ card, setCard, cardErrors }: PaymentProps) => {
  const [tg] = useTranslation('global');
  const requiredText = tg('required', 'Required');
  const nameOnCardText = tg('nameOnCard', 'Name On Card');
  const cardNumberText = tg('cardNumber', 'Credit / Debit Card');
  const cardExpirationText = tg('cardNumber', 'Credit / Debit Card');
  const cvvText = tg('cvvNumber', 'Card CVV Number');
  const nameText = tg('name', 'Name');
  const enterCardNumberText = tg('enterCardNumber', 'Enter Your Card Number');
  const checkOnBackOfCardText = tg(
    'checkOnBackOfCard',
    'Check On Back Of Card',
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-6">
      <InputWrapper
        label={nameOnCardText}
        labelKey="nameOnCard"
        subLabel={requiredText}
      >
        <BaseInput
          placeholder={nameText}
          onChange={(e) => setCard({ ...card, name: e.target.value })}
          error={cardErrors.name}
        />
      </InputWrapper>
      <InputWrapper
        label={cardNumberText}
        labelKey="cardNumber"
        subLabel={requiredText}
      >
        <BaseInput
          placeholder={enterCardNumberText}
          onChange={(e) => setCard({ ...card, number: e.target.value })}
          error={cardErrors.number}
        />
      </InputWrapper>
      <InputWrapper
        label={cardExpirationText}
        labelKey="cardExpiration"
        subLabel={requiredText}
      >
        <BaseInput
          placeholder="MM/YY"
          onChange={(e) => setCard({ ...card, expiration: e.target.value })}
          error={cardErrors.expiration}
        />
      </InputWrapper>
      <InputWrapper
        label={cvvText}
        labelKey="cvvNumber"
        subLabel={requiredText}
      >
        <BaseInput
          placeholder={checkOnBackOfCardText}
          onChange={(e) => setCard({ ...card, cvv: e.target.value })}
          error={cardErrors.cvv}
        />
      </InputWrapper>
    </div>
  );
};

export default PaymentForm;
