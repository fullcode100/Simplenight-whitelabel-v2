import { useThemeUpdater } from 'hooks/branding/useThemeUpdater';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import SEOHoc from './SEOHoc';
import { I18nextProvider } from 'react-i18next';
import { i18n } from 'i18next';
import { useInitialCurrency } from 'hooks/windowInteraction/useInitialCurrency';
import GoogleServices from './GoogleServices';

const InitAppHOC = ({
  children,
  i18next,
}: {
  children: any;
  i18next: i18n;
}) => {
  useThemeUpdater();
  useInitialCurrency();

  return (
    <I18nextProvider i18n={i18next}>
      <ErrorBoundary>
        <GoogleServices />
        <SEOHoc>{children}</SEOHoc>
      </ErrorBoundary>
    </I18nextProvider>
  );
};

export default InitAppHOC;
