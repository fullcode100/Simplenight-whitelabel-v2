import Button from 'components/global/Button/Button';
import { useState } from 'react';
import classnames from 'classnames';
import BlockDivider from 'components/global/Divider/BlockDivider';

interface ButtonDropdownProps {
  children?: any;
  icon?: React.ReactElement;
  value?: string;
  titleDropdown?: string;
}

const ButtonDropdown = ({
  children,
  icon,
  value,
  titleDropdown,
}: ButtonDropdownProps) => {
  const [open, setOpen] = useState(false);
  return (
    <section className="relative">
      <button
        className="flex justify-between items-center gap-2 border border-dark-300 bg-white px-2 py-1 h-8 rounded"
        onClick={() => setOpen(!open)}
        onBlur={() => setOpen(false)}
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
        <p className="text-sm px-4">{titleDropdown}</p>
        <BlockDivider />
        <section className="px-4">{children}</section>
      </section>
    </section>
  );
};

export default ButtonDropdown;
