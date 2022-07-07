import { Fragment } from 'react';
import { Transition } from '@headlessui/react';
import { toast, ToastPosition } from 'react-hot-toast';

import InfoCircle from 'public/icons/assets/info-circle.svg';
import XCircle from 'public/icons/assets/x-circle.svg';
import CheckCircle from 'public/icons/assets/check-round.svg';
import Exclamation from 'public/icons/assets/exclamation.svg';
import Close from 'public/icons/assets/cross.svg';

export const notification = (
  title: string,
  description: string,
  type: 'default' | 'error' | 'success' | 'warning' = 'default',
  duration = Infinity,
  position: ToastPosition = 'top-right',
) => {
  const setIcon = () => {
    if (type === 'error')
      return <XCircle className="h-5 w-5 text-error-1000" aria-hidden="true" />;
    if (type === 'success')
      return (
        <CheckCircle className="h-5 w-5 text-green-1000" aria-hidden="true" />
      );
    if (type === 'warning')
      return (
        <Exclamation className="h-5 w-5 text-warning-600" aria-hidden="true" />
      );
    return <InfoCircle className="h-5 w-5 text-dark-1000" aria-hidden="true" />;
  };

  const setBG = (): string => {
    let bg = 'bg-dark-100 border-dark-300';
    if (type === 'error') bg = 'bg-red-100 border-red-300';
    if (type === 'success') bg = 'bg-green-100 border-green-300';
    if (type === 'warning') bg = 'bg-warning-100 border-warning-300';
    return bg;
  };

  return toast.custom(
    (t) => (
      <Transition
        show={t.visible}
        as={Fragment}
        enter="transform ease-out duration-300 transition"
        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <section
          className={`max-w-sm w-full border shadow-container rounded ${setBG()}`}
        >
          <section className="flex gap-3.5 items-start p-4">
            <div className="shrink-0">{setIcon()}</div>
            <section className="grid gap-2">
              <p className="text-base leading-[22px] font-semibold text-dark-1000">
                {title}
              </p>
              <p className="text-sm leading-[22px] text-dark-1000">
                {description}
              </p>
            </section>
            <div className="shrink-0">
              <button type="button" onClick={() => toast.dismiss(t.id)}>
                <span className="sr-only">Close</span>
                <Close className="h-3 w-3" aria-hidden="true" />
              </button>
            </div>
          </section>
        </section>
      </Transition>
    ),
    { duration, position },
  );
};