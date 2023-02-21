import { useSettings } from 'hooks/services/useSettings';
import Loader from '../Loader/Loader';

const ConfigLoader = () => {
  const { isFetched: brandConfigLoaded } = useSettings();

  return <>{!brandConfigLoaded && <Loader />}</>;
};

export default ConfigLoader;
