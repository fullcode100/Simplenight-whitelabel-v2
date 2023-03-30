import React from 'react';
import { NextPageWithLayout } from 'types/layout/pageTypes';
import Button from 'components/global/ButtonNew/Button';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { Error404 } from '@simplenight/ui';
import ErrorPage from 'components/global/ErrorPage/ErrorPage';

const Custom404: NextPageWithLayout = () => {
  const [t] = useTranslation('global');
  const router = useRouter();
  const pageNotFound = t('pageNotFound', 'Page Not Found');
  const sorryText = t('sorryTheRequestedPage', 'Sorry, The Requested Page');

  return (
    <ErrorPage
      title={pageNotFound}
      subtitle={sorryText}
      icon={<Error404 width={300} />}
    />
  );
};

export default Custom404;
