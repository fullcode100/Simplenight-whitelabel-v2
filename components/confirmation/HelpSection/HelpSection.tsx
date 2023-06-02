import { useSettings } from 'hooks/services/useSettings';
import { useTranslation } from 'react-i18next';

import EmailIcon from 'public/icons/assets/email.svg';
import PhoneCall from 'public/icons/assets/phone-call.svg';

const HelpSection = () => {
  const [t, i18next] = useTranslation('global');
  const helpTitle = t('needHelpTitle', 'Need some help?');
  const helpDescription = t(
    'needHelpDescription',
    'Email or call us to get support from our team.',
  );

  const { data: brandConfig } = useSettings();
  const { information } = brandConfig;
  const { customerSupportEmail, customerSupportPhone } = information || {};
  const { prefix, number } = customerSupportPhone || {};
  const customerSupportPhoneNumber = `${prefix} ${number}`;

  const handleLinkOpen = (url: string) => {
    window.open(url, '_blank');
  };

  interface HelpLinkProps {
    icon?: React.ReactNode;
    link?: string;
    text?: string;
  }
  const HelpLink = ({ icon, link = '', text }: HelpLinkProps) => (
    <section className="flex items-center justify-center gap-3 text-base font-semibold underline lg:justify-start text-primary-1000">
      <section className="flex items-center justify-center w-8 h-8 text-white rounded-full bg-primary-1000">
        {icon}
      </section>
      <button onClick={() => handleLinkOpen(link)}>{text}</button>
    </section>
  );

  return (
    <section className="px-5 py-6 lg:p-0 bg-dark-100">
      <section className="flex flex-col gap-3 p-6 text-center bg-white border font-lato lg:p-8 lg:gap-4 shadow-container rounded-4 lg:text-left border-dark-300 text-dark-1000">
        <h3 className="text-2xl leading-xl font-semibold lg:text-[32px] lg:leading-[38px]">
          {helpTitle}
        </h3>
        <p className="text-lg leading-[26px] font-normal">{helpDescription}</p>
        <section className="flex flex-col gap-3 lg:gap-4 first-letter">
          <HelpLink
            icon={<EmailIcon />}
            link={`mailto:${customerSupportEmail}`}
            text={t('emailSupport', 'Email Support')}
          />
          <HelpLink
            icon={<PhoneCall />}
            link={`tel:${customerSupportPhoneNumber}`}
            text={customerSupportPhoneNumber}
          />
        </section>
      </section>
    </section>
  );
};

export default HelpSection;
