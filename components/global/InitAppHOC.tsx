import { useBrandConfigSetup } from 'hooks/branding/useBrandConfigSetup';
import { useThemeUpdater } from 'hooks/branding/useThemeUpdater';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import SEOHoc from './SEOHoc';
import { I18nextProvider } from 'react-i18next';
import { i18n } from 'i18next';
import { useInitialCurrency } from 'hooks/windowInteraction/useInitialCurrency';
import GoogleTagManager from './GoogleTagManager';
import { setIsMapsLoaded } from 'store/actions/core';
import { useDispatch } from 'react-redux';
import Script from 'next/script';

const InitAppHOC = ({
  children,
  i18next,
}: {
  children: any;
  i18next: i18n;
}) => {
  const dispatch = useDispatch();

  useBrandConfigSetup();
  useThemeUpdater();
  useInitialCurrency();

  const handleMapsLoaded = () => {
    dispatch(setIsMapsLoaded(true));
  };

  const MAPS_API_KEY = 'AIzaSyB_rHUVDeYtUuQ3fEuuBdmfgVnGuXUnVeU';

  return (
    <>
      <Script
        onLoad={handleMapsLoaded}
        src={`https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&libraries=places`}
        strategy="lazyOnload"
      />
      <I18nextProvider i18n={i18next}>
        <ErrorBoundary>
          <GoogleTagManager />
          <SEOHoc>{children}</SEOHoc>
        </ErrorBoundary>
      </I18nextProvider>
    </>
  );
};

export default InitAppHOC;
