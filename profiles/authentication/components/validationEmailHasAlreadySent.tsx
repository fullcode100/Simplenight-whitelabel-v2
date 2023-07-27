import { useTranslation } from 'react-i18next';
import React from 'react';
import { IAuthComponent } from '..';
import Exclamation from '@/icons/assets/info-circle.svg';
import { ContactSupport } from '../../../components/contactSupport';
import AuthenticationContainer from '../../../components/authenticationContainer';

interface IValidationEmailHasAlreadySentProps extends IAuthComponent {
  email: string;
}

const ValidationEmailHasAlreadySent = ({
  email,
}: IValidationEmailHasAlreadySentProps) => {
  const [t, i18n] = useTranslation('profiles');

  return (
    <AuthenticationContainer>
      <AuthenticationContainer.Body className={'mt-20'}>
        <AuthenticationContainer.Icon>
          <Exclamation className="text-primary-1000 flex h-20 w-20" />
        </AuthenticationContainer.Icon>
        <section className="mt-4 flex flex-col text-center">
          <section
            className={
              'text-[2rem] font-bold text-dark-800 leading-8 text-ellipsis '
            }
          >
            {t('linkAlreadySent', `We already sent an email to ${email}`)}
          </section>
          <section className={'text-lg leading-6 text-dark-800  mt-10 mb-20'}>
            {t(
              'linkExpired',
              'We have recently sent you a link. Please wait until 24 hours have passed, check your spam folder or contact us for support.\n' +
                '\n' +
                '\n' +
                'Trouble signing up? Contact Support',
            )}
          </section>
        </section>
      </AuthenticationContainer.Body>
      <AuthenticationContainer.Footer>
        <ContactSupport text={t('troubleSingUp', 'Trouble signing up?')} />
      </AuthenticationContainer.Footer>
    </AuthenticationContainer>
  );
};

export default ValidationEmailHasAlreadySent;
