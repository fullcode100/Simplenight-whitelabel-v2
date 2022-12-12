import { Dispatch, SetStateAction } from 'react';

import Combobox from 'components/global/Combobox/Combobox';
import { Location } from 'thingsToDo/types/response/ThingsDetailResponse';

interface LocationSelectorProps {
  placeholder: string;
  locations: Location[];
  selectedPoint?: Location;
  setSelectedPoint: Dispatch<SetStateAction<Location | undefined>>;
}

const LocationSelector = ({
  placeholder,
  locations,
  selectedPoint,
  setSelectedPoint,
}: LocationSelectorProps) => {
  const formattedLocations = locations.map((location) => {
    const value = location.name || location.description;
    const { address } = location;
    const formattedAddress = `${address?.address1}, ${address?.city} - ${address?.state} - ${address?.country}, ${address?.postal_code}`;
    const subvalue = address ? formattedAddress : null;

    return {
      value,
      subvalue,
      ...location,
    };
  });

  return (
    <Combobox
      width="w-full"
      placeholder={placeholder}
      items={formattedLocations}
      selectedItem={selectedPoint}
      setSelectedItem={setSelectedPoint}
    />
  );
};

export default LocationSelector;
