import { Dialog, Transition } from '@headlessui/react';
import { Button } from '@simplenight/ui';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

import InformationIcon from 'public/icons/assets/info-circle.svg';

interface PriceChangeModalProps {
  open: boolean;
  onClose?: () => void;
  content?: React.ReactNode;
  onCancel?: () => void;
  onConfirm?: () => void;
  title?: string | null;
  cancelBtnLabel?: string;
  confirmBtnLabel?: string;
  showConfirmBtn?: boolean;
}

const PriceChangeModal = ({
  open,
  onClose,
  content,
  onCancel,
  onConfirm,
  title,
  cancelBtnLabel,
  confirmBtnLabel,
  showConfirmBtn = true,
}: PriceChangeModalProps) => {
  const [tg] = useTranslation('global');
  const titleLabel =
    title || tg('titleLabel', 'Price has changed for some items in your cart');
  const cancelLabel = cancelBtnLabel || tg('cancelLabel', 'Change Selection');
  const confirmLabel = confirmBtnLabel || tg('confirmLabel', 'Proceed');
  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog
          open={open}
          as="div"
          className="relative z-10"
          onClose={() => onClose && onClose()}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className=" flex flex-col items-center justify-center">
                    <InformationIcon className="h-7 w-7 lg:h-[60px] lg:w-[60px] mt-12 text-primary-1000" />
                    <Dialog.Title
                      as="h2"
                      className="text-lg lg:text-[32px] text-center font-medium leading-6 text-dark-1000 max-w-[410px] mt-4"
                    >
                      {titleLabel}
                    </Dialog.Title>
                  </div>
                  <div className="mt-8">{content}</div>

                  <div className="flex gap-2 justify-end mt-4">
                    <Button
                      type="outlined"
                      onClick={() => onCancel && onCancel()}
                    >
                      {cancelLabel}
                    </Button>
                    {showConfirmBtn && (
                      <Button onClick={() => onConfirm && onConfirm()}>
                        {confirmLabel}
                      </Button>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default PriceChangeModal;
