import { useTranslation } from 'react-i18next';

import { useBrandConfig } from 'hooks/branding/useBrandConfig';

import EmailIcon from 'public/icons/assets/email.svg';
import PhoneCall from 'public/icons/assets/phone-call.svg';

const HelpSection = () => {
  const [t, i18next] = useTranslation('global');
  const helpTitle = t('needHelpTitle', 'Need some help?');
  const helpDescription = t(
    'needHelpDescription',
    'Email or call us to get support from our team.',
  );

  const { partnerInformation } = useBrandConfig();
  const { customerSupportEmail, customerSupportPhone } = partnerInformation;

  const handleLinkOpen = (url: string) => {
    window.open(url, '_blank');
  };

  interface HelpLinkProps {
    icon?: React.ReactNode;
    link?: string;
    text?: string;
  }
  const HelpLink = ({ icon, link = '', text }: HelpLinkProps) => (
    <section className="flex gap-3 justify-center items-center mt-4 text-base text-primary-1000 underline font-semibold lg:mt-0">
      <section className="text-white bg-primary-1000 h-8 w-8 rounded-full flex justify-center items-center">
        {icon}
      </section>
      <button onClick={() => handleLinkOpen(link)}>{text}</button>
    </section>
  );

  return (
    <section className="p-4 mt-6 mb-4 lg:m-0 lg:flex lg:[50%] lg:flex-1">
      <section className="font-lato p-4 shadow-md rounded-4 text-center border text-dark-1000 lg:w-full lg:py-10 lg:px-6">
        <h3 className="text-2xl font-semibold lg:text-3xl lg:mt-4">
          {helpTitle}
        </h3>
        <p className="text-lg font-normal mt-4">{helpDescription}</p>
        <section className="lg:flex first-letter lg:justify-center lg:items-center lg:mt-5">
          <HelpLink
            icon={<EmailIcon />}
            link={`mailto:${customerSupportEmail}`}
            text={t('emailSupport', 'Email Support')}
          />
          <span className="hidden lg:block h-[1.5rem] w-[1px] bg-dark-300 mx-8" />
          <HelpLink
            icon={<PhoneCall />}
            link={`tel:${customerSupportPhone}`}
            text={customerSupportPhone}
          />
        </section>
      </section>
    </section>
  );
};

export default HelpSection;
