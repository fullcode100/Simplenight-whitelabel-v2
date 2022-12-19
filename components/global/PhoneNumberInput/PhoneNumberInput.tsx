import { useState } from 'react';
import { allCountries, iso2Lookup } from 'country-telephone-data';
import classnames from 'classnames';

interface PhoneNumberInputProps {
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  defaultCode?: string;
  defaultValue?: string;
}

const getDefaultDialCode = (value = 'us') => {
  const countryIndex = iso2Lookup[value];
  const dialCode = countryIndex
    ? allCountries[countryIndex as any as number].dialCode
    : value;

  return dialCode || '1';
};

const PhoneNumberInput = ({
  onChange,
  placeholder,
  required,
  defaultCode,
  defaultValue,
}: PhoneNumberInputProps) => {
  const [countryDialCode, setCountryDialCode] = useState(
    getDefaultDialCode(defaultCode),
  );
  const [phoneNumber, setPhoneNumber] = useState(defaultValue || '');
  const [focus, setFocus] = useState(false);

  const handleChange = (value: string) => {
    setPhoneNumber(value);
    onChange(
      JSON.stringify({ phone_prefix: countryDialCode, phone_number: value }),
    );
  };

  const handleChangeCode = (e: any) => {
    const code = e.target.value;
    setCountryDialCode(code);
    onChange(JSON.stringify({ phone_prefix: code, phone_number: phoneNumber }));
  };

  const onFocus = (focus: any) => {
    const isFocus = focus.type === 'focus';
    setFocus(isFocus);
  };

  return (
    <section
      className={classnames(
        'flex border-[1px] shadow-sm  w-full sm:text-sm border-gray-300 rounded-md resize-none items-center',
        {
          'ring-primary-500 border-primary-500': focus,
        },
      )}
    >
      <select
        value={countryDialCode}
        onChange={handleChangeCode}
        className="border-0 rounded-md focus:ring-0"
      >
        {allCountries.map((option: any, i: number) => (
          <option key={`${option.dialCode}${i}`} value={option.dialCode}>
            {option.iso2.toUpperCase()}
          </option>
        ))}
      </select>
      <span className="text-sm">{`+${countryDialCode}`}</span>
      <input
        type="number"
        value={phoneNumber}
        onChange={(event) => handleChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full border-0 rounded-md focus:ring-0"
        onFocus={onFocus}
        onBlur={onFocus}
        defaultValue={defaultValue}
      />
    </section>
  );
};

export default PhoneNumberInput;
