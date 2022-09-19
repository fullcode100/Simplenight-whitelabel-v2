import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getFeatures } from '../../../../store/selectors/core';
import classnames from 'classnames';
import SingleBed from 'public/icons/assets/single-bed.svg';
import useDisplayCategory from 'hooks/category/useDisplayCategory';

const CategorySelectDesktop = () => {
  const features = useSelector(getFeatures);
  const featureNames = Object.keys(features);
  const [currentCategory, setCurrentCategory] = useState('flights');
  const displayCategories = useDisplayCategory();

  const handleSelectCategory = (category: string) => {
    setCurrentCategory(category);
  };

  const getFeaturesAsOptions = () =>
    featureNames.map((feature, i) => {
      const indexLast = featureNames.lastIndexOf(feature);
      const isLast = i === indexLast;
      if (features[feature]) {
        const isActive = currentCategory === feature;
        const className = classnames(
          'px-4 py-2 text-base cursor-pointer grid place-items-center gap-2 relative z-10',
          {
            'text-primary-1000 border-primary-1000 border-b-2': isActive,
          },
        );
        return (
          <section
            key={feature}
            className={className}
            onClick={() => handleSelectCategory(feature)}
          >
            <SingleBed />
            <p className="capitalize">{feature}</p>
          </section>
        );
      }
      return null;
    });

  return (
    <>
      {displayCategories && (
        <section className="hidden lg:flex text-dark-800 justify-center mb-3 relative">
          {getFeaturesAsOptions()}
          <span className="absolute bottom-0 h-[2px] bg-dark-300 w-full" />
        </section>
      )}
    </>
  );
};

export default CategorySelectDesktop;
