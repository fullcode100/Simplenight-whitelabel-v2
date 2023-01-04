import React from 'react';
import { NextPageWithLayout } from 'types/layout/pageTypes';
import NotFoundPicture from 'components/global/NotFoundPicture/NotFoundPicture';
import Button from 'components/global/ButtonNew/Button';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

const Custom404: NextPageWithLayout = () => {
  const [t] = useTranslation('global');
  const router = useRouter();
  const pageNotFound = t('pageNotFound', 'Page Not Found');
  const sorryText = t('sorryTheRequestedPage', 'Sorry, The Requested Page');
  const couldNotBeFound = t('couldNotBeFound', 'Could Not Be Found');
  const goToHomeText = t('goToHome', 'Go To Home');

  const handleGoToHome = () => {
    router.push('/');
  };

  return (
    <section className="grid place-content-center h-[80vh] w-full">
      <section className="flex flex-col justify-center items-center gap-5">
        <NotFoundPicture />
        <h3 className="text-dark-800 text-lg lg:text-2xl">{pageNotFound}</h3>
        <section className="text-sm lg:text-base text-center text-dark-800">
          <p>{sorryText}</p>
          <p>{couldNotBeFound}</p>
        </section>
        <Button onClick={handleGoToHome}>
          <span className="font-bold px-4 text-base">{goToHomeText}</span>
        </Button>
      </section>
    </section>
  );
};

export default Custom404;
