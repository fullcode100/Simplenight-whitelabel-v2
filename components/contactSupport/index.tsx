import React from 'react';
import { useTranslation } from 'react-i18next';

interface IContactSupport {
  text?: string;
}
export const ContactSupport = ({ text }: IContactSupport) => {
  const [t, i18n] = useTranslation('global');
  const contactToSupport = () => {
    const email = 'support@simplenight.com';
    document.location = 'mailto:' + email;
  };
  return (
    <section className={'flex flex-row justify-center flex-1'}>
      <section className={'flex flex-row'}>
        <section className="flex text-lg mr-2 text-dark-800">{text}</section>
        <section
          onClick={contactToSupport}
          className="flex cursor-pointer underline justify-center  text-lg text-[#0DADB9]"
        >
          {t('contactSupport', 'Contact Support')}
        </section>
      </section>
    </section>
  );
};
