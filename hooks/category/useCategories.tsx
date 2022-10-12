import { useSelector } from 'react-redux';
import { ReactElement } from 'react';

import { getCategories } from 'store/selectors/core';

import BedIcon from 'public/icons/assets/bed.svg';
import ThingsIcon from 'public/icons/categories/Category-Things.svg';

interface IconsMap {
  [key: string]: ReactElement;
}

export const getCategoryIcon = (key: string) => {
  const iconsMapping: IconsMap = {
    bed: <BedIcon />,
    backpack: <ThingsIcon />,
  };

  return iconsMapping[key];
};

const useCategories = () => {
  const categories = useSelector(getCategories);
  const categoriesTabs = categories.map((category) => {
    return {
      value: category.alias,
      type: category.whitelabelId,
      icon: getCategoryIcon(category.icon),
    };
  });

  return categoriesTabs;
};

export default useCategories;
