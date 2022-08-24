import React from 'react';
import styles from './radio.module.scss';

interface IRadioGroup {
  children?: React.ReactNode[];
  value?: string;
  onChange?: (value: any) => void;
}
interface IRadio {
  value?: string;
  children?: React.ReactNode;
  containerClass?: string;
}

export const Radio = ({
  value,
  children,
  containerClass,
  ...others
}: IRadio) => {
  return (
    <section className={`flex items-center ${containerClass}`}>
      <input
        id={value}
        type="radio"
        value={value}
        className={styles.inputRadio}
        {...others}
      />
      <label
        htmlFor={value}
        className="block ml-3 text-sm font-normal leading-[22px] text-dark-1000"
      >
        {children}
      </label>
    </section>
  );
};

export const RadioGroup = ({ children, onChange, value }: IRadioGroup) => {
  const handleChange = (e: any) => {
    if (onChange) onChange(e.target.value);
  };

  const newChildren = children?.map?.((element: any) => {
    return {
      ...element,
      props: {
        ...element?.props,
        onChange: handleChange,
        checked: element?.props?.value === value,
      },
    };
  });

  return <section className="grid gap-4">{newChildren}</section>;
};
