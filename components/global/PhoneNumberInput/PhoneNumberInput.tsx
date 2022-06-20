import { useState } from 'react';
import { allCountries, iso2Lookup } from 'country-telephone-data';
import classnames from 'classnames';

interface PhoneNumberInputProps {
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  defaultCode?: string;
}

const PhoneNumberInput = ({
  onChange,
  placeholder,
  required,
  defaultCode,
}: PhoneNumberInputProps) => {
  const [countryCode, setCountryCode] = useState(defaultCode ?? 'us');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [focus, setFocus] = useState(false);
  const countryIndex = iso2Lookup[countryCode];
  const phoneCode = allCountries[countryIndex as any as number].dialCode;

  const handleChange = (value: string) => {
    setPhoneNumber(value);
    onChange(`+${phoneCode}${value}`);
  };

  const handleChangeCode = (e: any) => {
    const country = e.target.value;
    const index = iso2Lookup[country];
    const code = allCountries[index as any as number].dialCode;
    setCountryCode(country);
    onChange(`+${code}${phoneNumber}`);
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
        className="border-0 focus:ring-0 rounded-md"
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
        className="border-0 focus:ring-0 w-full rounded-md"
        onFocus={onFocus}
        onBlur={onFocus}
      />
    </section>
  );
};

export default PhoneNumberInput;
