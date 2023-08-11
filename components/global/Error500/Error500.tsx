import React from 'react';
import { Error404 } from '@simplenight/ui';
import Button from '../Button/Button';
import { useTranslation } from 'react-i18next';

const Error500 = () => {
  const [t] = useTranslation('global');
  const goToHome = () => {
    window.location.href = '/';
  };

  return (
    <section className="flex flex-col justify-center items-center min-h-[80vh] gap-4 text-dark-800">
      <Error404 />
      <p className="text-2xl">{t('oops')}</p>
      <p className="text-base">{t('itSeemsSomethingWentWrong')}</p>
      <Button
        size="full-sm"
        translationKey="goToHome"
        value={t('goToHome')}
        onClick={goToHome}
        className="lg:w-[200px] lg:h-[44px] lg:text-base mt-2"
      />
    </section>
  );
};

export default Error500;
