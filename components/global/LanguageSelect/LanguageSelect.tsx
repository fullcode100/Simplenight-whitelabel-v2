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
  const handleChangeLanguage = async (lang: string) => {
    changeAllLanguages(lang, [i18n, i18nHotels]);
    try {
      const data = { lang };
      await updateCart(data, i18n);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="w-ful">
      <div className="relative">
        <section className="p-2 bg-dark-100 flex rounded-md gap-1">
          {languages.map((lang) => (
            <section
              key={lang}
              className={classnames(
                ' p-2 min-w-[63px] text-center rounded-md',
                {
                  'bg-primary-200 text-primary-1000': lang === language,
                  'text-dark-1000': lang !== language,
                },
              )}
              onClick={() => handleChangeLanguage(lang)}
            >
              <p>{lang.toUpperCase()}</p>
            </section>
          ))}
        </section>
      </div>
    </div>
  );
};
export default LanguageSelect;
