import DevToolbar from 'layouts/DevToolbar/DevToolbar';
import { getDefaultLayout } from 'layouts/helpers/getDefaultLayout';
import { NextComponentType, NextPageContext } from 'next';
import { NextPageWithLayout } from 'types/layout/pageTypes';
import { useIsDev } from './useIsDev';

type ComponentType = NextComponentType<NextPageContext, any, {}> &
  NextPageWithLayout;

export const useLayout = (Component: ComponentType, pageProps: any) => {
  const getLayout = Component.getLayout || getDefaultLayout;
  const renderPage = () => getLayout(<Component {...pageProps} />);

  const hasDevToolbar = useIsDev();

  return () => (
    <>
      {hasDevToolbar && <DevToolbar />}
      {renderPage()}
    </>
  );
};
