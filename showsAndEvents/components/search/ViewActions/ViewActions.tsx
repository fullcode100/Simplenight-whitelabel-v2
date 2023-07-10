import React from 'react';

import MapIcon from 'public/icons/assets/map-ok.svg';
import ListIcon from 'public/icons/assets/list-ok.svg';
import {
  AltRadioButtonGroup,
  RadioItemType,
} from 'components/global/AltRadioButton/AltRadioButton';
import { IconWrapper } from '@simplenight/ui';

interface ViewActionsProps {
  setview?: React.Dispatch<React.SetStateAction<string>> | null;
  view: string;
}

const viewTypeFilterItems: RadioItemType[] = [
  {
    value: 'list',
    label: (
      <IconWrapper size={24}>
        <ListIcon />
      </IconWrapper>
    ),
  },
  {
    value: 'map',
    label: (
      <IconWrapper size={24}>
        <MapIcon />
      </IconWrapper>
    ),
  },
];

export const ViewActions = ({ setview = null, view }: ViewActionsProps) => {
  const handleViewTypeChange = (viewParam: string) => {
    setview && setview(viewParam);
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
