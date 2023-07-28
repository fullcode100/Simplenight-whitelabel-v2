import { useTranslation } from 'react-i18next';
import React from 'react';
import Check from 'public/icons/assets/check-round.svg';
import { ContactSupport } from '../../../components/contactSupport';
import AuthenticationContainer from '../../../components/authenticationContainer';
import { IAuthComponent } from '../index';

interface IEmailValidationSent extends IAuthComponent {
  email: string;
}

const EmailValidationSent = ({ email }: IEmailValidationSent) => {
  const [t, i18n] = useTranslation('profiles');
  return (
    <AuthenticationContainer>
      <AuthenticationContainer.Body className={'mt-20'}>
        <AuthenticationContainer.Icon>
          <Check className="text-primary-1000 flex h-12 w-12" />
        </AuthenticationContainer.Icon>
        <section className="flex flex-col text-center">
          <section
            className={
              'text-[2rem] font-semibold text-dark-800 leading-8 text-ellipsis '
            }
          >
            {t('validationEmail', 'Validation Email Sent To')}
          </section>
          <section
            className={
              'text-[2rem] font-semibold text-dark-800 leading-8 truncate '
            }
          >
            {`${email}`}
          </section>

          <section className={'text-lg leading-6 text-dark-800  mt-10'}>
            {t(
              'validationMessage',
              'A validation email was sent to your email address, please note that the verification email link will expire in 24 hours.',
            )}
          </section>
          <section className={'lg:hidden  mt-10'}>
            <ContactSupport text={t('troubleSingIn', 'Trouble signing in?')} />
          </section>
        </section>
      </AuthenticationContainer.Body>
      <section className={'hidden lg:block'}>
        <AuthenticationContainer.Footer>
          <ContactSupport text={t('troubleSingIn', 'Trouble signing in?')} />
        </AuthenticationContainer.Footer>
      </section>
    </AuthenticationContainer>
  );
};

export default EmailValidationSent;
