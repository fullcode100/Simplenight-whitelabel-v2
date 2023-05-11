import { Collapse } from 'antd';
import CollapseBody from 'components/global/CollapseBordered/components/CollapseBody';
import CollapseHeader from 'components/global/CollapseBordered/components/CollapseHeader';
import React, { ReactNode, useMemo } from 'react';
import Person from 'public/icons/assets/person.svg';
import Info from 'public/icons/assets/info-circle.svg';
import { RegisterOptions, useForm } from 'react-hook-form';
import { IPassenger } from './inputs';
import {
  BaseButtonInput,
  BaseInput,
  Button,
  Checkbox,
  DateInput,
  Paragraph,
  Select,
  TextInput,
  IconWrapper,
  FormField,
} from '@simplenight/ui';
import Label from 'components/global/Label/Label';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import countryList from 'country-list';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import InputMask from 'react-input-mask';

import InfoCircle from 'public/icons/assets/info-circle.svg';
import { usePassengerSchema } from '../../hooks/usePassengerSchema';

interface PassengerProps {
  passengerNumber: number;
  open: boolean;
  setOpen: (value: number) => void;
  onSubmit: (data: IPassenger, passengerNumber: number) => void;
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
  const [t] = useTranslation('flights');
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

  const maleLabel = t('maleLabel', 'Male');
  const femaleLabel = t('female', 'Female');

  const countryLabel = tg('country', 'Country');
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

  const { passengerSchema } = usePassengerSchema();

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    setValue,
  } = useForm<IPassenger>({
    mode: 'all',
    resolver: zodResolver(passengerSchema),
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
      { value: 'male', label: maleLabel },
      { value: 'female', label: femaleLabel },
    ],
    [],
  );

  const setSelectValue = (event: any) => {
    setValue(event.target.name, event.target.value);
  };

  const getInputField = (
    label: string,
    nameInput: keyof IPassenger,
    options?: RegisterOptions<IPassenger, keyof IPassenger>,
  ) => (
    <FormField
      label={label}
      required={{
        required: options?.required ? true : false,
        label: requiredLabel,
      }}
      error={errors[nameInput]?.message}
    >
      <TextInput
        placeholder={label}
        {...register(nameInput)}
        state={errors[nameInput] && 'error'}
      />
    </FormField>
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
        // eslint-disable-next-line react/no-children-prop
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
    <FormField
      label={label}
      required={{
        required: options?.required ? true : false,
        label: requiredLabel,
      }}
      error={errors[nameInput]?.message}
    >
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
    </FormField>
  );

  const passengerForm = () => (
    <>
      <section className="rounded border m-4 border-dark-300 flex flex-row items-center py-[6px] px-2 gap-2">
        <IconWrapper size={16}>
          <InfoCircle className="text-primary-1000" />
        </IconWrapper>
        <Paragraph className="capitalize shrink" fontWeight="semibold">
          Enter the information of each passenger as it appears on their
          official ID.
        </Paragraph>
      </section>
      <form>
        <section className="flex flex-col justify-center gap-8 m-4 md:flex-row md:mx-6 flex-nowrap">
          <section className="flex flex-col gap-4 md:w-1/3">
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
            <section className="flex flex-row gap-2">
              <section className="w-full">
                <FormField label={dateOfBirthLabel}>
                  <InputMask
                    mask={'99-99-99'}
                    alwaysShowMask={false}
                    maskPlaceholder=""
                    type={'text'}
                    placeholder="MM-DD-YY"
                    {...register('dateOfBirth', { required: false })}
                    className="border-gray-300 rounded-md shadow-sm resize-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </FormField>
              </section>
              <section className="w-full">
                {getSelectField(genderLabel, 'gender', genderOptions, {
                  required: true,
                })}
              </section>
            </section>
            <section className="hidden space-y-4 md:block ">
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
          </section>
          <section className="flex flex-col gap-4 md:w-1/3">
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
          <section className="block space-y-4 md:hidden ">
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
          <section className="border-t md:border-t-0 md:border-l-2 md:h-80 border-dark-300" />
          <section className="flex flex-col gap-4 md:w-1/3">
            {getInputField(passportIDNumberLabel, 'passportIdNumber', {
              required: true,
              valueAsNumber: true,
            })}
            <section className="flex flex-row gap-2">
              <section className="w-full">
                {getSelectField(countryLabel, 'country', countriesOptions, {
                  required: true,
                })}
              </section>
              <section className="w-full">
                <FormField
                  label={expirationLabel}
                  required={{
                    required: true,
                    label: requiredLabel,
                  }}
                >
                  <InputMask
                    mask={'99-99-99'}
                    alwaysShowMask={false}
                    maskPlaceholder=""
                    type={'text'}
                    placeholder="MM-DD-YY"
                    {...register('expiration', { required: true })}
                    className="border-gray-300 rounded-md shadow-sm resize-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </FormField>
              </section>
            </section>
          </section>
        </section>
        <section className="flex justify-end m-4 md:mx-6 ">
          {!isLastPassenger && (
            <Button
              disabled={!isValid}
              onClick={handleSubmit((data) => onSubmit(data, passengerNumber))}
            >
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
        <section className="flex flex-col gap-2 md:flex-row md:justify-end md:gap-6">
          <div className="flex justify-between ">
            <Paragraph className="md:hidden">Total</Paragraph>
            {pricing}
          </div>
          <Button
            disabled={!enableBookNow}
            onClick={handleSubmit((data) => onSubmit(data, passengerNumber))}
          >
            Book now
          </Button>
        </section>
      )}
    </>
  );
};

export default Passenger;
