import React from 'react';
import { Error404 } from '@simplenight/ui';
import Button from '../Button/Button';
import { useTranslation } from 'react-i18next';

const Error500 = () => {
  const [t] = useTranslation('global');
  const goToHome = () => {
    window.location.href = '/';
  };
  const goToHomeText = t('goToHome', 'Go To Home');
  const wentWrongText = t(
    'itSeemsSomethingWentWrong',
    'It seems something went wrong',
  );

  return (
    <section className="flex flex-col justify-center items-center min-h-[80vh] gap-4 text-dark-800">
      <Error404 />
      <p className="text-2xl">Oops</p>
      <p className="text-base">{wentWrongText}</p>
      <Button
        size="full-sm"
        translationKey="goToHome"
        value={goToHomeText}
        onClick={goToHome}
        className="lg:w-[200px] lg:h-[44px] lg:text-base mt-2"
      />
    </section>
  );
};

export default Error500;
