import { Collapse } from 'antd';
import CollapseBody from 'components/global/CollapseBordered/components/CollapseBody';
import CollapseHeader from 'components/global/CollapseBordered/components/CollapseHeader';
import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import Person from 'public/icons/assets/person.svg';
import Info from 'public/icons/assets/info-circle.svg';
import { RegisterOptions, SubmitHandler, useForm } from 'react-hook-form';
import { IPassenger } from './inputs';
import {
  BaseButtonInput,
  BaseInput,
  Button,
  Checkbox,
  DateInput,
  Paragraph,
  Select,
} from '@simplenight/ui';
import Label from 'components/global/Label/Label';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import countryList from 'country-list';

interface PassengerProps {
  passengerNumber: number;
  open: boolean;
  setOpen: (value: number) => void;
  onSubmit: (data: IPassenger) => void;
  pricing?: ReactNode;
  passengersData: IPassenger[];
  passengersQuantity: number;
}

const Passenger = ({
  passengerNumber,
  open,
  setOpen,
  onSubmit,
  pricing,
  passengersData,
  passengersQuantity,
}: PassengerProps) => {
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
  const isLastPassenger = passengerNumber === passengersQuantity;

  const countries = countryList.getData();
  countries.sort(function (a, b) {
    const textA = a.name.toUpperCase();
    const textB = b.name.toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });
  const countriesOptions = [
    { value: '', label: '' },
    ...Object.values(countries).map((label) => {
      return { value: label.code, label: label.name };
    }),
  ];

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isValidating },
    setValue,
  } = useForm<IPassenger>({
    mode: 'all',
  });

  const enableBookNow =
    passengersData.length === passengersQuantity - 1 && isValid;

  const getTitle = () => (
    <section className="flex flex-row items-center gap-3">
      <section className="flex w-[40px] h-[40px] items-center justify-center bg-teal-200 rounded-full">
        <Person className="text-teal-1000" />
      </section>
      <Paragraph size="medium">
        {passengerLabel} {passengerNumber}
      </Paragraph>
    </section>
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
    nameInput: keyof IPassenger,
    options?: RegisterOptions<IPassenger, keyof IPassenger>,
  ) => (
    <section className="flex flex-wrap gap-2 flox-col">
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

  const getCheckboxField = (
    label: string,
    nameInput: keyof IPassenger,
    options?: RegisterOptions<IPassenger, keyof IPassenger>,
  ) => (
    <section className="flex flex-row items-center">
      <Checkbox
        className=""
        size="small"
        {...register(nameInput, { ...options })}
        onChange={(value) => {
          setValue(nameInput, value);
        }}
        children={label}
      />
    </section>
  );

  const getSelectField = (
    label: string,
    nameInput: keyof IPassenger,
    selectOptions: {
      value: string;
      label: string;
    }[],
    options?: RegisterOptions<IPassenger, keyof IPassenger>,
  ) => (
    <section className="flex flex-wrap gap-2 flox-col">
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
          <option key={value} value={value}>
            {label}
          </option>
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
      <form>
        <section className="flex flex-row justify-center gap-8 mx-6 my-4 flex-nowrap">
          <section className="flex flex-col w-1/3 gap-4">
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
              <section className="flex flex-wrap gap-2 flox-col">
                <Label value={dateOfBirthLabel} htmlFor="dateOfBirth" />
                <DateInput
                  value={dayjs().format('MM-DD-YY')}
                  {...register('dateOfBirth')}
                />
              </section>
              {getSelectField(genderLabel, 'gender', genderOptions)}
            </section>
            {getCheckboxField(
              'I require wheelchair assistance while traveling.',
              'wheelChair',
            )}
            {getCheckboxField(
              'I have a Known Traveler Number.',
              'knownTravelerNumber',
            )}
            {getCheckboxField(
              'I am prepared to show vaccination records.',
              'vaccinationRecords',
            )}
          </section>
          <section className="flex flex-col w-1/3 gap-4">
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
          <section className="flex flex-col w-1/3 gap-4">
            {getInputField(passportIDNumberLabel, 'passportIdNumber', {
              required: true,
              valueAsNumber: true,
            })}
            <section className="flex flex-row justify-between gap-4">
              {getSelectField(countryLabel, 'country', countriesOptions, {
                required: true,
              })}
              <section className="flex flex-wrap gap-2 flox-col">
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
          {!isLastPassenger && (
            <Button disabled={!isValid} onClick={handleSubmit(onSubmit)}>
              {nextPassengerLabel}
            </Button>
          )}
        </section>
      </form>
    </>
  );

  return (
    <>
      <Collapse>
        <CollapseHeader
          title={getTitle()}
          show={open}
          setShow={() => setOpen(passengerNumber)}
        />
        {open && <CollapseBody show={open} body={passengerForm()} />}
      </Collapse>
      {isLastPassenger && open && (
        <section className="flex justify-end gap-6">
          {pricing}
          <Button disabled={!enableBookNow} onClick={handleSubmit(onSubmit)}>
            Book now
          </Button>
        </section>
      )}
    </>
  );
};

export default Passenger;
