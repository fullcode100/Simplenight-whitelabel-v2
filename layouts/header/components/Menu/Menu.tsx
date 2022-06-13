/* eslint-disable @next/next/no-img-element */
import CategorySelect from './CategorySelect';
import LanguageSelect from 'components/global/LanguageSelect/LanguageSelect';
import TitleDrop from 'components/global/TitleDrop/TitleDrop';
import CurrencySelect from 'components/global/CurrencySelect/CurrencySelect';
import Divider from 'components/global/Divider/Divider';
import { getFeatures } from 'store/selectors/core';
import { useSelector } from 'react-redux';
import Close from 'public/icons/assets/cross.svg';
import { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

interface MenuProps {
  onCloseModal: (event?: MouseEvent<HTMLElement>) => void;
}

const Menu = ({ onCloseModal }: MenuProps) => {
  const [t] = useTranslation('global');
  const features = useSelector(getFeatures);
  const activeFeatures = Object.keys(features).filter(
    (feature) => features[feature],
  );
  const displayDropdown = activeFeatures.length > 1;
  const logoUrl =
    'https://storage.googleapis.com/simplenight_public_web/Simplenight_Logo_SmallStacked_Vector.png';
  const languageText = t('language', 'Language');
  const currencyText = t('currency', 'Currency');
  return (
    <section className="w-full h-full fixed inset-0 bg-white">
      <header className="flex justify-between items-center pt-12 pb-5 px-5 bg-white text-dark-1000">
        <button onClick={onCloseModal}>
          <Close />
        </button>
        <img src={logoUrl} alt="Simplenight" className="w-[94px]" />
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
