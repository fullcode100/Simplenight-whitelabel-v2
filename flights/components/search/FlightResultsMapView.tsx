import MapView from 'flights/components/search/MapView/MapView';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import { Flight } from 'flights/types/response/SearchResponse';

interface FlightMapViewProps {
  FlightCategory: CategoryOption;
  items: Flight[];
  onViewDetailClick: (item: Flight) => void;
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
