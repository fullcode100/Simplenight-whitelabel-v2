import React from 'react';

const DiningHighlightedText = ({ label }: { label: string }) => {
  return (
    <div className="px-1 mr-3 bg-primary-100 text-primary-1000 rounded-4">
      {label}
    </div>
  );
};

export default DiningHighlightedText;
