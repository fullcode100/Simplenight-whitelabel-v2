import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { IAuthComponent } from '..';
import FormsLoader from '../../../components/global/Loader/FormsLoader';
import Error from '@/icons/assets/cross-round.svg';
import { sendForgotPasswordEmail } from '../../core/services/AuthClientService';
import AuthenticationContainer from '../../../components/authenticationContainer';
import { useRouter } from 'next/router';

interface IConfigurePasswordErrorProps extends IAuthComponent {
  email: string;
}
const ResetPasswordLinkExpired = ({
  changeAuthType,
  setExtraProps,
  email,
}: IConfigurePasswordErrorProps) => {
  const [t, i18n] = useTranslation('profiles');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const requestNewLink = async () => {
    setLoading(true);
    try {
      await sendForgotPasswordEmail(email, i18n);
      setExtraProps((props: any) => ({
        ...props,
        email: email,
        resetPassword: true,
        passwordUpdated: false,
      }));
      router.push('/');
      changeAuthType('emailConfirmation');
    } catch (error: any) {
      if (error?.response?.data?.message) {
        setErrorMessage(error?.response?.data?.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthenticationContainer>
      <AuthenticationContainer.Body className={'mt-20'}>
        <AuthenticationContainer.Icon>
          <Error className="text-primary-1000 flex h-12 w-12" />
        </AuthenticationContainer.Icon>
        <section className="flex flex-col text-center">
          <section
            className={
              'text-[2rem] font-bold text-dark-800 leading-8 text-ellipsis '
            }
          >
            {t('linkExpired', 'Sorry, Your Link Has Expired')}
          </section>
          <section className={'text-lg leading-6 text-dark-800  mt-10 mb-20'}>
            {t(
              'resetPasswordLinkExpired',
              'The link we sent you to reset your password has expired. For your security, please request a new link.',
            )}
          </section>
          <section className={'mt-6'}>
            {!loading && (
              <section
                onClick={requestNewLink}
                className="flex cursor-pointer underline justify-center  text-lg text-primary-1000"
              >
                {t('requestNewLink', 'Request a new link')}
              </section>
            )}
            {loading && <FormsLoader size={'medium'} />}
          </section>
        </section>
      </AuthenticationContainer.Body>
    </AuthenticationContainer>
  );
};

export default ResetPasswordLinkExpired;
