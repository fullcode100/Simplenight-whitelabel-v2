export interface addressProps {
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface detailsProps {
  address: addressProps;
  name: string;
  star_rating: number;
}

export interface itemsProps {
  details: detailsProps;
  thumbnail: string;
  id: string;
  amount_min: number;
}

export interface MapViewProps {
  items: itemsProps[];
  onViewDetailClick?: (item: object) => void;
}
