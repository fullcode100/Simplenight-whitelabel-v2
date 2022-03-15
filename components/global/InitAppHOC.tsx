import { useBrandConfigSetup } from 'hooks/branding/useBrandConfigSetup';
import { useThemeUpdater } from 'hooks/branding/useThemeUpdater';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import SEOHoc from './SEOHoc';
import { I18nextProvider } from 'react-i18next';
import { useI18Next } from 'hooks/i18n/useI18Next';

const InitAppHOC = ({ children }: { children: any }) => {
  const i18next = useI18Next();

  useBrandConfigSetup();
  useThemeUpdater();

  return (
    <I18nextProvider i18n={i18next}>
      <ErrorBoundary>
        <SEOHoc>{children}</SEOHoc>
      </ErrorBoundary>
    </I18nextProvider>
  );
};

export default InitAppHOC;
