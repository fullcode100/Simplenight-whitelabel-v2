import { transformTo12hours } from 'dining/helpers/time';
import React from 'react';

const DiningTimeSelector = ({
  label,
  status = 'enabled',
  onSelect,
}: {
  label: string;
  status?: 'selected' | 'disabled' | 'enabled';
  onSelect: (key: string) => void;
}) => {
  const availableStatus = {
    selected: 'border-primary-1000 bg-primary-100 text-primary-1000',
    disabled: 'bg-dark-300 text-dark-700',
    enabled: 'border-dark-300 text-dark-700',
  };

  return (
    <button
      onClick={() => onSelect(label)}
      className={`w-full h-7 rounded-4 mb-4 border-[1px] ${availableStatus[status]}`}
    >
      {transformTo12hours(label)}
    </button>
  );
};

export default DiningTimeSelector;
