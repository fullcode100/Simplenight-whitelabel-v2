import { Error404, Heading } from '@simplenight/ui';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../Button/Button';

interface Props {
  title: string;
  subtitle: string;
  icon: ReactNode;
}

const ErrorPage = ({ title, subtitle, icon }: Props) => {
  const [t] = useTranslation('global');
  const router = useRouter();
  const handleGoToHome = () => {
    router.push('/');
  };
  const goToHomeText = t('goToHome', 'Go To Home');

  return (
    <section className="flex flex-col justify-center items-center min-h-[80vh] gap-4 text-dark-800 text-center mx-4">
      {icon}
      <Heading tag="h4" textColor={'text-dark-800'} className="capitalize">
        {title}
      </Heading>
      <Heading tag="h6" textColor={'text-dark-800'} className="capitalize">
        {subtitle}
      </Heading>
      <Button
        size="full-sm"
        translationKey="goToHome"
        value={goToHomeText}
        onClick={handleGoToHome}
        className="lg:w-[200px] lg:h-[44px] lg:text-base mt-2"
      />
    </section>
  );
};

export default ErrorPage;
