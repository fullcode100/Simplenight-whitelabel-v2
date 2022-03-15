import { useBrandConfigSetup } from 'hooks/branding/useBrandConfigSetup';
import { useThemeUpdater } from 'hooks/branding/useThemeUpdater';
import { IntlProvider } from 'react-intl';
import { useSelector } from 'react-redux';
import { DEFAULT_LOCALE } from '../../helpers/languageConstants';
import { getLanguageSettings } from '../../store/selectors/core';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import SEOHoc from './SEOHoc';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';

import globalEn from 'translations/en/global.json';
import globalEs from 'translations/es/global.json';

i18next.init({
  interpolation: {
    escapeValue: false,
  },
  lng: 'en',
  resources: {
    en: {
      global: globalEn,
    },
    es: {
      global: globalEs,
    },
  },
});

const InitAppHOC = ({ children }: { children: any }) => {
  const { locale, intlMessages } = useSelector(getLanguageSettings);

  useBrandConfigSetup();
  useThemeUpdater();

  return (
    // <IntlProvider
    //   messages={intlMessages}
    //   locale={locale}
    //   defaultLocale={DEFAULT_LOCALE}
    // >
    <I18nextProvider i18n={i18next}>
      <ErrorBoundary>
        <SEOHoc>{children}</SEOHoc>
      </ErrorBoundary>
    </I18nextProvider>
    // </IntlProvider>
  );
};

export default InitAppHOC;
