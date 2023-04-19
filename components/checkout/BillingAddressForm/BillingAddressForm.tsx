import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Divider } from 'antd';

import { FormField, TextInput } from '@simplenight/ui';
import { useFormContext } from 'react-hook-form';
import countryList from 'country-list';
import Select, { SelectOption } from '../Select/Select';
import { useCustomer } from 'hooks/checkout/useCustomer';

interface BillingFormProps {
  setCountry: (SelectOption: SelectOption) => void;
}
const BillingAddressForm = ({ setCountry }: BillingFormProps) => {
  const [g] = useTranslation('global');
  const [customer] = useCustomer((state) => [state.customer]);
  const billingAddressLabel = g('billingAddress', 'Billing Address');
  const requiredText = g('required', 'Required');
  const countryLabel = g('country', 'Country');
  const stateProvinceLabel = g('stateProvince', 'State / Province');
  const cityLabel = g('city', 'City');
  const postalCodeLabel = g('zipCode', 'Postal / Zip Code');
  const address = g('address', 'Address');
  const streetAddress = g('streetAddress', 'Street Address');
  const streetAddressLine2 = g('streetAddress2', 'Street Address Line2');

  const countries = countryList.getData();
  countries.sort(function (a, b) {
    const textA = a.name.toUpperCase();
    const textB = b.name.toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });
  const countryOptions = Object.values(countries).map((label) => {
    return { value: label.code, label: label.name };
  });
  const customerCountry = countryOptions.find(
    (option) => option.value.toUpperCase() === customer?.country.toUpperCase(),
  );

  const defaultCountry = customerCountry || countryOptions[0];

  useEffect(() => {
    setCountry(defaultCountry);
  }, []);

  const methods = useFormContext();
  const {
    formState: { errors },
    register,
  } = methods;

  const getErrors = (key: string) => {
    if (errors[key]) {
      return errors[key]!.message as string;
    }
  };

  return (
    <div className="space-y-6">
      <Divider />
      <h5 className="text-dark-800 text-base ">{billingAddressLabel}</h5>
      <div className="grid md:grid-cols-2 gap-4">
        <FormField
          label={streetAddress}
          required={{ required: true, label: requiredText }}
          error={getErrors('address1')}
        >
          <TextInput
            state={getErrors('address1') ? 'error' : 'idle'}
            placeholder={address}
            {...register('address1')}
          />
        </FormField>

        <FormField label={streetAddressLine2} error={getErrors('address2')}>
          <TextInput
            state={getErrors('address2') ? 'error' : 'idle'}
            placeholder={address}
            {...register('address2')}
          />
        </FormField>
        <FormField label={countryLabel} error={getErrors('country')}>
          <Select
            options={countryOptions}
            defaultValue={defaultCountry}
            onChange={(option) => setCountry(option)}
          />
        </FormField>
        <FormField
          label={stateProvinceLabel}
          error={getErrors('state')}
          required={{ required: true, label: requiredText }}
        >
          <TextInput
            state={getErrors('state') ? 'error' : 'idle'}
            placeholder={stateProvinceLabel}
            {...register('state')}
          />
        </FormField>
        <FormField
          label={cityLabel}
          error={getErrors('city')}
          required={{ required: true, label: requiredText }}
        >
          <TextInput
            state={getErrors('city') ? 'error' : 'idle'}
            placeholder={cityLabel}
            {...register('city')}
          />
        </FormField>

        <FormField
          label={postalCodeLabel}
          error={getErrors('postalCode')}
          required={{ required: true, label: requiredText }}
        >
          <TextInput
            state={getErrors('postalCode') ? 'error' : 'idle'}
            placeholder={postalCodeLabel}
            {...register('postalCode')}
          />
        </FormField>
      </div>
    </div>
  );
};

export default BillingAddressForm;
