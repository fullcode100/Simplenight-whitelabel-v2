import { useSelector } from 'react-redux';
import { getCategories } from 'store/selectors/core';

const useDisplayCategory = () => {
  const categories = useSelector(getCategories);
  const displayCategories = categories.length > 1;

  return displayCategories;
};

export default useDisplayCategory;
