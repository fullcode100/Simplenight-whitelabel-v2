import { Modal } from '@simplenight/ui';
import React, {
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
import Arrow from 'public/icons/assets/flights/arrow_left.svg';
import ResetPassword from './components/resetPassword';
import SetNewPassword from './components/setNewPassword';
import NewPasswordConfirmationForm from './components/newPasswordConfirmationForm';
import ConfigurePasswordError from './components/configurePasswordError';
import ValidationEmailHasAlreadySent from './components/validationEmailHasAlreadySent';
import EmailValidationSent from './components/emailValidationSent';
import type { ParsedUrlQuery } from 'querystring';

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
  query?: Record<string, string>;
}

export type IAuthModalType =
  | 'login'
  | 'signUp'
  | 'emailConfirmation'
  | 'resetPassword'
  | 'newPasswordConfirmationForm'
  | 'setNewPassword'
  | 'configurePassword'
  | 'configurePasswordError'
  | 'validationEmailHasAlreadySent'
  | 'emailValidationSent';
interface IAuthentication {
  open: boolean;
  onClose: (event?: MouseEvent<HTMLElement>) => void;
  type: IAuthModalType;
  setAuthType: Dispatch<SetStateAction<IAuthModalType>>;
  query: ParsedUrlQuery;
}

const Authentication = ({
  open,
  onClose,
  type,
  setAuthType,
  query,
}: IAuthentication) => {
  const [extraProps, setExtraProps] = useState<IExtraProps>();
  const { resetPasswordToken, email } = query as {
    email: string;
    resetPasswordToken: string;
  };

  const AuthTypeMap = {
    login: (props: any) => <Login {...props} {...extraProps} />,
    signUp: (props: any) => <SignUp {...props} {...extraProps} />,
    emailConfirmation: (props: any) => (
      <EmailConfirmation {...props} {...extraProps} />
    ),
    resetPassword: (props: any) => <ResetPassword {...props} {...extraProps} />,
    newPasswordConfirmationForm: (props: IAuthComponent) => (
      <NewPasswordConfirmationForm {...props} />
    ),
    setNewPassword: (props: IAuthComponent) => (
      <SetNewPassword
        {...props}
        token={resetPasswordToken || ''}
        {...extraProps}
      />
    ),
    configurePassword: (props: IAuthComponent) => (
      <ConfigurePasswordForm
        {...props}
        {...extraProps}
        resetPasswordToken={resetPasswordToken}
        email={email}
      />
    ),
    emailValidationSent: (props: any) => (
      <EmailValidationSent {...props} {...extraProps} />
    ),
    configurePasswordError: (props: IAuthComponent) => (
      <ConfigurePasswordError {...props} email={email} />
    ),
    validationEmailHasAlreadySent: (props: IAuthComponent) => (
      <ValidationEmailHasAlreadySent {...props} email={email} />
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
