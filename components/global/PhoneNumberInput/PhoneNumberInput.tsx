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

const PhoneNumberInput = ({
  onChange,
  placeholder,
  required,
  defaultCode,
  defaultValue,
}: PhoneNumberInputProps) => {
  const [countryCode, setCountryCode] = useState(defaultCode ?? 'us');
  const [phoneNumber, setPhoneNumber] = useState(defaultValue || '');
  const [focus, setFocus] = useState(false);
  const countryIndex = iso2Lookup[countryCode];
  const phoneCode = allCountries[countryIndex as any as number].dialCode;

  const handleChange = (value: string) => {
    setPhoneNumber(value);
    onChange(
      JSON.stringify({ phone_prefix: phoneCode, phone_number: phoneNumber }),
    );
  };

  const handleChangeCode = (e: any) => {
    const country = e.target.value;
    const index = iso2Lookup[country];
    const code = allCountries[index as any as number].dialCode;
    setCountryCode(country);
    onChange(
      JSON.stringify({ phone_prefix: phoneCode, phone_number: phoneNumber }),
    );
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
        value={countryCode}
        onChange={handleChangeCode}
        className="border-0 rounded-md focus:ring-0"
      >
        {allCountries.map((option: any, i: number) => (
          <option key={`${option.dialCode}${i}`} value={option.iso2}>
            {option.iso2.toUpperCase()}
          </option>
        ))}
      </select>
      <span className="text-sm">{`+${phoneCode}`}</span>
      <input
        type="text"
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
