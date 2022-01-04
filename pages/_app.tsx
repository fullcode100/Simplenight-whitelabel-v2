import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { useStore } from '../store';
import InitAppHOC from '../components/global/InitAppHOC';
import Header from '../components/global/header/Header';

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <InitAppHOC>
        <Header />
        <Component {...pageProps} />;
      </InitAppHOC>
    </Provider>
  );
}

export default MyApp;
