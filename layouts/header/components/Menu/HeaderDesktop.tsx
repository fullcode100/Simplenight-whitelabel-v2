/* eslint-disable @next/next/no-img-element */
/* eslint-disable indent */
import ShoppingCart from 'public/icons/assets/shopping-cart.svg';
import Link from 'next/link';
import LanguageIcon from 'public/icons/assets/language.svg';
import CashIcon from 'public/icons/assets/cash.svg';
import LanguageSelect from 'components/global/LanguageSelect/LanguageSelect';
import ButtonDropdown from './ButtonDropdown';
import CurrencySelect from 'components/global/CurrencySelect/CurrencySelect';
import { useTranslation } from 'react-i18next';
import { getCurrency } from 'store/selectors/core';
import ChevronDown from 'public/icons/assets/chevron-down.svg';
import useDisplayCategory from 'hooks/category/useDisplayCategory';
import { useBrandConfig } from 'hooks/branding/useBrandConfig';
import ExternalLink from 'components/global/ExternalLink/ExternalLink';

interface HeaderDesktopProps {
  color?: string;
  cartQty?: number;
  onOpen: () => void;
}

interface CustomLinkProps {
  href?: string;
  children: any;
}

const HeaderDesktop = ({ color, cartQty, onOpen }: HeaderDesktopProps) => {
  const [tg, i18n] = useTranslation('global');
  const currentCurrency = getCurrency();

  const poweredByText = tg('poweredBy', 'Powered by');
  const orderLookupText = tg('orderLookup', 'Order Lookup');
  const categoriesText = tg('categories', 'Categories');
  const displayCategoryOption = useDisplayCategory();
  const { language } = i18n;
  const getFriendlyLanguage = (lang: string) => {
    switch (lang) {
      case 'en':
        return tg('en', 'English');
      case 'es':
        return tg('es', 'Spanish');
      default:
        return tg('en', 'English');
    }
  };
  const currentLanguage = getFriendlyLanguage(language);
  const { images, information } = useBrandConfig() || {};
  const { logo } = images || {};
  const { partnerName, corporateLink } = information || {};
  const showPartner = partnerName?.toLowerCase() !== 'simplenight';
  const simplenightCorporateLink = 'https://simplenight.com';
  const languageText = tg('language', 'Language');
  const currencyText = tg('currency', 'Currency');
  const CustomLink = ({ href = '', children }: CustomLinkProps) => (
    <Link href={href}>
      <a className="flex items-center">
        <span className="text-base text-dark-1000">{children}</span>
      </a>
    </Link>
  );
  return (
    <header
      className={`hidden px-4 py-6 z-30 ${color} fixed w-full lg:flex lg:px-20 shadow-container`}
    >
      <section className="items-center justify-between w-full mx-auto max-w-7xl lg:flex">
        <section className="flex items-center gap-5">
          <div className="flex flex-col items-center gap-2">
            <Link href={'/'}>
              <a>
                <img
                  src={logo}
                  alt="Branch Logo"
                  className="h-[60px] object-contain"
                />
              </a>
            </Link>
            <span className="text-[12px] text-dark-800 font-semibold uppercase">
              {poweredByText}{' '}
              {showPartner && (
                <>
                  <ExternalLink
                    href={corporateLink}
                    className="font-semibold underline uppercase hover:underline focus:underline"
                  >
                    {partnerName}
                  </ExternalLink>{' '}
                  &{' '}
                </>
              )}
              <ExternalLink
                href={simplenightCorporateLink}
                className="underline uppercase focus:underline hover:underline"
              >
                Simplenight
              </ExternalLink>{' '}
            </span>
          </div>
        </section>
        <section className="flex gap-5">
          <CustomLink href={'/lookup'}>{orderLookupText}</CustomLink>
          {/* {displayCategoryOption && (
            <button>
              <a>
                <span className="flex items-center gap-2 text-base text-dark-1000">
                  {categoriesText} <ChevronDown />
                </span>
              </a>
            </button>
          )} */}
          <ButtonDropdown
            icon={<LanguageIcon />}
            value={currentLanguage}
            titleDropdown={languageText}
          >
            <LanguageSelect horizontal={true} />
          </ButtonDropdown>
          <ButtonDropdown
            icon={<CashIcon />}
            value={currentCurrency}
            titleDropdown={currencyText}
          >
            <CurrencySelect />
          </ButtonDropdown>
          <button
            onClick={onOpen}
            className="flex items-center justify-between h-8 gap-2 px-2 py-1 bg-white border rounded w-14 border-dark-300"
          >
            <span className="text-sm font-semibold text-dark-1000 font-lato">
              {cartQty ?? 0}
            </span>
            <ShoppingCart className="text-primary-1000" />
          </button>
        </section>
      </section>
    </header>
  );
};

export default HeaderDesktop;
