import MapView from 'cars/components/search/MapView/MapView';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import { Car } from 'cars/types/response/CarSearchResponse';

interface CarMapViewProps {
  CarCategory: CategoryOption;
  items: Car[];
  onClick: (item: Car) => void;
}

const CarMapView = ({ CarCategory, items, onClick }: CarMapViewProps) => {
  return <MapView CarCategory={CarCategory} items={items} onClick={onClick} />;
};

export default CarMapView;
