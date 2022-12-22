import React from 'react';
import DiningHighlightedText from './DiningHighlightedText';

const DiningCategoryDetail = ({
  className,
  categories,
}: {
  className?: string;
  categories: string[];
}) => {
  return (
    <div className={`flex ${className}`}>
      {categories.map((category) => (
        <DiningHighlightedText key={category} label={category} />
      ))}
    </div>
  );
};

export default DiningCategoryDetail;
