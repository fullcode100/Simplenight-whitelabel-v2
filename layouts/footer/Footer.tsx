import ExternalLink from 'components/global/ExternalLink/ExternalLink';
import { useBrandConfig } from 'hooks/branding/useBrandConfig';
import useGetTranslation from 'hooks/i18n/useGetTranslation';
import BrandingHOC from 'layouts/helpers/components/BrandingHOC';
import SimplenightLogo from 'public/icons/assets/simplenight-white-logo.svg';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const t = useGetTranslation();
  const { legalInformation, partnerInformation, simplenightInformation } =
    useBrandConfig();
  const { partnerName } = partnerInformation;
  const { corporateLink } = simplenightInformation;
  const {
    simplenightTermsOfService,
    simplenightPrivacyPolicy,
    partnerTermsOfService,
    partnerPrivacyPolicy,
  } = legalInformation;
  const showPartnerLinks = partnerName?.toLowerCase() !== 'simplenight';
  const termsOfServiceText = t({ translationKey: 'termsOfService' });
  const privacyPolicyText = t({ translationKey: 'privacyPolicy' });
  const poweredByText = t({ translationKey: 'poweredBy', value: 'Powered by' });

  return (
    <footer className="bg-dark-1000 text-white p-4 w-full text-center font-light text-sm">
      <SimplenightLogo />
      <p className="mt-3">
        {' '}
        {poweredByText}{' '}
        <ExternalLink
          href={corporateLink}
          className="font-medium underline uppercase text-white focus:text-white focus:underline hover:text-white hover:underline"
        >
          Simplenight
        </ExternalLink>
      </p>
      <div className="h-[1px] bg-dark-800 my-6"></div>
      <div className="flex flex-col gap-3 underline capitalize">
        <ExternalLink
          href={simplenightTermsOfService}
          className="underline text-white focus:text-white focus:underline hover:text-white hover:underline"
        >
          Simplenight {termsOfServiceText}
        </ExternalLink>
        <ExternalLink
          href={simplenightPrivacyPolicy}
          className="underline text-white focus:text-white focus:underline hover:text-white hover:underline"
        >
          Simplenight {privacyPolicyText}
        </ExternalLink>

        {showPartnerLinks && (
          <>
            <ExternalLink href={partnerTermsOfService}>
              {partnerName} {termsOfServiceText}
            </ExternalLink>
            <ExternalLink href={partnerPrivacyPolicy}>
              {partnerName} {privacyPolicyText}
            </ExternalLink>
          </>
        )}
      </div>
      <p className="mt-6 mb-2"> © {currentYear} Simplenight </p>
    </footer>
  );
};

const FooterBrandingHoc = () => {
  const { brandCode } = useBrandConfig();

  return (
    <BrandingHOC brand={brandCode} path={'layout/Footer'}>
      <Footer />
    </BrandingHOC>
  );
};

export default FooterBrandingHoc;
