import { useState } from 'react';
import { allCountries } from 'country-telephone-data';
import classnames from 'classnames';

interface PhoneNumberInputProps {
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
}

const PhoneNumberInput = ({
  onChange,
  placeholder,
  required,
}: PhoneNumberInputProps) => {
  const [phoneCode, setCode] = useState(`+${allCountries[0].dialCode}`);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [focus, setFocus] = useState(false);

  const handleChange = (value: string) => {
    setPhoneNumber(value);
    onChange(`${phoneCode}${value}`);
  };

  const handleChangeCode = (e: any) => {
    const code = `+${e.target.value}`;
    setCode(code);
    onChange(`${code}${phoneNumber}`);
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
        value={phoneCode}
        onChange={handleChangeCode}
        className="border-0 focus:ring-0 rounded-md"
      >
        {allCountries.map((option: any, i: number) => (
          <option key={`${option.dialCode}${i}`} value={option.dialCode}>
            {option.iso2.toUpperCase()}
          </option>
        ))}
      </select>
      <span className="text-sm">{`${phoneCode}`}</span>
      <input
        type="text"
        value={phoneNumber}
        onChange={(event) => handleChange(event.target.value)}
        placeholder={placeholder}
        autoFocus={true}
        required={required}
        className="border-0 focus:ring-0 w-full rounded-md"
        onFocus={onFocus}
        onBlur={onFocus}
      />
    </section>
  );
};

export default PhoneNumberInput;
