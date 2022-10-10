/* eslint-disable @next/next/no-img-element */
import CategorySelect from './CategorySelect';
import LanguageSelect from 'components/global/LanguageSelect/LanguageSelect';
import TitleDrop from 'components/global/TitleDrop/TitleDrop';
import CurrencySelect from 'components/global/CurrencySelect/CurrencySelect';
import Divider from 'components/global/Divider/Divider';
import Close from 'public/icons/assets/cross.svg';
import { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import useDisplayCategory from 'hooks/category/useDisplayCategory';
import { useBrandConfig } from 'hooks/branding/useBrandConfig';

interface MenuProps {
  onCloseModal: (event?: MouseEvent<HTMLElement>) => void;
}

const Menu = ({ onCloseModal }: MenuProps) => {
  const [t] = useTranslation('global');
  const displayDropdown = useDisplayCategory();
  const { images } = useBrandConfig() || {};
  const { logo } = images || {};
  const languageText = t('language', 'Language');
  const currencyText = t('currency', 'Currency');
  return (
    <section className="z-20 h-full bg-white">
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
          <CategorySelect />
          <section className="px-4">
            <Divider className="py-4" />
          </section>
        </section>
      )}
      <section className="p-4">
        <TitleDrop title={languageText}>
          <LanguageSelect />
        </TitleDrop>
        <Divider className="py-6" />
        <TitleDrop title={currencyText}>
          <CurrencySelect />
        </TitleDrop>
      </section>
    </section>
  );
};

export default Menu;
