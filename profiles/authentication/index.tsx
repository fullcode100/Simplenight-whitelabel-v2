import { Modal, SectionTitle } from '@simplenight/ui';
import { MouseEvent, useEffect, useState } from 'react';
import Login from './components/loginComponent';
import Close from '/public/icons/assets/close.svg';
interface iAuthentication {
  open: boolean;
  onClose: (event?: MouseEvent<HTMLElement>) => void;
  type: 'login';
}

const Authentication = ({ open, onClose, type }: iAuthentication) => {
  const AuthType = {
    login: (props: any) => <Login {...props} />,
  };

  const AuthTypeElement = AuthType[type];

  return (
    <Modal open={open} onClose={onClose} className="lg:rounded-3xl">
      <section className="flex h-full">
        <section className="w-full h-full lg:w-1/2 p-5 flex-col flex justify-between">
          <AuthTypeElement closeModal={onClose} />
        </section>
        <section
          className="hidden lg:flex lg:w-1/2 relative"
          style={{
            backgroundImage: `url('/images/AuthImg.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <Close
            onClick={() => onClose()}
            className="flex absolute fill-white text-white right-3 mt-3"
          />
        </section>
      </section>
    </Modal>
  );
};

export default Authentication;
