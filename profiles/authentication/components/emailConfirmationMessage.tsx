import { SectionTitle } from '@simplenight/ui';
import { useTranslation } from 'react-i18next';
import { login } from '../../core/services/AuthClientService';
import React, { useState } from 'react';
import Check from 'public/icons/assets/check-round.svg';
import { IAuthComponent } from '../index';
import AuthenticationContainer from 'components/authenticationContainer';
import HelpSection from 'components/global/HelpSection/HelpSection';

interface FormData {
  email: string;
  password: string;
}

interface iEmailConfirmation extends IAuthComponent {
  email: string;
}

const EmailConfirmation = ({
  email,
  resetPassword,
  passwordUpdated,
  changeAuthType,
}: iEmailConfirmation) => {
  const [t, i18n] = useTranslation('profiles');
  const [g] = useTranslation('global');

  const clickHereMassae = () => (
    <>
      {t(
        'youWillBeRedirect',
        'You’ll be redirected to home. If you’re not redirected',
      )}
      <a>test</a>
    </>
  );

  return (
    <AuthenticationContainer>
      <AuthenticationContainer.Body>
        <section className="flex h-full flex-col justify-center content-center">
          <Check className="text-primary-1000 flex h-12 w-12 align-middle self-center" />
          <section className="mt-4 flex flex-col text-center">
            <section
              className={
                'text-[2rem] font-bold text-dark-800 leading-8 text-ellipsis '
              }
            >
              {resetPassword
                ? t('emailSent', 'Email Sent')
                : passwordUpdated
                ? t('passwordUpdated', 'Password Updated!')
                : t('validationEmail', 'Validation Email Sent To')}
            </section>
            <section
              className={
                'text-[2rem] font-bold text-dark-800 leading-8 truncate '
              }
            >
              {!resetPassword && !passwordUpdated && `${email}`}
            </section>

            <section className={'text-lg leading-6 text-dark-800  mt-10'}>
              {resetPassword ? (
                `${t(
                  'resetPasswordInstructions',
                  'If there is an account associated with',
                )} ${email}, ${t(
                  'youWillGetAnEmail',
                  'you’ll receive an email with instructions to reset your password.',
                )}`
              ) : passwordUpdated ? (
                <>
                  {t(
                    'youWillBeRedirect',
                    'You’ll be redirected to home. If you’re not redirected',
                  )}
                  <a href="/" className="text-lg font-semibold underline">
                    {g('clickHere', ' Click Here')}
                  </a>
                </>
              ) : (
                t(
                  'validationMessage',
                  'A validation email was sent to your email address, please note that the verification email link will expire in 24 hours.',
                )
              )}
            </section>
            {!!resetPassword && (
              <section
                onClick={() => changeAuthType('login')}
                className="flex cursor-pointer underline justify-center mt-6 text-lg"
              >
                {t('backToLogin', 'Back To Login')}
              </section>
            )}
          </section>
        </section>
      </AuthenticationContainer.Body>
      {!!resetPassword && (
        <AuthenticationContainer.Footer>
          <section className="lg:hidden">
            <HelpSection />
          </section>
        </AuthenticationContainer.Footer>
      )}
    </AuthenticationContainer>
  );
};

export default EmailConfirmation;
