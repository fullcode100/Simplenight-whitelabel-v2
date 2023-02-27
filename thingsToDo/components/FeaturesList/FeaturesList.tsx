import { Heading } from '@simplenight/ui';
import React from 'react';
import Checkmark from 'public/icons/assets/checkmark.svg';
import Cross from 'public/icons/assets/cross-current.svg';
import { Paragraph } from '@simplenight/ui';

interface FeaturesListProps {
  type: 'included' | 'notIncluded';
  list: string[];
  label: string;
}

const FeaturesList = ({ type, list, label }: FeaturesListProps) => {
  return (
    <section>
      <Heading tag="h5">{label}</Heading>
      <div className="flex flex-wrap items-center w-full">
        {list.map((item, index) => (
          <div
            key={index}
            className={`w-1/2 flex gap-2 items-center ${
              type == 'included' ? 'text-green-1000' : 'text-dark-600'
            }`}
          >
            {type == 'included' ? <Checkmark /> : <Cross />}
            <Paragraph fontWeight="semibold">{item}</Paragraph>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesList;
