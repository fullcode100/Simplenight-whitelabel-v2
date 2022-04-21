import React from 'react';
import GoogleMapReact from 'google-map-react';
import LocationMarker from './LocationMarker';

interface CoordsProps {
  latitude: number;
  longitude: number;
  name?: string;
}

interface DefaultCenterProps {
  latitude: number;
  longitude: number;
}
interface LocationMapProps {
  className?: string;
  defaultCenter: DefaultCenterProps;
  height?: number;
  coords?: CoordsProps[];
  onClickMarker?: (lat: number, lng: number) => void;
}

const LocationMap = ({
  coords,
  defaultCenter,
  height,
  onClickMarker,
}: LocationMapProps) => {
  return (
    <section style={{ height }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: `${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}`,
        }}
        defaultZoom={15}
        defaultCenter={{
          lat: defaultCenter?.latitude as number,
          lng: defaultCenter?.longitude as number,
        }}
      >
        {coords?.map(({ latitude, longitude }, i) => {
          return (
            <LocationMarker
              key={`marker${i}`}
              lat={latitude}
              lng={longitude}
              onClick={() => onClickMarker?.(latitude, longitude)}
            />
          );
        })}
      </GoogleMapReact>
    </section>
  );
};

export default LocationMap;
