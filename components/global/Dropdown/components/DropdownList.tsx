// Libraries
import React from 'react';
import { Menu, Transition } from '@headlessui/react';
import { injectProps } from 'helpers/reactUtils';
// Type
import { ColorWithStates } from 'helpers/colors/primaryColorVariants';

type Props = {
  children?: React.ReactNode;
  orientation?: 'left' | 'right';
  colors?: ColorWithStates;
};

const DropdownList = ({ children, orientation, colors }: Props) => {
  const dropdownItems = React.Children.toArray(children).map((child) =>
    injectProps(child as React.ReactElement<any>, { colors }),
  );

  return (
    <Transition
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
      <Menu.Items
        className={`absolute ${orientation}-0 mt-2 w-52 origin-top-${orientation} rounded-md bg-white drop-shadow-md overflow-hidden`}
      >
        {dropdownItems}
      </Menu.Items>
    </Transition>
  );
};

export default DropdownList;
