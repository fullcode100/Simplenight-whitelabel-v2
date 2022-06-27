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
    <footer className="bg-dark-200 text-dark-1000 p-4 w-full text-center font-light text-sm lg:flex lg:justify-between lg:px-24 lg:py-9">
      <section className="lg:text-left font-normal">
        <SimplenightLogo className="mx-auto lg:mx-0 lg:w-[11rem] lg:h-[4.5rem]" />
        <p className="mt-3 lg:text-[0.75rem] lg:mt-1">
          {' '}
          {poweredByText}{' '}
          <ExternalLink
            href={corporateLink}
            className="font-medium underline uppercase focus:text-white focus:underline hover:text-white hover:underline"
          >
            Simplenight
          </ExternalLink>
        </p>
        <p className="hidden mt-6 mb-2 lg:block lg:text-xs">
          {' '}
          © {currentYear} Simplenight{' '}
        </p>
      </section>
      <div className="h-[1px] bg-dark-300 my-6 lg:hidden" />
      <section className="flex flex-col gap-3 underline capitalize lg:grid lg:grid-cols-2 lg:font-normal lg:text-xs lg:place-content-start lg:text-right">
        <ExternalLink
          href={simplenightTermsOfService}
          className="underline focus:text-white focus:underline hover:text-white hover:underlin"
        >
          Simplenight {termsOfServiceText}
        </ExternalLink>
        <ExternalLink
          href={simplenightPrivacyPolicy}
          className="underline focus:text-white focus:underline hover:text-white hover:underline"
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
      </section>
      <p className="mt-6 mb-2 lg:hidden"> © {currentYear} Simplenight </p>
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
