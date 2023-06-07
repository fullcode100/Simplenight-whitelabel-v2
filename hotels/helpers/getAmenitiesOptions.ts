import { Option } from 'components/global/MultipleSelect/MultipleSelect';
import { SearchItem } from 'hotels/types/adapters/SearchItem';

export const getAmenitiesOptions = (data: SearchItem[]) => {
  let amenitiesOptionsList: string[] = [];
  const amenitiesOptionsListFiltered: string[] = [];
  const amenitiesOptions: Option[] = [];
  data.forEach((item) => {
    if (item.details.sn_amenities) {
      amenitiesOptionsList = [
        ...amenitiesOptionsList,
        ...item.details.sn_amenities,
      ];
    }
  });
  amenitiesOptionsList.forEach((amenity, index) => {
    if (amenitiesOptionsList.indexOf(amenity) === index) {
      amenitiesOptionsListFiltered.push(amenity);
    }
  });
  amenitiesOptionsListFiltered.sort();
  amenitiesOptionsListFiltered.forEach((option) => {
    amenitiesOptions.push({ value: option, label: option });
  });
  return amenitiesOptions;
};
