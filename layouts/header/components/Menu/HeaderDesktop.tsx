/* eslint-disable indent */
import ShoppingCart from 'public/icons/assets/shopping-cart.svg';
import SimplenightLogo from 'public/icons/assets/simplenight-logo.svg';
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
      className={`hidden items-center justify-between px-4 py-5 z-20 ${color} fixed w-full lg:flex lg:px-20 shadow-container`}
    >
      <section className="flex gap-5 items-center">
        <Link href={'/'}>
          <a>
            <SimplenightLogo className="w-40 h-16" />
            <span className="text-[0.8rem]">{poweredByText} SIMPLENIGHT</span>
          </a>
        </Link>
      </section>
      <section className="flex gap-5">
        <CustomLink href={'/lookup'}>{orderLookupText}</CustomLink>
        {displayCategoryOption && (
          <button>
            <a>
              <span className="text-base text-dark-1000 flex items-center gap-2">
                {categoriesText} <ChevronDown />
              </span>
            </a>
          </button>
        )}
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
          className="flex justify-between items-center gap-2 w-14 h-8 border border-dark-300 bg-white px-2 py-1 rounded"
        >
          <span className="text-dark-1000 font-bold text-sm font-lato">
            {cartQty ?? 0}
          </span>
          <ShoppingCart className="text-primary-1000" />
        </button>
      </section>
    </header>
  );
};

export default HeaderDesktop;
