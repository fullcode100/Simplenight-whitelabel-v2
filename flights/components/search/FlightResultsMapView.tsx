import MapView from 'flights/components/search/MapView/MapView';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import { Flight2 } from 'flights/types/response/SearchResponse';

interface FlightMapViewProps {
  FlightCategory: CategoryOption;
  items: Flight2[];
  onViewDetailClick: (item: Flight2) => void;
}

const FlightMapView = ({
  FlightCategory,
  items,
  onViewDetailClick,
}: FlightMapViewProps) => {
  return (
    <MapView
      FlightCategory={FlightCategory}
      items={items}
      onViewDetailClick={onViewDetailClick}
    />
  );
};

export default FlightMapView;
