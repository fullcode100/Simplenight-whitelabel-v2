import ModalFooter from './components/ModalFooter';
import ModalHeader from './components/ModalHeader';
import { MouseEvent, ReactNode } from 'react';
import classnames from 'classnames';

interface FullScreenModalProps {
  open: boolean;
  closeModal: (event?: MouseEvent<HTMLElement>) => void;
  children?: ReactNode;
  title: string;
  primaryButtonText: string;
  secondaryButtonText?: string;
  primaryButtonAction: (event?: MouseEvent<HTMLElement>) => void;
  secondaryButtonAction?: (event?: MouseEvent<HTMLElement>) => void;
  footerSummary?: ReactNode;
  hasMultipleActions?: boolean;
  noFooter?: boolean;
}

const FullScreenModal = ({
  open,
  closeModal,
  children,
  title,
  primaryButtonText,
  secondaryButtonText,
  primaryButtonAction,
  secondaryButtonAction,
  footerSummary,
  hasMultipleActions = false,
  noFooter = false,
}: FullScreenModalProps) => {
  return (
    <section
      className={classnames(
        'w-full h-screen flex flex-col items-stretch fixed inset-0 bg-white z-20',
        { ['hidden']: !open },
      )}
    >
      <ModalHeader title={title} onCloseModal={closeModal} />
      {children}
      {!noFooter && (
        <section className="flex flex-col h-full justify-end">
          <ModalFooter
            primaryButtonText={primaryButtonText}
            secondaryButtonText={secondaryButtonText}
            primaryButtonAction={primaryButtonAction}
            secondaryButtonAction={secondaryButtonAction}
            summary={footerSummary}
            hasMultipleActions={hasMultipleActions}
          />
        </section>
      )}
    </section>
  );
};

export default FullScreenModal;
