import { Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import ModalHeader from './components/ModalHeader';
import ModalDivider from './components/ModalDivider';

interface ModalProps {
  open: boolean;
  hasHeader?: boolean;
  title?: string;
  setOpen: (open: boolean) => void;
  children?: any;
  className?: string;
}

const FullScreenModal = ({
  open,
  setOpen,
  title = '',
  hasHeader = false,
  children,
  className = '',
}: ModalProps) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 w-screen overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
            // eslint-disable-next-line i18next/no-literal-string
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className={`relative inline-block h-[90vh]  align-middle bg-white rounded-lg px-4 pt-5 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6 ${className}`}
            >
              {hasHeader && <ModalHeader text={title} setOpen={setOpen} />}
              <ModalDivider />
              <div className="h-full mt-12">{children}</div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default FullScreenModal;
