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
  isPrimaryActionLoading?: boolean;
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
  isPrimaryActionLoading = false,
}: FullScreenModalProps) => {
  const renderFooter =
    !!primaryButtonText || !!secondaryButtonText || !!footerSummary;

  return (
    <Transition.Root show={open}>
      <Dialog
        open={true}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onClose={() => {}}
        className={`fixed flex flex-col justify-center items-center inset-0 w-full h-full bg-none z-[100] ${className}`}
      >
        <Transition.Child
          enter="lg:transition-opacity lg:duration-500"
          enterFrom="lg:opacity-0"
          enterTo="lg:opacity-100"
          leave="lg:transition-opacity lg:duration-500 lg:ease-out"
          leaveFrom="lg:opacity-100"
          leaveTo="lg:opacity-0"
        >
          <div
            className="fixed inset-0 lg:bg-black/80"
            aria-hidden="true"
            onClick={onClose}
          />
        </Transition.Child>
        <Transition.Child
          enter="transition-transform duration-500 lg:transition-opacity lg:duration-200"
          enterFrom="translate-y-full lg:opacity-0 lg:translate-y-0"
          enterTo="translate-y-0 lg:opacity-100"
          leave="ease-out transition-transform duration-500 lg:transition-opacity lg:duration-500 lg:ease-out"
          leaveFrom="translate-y-0 lg:opacity-100"
          leaveTo="translate-y-full lg:opacity-0 lg:translate-y-0"
        >
          <section className="lg:h-[660px] lg:w-[842px] lg:rounded-4 lg:shadow-container lg:overflow-hidden">
            <Dialog.Panel className="flex flex-col items-stretch lg:h-[660px] h-screen w-screen lg:w-[842px]">
              {title && (
                <ModalHeader
                  onClose={onClose}
                  title={title}
                  headerAction={headerAction}
                />
              )}
              <section className="h-screen overflow-y-scroll bg-white styled-scrollbar">
                {children}
              </section>
              {renderFooter && (
                <ModalFooter
                  primaryButtonText={primaryButtonText}
                  secondaryButtonText={secondaryButtonText}
                  primaryButtonAction={primaryButtonAction}
                  secondaryButtonAction={secondaryButtonAction}
                  isPrimaryActionLoading={isPrimaryActionLoading}
                  footerSummary={footerSummary}
                />
              )}
            </Dialog.Panel>
          </section>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};

export default FullScreenModal;
