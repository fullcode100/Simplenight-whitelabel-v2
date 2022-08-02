import IconRoundedContainer from 'components/global/IconRoundedContainer/IconRoundedContainer';
import SingleBed from 'public/icons/assets/single-bed.svg';
import AngleTop from 'public/icons/assets/angle-top.svg';
import classnames from 'classnames';
import { useState } from 'react';

interface CartItemDropdownProps {
  children?: any;
  title?: string;
  description?: string;
  defaultOpen?: boolean;
}

const CartItemDropdown = ({
  children,
  title,
  description,
  defaultOpen = false,
}: CartItemDropdownProps) => {
  const [open, setOpen] = useState(defaultOpen);
  const handleOpenContent = () => setOpen(!open);
  const angleClass = classnames({ 'rotate-180': !open });
  const contentClass = classnames({ hidden: !open });

  return (
    <>
      <section className="flex items-center" onClick={handleOpenContent}>
        <IconRoundedContainer className="bg-primary-1000">
          <SingleBed className="text-white" />
        </IconRoundedContainer>
        <section className="flex flex-col text-dark-800 ml-2 w-full">
          <p className="text-base capitalize">
            {' '}
            {title?.toLowerCase() ?? 'Item'}
          </p>
          <span className="capitalize">{description?.toLowerCase()}</span>
        </section>
        <section>
          <AngleTop className={angleClass} />
        </section>
      </section>
      <section className={contentClass}>{children}</section>
    </>
  );
};

export default CartItemDropdown;
