import { Collapse } from 'antd';
import CollapseBody from 'components/global/CollapseBordered/components/CollapseBody';
import CollapseHeader from 'components/global/CollapseBordered/components/CollapseHeader';
import React, { useEffect, useMemo, useState } from 'react';
import Person from 'public/icons/assets/person.svg';
import {
  Controller,
  FieldValues,
  RegisterOptions,
  useFormContext,
} from 'react-hook-form';
import { IPassenger, IPassengerForm, PassengerTypeList } from './inputs';
import {
  Button,
  Checkbox,
  Paragraph,
  TextInput,
  IconWrapper,
  FormField,
} from '@simplenight/ui';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import countryList from 'country-list';
import ReactDatepicker from 'components/global/ReactDatepicker/ReactDatepicker';
import InfoCircle from 'public/icons/assets/info-circle.svg';
import { usePassengerSchema } from '../../hooks/usePassengerSchema';
import airlinesList from '../../airlines';
import CheckIcon from 'public/icons/assets/check.svg';
import classnames from 'classnames';

interface PassengerProps {
  passengerNumber: number;
  open: boolean;
  toggleOpen: (value: number) => void;
  passengersQuantity: number;
  passengersType: PassengerTypeList;
}

const Passenger = ({
  passengerNumber,
  open,
  toggleOpen,
  passengersQuantity,
  passengersType,
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
  const adultLabel = t('adult', 'Adult');
  const childrenLabel = t('children', 'Children');
  const infantLabel = t('infant', 'Infat');
  const passengerTypeLabelMap: Record<PassengerTypeList, string> = {
    ADT: adultLabel,
    CNN: childrenLabel,
    INF: infantLabel,
  };
  const requiredLabel = tg('required', 'Required');
  const isLastPassenger = passengerNumber === passengersQuantity - 1;

  const [isRequiredInfoComplete, setIsRequiredInfoComplete] = useState(false);

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

  const airlines = Object.values(airlinesList);
  airlines.sort(function (a, b) {
    const textA = a.toUpperCase().split(' ')[0];
    const textB = b.toUpperCase().split(' ')[0];
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });
  const airlinesOptions = [
    ...airlines.map((name) => {
      return { value: name, label: name };
    }),
  ];

  const {
    register,
    setValue,
    control,
    getValues,
    watch,
    formState: { errors },
  } = useFormContext<IPassengerForm>();

  const getTitle = () => (
    <section className="flex flex-row items-center gap-3">
      <section
        className={classnames(
          'flex h-10 w-10 items-center justify-center rounded-full',
          isRequiredInfoComplete ? 'bg-green-200' : 'bg-primary-200',
        )}
      >
        {isRequiredInfoComplete ? (
          <CheckIcon className="text-green-1000" />
        ) : (
          <Person className="text-primary-1000" />
        )}
      </section>
      <Paragraph size="medium">
        {passengerLabel} {passengerNumber + 1}{' '}
        {`(${passengerTypeLabelMap[passengersType]})`}
      </Paragraph>
    </section>
  );

  const { passengerSchema } = usePassengerSchema();
  useEffect(() => {
    const result = passengerSchema.safeParse(
      getValues(`passengers.${passengerNumber}`),
    );
    if (result.success) {
      setIsRequiredInfoComplete(true);
    } else {
      setIsRequiredInfoComplete(false);
    }
  }, [watch()]);

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
      error={errors?.passengers?.[passengerNumber]?.[nameInput]?.message}
    >
      <TextInput
        placeholder={label}
        {...register(`passengers.${passengerNumber}.${nameInput}`)}
        state={errors?.passengers?.[passengerNumber]?.[nameInput] && 'error'}
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
        {...register(`passengers.${passengerNumber}.${nameInput}`, {
          ...(options as RegisterOptions<FieldValues, `passengers[${number}]`>),
        })}
        onChange={(value) => {
          setValue(`passengers.${passengerNumber}.${nameInput}`, value);
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
      error={errors?.passengers?.[passengerNumber]?.[nameInput]?.message}
    >
      <select
        className="block w-full border-gray-300 rounded-md shadow-sm resize-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
        {...register(`passengers.${passengerNumber}.${nameInput}`, {
          ...(options as RegisterOptions<FieldValues, `passengers[${number}]`>),
          onChange: setSelectValue,
        })}
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
              <section className="w-full ">
                <FormField label={dateOfBirthLabel}>
                  <Controller
                    control={control}
                    name={`passengers.${passengerNumber}.dateOfBirth`}
                    render={({ field }) => (
                      <ReactDatepicker
                        onChange={(date: Date) => {
                          field.onChange(date);
                        }}
                        selected={field.value || new Date()}
                        maxDate={new Date()}
                      />
                    )}
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
              airlinesOptions,
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
              valueAsNumber: true,
            })}
            <section className="flex flex-row gap-2">
              <section className="w-full">
                {getSelectField(countryLabel, 'country', countriesOptions)}
              </section>
              <section className="w-full">
                <FormField label={expirationLabel}>
                  <Controller
                    control={control}
                    name={`passengers.${passengerNumber}.expiration`}
                    render={({ field }) => (
                      <ReactDatepicker
                        onChange={(date: Date) => {
                          field.onChange(date);
                        }}
                        selected={field.value || new Date()}
                        minDate={dayjs().toDate()}
                        maxDate={dayjs().add(19, 'years').toDate()}
                      />
                    )}
                  />
                </FormField>
              </section>
            </section>
          </section>
        </section>
        <section className="flex justify-end m-4 md:mx-6 ">
          {!isLastPassenger && (
            <Button
              disabled={!isRequiredInfoComplete}
              onClick={() => {
                toggleOpen(passengerNumber + 1);
              }}
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
          setShow={() => toggleOpen(passengerNumber)}
        />
        {open && <CollapseBody show={open} body={passengerForm()} />}
      </Collapse>
    </>
  );
};

export default Passenger;
