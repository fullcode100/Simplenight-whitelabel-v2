import { useBrandConfigSetup } from 'hooks/branding/useBrandConfigSetup';
import { useThemeUpdater } from 'hooks/branding/useThemeUpdater';
import { IntlProvider } from 'react-intl';
import { useSelector } from 'react-redux';
import { DEFAULT_LOCALE } from '../../helpers/languageConstants';
import { getLanguageSettings } from '../../store/selectors/core';
import SEOHoc from './SEOHoc';

const InitAppHOC = ({ children }: { children: any }) => {
  const { locale, intlMessages } = useSelector(getLanguageSettings);

  useBrandConfigSetup();
  useThemeUpdater();

  return (
    <IntlProvider
      messages={intlMessages}
      locale={locale}
      defaultLocale={DEFAULT_LOCALE}
    >
      <SEOHoc>{children}</SEOHoc>
    </IntlProvider>
  );
};

export default InitAppHOC;
