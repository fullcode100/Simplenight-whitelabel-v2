import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getCategories } from '../../../../store/selectors/core';
import classnames from 'classnames';
import SingleBed from 'public/icons/assets/single-bed.svg';
import useDisplayCategory from 'hooks/category/useDisplayCategory';

const CategorySelectDesktop = () => {
  const categories = useSelector(getCategories);
  const categoriesNames = categories.map((category) => category.alias);
  const [currentCategory, setCurrentCategory] = useState('hotels');
  const displayCategories = useDisplayCategory();

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
          'px-4 py-2 text-base cursor-pointer grid place-items-center gap-2 relative z-10',
          {
            'text-primary-1000 border-primary-1000 border-b-2': isActive,
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
    <>
      {displayCategories && (
        <section className="relative justify-center hidden mb-3 lg:flex text-dark-800">
          {getCategoriesAsOptions()}
          <span className="absolute bottom-0 h-[2px] bg-dark-300 w-full" />
        </section>
      )}
    </>
  );
};

export default CategorySelectDesktop;
