/* eslint-disable indent */
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';
import { updateCart } from 'core/client/services/CartClientService';
import { i18n } from 'i18next';
import { getStoreCartId } from 'store/selectors/cart';

const changeAllLanguages = (
  targetLanguage: string,
  i18nInstances: i18n[],
): void => {
  i18nInstances.forEach((instance) => {
    instance.changeLanguage(targetLanguage);
  });
};

interface LanguageSelectProps {
  horizontal?: boolean;
}

const LanguageSelect = ({ horizontal = false }: LanguageSelectProps) => {
  const [t, i18n] = useTranslation('global');
  const [tHotels, i18nHotels] = useTranslation('hotels');
  const [tFlights, i18nFlights] = useTranslation('flights');
  const { language } = i18n;
  const languages = ['en', 'es'];
  const enText = t('en', 'English');
  const esText = t('es', 'Spanish');
  const cartId = getStoreCartId() ?? null;

  const handleChangeLanguage = async (lang: string) => {
    changeAllLanguages(lang, [i18n, i18nHotels, i18nFlights]);
    try {
      const data = { lang };
      await updateCart(data, cartId, i18n);
    } catch (error) {
      console.error(error);
    }
  };
  const getFriendlyLanguage = (lang: string) => {
    switch (lang) {
      case 'en':
        return enText;
      case 'es':
        return esText;
      default:
        return enText;
    }
  };

  return (
    <div className="mt-3">
      <div className="relative">
        <section
          className={classnames('p-2 bg-dark-100 flex rounded-md gap-1', {
            'flex-col': !horizontal,
          })}
        >
          {languages.map((lang: string) => {
            const isActive = lang === language;
            const className = classnames(
              ' p-2 min-w-[63.75px] h-[36px] grid place-content-center text-center rounded-md cursor-pointer',
              {
                'bg-primary-200 text-primary-1000': isActive,
                'text-dark-1000': !isActive,
              },
            );
            const languageText = getFriendlyLanguage(lang);
            return (
              <section
                key={lang}
                className={className}
                onClick={() => handleChangeLanguage(lang)}
              >
                <p className="text-sm cursor-pointer select-none">
                  {languageText}
                </p>
              </section>
            );
          })}
        </section>
      </div>
    </div>
  );
};

export default LanguageSelect;
