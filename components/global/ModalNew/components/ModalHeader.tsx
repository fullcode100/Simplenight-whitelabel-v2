import { MouseEvent, ReactNode } from 'react';
import { Dialog } from '@headlessui/react';

import Paragraph from 'components/global/Typography/Paragraph';
import Close from 'public/icons/assets/cross.svg';

interface ModalHeaderPops {
  onClose: (event?: MouseEvent<HTMLElement>) => void;
  title: string;
  headerAction?: ReactNode;
}

const ModalHeader = ({ onClose, title, headerAction }: ModalHeaderPops) => {
  return (
    <header className="fixed w-full flex justify-between items-center bg-dark-100 shadow-container border-b border-dark-300 px-5 pb-[18px] pt-[50px]">
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
