// Libraries
import React, { useState } from 'react';
import classnames from 'classnames';
import { Menu } from '@headlessui/react';
import { injectProps } from 'helpers/reactUtils';
// Components
import DropdownItem from './components/DropdownItem';
import DropdownList from './components/DropdownList';
// Hooks
import { useColor } from 'hooks/layoutAndUITooling/useColor';
// Types
import DropdownProps from './types/DropdownProps';

const Dropdown = ({
  title,
  color = 'primary',
  type = 'dropdown',
  orientation = 'left',
  disabled = false,
  leftIcon = null,
  rightIcon = null,
  options,
}: DropdownProps) => {
  const colors = useColor(color, type);

  const style = classnames('my-[10px] text-[20px] max-h-5 max-w-5', {
    ['mr-[10px]']: rightIcon,
    ['ml-[10px]']: leftIcon,
  });

  let icon: React.ReactNode;
  if (leftIcon)
    icon = injectProps(leftIcon as React.ReactElement<any>, {
      className: style,
    });
  if (rightIcon)
    icon = injectProps(rightIcon as React.ReactElement<any>, {
      className: style,
    });

  return (
    <Menu as="div" className="relative text-left w-44 whitespace-nowrap">
      <Menu.Button
        className={classnames(
          'inline-flex justify-between items-center text-sm w-full',
          {
            [`cursor-pointer ${colors?.normal} ${colors?.hover}`]: !disabled,
            [`${colors?.disabled} cursor-default`]: disabled,
          },
        )}
      >
        {leftIcon && icon}
        <p
          className={classnames('inherit p-3 leading-none w-full text-left', {
            [`${colors?.hover}`]: !disabled,
            [`${colors?.disabled}`]: disabled,
          })}
        >
          {title}
        </p>
        {rightIcon && icon}
      </Menu.Button>
      {!disabled && (
        <DropdownList colors={colors} orientation={orientation}>
          {options.map((item, index) => (
            <DropdownItem
              key={`${index}-dropdown-item`}
              value={item.value}
              href={item.href}
              disabled={item?.disabled}
              selected={item?.selected}
              leftIcon={item?.leftIcon}
              rightIcon={item?.rightIcon}
              checkboxValue={item?.checkboxValue}
              checkboxName={item?.checkboxName}
              checkboxMethod={item?.checkboxMethod}
            />
          ))}
        </DropdownList>
      )}
    </Menu>
  );
};

export default Dropdown;
