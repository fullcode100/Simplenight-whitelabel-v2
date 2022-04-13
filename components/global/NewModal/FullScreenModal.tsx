import ModalFooter from './components/ModalFooter';
import ModalHeader from './components/ModalHeader';
import {MouseEvent} from 'react';


interface FullScreenModalProps {
  open: boolean;
  closeModal: (event?: MouseEvent<HTMLElement>) => void;
  children: any;
  title: string;
  textButton: string;
  applyModal: (event?: MouseEvent<HTMLElement>) => void;
}

const FullScreenModal = ({
  open,
  closeModal,
  children,
  title,
  textButton,
  applyModal,
}: FullScreenModalProps) => {

  return (
    <section className={`w-full h-screen flex flex-col items-stretch fixed inset-0 bg-white z-20 ${!open ? 'hidden' : ''}`}>
      <ModalHeader title={title} onCloseModal={closeModal} />
      {children}
      <ModalFooter textButton={textButton} onApply={applyModal} />
    </section>
  );
}

export default FullScreenModal;
