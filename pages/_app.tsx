import '../styles/globals.css';
import '../styles/antd.scss';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import InitAppHOC from '../components/global/InitAppHOC';
import { AppPropsWithLayout } from 'types/layout/pageTypes';
import { useLayout } from 'hooks/layoutAndUITooling/useLayout';

import { initializeI18Next } from 'hooks/i18n/useI18Next';
import ConfigLoader from 'components/global/ConfigLoader/ConfigLoader';
import { useEffect, useState } from 'react';
import { ConversionTracking } from 'components/conversion/ConversionTracking';

const i18next = initializeI18Next();

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const PageWithLayout = useLayout(Component, pageProps);

  const [isLocalhost, setIsLocalhost] = useState(false);
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    const hostname = window.location.hostname;
    setIsLocalhost(hostname === 'localhost');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ConversionTracking />
      <InitAppHOC i18next={i18next}>
        <ConfigLoader />
        <Toaster />
        <PageWithLayout />
      </InitAppHOC>
      {isLocalhost && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

export default MyApp;
