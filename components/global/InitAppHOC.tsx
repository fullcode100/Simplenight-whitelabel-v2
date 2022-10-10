import { useBrandConfigSetup } from 'hooks/branding/useBrandConfigSetup';
import { useThemeUpdater } from 'hooks/branding/useThemeUpdater';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import SEOHoc from './SEOHoc';
import { I18nextProvider } from 'react-i18next';
import { i18n } from 'i18next';
import { CustomWindow } from 'types/global/CustomWindow';
import { useInitialCurrency } from 'hooks/windowInteraction/useInitialCurrency';
import GoogleTagManager from './GoogleTagManager';

declare let window: CustomWindow;

const InitAppHOC = ({
  children,
  i18next,
}: {
  children: any;
  i18next: i18n;
}) => {
  useBrandConfigSetup();
  useThemeUpdater();
  useInitialCurrency();

  return (
    <I18nextProvider i18n={i18next}>
      <ErrorBoundary>
        <GoogleTagManager />
        <SEOHoc>{children}</SEOHoc>
      </ErrorBoundary>
    </I18nextProvider>
  );
};

export default InitAppHOC;
