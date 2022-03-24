import React from 'react';
import BaseInput, { BaseInputProps } from './BaseInput';

const NumberInput = ({ ...others }: BaseInputProps) => (
  <BaseInput type="number" {...others} />
);

export default NumberInput;
