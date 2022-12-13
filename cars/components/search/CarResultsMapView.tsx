import MapView from 'cars/components/search/MapView/MapView';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import { Car } from 'cars/types/response/SearchResponse';

interface CarMapViewProps {
  CarCategory: CategoryOption;
  items: Car[];
  createUrl: (item: Car) => string;
}

const CarMapView = ({ CarCategory, items, createUrl }: CarMapViewProps) => {
  return (
    <MapView CarCategory={CarCategory} items={items} createUrl={createUrl} />
  );
};

export default CarMapView;
