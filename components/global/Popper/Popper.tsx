import React, { ReactNode, useRef, MouseEvent } from 'react';
import classnames from 'classnames';
import { useOnOutsideClick } from 'hooks/windowInteraction/useOnOutsideClick';

interface PopperProps {
  open?: boolean;
  onClose?: (event?: MouseEvent<HTMLElement>) => void;
  children?: any;
  placement?: 'right' | 'left';
  content?: ReactNode;
}

const Popper = ({
  open,
  onClose,
  children,
  placement,
  content,
}: PopperProps) => {
  const ref = useRef<HTMLElement>(null);
  useOnOutsideClick(ref, () => {
    onClose && onClose();
  });
  return (
    <section className="relative">
      {children}
      <section
        ref={ref}
        className={classnames(
          'absolute bg-white py-4 rounded-4 text-dark-1000 transition-all duration-500 border border-dark-300 z-20',
          {
            'opacity-0 invisible': !open,
            'right-0': placement === 'right' || placement === undefined,
            'left-0': placement === 'left',
          },
        )}
      >
        <section className="px-4">{content}</section>
      </section>
    </section>
  );
};

export default Popper;
