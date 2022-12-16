import { useSelector } from 'react-redux';
import Loader from '../Loader/Loader';

const ConfigLoader = () => {
  const { brandConfigLoaded } = useSelector((state: any) => state.core);

  return <>{!brandConfigLoaded && <Loader />}</>;
};

export default ConfigLoader;
