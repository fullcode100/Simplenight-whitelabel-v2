import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { useStore } from '../store';
import InitAppHOC from '../components/global/InitAppHOC';
import Header from '../layouts/header/Header';
import { getDefaultLayout } from 'layouts/helpers/getDefaultLayout';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const store = useStore(pageProps.initialReduxState);

  const getLayout = Component.getLayout || getDefaultLayout;
  const renderPage = () => getLayout(<Component {...pageProps} />);

  return (
    <Provider store={store}>
      <InitAppHOC>{renderPage()}</InitAppHOC>
    </Provider>
  );
}

export default MyApp;
