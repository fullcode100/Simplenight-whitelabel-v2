import Close from 'public/icons/assets/cross.svg';
import { MouseEvent } from 'react';

interface ModalHeaderProps {
  title: string;
  onCloseModal: (event?: MouseEvent<HTMLElement>) => void;
}

const ModalHeader = ({ title, onCloseModal }: ModalHeaderProps) => {
  return (
    <header className="sticky flex justify-between items-center pt-12 pb-5 px-5 bg-dark-100 shadow-date border-b border-dark-200 text-dark-1000">
      <h2 className="font-semibold text-base">{title}</h2>
      <button onClick={onCloseModal}>
        <Close />
      </button>
    </header>
  );
};

export default ModalHeader;
