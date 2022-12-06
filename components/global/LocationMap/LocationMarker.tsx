import MarkerIcon from 'public/icons/assets/location-marker.svg';
import classNames from 'classnames';

interface LocationMarkerProps {
  onClick: () => void;
  $hover?: boolean;
  lat?: number;
  lng?: number;
  active?: boolean;
}

const LocationMarker = ({ onClick, $hover, active }: LocationMarkerProps) => {
  const buttonClassNames = classNames({
    'text-teal-500 transform': $hover,
    'absolute transition-all duration-200 origin-bottom ease-in-out text-primary-1000':
      true,
    active,
    'z-10 scale-150': active || $hover,
  });
  return (
    <section className="relative flex items-end justify-center">
      <button className={buttonClassNames} onClick={onClick}>
        <MarkerIcon />
      </button>
    </section>
  );
};

export default LocationMarker;
