import React, { ChangeEvent } from 'react';
import Button from '../Button/Button';
import BaseInput, { BaseInputProps } from './BaseInput';

import PlusIcon from 'public/icons/assets/Plus.svg';
import MinusIcon from 'public/icons/assets/minus.svg';

type NumberInputProps = Omit<BaseInputProps, 'onChange'> & {
  onChange?: (e: number) => void;
};

const NumberInput = ({ value, onChange, ...others }: NumberInputProps) => {
  const handlePlusClick = () => {
    if (onChange) onChange(value + 1);
  };

  const handleMinusClick = () => {
    const positiveValue = value > 0 ? value - 1 : 0;
    if (onChange) onChange(positiveValue);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseInt(e.target.value);
    const countValue = inputValue ? inputValue : 0;

    if (onChange) onChange(countValue);
  };

  return (
    <section className="h-[44px] flex items-center gap-3 justify-center">
      <BaseInput
        type="number"
        value={value}
        onChange={handleChange}
        {...others}
      />
      <Button
        value=""
        leftValue={<MinusIcon />}
        rightValue={<PlusIcon />}
        onLeftClick={handleMinusClick}
        onRightClick={handlePlusClick}
        type="dual"
        size="w-11 h-11"
        containerClassName="h-full"
      />
    </section>
  );
};

export default NumberInput;
