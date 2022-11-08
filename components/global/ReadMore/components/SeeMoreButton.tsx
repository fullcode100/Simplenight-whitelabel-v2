import React, { MouseEvent } from 'react';
import classnames from 'classnames';

interface SeeMoreProps {
  onClick: (event?: MouseEvent<HTMLElement>) => void;
  textOpened: string;
  textClosed: string;
  isOpen: boolean;
}

const SeeMoreButton = ({
  onClick,
  textOpened,
  textClosed,
  isOpen,
}: SeeMoreProps) => {
  return (
    <section
      className={classnames(
        'mt-2 w-full h-20 absolute bottom-0 flex items-end justify-center border-b-[28px] border-white',
        { ['bg-gradient-to-b from-transparent to-white']: !isOpen },
      )}
    >
      <button
        type="button"
        onClick={onClick}
        className="mb-[-12px] text-sm underline z-[5] text-center leading-5 font-semibold text-primary-1000 hover:text-primary-500 focus:outline-none focus:underline transition ease-in-out duration-150"
      >
        {isOpen ? textOpened : textClosed}
      </button>
    </section>
  );
};

export default SeeMoreButton;
