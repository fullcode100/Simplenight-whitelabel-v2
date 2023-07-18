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
import useBog from 'hooks/bog/useBog';
import SearchIcon from 'public/icons/assets/Search.svg';
import PersonIcon from 'public/icons/assets/person.svg';
import { useSettings } from 'hooks/services/useSettings';
import { hasCartMode } from 'helpers/purchaseModeUtils';
import { IconWrapper } from '@simplenight/ui';
import { IconContainer } from 'components/global/ComingSoon/IconContainer';
import { useState } from 'react';
import { iAuthModalType } from 'profiles/authentication';

interface HeaderDesktopProps {
  color?: string;
  cartQty?: number;
  onOpen: () => void;
  openAuth?: (value: iAuthModalType) => void;
}

interface CustomLinkProps {
  href?: string;
  children: React.ReactNode | React.ReactNode[];
}

const HeaderDesktop = ({ cartQty, onOpen, openAuth }: HeaderDesktopProps) => {
  const { data: brandConfig } = useSettings();
  const { images } = brandConfig;
  const { logo } = images || {};
  const [tg, i18n] = useTranslation('global');
  const { isBog } = useBog();
  const showCart = hasCartMode();
  const [showAuthMenu, setShowAuthMenu] = useState(false);

  const orderLookupText = tg('orderLookup', 'Order Lookup');
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
        <span className="flex items-center gap-3 text-xs text-white">
          {children}
        </span>
      </a>
    </Link>
  );

  const handleSelectAuhtModal = (authModalType: iAuthModalType) => {
    setShowAuthMenu(!showAuthMenu);
    openAuth && openAuth(authModalType);
  };

  const AuthMenu = () => (
    <section className="relative">
      <section
        className={`bg-white top-full right-2 absolute z-10 border border-dark-300 rounded shadow-container w-[150px] transition-all duration-500 text-dark-1000 ${
          !showAuthMenu ? 'hidden' : ''
        }`}
      >
        <button
          className="flex whitespace-nowrap items-center w-full pl-1 pr-6 border border-gray-300 rounded h-11 borderfocus:ring-primary-500 focus:border-primary-500 "
          onClick={() => handleSelectAuhtModal('login')}
        >
          Log in
        </button>
        <button
          className="flex whitespace-nowrap items-center w-full pl-1 pr-6 border border-gray-300 rounded h-11 borderfocus:ring-primary-500 focus:border-primary-500 "
          onClick={() => handleSelectAuhtModal('signUp')}
        >
          Sign Up
        </button>
      </section>
      <section>
        <button
          className="flex items-center justify-center border border-gray-300 rounded-3xl h-8 w-8 "
          onClick={() => setShowAuthMenu(!showAuthMenu)}
        >
          <PersonIcon
            className="text-white w-4 h-4 mb-1"
            onClick={() => setShowAuthMenu(!showAuthMenu)}
          />
        </button>
      </section>
    </section>
  );
  return (
    <>
      <header
        className={
          'hidden px-4 py-4 z-40 bg-dark-1000 sticky top-0 w-full lg:flex lg:px-20 shadow-container'
        }
      >
        <section className="items-center justify-between w-full mx-auto max-w-7xl lg:flex">
          <section className="flex items-center gap-5">
            <div className="flex flex-col items-center gap-2">
              <Link href={'/'}>
                <a>
                  <img
                    src={logo}
                    alt="Branch Logo"
                    className="h-12 object-contain"
                  />
                </a>
              </Link>
            </div>
          </section>
          <section className="flex gap-5">
            <CustomLink href={'/lookup'}>
              <SearchIcon /> {orderLookupText}
            </CustomLink>
            {/* <ButtonDropdown
              icon={<LanguageIcon />}
              value={currentLanguage}
              titleDropdown={languageText}
              disabled={isBog}
            >
              <LanguageSelect horizontal={true} />
            </ButtonDropdown>
            <ButtonDropdown
              icon={<CashIcon />}
              value={currentCurrency}
              titleDropdown={currencyText}
              disabled={isBog}
            >
              <CurrencySelect />
            </ButtonDropdown> */}
            {showCart && (
              <button
                onClick={onOpen}
                className="relative w-8 h-8 gap-2 px-2 py-1"
              >
                <span className="absolute w-4 h-4 font-semibold text-white rounded-full text-p-xxs bg-primary-1000 -top-px font-lato">
                  {cartQty ?? 0}
                </span>
                <ShoppingCart className="text-white" />
              </button>
            )}
            <AuthMenu />
            {/* <IconWrapper size={12}>
              <PersonIcon className="text-white" onClick={openAuth} />
            </IconWrapper> */}
          </section>
        </section>
      </header>
    </>
  );
};

export default HeaderDesktop;
