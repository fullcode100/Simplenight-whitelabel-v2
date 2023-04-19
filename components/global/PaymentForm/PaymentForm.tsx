import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import InputMask from 'react-input-mask';
import { FormField, TextInput } from '@simplenight/ui';
import { Controller, useFormContext } from 'react-hook-form';
import { useCustomer } from 'hooks/checkout/useCustomer';

const PaymentForm = () => {
  const [tg] = useTranslation('global');
  const requiredText = tg('required', 'Required');
  const nameOnCardText = tg('nameOnCard', 'Name On Card');
  const cardNumberText = tg('cardNumber', 'Credit / Debit Card');
  const cardExpirationText = tg('cardExpiration', 'Card Expiration');
  const cvvText = tg('cvvNumber', 'Card CVV Number');
  const nameText = tg('name', 'Name');
  const enterCardNumberText = tg('enterCardNumber', 'Enter Your Card Number');
  const checkOnBackOfCardText = tg(
    'checkOnBackOfCard',
    'Check On Back Of Card',
  );
  const [customer] = useCustomer((state) => [state.customer]);
  const defaultNameOnCard = customer
    ? `${customer?.first_name} ${customer?.last_name}`
    : '';

  const methods = useFormContext();
  const {
    formState: { errors },
    register,
    control,
  } = methods;

  const getErrors = (key: string) => {
    if (errors[key]) {
      return errors[key]!.message as string;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-6">
      <FormField
        label={nameOnCardText}
        required={{ required: true, label: requiredText }}
        error={getErrors('creditCardName')}
      >
        <TextInput
          state={getErrors('creditCardName') ? 'error' : 'idle'}
          placeholder={nameText}
          defaultValue={defaultNameOnCard}
          {...register('creditCardName')}
        />
      </FormField>

      <FormField
        label={cardNumberText}
        required={{ required: true, label: requiredText }}
        error={getErrors('creditCardNumber')}
      >
        <TextInput
          state={getErrors('creditCardNumber') ? 'error' : 'idle'}
          placeholder={enterCardNumberText}
          {...register('creditCardNumber')}
        />
      </FormField>

      <FormField
        label={cardExpirationText}
        required={{ required: true, label: requiredText }}
        error={getErrors('creditCardExpiration')}
      >
        <Controller
          name="creditCardExpiration"
          control={control}
          render={({ field }) => (
            <InputMask
              mask="99/99"
              maskChar={null}
              value={field.value}
              {...register('creditCardExpiration')}
              onChange={field.onChange}
            >
              {() => (
                <TextInput
                  state={getErrors('creditCardExpiration') ? 'error' : 'idle'}
                  placeholder={'MM/YY'}
                />
              )}
            </InputMask>
          )}
        />
        {/*  */}
      </FormField>

      <FormField
        label={cvvText}
        required={{ required: true, label: requiredText }}
        error={getErrors('creditCardCVV')}
      >
        <TextInput
          state={getErrors('creditCardCVV') ? 'error' : 'idle'}
          placeholder={checkOnBackOfCardText}
          {...register('creditCardCVV')}
        />
      </FormField>
    </div>
  );
};

export default PaymentForm;
