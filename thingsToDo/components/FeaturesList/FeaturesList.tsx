import Heading from 'components/global/Typography/Heading';
import React from 'react';
import Checkmark from 'public/icons/assets/checkmark.svg';
import Cross from 'public/icons/assets/cross-current.svg';

interface FeaturesListProps {
  type: 'included' | 'notIncluded';
  list: string[];
  label: string;
}

const FeaturesList = ({ type, list, label }: FeaturesListProps) => {
  return (
    <section>
      <Heading tag="h5">{label}</Heading>
      <div className="flex items-center w-full flex-wrap">
        {list.map((item, index) => (
          <div
            key={index}
            className={`w-1/2 flex gap-2 items-center ${
              type == 'included' ? 'text-green-1000' : 'text-dark-600'
            }`}
          >
            {type == 'included' ? <Checkmark /> : <Cross />}
            <p className="font-semibold text-xs">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesList;
