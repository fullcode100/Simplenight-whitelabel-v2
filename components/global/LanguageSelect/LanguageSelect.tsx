/* eslint-disable indent */
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';
import { updateCart } from 'core/client/services/CartClientService';
import { i18n } from 'i18next';

const changeAllLanguages = (
  targetLanguage: string,
  i18nInstances: i18n[],
): void => {
  i18nInstances.forEach((instance) => {
    instance.changeLanguage(targetLanguage);
  });
};

const LanguageSelect = () => {
  const [t, i18n] = useTranslation('global');
  const [tHotels, i18nHotels] = useTranslation('hotels');
  const { language } = i18n;
  const languages = ['en', 'es'];
  const enText = t('en', 'English');
  const esText = t('es', 'Spanish');
  const handleChangeLanguage = async (lang: string) => {
    changeAllLanguages(lang, [i18n, i18nHotels]);
    try {
      const data = { lang };
      await updateCart(data, i18n);
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
    <div className="w-ful mt-3">
      <div className="relative">
        <section className="p-2 bg-dark-100 flex flex-col rounded-md gap-1">
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
