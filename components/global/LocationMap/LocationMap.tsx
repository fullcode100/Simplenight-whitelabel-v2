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
  center: DefaultCenterProps;
  height?: number;
  coords?: CoordsProps[];
  zoom?: number;
  onClickMarker?: (lat: number, lng: number, index: number) => void;
  activeMarkerIndex?: number;
  locations?: DefaultCenterProps[];
}

const LocationMap = ({
  coords,
  center,
  height = 400,
  zoom = 15,
  onClickMarker,
  activeMarkerIndex,
  locations,
}: LocationMapProps) => {
  return (
    <section className="w-full" style={{ height }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: `${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}`,
        }}
        defaultZoom={zoom}
        zoom={zoom}
        defaultCenter={{
          lat: center?.latitude as number,
          lng: center?.longitude as number,
        }}
        center={{
          lat: center?.latitude as number,
          lng: center?.longitude as number,
        }}
        options={{
          zoomControl: false,
          fullscreenControl: false,
          gestureHandling: 'greedy',
        }}
      >
        {locations?.map(({ latitude, longitude }, i) => {
          return (
            <LocationMarker
              key={`marker${i}`}
              lat={latitude}
              lng={longitude}
              onClick={() => onClickMarker?.(latitude, longitude, i)}
              active={
                latitude == coords?.[0].latitude &&
                longitude == coords?.[0].longitude
              }
            />
          );
        })}
      </GoogleMapReact>
    </section>
  );
};

export default LocationMap;
