import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getFeatures } from '../../../../store/selectors/core';
import classnames from 'classnames';
import SingleBed from 'public/icons/assets/single-bed.svg';

const CategorySelect = () => {
  const features = useSelector(getFeatures);
  const featureNames = Object.keys(features);
  const [currentCategory, setCurrentCategory] = useState('hotels');

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
          'px-4 py-3 text-base cursor-pointer flex items-center gap-2',
          {
            'bg-primary-100 text-primary-1000': isActive,
            'border-dark-100 border-b': isLast,
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
    <section className="mt-2 text-dark-1000">{getFeaturesAsOptions()}</section>
  );
};

export default CategorySelect;
