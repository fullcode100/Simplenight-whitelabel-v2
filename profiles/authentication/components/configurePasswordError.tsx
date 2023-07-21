import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { IAuthComponent } from '..';
import FormsLoader from '../../../components/global/Loader/FormsLoader';
import Error from '@/icons/assets/cross-round.svg';
import { sendVerificationEmail } from '../../core/services/AuthClientService';
import { getTemporalCredentials } from '../../core/utils';

const ConfigurePasswordError = ({ closeModal }: IAuthComponent) => {
  const [t, i18n] = useTranslation('profiles');
  const [loading, setLoading] = useState(false);
  const requestNewLink = async () => {
    setLoading(true);
    try {
      const temporalCredentials = getTemporalCredentials();
      if (temporalCredentials) {
        await sendVerificationEmail(temporalCredentials.email, i18n);
      }
    } finally {
      setLoading(false);
      closeModal();
    }
  };

  return (
    <section className="flex h-full flex-col justify-center content-center">
      <Error className="text-primary-1000 flex h-20 w-20 align-middle self-center" />
      <section className="mt-4 flex flex-col text-center">
        <section
          className={
            'text-[2rem] font-bold text-dark-800 leading-8 text-ellipsis '
          }
        >
          {t('linkExpired', 'Sorry, Your link has expired')}
        </section>
        <section className={'text-lg leading-6 text-dark-800  mt-10 mb-20'}>
          {t(
            'linkExpired',
            ' The link we sent you to confirm your account email has expired. For your security, please request a new link.',
          )}
        </section>
        <section className={'mt-6'}>
          {!loading && (
            <section
              onClick={requestNewLink}
              className="flex cursor-pointer underline justify-center  text-lg text-[#0DADB9]"
            >
              {t('requestNewLink', 'Request a new link')}
            </section>
          )}
          {loading && <FormsLoader size={'medium'} />}
        </section>
      </section>
    </section>
  );
};

export default ConfigurePasswordError;
