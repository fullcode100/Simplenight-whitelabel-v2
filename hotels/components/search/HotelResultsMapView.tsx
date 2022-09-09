import MapView from 'hotels/components/search/MapView/MapView';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import { Hotel } from 'hotels/types/response/SearchResponse';

interface HotelMapViewProps {
  HotelCategory: CategoryOption;
  items: Hotel[];
  createUrl: (item: Hotel) => string;
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
