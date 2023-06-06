import React, { ReactNode, useRef, MouseEvent } from 'react';
import classnames from 'classnames';
import { useOnOutsideClick } from 'hooks/windowInteraction/useOnOutsideClick';
import useMediaViewport from 'hooks/media/useMediaViewport';
import FullScreenModal from '../NewModal/FullScreenModal';
import { useTranslation } from 'react-i18next';

interface PopperProps {
  open: boolean;
  onClose: (event?: MouseEvent<HTMLElement>) => void;
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
  const [t] = useTranslation('flights');
  const [tg] = useTranslation('global');
  const applyText = tg('apply', 'Apply');
  const passengersText = t('passengers', 'Passengers');
  const { isDesktop } = useMediaViewport();

  return (
    <section className="relative">
      {children}
      {isDesktop ? (
        <section
          ref={ref}
          className={classnames(
            'absolute bg-white py-4 rounded-4 text-dark-1000 transition-all duration-500 border border-dark-300 z-20',
            !open && 'hidden',
            {
              'right-0': placement === 'right' || placement === undefined,
              'left-0': placement === 'left',
            },
          )}
        >
          <section className="px-4">{content}</section>
        </section>
      ) : (
        <FullScreenModal
          open={open || false}
          closeModal={onClose}
          title={passengersText}
          primaryButtonText={applyText}
          primaryButtonAction={() => onClose()}
          hasMultipleActions={false}
          className={
            'lg:max-w-[842px] lg:max-h-[660px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-4 overflow-hidden shadow-full'
          }
        >
          {content}
        </FullScreenModal>
      )}
    </section>
  );
};

export default Popper;
