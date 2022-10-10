import { useSelector } from 'react-redux';
import { getFeatures } from 'store/selectors/core';

const useDisplayCategory = () => {
  const features = useSelector(getFeatures);
  const activeFeatures = features
    ? Object.keys(features).filter((feature) => features[feature])
    : [];
  const displayCategories = activeFeatures.length > 1;

  return displayCategories;
};

export default useDisplayCategory;
