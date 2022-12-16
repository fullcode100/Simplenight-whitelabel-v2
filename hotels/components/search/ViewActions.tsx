import React from 'react';

import MapIcon from 'public/icons/assets/map.svg';
import ListIcon from 'public/icons/assets/list.svg';
import {
  AltRadioButtonGroup,
  RadioItemType,
} from 'components/global/AltRadioButton/AltRadioButton';

interface ViewActionsProps {
  setview: React.Dispatch<React.SetStateAction<string>>;
  view: string;
}

const viewTypeFilterItems: RadioItemType[] = [
  {
    value: 'list',
    label: <ListIcon />,
  },
  {
    value: 'map',
    label: <MapIcon />,
  },
];

export const ViewActions = ({ setview, view }: ViewActionsProps) => {
  const handleViewTypeChange = (viewParam: string) => {
    setview(viewParam);
  };
  return (
    <div className="ml-2 hidden lg:flex">
      <AltRadioButtonGroup
        items={viewTypeFilterItems}
        value={view}
        onChange={handleViewTypeChange}
        name="parkingType"
      />
    </div>
  );
};
