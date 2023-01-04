import { useLayout } from 'hooks/layoutAndUITooling/useLayout';
import Error500 from './Error500';

function PageError500() {
  const PageWithLayout = useLayout(Error500, {});

  return <PageWithLayout />;
}

export default PageError500;
