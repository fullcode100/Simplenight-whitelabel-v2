import { Modal } from '@simplenight/ui';
import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import EmailConfirmation from './components/emailConfirmationMessage';
import Login from './components/loginComponent';
import ConfigurePasswordForm from './components/configurePasswordForm';
import SignUp from './components/signupComponent';
import Close from '/public/icons/assets/close.svg';
import SNIcon from 'public/icons/logos/sn-mobile-logo.svg';
import Arrow from 'public/icons/assets/flights/arrow_left.svg';
import ResetPassword from './components/resetPassword';
import SetNewPassword from './components/setNewPassword';
import NewPasswordConfirmationForm from './components/newPasswordConfirmationForm';
import ConfigurePasswordError from './components/configurePasswordError';

export interface IExtraProps {
  email?: string;
  resetPassword?: boolean;
  passwordUpdated?: boolean;
}
export interface IAuthComponent extends IExtraProps {
  closeModal: () => void;
  changeAuthType: Dispatch<SetStateAction<IAuthModalType>>;
  token?: string;
  setExtraProps: Dispatch<SetStateAction<any>>;
}

export type IAuthModalType =
  | 'login'
  | 'signUp'
  | 'emailConfirmation'
  | 'resetPassword'
  | 'newPasswordConfirmationForm'
  | 'setNewPassword'
  | 'configurePassword'
  | 'configurePasswordError';
interface IAuthentication {
  open: boolean;
  onClose: (event?: MouseEvent<HTMLElement>) => void;
  type: IAuthModalType;
  setAuthType: Dispatch<SetStateAction<IAuthModalType>>;
  query: {
    confirmPass?: string;
    setNewPass?: string;
  };
}

const Authentication = ({
  open,
  onClose,
  type,
  setAuthType,
  query,
}: IAuthentication) => {
  const [extraProps, setExtraProps] = useState<IExtraProps>();

  const AuthTypeMap = {
    login: (props: any) => <Login {...props} {...extraProps} />,
    signUp: (props: any) => <SignUp {...props} {...extraProps} />,
    emailConfirmation: (props: any) => (
      <EmailConfirmation {...props} {...extraProps} />
    ),
    resetPassword: (props: any) => <ResetPassword {...props} {...extraProps} />,
    newPasswordConfirmationForm: (props: any) => (
      <NewPasswordConfirmationForm {...props} />
    ),
    setNewPassword: (props: any) => (
      <SetNewPassword {...props} token={query.setNewPass} {...extraProps} />
    ),
    configurePassword: (props: any) => (
      <ConfigurePasswordForm {...props} {...extraProps} />
    ),
    configurePasswordError: (props: any) => (
      <ConfigurePasswordError {...props} />
    ),
  };

  const AuthTypeElement = AuthTypeMap[type];

  useEffect(() => {
    if (!open) {
      setExtraProps({});
    }
  }, [open]);

  return (
    <Modal open={open} onClose={onClose} className="lg:rounded-3xl">
      <section className="flex flex-col lg:flex-row h-full">
        <section
          onClick={() => onClose()}
          className="flex cursor-pointer lg:hidden mt-10 ml-10"
        >
          <Arrow
            width={16}
            height={16}
            className="flex fill-black text-black mt-1"
          />
          Back
        </section>
        <section className="w-full h-full lg:w-1/2 p-10 flex-col flex content-center justify-between overflow-y-auto">
          <SNIcon
            width={300}
            height={90}
            className="flex lg:hidden align-middle self-center"
          />
          <AuthTypeElement
            closeModal={onClose}
            changeAuthType={setAuthType}
            setExtraProps={setExtraProps}
          />
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
