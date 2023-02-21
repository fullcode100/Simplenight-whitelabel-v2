import MapView from 'hotels/components/search/MapView/MapView';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import { SearchItem } from 'hotels/types/adapters/SearchItem';

interface HotelMapViewProps {
  HotelCategory: CategoryOption;
  items: SearchItem[];
  createUrl: (item: SearchItem) => string;
}

const HotelMapView = ({
  HotelCategory,
  items,
  createUrl,
}: HotelMapViewProps) => {
  return (
    <MapView
      HotelCategory={HotelCategory}
      items={items}
      createUrl={createUrl}
    />
  );
};

export default HotelMapView;
