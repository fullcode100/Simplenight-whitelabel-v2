import React from 'react';

type Option = {
  id: string;
  label: string;
  selected?: boolean;
};

type TabSelectorProps = {
  options: Array<Option>;
  onChangeStop: (selectedOption: string) => void;
};

const TabSelector = ({ options, onChangeStop }: TabSelectorProps) => {
  return (
    <ul className="flex flex-row p-1 space-x-1">
      {options.map((stop) => (
        <li
          key={stop.id}
          onClick={() => onChangeStop(stop.id)}
          className={`w-full text-center cursor-pointer rounded-4 py-2 text-xs font-medium leading-5 ring-white ring-opacity-60 ring-offset-2 ring-offset-primary-1000 focus:outline-none ${
            stop.selected
              ? 'shadow bg-primary-100 text-primary-1000 ring-2'
              : 'hover:text-primary-1000'
          }`}
        >
          {stop.label}
        </li>
      ))}
    </ul>
  );
};

export default TabSelector;
