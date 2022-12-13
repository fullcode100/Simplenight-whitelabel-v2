import '../styles/globals.css';
import '../styles/antd.scss';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { useStore } from '../store';
import InitAppHOC from '../components/global/InitAppHOC';
import { AppPropsWithLayout } from 'types/layout/pageTypes';
import { useLayout } from 'hooks/layoutAndUITooling/useLayout';
import { initializeI18Next } from 'hooks/i18n/useI18Next';

const i18next = initializeI18Next();

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const store = useStore(pageProps.initialReduxState);
  const PageWithLayout = useLayout(Component, pageProps);

  return (
    <Provider store={store}>
      <InitAppHOC i18next={i18next}>
        <Toaster />
        <PageWithLayout />
      </InitAppHOC>
    </Provider>
  );
}

export default MyApp;
