import { useState } from 'react';
import classnames from 'classnames';

import 'react-phone-number-input/style.css';
import PhoneInput, {
  Country,
  parsePhoneNumber,
  getCountryCallingCode,
} from 'react-phone-number-input';

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
  const defaultCountryCode = defaultCode
    ? (defaultCode.toUpperCase() as Country)
    : 'US';
  const [phoneNumber, setPhoneNumber] = useState(
    `+${getCountryCallingCode(defaultCountryCode)}${defaultValue}`,
  );
  const [focus, setFocus] = useState(false);

  const handleChange = (value = '') => {
    setPhoneNumber(value);
    const phoneNumber = parsePhoneNumber(value);
    if (phoneNumber) {
      onChange(
        JSON.stringify({
          country: phoneNumber.country || defaultCountryCode,
          phone_prefix: phoneNumber.countryCallingCode,
          phone_number: phoneNumber.formatNational(),
        }),
      );
    } else {
      onChange('');
    }
  };

  const onFocus = (focus: any) => {
    const isFocus = focus.type === 'focus';
    setFocus(isFocus);
  };

  return (
    <section
      className={classnames(
        'flex border-[1px] shadow-sm  w-full sm:text-sm border-gray-300 rounded resize-none items-center pl-3 h-11 mt-2',
        {
          'ring-primary-500 border-primary-500': focus,
        },
      )}
    >
      <PhoneInput
        international
        countryCallingCodeEditable={false}
        defaultCountry={defaultCountryCode}
        placeholder={placeholder}
        value={phoneNumber}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={onFocus}
        className={'w-full'}
        numberInputProps={{
          className: 'w-full border-0 rounded-md focus:ring-0',
          required: required,
        }}
      />
    </section>
  );
};

export default PhoneNumberInput;
