import React, { ChangeEvent } from 'react';
import Button from '../Button/Button';
import BaseInput, { BaseInputProps } from './BaseInput';

import PlusIcon from 'public/icons/assets/Plus.svg';
import MinusIcon from 'public/icons/assets/minus.svg';

type NumberInputProps = Omit<BaseInputProps, 'onChange'> & {
  onChange?: (e: number) => void;
  min?: number;
  max?: number;
};

const NumberInput = ({
  value,
  onChange,
  min = 0,
  max,
  ...others
}: NumberInputProps) => {
  const handlePlusClick = () => {
    if (max) {
      if (onChange) onChange(value < max ? value + 1 : max);
    } else {
      if (onChange) onChange(value + 1);
    }
  };

  const handleMinusClick = () => {
    const positiveValue = value > min ? value - 1 : min;
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
        disabledLeft={value === min ? true : false}
        disabledRight={value === max ? true : false}
      />
    </section>
  );
};

export default NumberInput;
