import { useState } from 'react';
import classnames from 'classnames';
import BlockDivider from 'components/global/Divider/BlockDivider';

interface ButtonDropdownProps {
  children?: any;
  icon?: React.ReactElement;
  value?: string;
  titleDropdown?: string;
  disabled?: boolean;
}

const ButtonDropdown = ({
  children,
  icon,
  value,
  titleDropdown,
  disabled,
}: ButtonDropdownProps) => {
  const [open, setOpen] = useState(false);
  return (
    <section className="relative">
      <button
        className="flex justify-between items-center gap-2 border border-dark-300 bg-white px-2 py-1 h-8 rounded"
        onClick={disabled ? undefined : () => setOpen(!open)}
        onBlur={disabled ? undefined : () => setOpen(false)}
      >
        {icon} {value}
      </button>
      <section
        className={classnames(
          'absolute top-10 right-0 bg-white py-4 rounded-4 text-dark-1000 transition-all duration-500 border border-dark-300',
          {
            'opacity-0 invisible': !open,
          },
        )}
      >
        <p className="text-sm font-semibold px-4 pb-4">{titleDropdown}</p>
        <BlockDivider />
        <section className="px-4">{children}</section>
      </section>
    </section>
  );
};

export default ButtonDropdown;
