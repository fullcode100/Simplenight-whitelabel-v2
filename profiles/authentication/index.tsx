import { Modal } from '@simplenight/ui';
import { Dispatch, MouseEvent, SetStateAction } from 'react';
import EmailConfirmation from './components/emailConfirmation';
import Login from './components/loginComponent';
import SignUp from './components/signupComponent';
import Close from '/public/icons/assets/close.svg';
import SNIcon from 'public/icons/logos/sn-mobile-logo.svg';
import Arrow from 'public/icons/assets/flights/arrow_left.svg';

export interface IAuthComponent {
  closeModal: () => void;
  changeAuthType: Dispatch<SetStateAction<iAuthModalType>>;
}

export type iAuthModalType = 'login' | 'signUp' | 'emailConfirmation';
interface iAuthentication {
  open: boolean;
  onClose: (event?: MouseEvent<HTMLElement>) => void;
  type: iAuthModalType;
  setAuthType: Dispatch<SetStateAction<iAuthModalType>>;
}

const Authentication = ({
  open,
  onClose,
  type,
  setAuthType,
}: iAuthentication) => {
  const AuthTypeMap = {
    login: (props: any) => <Login {...props} />,
    signUp: (props: any) => <SignUp {...props} />,
    emailConfirmation: (props: any) => <EmailConfirmation {...props} />,
  };

  const AuthTypeElement = AuthTypeMap[type];

  return (
    <Modal open={open} onClose={onClose} className="lg:rounded-3xl">
      <section className="flex h-full">
        <section
          onClick={() => onClose()}
          className="flex cursor-pointer absolute lg:hidden left-3 justify-end mt-10"
        >
          <Arrow
            width={16}
            height={16}
            className="flex  fill-black text-black mt-1"
          />
          Back
        </section>
        <section className="pt-16 w-full h-full lg:w-1/2 p-5 flex-col flex content-center justify-between">
          <SNIcon
            width={300}
            height={90}
            className="flex lg:hidden align-middle self-center"
          />
          <AuthTypeElement closeModal={onClose} changeAuthType={setAuthType} />
        </section>
        <section
          className="hidden lg:flex lg:w-1/2 relative"
          style={{
            backgroundImage: "url('/images/AuthImg.png')",
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
