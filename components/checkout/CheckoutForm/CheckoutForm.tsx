// Libraries
import React from 'react';
// Hooks
import { useTranslation } from 'react-i18next';

type Props = {
  title: string;
  children: React.ReactNode;
};

const CheckoutForm = ({ title, children }: Props) => {
  const [t, i18next] = useTranslation('global');
  const formTitle = t('formTitle', title);
  return (
    <section className="flex flex-col">
      <h2 className="text-lg leading-6 text-dark-800 font-semibold lg:bg-dark-100 bg-white px-5 py-6">
        {formTitle}
      </h2>
      <section className="flex flex-col gap-4 my-6 px-5">{children}</section>
    </section>
  );
};

export default CheckoutForm;
