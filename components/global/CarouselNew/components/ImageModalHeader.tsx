import React, { MouseEvent } from 'react';
import Close from 'public/icons/assets/cross-white.svg';
import { fromUpperCaseToCapitilize } from '../../../../helpers/stringUtils';

interface HeaderProps {
  closeModal: (event?: MouseEvent<HTMLElement>) => void;
  title: string;
}

const ImageModalHeader = ({ closeModal, title }: HeaderProps) => {
  return (
    <header className="sticky flex gap-1 justify-between items-center pt-12 pb-5 px-5">
      <p className="font-semibold text-base text-white">
        {fromUpperCaseToCapitilize(title)}
      </p>
      <button onClick={closeModal}>
        <Close />
      </button>
    </header>
  );
};

export default ImageModalHeader;
