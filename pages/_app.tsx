import '../styles/globals.css';
import { Provider } from 'react-redux';
import { useStore } from '../store';
import InitAppHOC from '../components/global/InitAppHOC';
import { AppPropsWithLayout } from 'types/layout/pageTypes';
import { useLayout } from 'hooks/layoutAndUITooling/useLayout';

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const store = useStore(pageProps.initialReduxState);
  const PageWithLayout = useLayout(Component, pageProps);

  return (
    <Provider store={store}>
      <InitAppHOC>
        <PageWithLayout />
      </InitAppHOC>
    </Provider>
  );
}

export default MyApp;
