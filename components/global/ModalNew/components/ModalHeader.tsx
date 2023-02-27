import { MouseEvent, ReactNode } from 'react';
import { Dialog } from '@headlessui/react';

import { Paragraph } from '@simplenight/ui';
import Close from 'public/icons/assets/cross.svg';

interface ModalHeaderPops {
  onClose: (event?: MouseEvent<HTMLElement>) => void;
  title: string;
  headerAction?: ReactNode;
}

const ModalHeader = ({ onClose, title, headerAction }: ModalHeaderPops) => {
  return (
    <header className="w-full flex justify-between items-center bg-dark-100 shadow-container border-b border-dark-300 p-5 lg:px-6 lg:rounded-t-4">
      <Dialog.Title>
        <Paragraph size="medium" fontWeight="semibold">
          {title}
        </Paragraph>
      </Dialog.Title>
      <section className="flex justify-end gap-6 items-center">
        {headerAction}
        <button onClick={onClose}>
          <Close />
        </button>
      </section>
    </header>
  );
};

export default ModalHeader;
