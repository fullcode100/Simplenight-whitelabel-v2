import Close from 'public/icons/assets/cross.svg';
import { MouseEvent, ReactNode } from 'react';

interface ModalHeaderProps {
  title: string;
  onCloseModal: (event?: MouseEvent<HTMLElement>) => void;
  headerClassName?: string;
  titleClassName?: string;
  headerAction?: ReactNode;
}

const ModalHeader = ({
  title,
  onCloseModal,
  headerClassName,
  titleClassName,
  headerAction,
}: ModalHeaderProps) => {
  return (
    <header
      className={`sticky flex justify-between items-center p-5 bg-dark-100 shadow-container border-b border-dark-200 text-dark-1000 ${headerClassName}`}
    >
      <h2
        className={`font-semibold text-base text-dark-1000 ${titleClassName}`}
      >
        {title}
      </h2>
      <section className="flex justify-end gap-7 items-center">
        {headerAction}
        <button onClick={onCloseModal}>
          <Close />
        </button>
      </section>
    </header>
  );
};

export default ModalHeader;
