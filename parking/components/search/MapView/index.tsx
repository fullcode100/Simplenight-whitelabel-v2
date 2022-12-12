import {
  Parking,
  PointGeometry,
} from '../../../types/response/ParkingSearchResponse';
import LocationMap from '../../../../components/global/LocationMap/LocationMap';
import { FC, useState } from 'react';
import { ParkingCard } from '../ParkingCard';

interface ParkingMapViewProps {
  parkingList: Parking[];
}

export const ParkingMapView: FC<ParkingMapViewProps> = ({ parkingList }) => {
  const [activeItem, setActiveItem] = useState<number>(0);
  const parkingItemsCoordinates = parkingList.map((parkingItem) => {
    const point = parkingItem.geometry.geometries.find(
      (geoItem) => geoItem.type === 'Point',
    ) as PointGeometry;

    const [longitude, latitude] = point.coordinates;
    return { longitude, latitude };
  });

  const currentItem = parkingItemsCoordinates[activeItem];

  return (
    <section className="relative">
      <LocationMap
        activeMarkerIndex={activeItem}
        center={currentItem}
        coords={parkingItemsCoordinates}
        zoom={19}
        height={575}
        onClickMarker={(lat, lng, index) => {
          setActiveItem(index);
        }}
      />
      <section className="absolute w-full bottom-0 p-4 w-2/3">
        <ParkingCard parkingItem={parkingList[activeItem]} />
      </section>
    </section>
  );
};
