import ExternalLink from 'components/global/ExternalLink/ExternalLink';
import { useBrandConfig } from 'hooks/branding/useBrandConfig';
import useGetTranslation from 'hooks/i18n/useGetTranslation';
import BrandingHOC from 'layouts/helpers/components/BrandingHOC';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const t = useGetTranslation();
  const { partnerName, legalInformation, partnerInformation } =
    useBrandConfig();
  const showPartnerLinks = partnerName?.toLowerCase() !== 'simplenight';
  const termsOfServiceText = t({ translationKey: 'termsOfService' });
  const privacyPolicyText = t({ translationKey: 'privacyPolicy' });
  const poweredByText = t({ translationKey: 'poweredBy', value: 'Powered by' });

  return (
    <footer className="bg-dark-800 text-white p-4 absolute bottom-0 w-full text-center font-light text-sm">
      <p className="mt-3 mb-6">
        {' '}
        {poweredByText}{' '}
        <ExternalLink
          href={partnerInformation.partnerUrl}
          className="font-medium uppercase"
        >
          Simplenight
        </ExternalLink>
      </p>
      <div className="flex flex-col gap-3 underline capitalize">
        <ExternalLink href={legalInformation?.simplenightTermsOfService}>
          Simplenight {termsOfServiceText}
        </ExternalLink>
        <ExternalLink href={legalInformation?.simplenightPrivacyPolicy}>
          Simplenight {privacyPolicyText}
        </ExternalLink>

        {showPartnerLinks && (
          <>
            <ExternalLink href={legalInformation?.partnerTermsOfService}>
              {partnerName} {termsOfServiceText}
            </ExternalLink>
            <ExternalLink href={legalInformation?.partnerPrivacyPolicy}>
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
