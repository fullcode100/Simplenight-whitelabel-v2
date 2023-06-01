import { FormField, TextInput } from '@simplenight/ui';
import NewPhoneNumberInput from 'components/global/PhoneNumberInput/NewPhoneNumberInput';
import { Controller, useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import countryList from 'country-list';

import { useCustomer } from 'hooks/checkout/useCustomer';
import Select from '../Select/Select';
import { useEffect, useState } from 'react';
import { IPassenger } from '../../../flights/components/passenger/inputs';

export const ClientFormContent = ({
  passenger,
}: {
  passenger?: IPassenger | null;
}) => {
  const [g] = useTranslation('global');
  const [customer] = useCustomer((state) => [state.customer]);

  const firstName = g('firstName', 'First Name');
  const lastName = g('lastName', 'Last Name');
  const phoneNumber = g('phoneNumber', 'Phone Number');
  const email = g('email', 'Email Address');
  const countryLabel = g('country', 'Country');

  const name = g('name', 'Name');
  const requiredText = g('required', 'Required');

  const countries = countryList.getData();
  countries.sort(function (a, b) {
    const textA = a.name.toUpperCase();
    const textB = b.name.toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });
  const countryOptions = Object.values(countries).map((label) => {
    return { value: label.code, label: label.name };
  });
  const passengerCountry = countryOptions.find(
    (option) =>
      option.value.toUpperCase() === passenger?.country?.toUpperCase(),
  );
  const customerCountry = countryOptions.find(
    (option) => option.value.toUpperCase() === customer?.country.toUpperCase(),
  );

  useEffect(() => {
    const passengerCountry = countryOptions.find(
      (option) =>
        option.value.toUpperCase() === passenger?.country?.toUpperCase(),
    );
    if (passengerCountry) {
      setSelectedCountry(passengerCountry);
    }
  }, [passenger]);

  const defaultCountry =
    customerCountry || passengerCountry || countryOptions[235];

  const [selectedCountry, setSelectedCountry] = useState(defaultCountry);
  const methods = useFormContext();
  const {
    register,
    formState: { errors },
    control,
    setValue,
    getValues,
  } = methods;

  useEffect(() => {
    console.log('country', selectedCountry);
  }, [selectedCountry]);

  const { field } = useController({
    name: 'phoneNumber',
    control: methods.control,
    rules: { required: true },
  });

  const getErrors = (key: string) => {
    if (errors[key]) {
      return errors[key]!.message as string;
    }
  };

  return (
    <div>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-3">
        <FormField
          label={firstName}
          required={{ required: true, label: requiredText }}
          error={getErrors('firstName')}
        >
          <TextInput
            state={getErrors('firstName') ? 'error' : 'idle'}
            placeholder={name}
            {...register('firstName')}
          />
        </FormField>
        <FormField
          label={lastName}
          required={{ required: true, label: requiredText }}
          error={getErrors('lastName')}
        >
          <TextInput
            state={getErrors('lastName') ? 'error' : 'idle'}
            placeholder={name}
            {...register('lastName')}
          />
        </FormField>
        <FormField label={countryLabel}>
          <select
            className="block w-full border-gray-300 rounded shadow-sm resize-none  focus:ring-0 focus:outline-0 focus:border-primary-1000 text-dark-1000 text-base h-11"
            {...register('country')}
            onChange={(evt) => {
              const country = countryOptions.find(
                (c) => c.value === evt.target.value,
              );
              if (country) setSelectedCountry(country);
            }}
            value={selectedCountry.value}
          >
            {countryOptions.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          {/*  <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <Select
                options={countryOptions}
                defaultValue={selectedCountry}
                onChange={(option) => {
                  setSelectedCountry(option);
                  field.onChange(option.value);
                }}
              />
            )}
          /> */}
        </FormField>
        <FormField label={phoneNumber} error={getErrors('phoneNumber')}>
          <NewPhoneNumberInput
            placeholder={phoneNumber}
            defaultCode={selectedCountry.value}
            defaultPhoneNumber={''}
            onChange={field.onChange}
          />
        </FormField>
      </section>
      <section className="grid gap-x-4 pt-3">
        <FormField
          label={email}
          required={{ required: true, label: requiredText }}
          error={getErrors('email')}
        >
          <TextInput
            state={getErrors('email') ? 'error' : 'idle'}
            placeholder={email}
            {...register('email')}
          />
        </FormField>
      </section>
    </div>
  );
};
