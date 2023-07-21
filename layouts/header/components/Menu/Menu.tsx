/* eslint-disable @next/next/no-img-element */
import CategorySelect from './CategorySelect';
import LanguageSelect from 'components/global/LanguageSelect/LanguageSelect';
import TitleDrop from 'components/global/TitleDrop/TitleDrop';
import CurrencySelect from 'components/global/CurrencySelect/CurrencySelect';
import Divider from 'components/global/Divider/Divider';
import Close from 'public/icons/assets/cross.svg';
import { MouseEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useDisplayCategory from 'hooks/category/useDisplayCategory';
import { useSettings } from 'hooks/services/useSettings';
import { Tab } from 'hooks/layoutAndUITooling/useTabStore';
import { CategoryInfo } from 'hooks/category/useCategories';
import { IAuthModalType } from 'profiles/authentication';
import {
  logout,
  SESSION_TOKEN,
} from 'profiles/core/services/AuthClientService';
import { useSessionStore } from '../../../../hooks/auth/useSessionStore';

interface MenuProps {
  onCloseModal: (event?: MouseEvent<HTMLElement>) => void;
  handleTabClick: (tab: Tab | CategoryInfo) => void;
  activeTab: Tab;
  openAuth?: (value: IAuthModalType) => void;
}

const Menu = ({
  onCloseModal,
  handleTabClick,
  activeTab,
  openAuth,
}: MenuProps) => {
  const [t] = useTranslation('global');
  const displayDropdown = useDisplayCategory();
  const { data: brandConfig } = useSettings();
  const { images } = brandConfig;
  const { logo } = images || {};
  const languageText = t('language', 'Language');
  const currencyText = t('currency', 'Currency');

  const { token, setToken, clear } = useSessionStore();

  useEffect(() => {
    const sessionToken = localStorage.getItem(SESSION_TOKEN);
    if (sessionToken) {
      setToken(sessionToken);
    }
  }, []);

  return (
    <section className="relative z-20 h-full overflow-y-scroll bg-white">
      <header className="sticky flex items-center justify-between px-5 pt-12 pb-5 bg-white text-dark-1000">
        <button onClick={onCloseModal}>
          <Close />
        </button>
        <img
          src={logo}
          alt="Branch Logo"
          width="94px"
          height="36px"
          className="object-fit"
        />
      </header>

      {displayDropdown && (
        <section className="mb-1">
          <CategorySelect
            activeTab={activeTab}
            handleTabClick={handleTabClick}
          />
          <section className="px-4">
            <Divider className="py-4" />
          </section>
          {!token ? (
            <>
              <button
                className="flex whitespace-nowrap items-center w-full pl-1 pr-6 border border-gray-300 rounded h-11 borderfocus:ring-primary-500 focus:border-primary-500 "
                onClick={() => openAuth && openAuth('login')}
              >
                Log in
              </button>
              <button
                className="flex whitespace-nowrap items-center w-full pl-1 pr-6 border border-gray-300 rounded h-11 borderfocus:ring-primary-500 focus:border-primary-500 "
                onClick={() => openAuth && openAuth('signUp')}
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              <button className="flex whitespace-nowrap items-center w-full pl-1 pr-6 border border-gray-300 rounded h-11 borderfocus:ring-primary-500 focus:border-primary-500 ">
                Porfile
              </button>
              <button
                className="flex whitespace-nowrap items-center w-full pl-1 pr-6 border border-gray-300 rounded h-11 borderfocus:ring-primary-500 focus:border-primary-500 "
                onClick={() => () => {
                  logout();
                  clear();
                }}
              >
                Log Out
              </button>
            </>
          )}
        </section>
      )}
      {/* <section className="p-4">
        <TitleDrop title={languageText}>
          <LanguageSelect />
        </TitleDrop>
        <Divider className="py-6" />
        <TitleDrop title={currencyText}>
          <CurrencySelect />
        </TitleDrop>
      </section> */}
    </section>
  );
};

export default Menu;
