import MarkerIcon from 'public/icons/assets/location-marker.svg';
import classNames from 'classnames';

interface LocationMarkerProps {
  onClick: () => void;
  $hover?: boolean;
  lat?: number;
  lng?: number;
}

const LocationMarker = ({ onClick, $hover }: LocationMarkerProps) => {
  const buttonClassNames = classNames({
    'text-teal-500 transform scale-110': $hover,
    'transition-all duration-200 ease-in-out text-primary-1000': true,
  });
  return (
    <button className={buttonClassNames} onClick={onClick}>
      <MarkerIcon />
    </button>
  );
};

export default LocationMarker;
