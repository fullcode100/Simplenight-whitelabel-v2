import { itemsProps } from 'components/global/MapView/MapViewTypes';
import MapView from 'components/global/MapView/MapView';

interface HotelMapViewProps {
  items: itemsProps;
}

const HotelMapView = ({ items }: HotelMapViewProps) => {
  return <MapView items={items} />;
};

export default HotelMapView;
