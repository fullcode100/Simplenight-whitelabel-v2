import React from 'react';
import styles from './radio.module.scss';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

interface IRadioGroup {
  children?: React.ReactNode[];
  value?: string;
  onChange?: (value: any) => void;
  gap?: string;
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
  const [t] = useTranslation('hotels');
  if (children == 'Price (Lowest First)') {
    children = t('priceLower', 'Price (Lowest First)');
  }
  if (children == 'Price (Highest First)') {
    children = t('priceHihger', 'Price (Lowest First)');
  }
  if (children == 'Rating (Highest First)') {
    children = t('ratingHighest', 'Price (Lowest First)');
  }
  if (children == 'Rating (Lowest First)') {
    children = t('ratingLowe', 'Price (Lowest First)');
  }

  return (
    <label
      className={classNames(
        'flex items-center cursor-pointer hover:bg-dark-100',
        containerClass,
      )}
    >
      <input
        type="radio"
        value={value}
        className={styles.inputRadio}
        {...others}
      />
      <span className="block ml-3 text-sm font-normal leading-[22px] text-dark-1000">
        {children}
      </span>
    </label>
  );
};

export const RadioGroup = ({ children, onChange, value, gap }: IRadioGroup) => {
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

  return (
    <section className={`grid ${gap ? gap : 'gap-4'}`}>{newChildren}</section>
  );
};
