import { useTranslation } from 'react-i18next';

import { useBrandConfig } from 'hooks/branding/useBrandConfig';

import EmailIcon from 'public/icons/assets/email.svg';
import PhoneCall from 'public/icons/assets/phone-call.svg';
import classnames from 'classnames';

interface HelpSectionProps {
  inItinerary?: boolean;
  titleClass?: string;
  descriptionClass?: string;
}

const HelpSection = ({
  inItinerary = false,
  titleClass,
  descriptionClass,
}: HelpSectionProps) => {
  const [t, i18next] = useTranslation('global');
  const helpTitle = t('needHelpTitle', 'Need Some Help?');
  const helpDescription = t('needHelpDescription', 'Contact Us For Support.');

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
    <section
      className={classnames(
        'flex gap-3 items-center text-base text-primary-1000 underline font-semibold lg:mt-0',
        { 'justify-start pt-4': inItinerary },
        { 'justify-center': !inItinerary },
      )}
    >
      <section className="text-white bg-primary-1000 h-8 w-8 rounded-full flex justify-center items-center">
        {icon}
      </section>
      <button onClick={() => handleLinkOpen(link)}>{text}</button>
    </section>
  );

  return (
    <section className="lg:m-0 lg:flex lg:[50%] lg:flex-1">
      <section
        className={`flex flex-col gap-3 font-lato p-4 shadow-container rounded ${
          inItinerary ? 'text-left' : 'text-center'
        } border border-dark-300 text-dark-1000 lg:w-full lg:py-10 lg:px-6`}
      >
        <h3 className={`${!inItinerary && 'lg:mt-4'} ${titleClass}`}>
          {helpTitle}
        </h3>
        <p
          className={`text-lg leading-[26px] font-normal mt-4 ${descriptionClass}`}
        >
          {helpDescription}
        </p>
        <section
          className={classnames({
            'flex flex-col gap-3 lg:gap-0 first-letter lg:flex-row lg:justify-center lg:items-center lg:mt-2':
              !inItinerary,
          })}
        >
          <HelpLink
            icon={<EmailIcon />}
            link={`mailto:${customerSupportEmail}`}
            text={t('emailSupport', 'Email Support')}
          />
          <span
            className={classnames({
              'hidden lg:block h-[1.5rem] w-[1px] bg-dark-300 mx-8':
                !inItinerary,
            })}
          />
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
