import React from 'react';
import { NextPageWithLayout } from 'types/layout/pageTypes';
import { useTranslation } from 'react-i18next';
import ErrorPage from 'components/global/ErrorPage/ErrorPage';
import { Error500 } from '@simplenight/ui';

const Custom500: NextPageWithLayout = () => {
  const [t] = useTranslation();
  const wentWrongText = t(
    'itSeemsSomethingWentWrong',
    'It seems something went wrong',
  );
  const oopsText = 'Oops';
  return (
    <ErrorPage
      title={oopsText}
      subtitle={wentWrongText}
      icon={<Error500 width={300} />}
    />
  );
};

export default Custom500;
