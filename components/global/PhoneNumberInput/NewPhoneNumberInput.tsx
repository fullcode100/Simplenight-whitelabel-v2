/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef, useState, useEffect } from 'react';

import { allCountries, iso2Lookup } from 'country-telephone-data';

import ChevronDown from 'public/icons/assets/chevron-down-arrow.svg';
import ChevronUp from 'public/icons/assets/chevron-up-arrow.svg';

import { useOnOutsideClick } from 'hooks/windowInteraction/useOnOutsideClick';
import useBog from 'hooks/bog/useBog';
import { createDefaultMaskGenerator, MaskedInput } from 'react-hook-mask';

export interface CountryCodeOption {
  name: string;
  iso2: string;
  dialCode: string;
  priority: number;
  format?: string;
}

export interface GeneralProps {
  name?: string;
  size?: 'large' | 'small';
  placeholder?: string;
  state?: 'idle' | 'disabled' | 'error' | 'success';
  value: string;
  required?: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ColorsMap {
  [key: string]: string;
}

interface PhoneNumberInputSpecificProps {
  defaultPhoneNumber?: string;
  defaultCode?: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void;
}

type PhoneNumberInputProps = Omit<GeneralProps, 'value'> &
  PhoneNumberInputSpecificProps;
const PhoneNumberInput = ({
  name,
  size = 'large',
  state = 'idle',
  defaultCode = 'us',
  required = false,
  onChange,
  defaultPhoneNumber,
  placeholder,
}: PhoneNumberInputProps) => {
  const { isBog } = useBog();

  const [open, setOpen] = useState(false);
  const [phoneInputIsFocused, setPhoneInputIsFocused] = useState(false);

  const height = size === 'small' ? 'h-8' : 'h-11';
  const textSize = size === 'small' ? 'text-sm' : 'text-base';
  const iconSize = size === 'large' ? 'w-6 h-6' : 'w-4 h-4';
  const isDisabled = state === 'disabled';
  const isFocused = open || phoneInputIsFocused;

  const inputRef = useRef<HTMLInputElement>(null);
  useOnOutsideClick(inputRef, () => setOpen(false));

  const getPhoneNumberMask = (countryCode: CountryCodeOption) => {
    const { format } = countryCode;
    if (!format) return '9999999999999999999999';
    const formattedDialCodeLength = formatDialCode(countryCode).length;

    let phoneNumberMask = format.substring(formattedDialCodeLength);
    phoneNumberMask = phoneNumberMask.replace(/\./g, '9');
    return phoneNumberMask;
  };

  const formatDialCode = (countryCode: CountryCodeOption) => {
    const { format, dialCode } = countryCode;
    if (!format) return `+${dialCode}`;
    let formattedDialCode = format;
    for (let i = 0; i < dialCode.length; i += 1) {
      formattedDialCode = formattedDialCode.replace('.', dialCode[i]);
    }
    const lastDigitOfDialCode = dialCode[dialCode.length - 1];
    const indexOfLastDigitOfDialCode =
      formattedDialCode.lastIndexOf(lastDigitOfDialCode);
    const followingCharacterToDialCode =
      formattedDialCode[indexOfLastDigitOfDialCode + 1];
    let indexEnd;
    if (followingCharacterToDialCode === ')') {
      indexEnd = indexOfLastDigitOfDialCode + 2;
    } else {
      indexEnd = indexOfLastDigitOfDialCode + 1;
    }
    formattedDialCode = formattedDialCode.substring(0, indexEnd);
    return formattedDialCode;
  };

  const removeFormatFromPhoneNumber = (phoneNumber: string) =>
    phoneNumber.replace(/\D/g, '');

  const getDefaultCountryCode = (defaultIso2Code: string) => {
    const countryIndex = iso2Lookup[defaultIso2Code];
    const code = allCountries[countryIndex as unknown as number];
    return code;
  };

  const [countryCode, setCountryCode] = useState<CountryCodeOption>();
  const [formattedDialCode, setFormattedDialCode] = useState<
    string | undefined
  >(countryCode?.format ? formatDialCode(countryCode) : countryCode?.dialCode);
  const [phoneNumber, setPhoneNumber] = useState(defaultPhoneNumber || '');
  const [phoneNumberMask, setPhoneNumberMask] = useState<string>(
    countryCode?.format ? getPhoneNumberMask(countryCode) : '',
  );

  const idleBorderColor =
    countryCode && phoneNumber ? 'border-dark-400' : 'border-dark-300';
  const focusBorderColor = 'border-primary-1000';
  const colors: ColorsMap = {
    idle: `text-dark-1000 ${isFocused ? focusBorderColor : idleBorderColor} `,
    error: `text-dark-1000   ${
      isFocused ? focusBorderColor : 'border-error-1000'
    } `,
    success: `text-dark-1000  ${
      isFocused ? focusBorderColor : 'border-green-1000'
    }`,
    disabled: 'text-dark-600 border-dark-300 bg-dark-200',
  };

  const updatePhoneMasks = (option: CountryCodeOption) => {
    setFormattedDialCode(formatDialCode(option));
    setPhoneNumberMask(getPhoneNumberMask(option));
  };

  const handleChangeCode = (option: CountryCodeOption) => {
    const { dialCode, iso2 } = option;
    setCountryCode(option);
    onChange(
      JSON.stringify({
        phone_prefix: isBog ? '1' : dialCode,
        phone_number: removeFormatFromPhoneNumber(phoneNumber),
        country: isBog ? 'us' : iso2,
      }),
    );
    setOpen(false);
    updatePhoneMasks(option);
  };

  const handleChangePhone = (e: any) => {
    const phone = e;
    setPhoneNumber(phone);
    onChange(
      JSON.stringify({
        phone_prefix: isBog ? '1' : countryCode?.dialCode,
        phone_number: removeFormatFromPhoneNumber(phone),
        country: isBog ? 'us' : countryCode?.iso2,
      }),
    );
  };

  useEffect(() => {
    setCountryCode(getDefaultCountryCode(defaultCode.toLowerCase()));
    handleChangeCode(getDefaultCountryCode(defaultCode.toLowerCase()));
  }, [defaultCode]);
  const maskGenerator = createDefaultMaskGenerator(phoneNumberMask);
  return (
    <section ref={inputRef} className=" relative  mt-2 ">
      <section
        className={`flex items-center  w-full border px-3
        ${height} ${colors[state]} ${open ? 'rounded-t' : 'rounded'}`}
      >
        <section
          className="flex items-center "
          onClick={() => (!isDisabled && !isBog ? setOpen(!open) : undefined)}
        >
          <input
            type="text"
            className={`px-0 ${textSize}  bg-transparent w-8 h-full  border-none focus:shadow-none focus:inset-0 focus:ring-0 focus:outline-none focus:border-transparent`}
            value={countryCode?.iso2.toUpperCase()}
            disabled
          />
          {!isBog && (
            <button type="button">
              {open ? (
                <ChevronUp className={`${iconSize} text-dark-700`} />
              ) : (
                <ChevronDown className={`${iconSize} text-dark-700`} />
              )}
            </button>
          )}
          <span className={textSize}>
            {countryCode?.dialCode && formattedDialCode}
          </span>
        </section>
        <MaskedInput
          maskGenerator={maskGenerator}
          onChange={handleChangePhone}
          onFocus={() => setPhoneInputIsFocused(true)}
          onBlur={() => setPhoneInputIsFocused(false)}
          value={phoneNumber}
          disabled={isDisabled}
          placeholder={placeholder}
          className={`px-0 pl-2 ${textSize} ${colors[state]} w-full h-full bg-transparent border-none focus:shadow-none focus:inset-0 focus:ring-0 focus:outline-none focus:border-transparent`}
          name={name}
          id={name}
          required={required}
        />
      </section>
      <section
        className={`${
          !open ? 'hidden ' : ''
        } border border-primary-1000 border-t-0 rounded-b max-h-[286px] overflow-auto absolute w-full bg-white z-10`}
      >
        {allCountries.map((option: CountryCodeOption) => (
          <div
            key={`${option.dialCode}-${option.iso2}`}
            onClick={() => handleChangeCode(option)}
            className="p-2 text-base border-b border-solid cursor-pointer select-none border-dark-200 hover:bg-dark-100 last:border-b-0"
          >
            {option.iso2.toUpperCase()}
          </div>
        ))}
      </section>
    </section>
  );
};

PhoneNumberInput.defaultProps = {
  defaultPhoneNumber: '',
  defaultCode: 'us',
};
export default PhoneNumberInput;
