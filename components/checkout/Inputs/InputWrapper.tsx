// Libraries
import React from 'react';
// Hooks
import { useTranslation } from 'react-i18next';
// Components
import BaseInput from 'components/global/Input/BaseInput';

type InputWrapperProps = {
  label: string;
  labelKey: string;
  subLabelKey?: string;
  subLabel?: string;
  value: any;
  disabled?: boolean;
  setter?: (value: any) => void;
  context?: string;
};

const InputWrapper = ({
  label,
  subLabel = '',
  labelKey,
  subLabelKey = '',
  value,
  context = 'global',
  disabled = false,
  setter,
}: InputWrapperProps) => {
  const [t, i18next] = useTranslation(context);
  // Text
  const inputTitle = t(labelKey, label);
  const subLabelText = t(subLabelKey, subLabel);
  return (
    <fieldset className="flex flex-col gap-2">
      <label className="flex justify-between">
        <p className="text-dark-800 text-[16px] leading-[16px] font-semibold">
          {inputTitle}
        </p>
        {subLabel && (
          <p className="text-primary-1000 text-[16px] leading-[16px] font-semibold">
            {subLabelText}
          </p>
        )}
      </label>
      <BaseInput
        value={value}
        onChange={(e) => setter && setter(e.target.value)}
        disabled={disabled}
      />
    </fieldset>
  );
};

export default InputWrapper;
