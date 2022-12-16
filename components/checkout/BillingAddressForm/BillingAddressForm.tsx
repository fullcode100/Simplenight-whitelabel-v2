import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Divider } from 'antd';
import InputWrapper from 'components/checkout/Inputs/InputWrapper';
import CountrySelect from 'components/global/CountrySelect/CountrySelect';
import BaseInput from '../../global/Input/BaseInput';
import { BillingAddress } from 'components/global/PaymentForm/GooglePayButton/types/PaymentRequest';
import { ChangeEvent } from 'react';
import { Customer } from 'types/cart/CartType';

interface BillingFormProps {
  billingAddress: BillingAddress;
  setBillingAddress: (value: BillingAddress) => void;
}
const BillingAddressForm = ({
  billingAddress,
  setBillingAddress,
}: BillingFormProps) => {
  const [g] = useTranslation('global');
  const billingAddressLabel = g('billingAddress', 'Billing Adrres');
  const requiredText = g('required', 'Required');
  const countryLabel = g('country', 'Country');
  const stateProvinceLabel = g('stateProvince', 'State / Province');
  const cityLabel = g('city', 'City');
  const zipCodeLabel = g('zipCode', 'Postal / Zip Code');

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = e.target.name as keyof BillingAddress;
    const updatedAddress = { ...billingAddress };
    updatedAddress[inputName] = e.target.value as string;
    setBillingAddress(updatedAddress);
  };
  const handleCountryChange = (countryCode: string) => {
    setBillingAddress({ ...billingAddress, countryCode });
  };

  return (
    <div className="space-y-6">
      <Divider />
      <h5 className="text-dark-800 text-base ">{billingAddressLabel}</h5>
      <div className="grid md:grid-cols-2 gap-4">
        <InputWrapper label={'Street Address'} labelKey="streetAddress">
          <BaseInput
            name={'address1'}
            placeholder={'Address'}
            onChange={(e) => handleAddressChange(e)}
          />
        </InputWrapper>
        <InputWrapper label={'Street Address Line 2'} labelKey="streetAddress2">
          <BaseInput
            placeholder={'Address'}
            name={'address2'}
            onChange={(e) => handleAddressChange(e)}
          />
        </InputWrapper>
        <InputWrapper label={countryLabel} labelKey="country">
          <CountrySelect
            value={billingAddress.countryCode}
            onChange={(value: string) => handleCountryChange(value)}
            autoFocus={false}
          />
        </InputWrapper>
        <InputWrapper label={stateProvinceLabel} labelKey="stateProvince">
          <BaseInput
            name="state"
            placeholder={stateProvinceLabel}
            onChange={(e) => handleAddressChange(e)}
          />
        </InputWrapper>
        <InputWrapper label={cityLabel} labelKey="city">
          <BaseInput
            name="city"
            placeholder={cityLabel}
            onChange={(e) => handleAddressChange(e)}
          />
        </InputWrapper>
        <InputWrapper label={zipCodeLabel} labelKey="zipCode">
          <BaseInput
            placeholder={zipCodeLabel}
            onChange={(e) => handleAddressChange(e)}
            name="postalCode"
          />
        </InputWrapper>
      </div>
    </div>
  );
};

export default BillingAddressForm;
