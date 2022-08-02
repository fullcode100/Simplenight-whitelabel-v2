import { MouseEvent, ReactNode } from 'react';
import { Dialog } from '@headlessui/react';
import { Transition } from '@headlessui/react';

import ModalHeader from './components/ModalHeader';
import ModalFooter from './components/ModalFooter';

interface FullScreenModalProps {
  open: boolean;
  onClose: (event?: MouseEvent<HTMLElement>) => void;
  title?: string;
  headerAction?: ReactNode;
  children?: ReactNode;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  primaryButtonAction?: (event?: MouseEvent<HTMLElement>) => void;
  secondaryButtonAction?: (event?: MouseEvent<HTMLElement>) => void;
  footerSummary?: ReactNode;
  className?: string;
}

const FullScreenModal = ({
  open,
  onClose,
  title,
  headerAction,
  children,
  primaryButtonText,
  secondaryButtonText,
  primaryButtonAction,
  secondaryButtonAction,
  footerSummary,
  className = '',
}: FullScreenModalProps) => {
  const renderFooter =
    !!primaryButtonText || !!secondaryButtonText || !!footerSummary;

  return (
    <Transition.Root show={open}>
      <Dialog
        open={true}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onClose={() => {}}
        className={`fixed flex flex-col inset-0 w-full h-full bg-none z-[100] ${className}`}
      >
        <Transition.Child
          enter="transition-transform duration-500"
          enterFrom="translate-y-full"
          enterTo="translate-y-0"
          leave="ease-out transition-transform duration-500"
          leaveFrom="translate-y-0"
          leaveTo="translate-y-full"
        >
          <Dialog.Panel className="">
            {title && (
              <ModalHeader
                onClose={onClose}
                title={title}
                headerAction={headerAction}
              />
            )}
            <section className="flex-1 bg-white h-screen overflow-y-scroll">
              {children}
            </section>
            {renderFooter && (
              <ModalFooter
                primaryButtonText={primaryButtonText}
                secondaryButtonText={secondaryButtonText}
                primaryButtonAction={primaryButtonAction}
                secondaryButtonAction={secondaryButtonAction}
                footerSummary={footerSummary}
              />
            )}
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};

export default FullScreenModal;
