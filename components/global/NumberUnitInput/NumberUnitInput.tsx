import { useState } from 'react';
import classnames from 'classnames';

interface NumberUnitInputProps {
  onChange: (data: any) => void;
  required?: boolean;
  placeholder?: string;
  defaultUnit?: string;
  options?: string[];
}

const NumberUnitInput = ({
  onChange,
  placeholder,
  required,
  defaultUnit,
  options = ['g'],
}: NumberUnitInputProps) => {
  const [unit, setUnit] = useState(defaultUnit ?? options[0]);
  const [numberUnit, setNumberUnit] = useState('');
  const [focus, setFocus] = useState(false);

  const handleChange = (value: string) => {
    setNumberUnit(value);
    onChange({ number: value, unit });
  };

  const handleChangeUnit = (value: string) => {
    setUnit(value);
    onChange({ number: numberUnit, unit: value });
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
      <input
        type="number"
        value={numberUnit}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="border-0 focus:ring-0 w-full rounded-md"
        onFocus={onFocus}
        onBlur={onFocus}
      />
      <select
        value={unit}
        onChange={(e) => handleChangeUnit(e.target.value)}
        className="border-0 focus:ring-0 rounded-md"
      >
        {options.map((option: string, i: number) => (
          <option key={`${option}${i}`} value={option}>
            {option}
          </option>
        ))}
      </select>
    </section>
  );
};

export default NumberUnitInput;
