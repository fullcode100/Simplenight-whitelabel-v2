// Libraries
import React, { BaseSyntheticEvent, useState } from 'react';
import classnames from 'classnames';
import { injectProps } from 'helpers/reactUtils';
// Components
import { Menu } from '@headlessui/react';
// Types
import DropdownItemProps from '../types/DropdownItemProps';

const DropdownItem = ({
  value,
  disabled = false,
  href = '#',
  selected = false,
  colors,
  leftIcon = null,
  rightIcon = null,
  checkboxValue = false,
  checkboxName,
  checkboxMethod,
}: DropdownItemProps) => {
  const [isChecked, setIsChecked] = useState(checkboxValue);

  const handleChange = (event: BaseSyntheticEvent) => {
    setIsChecked(event.target.checked);
    checkboxMethod(event.target.checked);
  };

  const style = classnames('my-[10px] text-[20px] max-h-5 max-w-5', {
    ['mr-[10px]']: rightIcon,
    ['ml-[10px]']: leftIcon,
    [`${colors?.selectedText}`]: selected,
  });

  let icon;
  if (leftIcon)
    icon = injectProps(leftIcon as React.ReactElement<any>, {
      className: style,
    });
  if (rightIcon)
    icon = injectProps(rightIcon as React.ReactElement<any>, {
      className: style,
    });

  return (
    <Menu.Item>
      <a
        className={classnames('flex items-center text-sm', {
          [`cursor-pointer ${colors?.normal} ${colors?.hover}`]: !disabled,
          [`${colors?.active}`]: selected,
          [`${colors?.disabled} cursor-default`]: disabled,
          ['justify-start']: leftIcon,
          ['justify-between']: rightIcon || checkboxName,
        })}
        href={!disabled ? href : '#'}
      >
        {leftIcon && icon}
        {checkboxName ? (
          <label
            className={classnames(
              'font-normal leading-none p-3 cursor-pointer',
              { [`${colors?.selectedText}`]: checkboxValue },
            )}
            htmlFor={checkboxName}
          >
            {value}
          </label>
        ) : (
          <p
            className={classnames('font-normal leading-none p-3', {
              [`${colors?.selectedText}`]: selected,
            })}
          >
            {value}
          </p>
        )}
        {rightIcon && icon}
        {checkboxName && (
          <section className="py-3 pr-3">
            <input
              id={checkboxName}
              aria-describedby={`${checkboxName}-description`}
              name={checkboxName}
              type="checkbox"
              className="cursor-pointer focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
              onChange={handleChange}
              checked={isChecked}
              disabled={disabled}
            />
          </section>
        )}
      </a>
    </Menu.Item>
  );
};

export default DropdownItem;
