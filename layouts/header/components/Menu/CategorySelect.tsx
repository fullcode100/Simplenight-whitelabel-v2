import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getCategories } from '../../../../store/selectors/core';
import classnames from 'classnames';
import SingleBed from 'public/icons/assets/single-bed.svg';

const CategorySelect = () => {
  const categories = useSelector(getCategories);
  const categoriesNames = categories.map((category) => category.alias);
  const [currentCategory, setCurrentCategory] = useState('hotels');

  const handleSelectCategory = (category: string) => {
    setCurrentCategory(category);
  };

  const getCategoriesAsOptions = () =>
    categoriesNames.map((category, i) => {
      const indexLast = categoriesNames.lastIndexOf(category);
      const isLast = i === indexLast;
      if (categories[i]) {
        const isActive = currentCategory === category;
        const className = classnames(
          'px-4 py-3 text-base cursor-pointer flex items-center gap-2',
          {
            'bg-primary-100 text-primary-1000': isActive,
            'border-dark-100 border-b': isLast,
          },
        );
        return (
          <section
            key={category}
            className={className}
            onClick={() => handleSelectCategory(category)}
          >
            <SingleBed />
            <p className="capitalize">{category}</p>
          </section>
        );
      }
      return null;
    });

  return (
    <section className="mt-2 text-dark-1000">
      {getCategoriesAsOptions()}
    </section>
  );
};

export default CategorySelect;
