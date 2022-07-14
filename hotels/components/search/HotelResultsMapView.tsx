import MapView from 'hotels/components/search/MapView/MapView';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import { Hotel } from 'hotels/types/response/SearchResponse';

interface HotelMapViewProps {
  HotelCategory: CategoryOption;
  items: Hotel[];
  onViewDetailClick: (item: Hotel) => void;
}

const HotelMapView = ({
  HotelCategory,
  items,
  onViewDetailClick,
}: HotelMapViewProps) => {
  return (
    <MapView
      HotelCategory={HotelCategory}
      items={items}
      onViewDetailClick={onViewDetailClick}
    />
  );
};

export default HotelMapView;
