import { MouseEvent } from 'react';

interface ModalFooterProps {
  textButton: string;
  onApply: (event?: MouseEvent<HTMLElement>) => void;
}

const ModalFooter = ({ textButton, onApply }: ModalFooterProps) => {
  return (
    <footer className="py-6 px-5 shadow-date">
      <button
        onClick={onApply}
        className="bg-primary-1000 py-4 mx-auto w-full rounded text-white text-semibold text-base"
      >
        {textButton}
      </button>
    </footer>
  );
};

export default ModalFooter;
