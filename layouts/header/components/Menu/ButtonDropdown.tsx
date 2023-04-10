import React, { useState } from 'react';
import classnames from 'classnames';
import BlockDivider from 'components/global/Divider/BlockDivider';

interface ButtonDropdownProps {
  children?: React.ReactNode | React.ReactNode[];
  icon?: React.ReactElement;
  value?: string;
  titleDropdown?: string;
  disabled?: boolean;
  defaultOpen?: boolean;
}

const ButtonDropdown = ({
  children,
  icon,
  value,
  titleDropdown,
  disabled,
  defaultOpen = false,
}: ButtonDropdownProps) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section className="relative">
      <button
        className="flex items-center justify-between h-8 gap-2 px-2 py-1 text-white"
        onClick={disabled ? undefined : () => setOpen(!open)}
        onBlur={disabled ? undefined : () => setOpen(false)}
      >
        {icon} {value}
      </button>
      <section
        className={classnames(
          'absolute top-10 right-0 bg-white py-4 rounded-4 text-dark-1000 transition-all duration-500 border border-dark-300 z-10',
          {
            'opacity-0 invisible': !open,
          },
        )}
      >
        {titleDropdown && (
          <>
            <p className="text-sm font-semibold px-4 pb-4">{titleDropdown}</p>
            <BlockDivider />
          </>
        )}
        <section className="px-4">{children}</section>
      </section>
    </section>
  );
};

export default ButtonDropdown;
