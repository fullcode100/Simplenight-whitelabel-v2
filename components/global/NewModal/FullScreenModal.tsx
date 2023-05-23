import ModalFooter from './components/ModalFooter';
import ModalHeader from './components/ModalHeader';
import { MouseEvent, ReactNode, useEffect } from 'react';
import classnames from 'classnames';

interface FullScreenModalProps {
  open: boolean;
  closeModal: (event?: MouseEvent<HTMLElement>) => void;
  children?: ReactNode;
  title: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  primaryButtonAction?: (event?: MouseEvent<HTMLElement>) => void;
  secondaryButtonAction?: (event?: MouseEvent<HTMLElement>) => void;
  footerSummary?: ReactNode;
  hasMultipleActions?: boolean;
  noFooter?: boolean;
  noHeader?: boolean;
  containerButtonsClassName?: string;
  className?: string;
  headerAction?: ReactNode;
}

const FullScreenModal = ({
  open,
  closeModal,
  children,
  title,
  primaryButtonText = '',
  secondaryButtonText,
  primaryButtonAction,
  secondaryButtonAction,
  footerSummary,
  hasMultipleActions = false,
  noFooter = false,
  noHeader = false,
  containerButtonsClassName,
  className = '',
  headerAction,
}: FullScreenModalProps) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [open]);

  return (
    <>
      {open && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-20"
            style={{ zIndex: 99 }}
          ></div>
          <section
            className={classnames(
              `h-full flex flex-col fixed inset-0 overflow-y-auto bg-white z-[100] ${className}`,
              { ['hidden']: !open },
            )}
            style={{ width: '100%', zIndex: 100 }}
          >
            {!noHeader && (
              <ModalHeader
                title={title}
                onCloseModal={closeModal}
                headerAction={headerAction}
              />
            )}
            {children}
            {!noFooter && (
              <ModalFooter
                primaryButtonText={primaryButtonText}
                secondaryButtonText={secondaryButtonText}
                primaryButtonAction={primaryButtonAction}
                secondaryButtonAction={secondaryButtonAction}
                summary={footerSummary}
                hasMultipleActions={hasMultipleActions}
                containerButtonsClassName={containerButtonsClassName}
              />
            )}
          </section>
        </>
      )}
    </>
  );
};
export default FullScreenModal;
