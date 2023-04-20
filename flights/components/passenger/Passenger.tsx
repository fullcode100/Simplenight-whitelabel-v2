import { Collapse } from 'antd';
import CollapseBody from 'components/global/CollapseBordered/components/CollapseBody';
import CollapseHeader from 'components/global/CollapseBordered/components/CollapseHeader';
import React, { useEffect, useMemo, useState } from 'react';
import People from 'public/icons/assets/people.svg';
import Info from 'public/icons/assets/info-circle.svg';
import { RegisterOptions, SubmitHandler, useForm } from 'react-hook-form';
import { IPassengerFormInput } from './inputs';
import {
  BaseButtonInput,
  BaseInput,
  Button,
  Checkbox,
  DateInput,
  Select,
} from '@simplenight/ui';
import Label from 'components/global/Label/Label';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import SelectInput from 'components/global/SelectInput/SelectInput';

interface PassengerProps {
  passengerNumber: number;
}

const Passenger = ({ passengerNumber }: PassengerProps) => {
  const [open, setOpen] = useState(false);
  const [t, i18next] = useTranslation('flights');
  const [tg] = useTranslation('global');
  const firstNameLabel = tg('first_name', 'First name');
  const middleNameLabel = tg('middle_name', 'Middle name');
  const lastNameLabel = tg('last_name', 'Last name');
  const dateOfBirthLabel = tg('date_of_birth', 'Date of Birth');
  const countryOfResidenceLabel = tg(
    'countryOfResidence',
    'Country of residence',
  );
  const genderLabel = tg('gender', 'Gender');
  const countryLabel = tg('country', 'Country');
  const passportLabel = tg('passport', 'Passport');
  const passportIDNumberLabel = tg('passportIDNumber', 'Passport ID Number');
  const expirationLabel = tg('expiration', 'Expiration');
  const passengerLabel = t('passenger', 'Passenger');
  const nextPassengerLabel = t('nextPassenger', 'Next passenger');
  const loyaltyProgramLabel = t('loyaltyProgram', 'Loyalty program');
  const loyaltyNumberLabel = t('loyaltyNumber', 'Loyalty number');
  const requiredLabel = tg('required', 'Required');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<IPassengerFormInput>({ reValidateMode: 'onBlur' });
  const onSubmit: SubmitHandler<IPassengerFormInput> = (data) =>
    console.log(data);

  console.log(isValid);
  const getTitle = () => (
    <section className="flex flex-row items-center">
      <People />
      {passengerLabel} {passengerNumber}
    </section>
  );

  const countriesOptions = useMemo(
    () => [
      { value: 'bolivia', label: 'Bolivia' },
      { value: 'usa', label: 'Unites States' },
      { value: 'rusia', label: 'Rusia' },
    ],
    [],
  );

  const genderOptions = useMemo(
    () => [
      { value: 'female', label: 'Female' },
      { value: 'Male', label: 'Male' },
    ],
    [],
  );

  const setInputValue = (event: any) => {
    setValue(event.target.id, event.target.value);
  };

  const setSelectValue = (event: any) => {
    setValue(event.target.name, event.target.value);
  };

  const getInputField = (
    label: string,
    nameInput: keyof IPassengerFormInput,
    options?: RegisterOptions<IPassengerFormInput, keyof IPassengerFormInput>,
  ) => (
    <section className="flex flox-col flex-wrap gap-2">
      <section className="flex flex-row justify-between w-full">
        <Label value={label} htmlFor={nameInput} />
        {options?.required && (
          <Label className="text-teal-1000" value={requiredLabel} />
        )}
      </section>
      <BaseInput
        placeholder={label}
        {...register(nameInput, { ...options, onChange: setInputValue })}
      />
    </section>
  );

  const getSelectField = (
    label: string,
    nameInput: keyof IPassengerFormInput,
    selectOptions: {
      value: string;
      label: string;
    }[],
    options?: RegisterOptions<IPassengerFormInput, keyof IPassengerFormInput>,
  ) => (
    <section className="flex flox-col flex-wrap gap-2">
      <section className="flex flex-row justify-between w-full">
        <Label value={label} htmlFor={nameInput} />
        {options?.required && (
          <Label className="text-teal-1000" value={requiredLabel} />
        )}
      </section>
      <select
        className="block w-full border-gray-300 rounded-md shadow-sm resize-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
        {...register(nameInput, { ...options, onChange: setSelectValue })}
      >
        {selectOptions.map(({ value, label }) => (
          <option value={value}>{label}</option>
        ))}
      </select>
      {/* SELECT IS DOWN IN UI LIBRARY  */}
      {/* <Select
        options={countriesOptions}
        defaultValue={countriesOptions[0]}
        {...register('dateOfBirth', { required: false, max: 25, min: 1 })}
      /> */}
    </section>
  );

  const passengerForm = () => (
    <>
      <section className="rounded border-[1px] border-dark-300 m-6 flex flex-row items-center py-[6px] px-1 w-max">
        <Info className="w-4 h-4 mr-1" />
        Enter the information of each passenger as it appears on their official
        ID.
      </section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="flex flex-row flex-nowrap mx-6 my-4 gap-8 justify-center">
          <section className="flex flex-col gap-4 w-1/3">
            {getInputField(firstNameLabel, 'firstName', {
              required: true,
              max: 25,
              min: 1,
            })}
            {getInputField(middleNameLabel, 'middleName', { max: 25, min: 1 })}
            {getInputField(lastNameLabel, 'lastName', {
              required: true,
              max: 25,
              min: 1,
            })}
            <section className="flex flex-row justify-between gap-4">
              <section className="flex flox-col flex-wrap gap-2">
                <Label value={dateOfBirthLabel} htmlFor="dateOfBirth" />
                <DateInput
                  value={dayjs().format('MM-DD-YY')}
                  {...register('dateOfBirth')}
                />
              </section>
              {getSelectField(genderLabel, 'gender', genderOptions)}
            </section>
            <section className="flex flex-row items-center">
              <Checkbox
                name="test"
                value="test"
                className=""
                onChange={() => {}}
                size="small"
              />
              <Label value="I require wheelchair assistance while traveling." />
            </section>
            <section className="flex flex-row items-center">
              <Checkbox
                name="test"
                value="test"
                className=""
                onChange={() => {}}
                size="small"
              />
              <Label value="I have a Known Traveler Number." />
            </section>
            <section className="flex flex-row items-center">
              <Checkbox
                name="test"
                value="test"
                className=""
                onChange={() => {}}
                size="small"
              />
              <Label value="I am prepared to show vaccination records." />
            </section>
          </section>
          <section className="flex flex-col gap-4 w-1/3">
            {getSelectField(
              countryOfResidenceLabel,
              'countryOfResidence',
              countriesOptions,
              { required: true },
            )}
            {getSelectField(
              loyaltyProgramLabel,
              'loyaltyProgram',
              countriesOptions,
            )}
            {getInputField(loyaltyNumberLabel, 'loyaltyNumber')}
          </section>
          <section className="border-l-2 h-80 border-dark-300" />
          <section className="flex flex-col gap-4 w-1/3">
            {getInputField(passportIDNumberLabel, 'passportIdNumber', {
              required: true,
              max: 25,
              min: 1,
            })}
            <section className="flex flex-row justify-between gap-4">
              {getSelectField(countryLabel, 'country', countriesOptions, {
                required: true,
              })}
              <section className="flex flox-col flex-wrap gap-2">
                <section className="flex flex-row justify-between w-full">
                  <Label value={expirationLabel} htmlFor="expiration" />
                  <Label className="text-teal-1000" value={requiredLabel} />
                </section>
                <DateInput
                  value={dayjs().format('MM-DD-YY')}
                  {...register('expiration')}
                />
              </section>
            </section>
          </section>
        </section>
        <section className="flex justify-end mx-6 my-4">
          <button
            disabled={!isValid}
            className=" flex justify-center items-center gap-1 border rounded font-semibold leading-lg group
            text-base  h-11 px-3 bg-teal-1000 border-transparent text-white hover:bg-teal-800 hover:text-white focus:bg-teal-800 focus:border-teal-600 focus:text-white active:bg-teal-700 active:border-teal-800 active:text-white cursor-pointer"
            type="submit"
          >
            {nextPassengerLabel}
          </button>
        </section>
      </form>
    </>
  );

  return (
    <Collapse>
      <CollapseHeader title={getTitle()} show={open} setShow={setOpen} />
      {open && <CollapseBody show={open} body={passengerForm()} />}
    </Collapse>
  );
};

export default Passenger;
