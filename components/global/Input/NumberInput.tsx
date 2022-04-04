import { useColor } from 'hooks/layoutAndUITooling/useColor';
import React, { useState } from 'react';
import Button from '../Button/Button';
import BaseInput, { BaseInputProps } from './BaseInput';

import PlusIcon from 'public/icons/assets/plus.svg';
import MinusIcon from 'public/icons/assets/minus.svg';

const NumberInput = ({ ...others }: BaseInputProps) => {
  const colors = useColor('primary');

  const [value, setValue] = useState(0);

  const handlePlusClick = () => {
    console.log('plus');
    setValue(value + 1);
  };

  const handleMinusClick = () => {
    setValue(value - 1);
  };

  return (
    <section className="w-full h-[44px] flex items-center gap-4 mt-4 justify-center">
      <BaseInput type="number" value={value} {...others} />
      <Button
        value=""
        leftValue={<MinusIcon />}
        rightValue={<PlusIcon />}
        onLeftClick={handleMinusClick}
        onRightClick={handlePlusClick}
        type="dual"
        size="full"
        containerClassName="w-1/3 h-full"
      />
    </section>
  );
};

export default NumberInput;
